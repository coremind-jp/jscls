## jsclsを利用したアプリケーション開発

ここではjsclsを利用したアプリケーション開発の概要を説明します。
より詳しい情報はJsDocsを参照してください。

* [マニフェスト(manifest.js)](#s2)
* [パッケージ](#s9)
* [アプリケーションコードとデプロイ](#s10)
* [jsclsにおけるクラス](#s1)
* [クラスの作成](#s2)
* [シングルトンクラスの作成](#s3)
* [スタティックメンバ](#s4)
* [インポート](#s5)
* [継承、オーバーライド、スーパークラスメソッド](#s6)
* [インスタンスの生成と破棄](#s7)
* [トップレベル関数](#s11)

## <a name="s1"></a>jsclsにおけるクラス

jsclsではprototypeチェインを利用したクラスを作成することができます。
この機構によって生成されるクラスオブジェクトには次に上げる機能が提供されます。

* 初期化、破棄メソッドの義務化
* スーパークラスメソッドの呼び出し
* メソッドの動的なbind化
* クラスインスタンス間の型評価
* クラスオブジェクトを使用して生成されたインスタンス数の監視

また、作成されたクラスオブジェクトはcm.Classによって次に上げる機能を利用出来ます。

* 既存のクラスオブジェクト(外部モジュール)の動的な読み込み
* 外部モジュールを使用した新しいクラスの作成(継承, 包含)
* Singleton化

## <a name="s2"></a> クラスの作成

クラスを作成するのに最も簡単な記述は次の通りです。

```
//ファイルパス「./aaa/bbb/ccc/ddd/HelloWorld.js」　(1)
cls.require( {
	//(2)
	$name:aaa.ccc.ddd.HelloWorld,
	//(3)
	$define:{
		//(4)
		HelloWorld:function() {
			//初期化処理...
		},
		//(5)
		destroy:function() {
			//破棄処理...
		},
		sampleMethod:function(arg1, arg2) {
			//メソッドはこのように追加していきます。
		}
	}
});
```

0. 原則的に1クラス1ファイルで構成しファイル名をクラス名.js、パッケージ名をディレクトリのツリー構造通りに定義しなければなりません。
0. $nameプロパティーにパッケージ名を含めた完全なクラス名を設定します。(パッケージ)
0. $defineプロパティーにクラスメソッドなどを定義したリテラルを設定します。
0. 初期化メソッド(constructor)はクラス名でなければなりません。
0. destroyメソッドは必須です。ここにインスタンスの破棄に必要な処理を記述します。

最もシンプルなクラスの記述はこれで終わりです。上記の構成を基により詳しいクラスの作成方法を説明して行きます。

## <a name="s3"></a> シングルトンクラスの作成

jsclsでは簡単にシングルトンクラスを作成することができます。
シングルトン化されたクラスはクラスオブジェクトが生成された直後に1つだけインスタンスを生成しクラスオブジェクト自体は破棄されます。
つまり一つのインスタンスだけが残り、その後インスタンスを生成することができなくなります。

次の例では先程の「HelloWorld」クラスをシングルトン化しています。

```
cls.require({
	(1)
	$singleton:true,
	$name:aaa.ccc.ddd.HelloWorld,
	$define:{
		HelloWorld:function() {
		},
		destroy:function() {
		},
		sampleMethod:function(arg1, arg2) {
		}
	}
});
```

0. $singletonプロパティーにtrueを設定するとそのクラスはシングルトン化されます。falseまたは未設定の場合通常のクラス扱いとなります。

アプリケーションコードでは「aaa.ccc.ddd.HelloWorld」を参照するとクラスオブジェクトではなくインスタンスが返ってくる為、newすることは出来ません。

```
//不可
var _helloWorld = new aaa.ccc.ddd.HelloWorld();
//可
aaa.ccc.ddd.HelloWorld.sampleMethod(5, 9);
```

## <a name="s4"></a> スタティックメンバ

クラスオブジェクトにはスタティックメンバを設定することができます。

次の例では先程の「HelloWorld」クラスにスタティック変数「HOGE, FUMOFU」、スタティックメソッド「getString」を設定しています。

```
cls.require( {
	$name:aaa.ccc.ddd.HelloWorld,
	//(1)
	$static:{
		HOGE:"hoge",
		FUMOFU:"gunsou",
		getString:function() {
			return "string";
		}
	},
	$define:{
		HelloWorld:function() {
			//(2)
			console.log(this.$class.HOGE);			//hoge
			console.log(this.$class.FUMOFU);		//gunsou
			console.log(this.$class.getString()); 	//string
		},
		destroy:function() {
		},
		sampleMethod:function(arg1, arg2) {
		}
	}
});
```

0. $staticプロパティーにスタティックメンバ定義用のリテラルを設定し変数や関数を含めます。
0. 自身のクラスのスタティックメンバであれば「this.$class」で参照することができます。

設定したスタティックメンバに外部からアクセスするにはパッケージ名を含めた完全なクラス名で参照します。

```
console.log(aaa.ccc.ddd.HelloWorld.HOGE);  		// hoge
console.log(aaa.ccc.ddd.HelloWorld.FUMOFU);		// gunsou
console.log(aaa.ccc.ddd.HelloWorld.getString());// string
```

### <a name="s1"></a> スタティックメンバの遅延評価

アプリケーションの開発中にスタティック変数にクラスオブジェクトのインスタンスを設定したい事もあるでしょう。
この場合、次の例のようにリテラルにインタンスを生成すれば良いでしょうか？

```
cls.require( {
	$static:{
		FUMOFU_INSTANCE:new www.xxx.yyy.zzz.Fumofu()
	},
	$name:aaa.ccc.ddd.HelloWorld,
	$define:{
		HelloWorld:function() {
		.
		.
	}
```

これは誤りです。newが実行されるタイミングではまだクラスオブジェクトが生成されていないためエラーが発生します。
この問題を回避するためにevalによる遅延評価を提供しています。この遅延評価を行うには次のように記述します。

```
'eval:遅延実行したい処理'
```

先ほどの例を遅延評価に置き換えた場合次のようになります。

```
cls.require( {
	$static:{
		FUMOFU_INSTANCE:'eval:new www.xxx.yyy.zzz.Fumofu()'
	},
	$name:aaa.ccc.ddd.HelloWorld,
	$define:{
		HelloWorld:function() {
		.
		.
	}
```

このようにcm.Classによって生成されるオブジェクトをスタティックメンバに設定したい場合は、遅延評価させる必要があります。


## <a name="s5"></a> インポート

クラスを作る際に既存のクラスオブジェクト(外部モジュール)を利用することができます。
インポートで指定された外部モジュールはcm.Classによって動的に読み込みが行われ、
インポートした外部モジュールを利用したコードを即座にを記述することができます。

次の例では先程の「HelloWorld」クラスに「Fumofu」クラスをインポートしています。

```
//既存クラス(Fumofuクラス)のファイルパス「./www/xxx/yyy/zzz/Fumofu.js」　
cls.require(
	//(1)
	"www.xxx.yyy.zzz.Fumofu",
{
	$name:aaa.ccc.ddd.HelloWorld,
	$define:{
		HelloWorld:function() {
			(2)
			this.mFumofu = new www.xxx.yyy.zzz.Fumofu();
		.
		.
```
0. cls.requireメソッドの第一引数にパッケージ名を含めた完全なクラス名を設定します。
0. インポートしたクラスオブジェクトにアクセスするはパッケージ名を含めた完全なクラス名を指定します。

インポートしたいクラスが複数ある場合は次のように続けて追加します。

```
cls.require(
	"www.xxx.yyy.zzz.Sample",
	"www.xxx.yyy.eee.Hoge",
	"www.xxx.fff.ggg.Mofu",
{
	$name:aaa.ccc.ddd.HelloWorld,
	$define:{
		HelloWorld:function() {
		.
		.
```
* 注意：シングルトン化しているクラス同士の相互インポートはできません。cm.Classは外部モジュールの読み込みを行う前に読み込み順序を割り出してから開始します。シングルトン化しているクラス同士の相互インポートが存在すると、この読み込み順序の判断が出来ずにエラーが発生します。

## <a name="s6"></a> 継承、オーバーライド、スーパークラスメソッド

クラスを作る際に既存のクラスオブジェクト(外部モジュール)を拡張することができます。

* 注意：多重継承はサポートしていません。

次の例では「Sample」クラスを継承する「HelloWorld」クラスを作成しています。

```
//具体的なSampleクラスの定義　(ファイルパス「./www/xxx/yyy/zzz/Sample.js」　)
cls.require(
{
	$name:"www.xxx.yyy.zzz.Sample",
	$define:{
		Sample:function() {
			this.mNum = 0;
		},
		destroy:function() {
		},
		setNum:function(num) {
			this.mNum = num;
		},
		getNum:function() {
			return this.mNum;
		},
		getTotal:function() {
			return this.mNum * 5;
		}
	}
});

//Sampleクラスを継承する
cls.require(
	//(1)
{
	//(2)
	$extends:"www.xxx.yyy.zzz.Sample",
	$name:"aaa.ccc.ddd.HelloWorld",
	$define:{
		HelloWorld:function() {
		},
		destroy:function() {
		},
		sampleMethod:function(arg1, arg2) {
			//(3)
			this.setNum(arg1 + arg2);
			return this.getNum();
		},
	},
	//(4)
	$override:{
		getTotal:function() {
			//(5)
			var _superResult = this.$super("getTotal")();
			return _superResult * 10;
		}
	}
});
```

0. 継承元となる外部モジュールは自動的にインポート対象と判定されるため、インポート文に含める必要はありません。
0. $extendsプロパティーに外部モジュールのパッケージ名を含めた完全なクラス名を設定します。(パッケージ)
0. 継承元で定義されているメソッドを呼び出すことが出来ます。
0. $overrideプロパティーのリテラル内にオーバーライドしたいメソッド名とその実装を含めることで継承元のメソッドをオーバーライドする事ができます。$overrideに含めたメソッドがスーパークラスで定義されていない場合、または既にスーパークラスに定義されているメソッドをサブクラスの$defineプロパティーのリテラルに含めている場合エラーが発生します。
0. 継承元のメソッド呼び出すには「this.$super」メソッドに呼び出したいメソッドの名前を指定します。(コンストラクタを取得する場合は引数は必要ありません。)

### スーパークラスメソッド

先ほどの例で「this.$super()」というメソッドが登場しましたが、このメソッドにはひとつ欠点があるため注意が必要です。
$superメソッドは呼び出された際にそのメソッドの呼び出しがサブクラスから幾つ目のスーパークラスのメソッドなのかを
メソッド名で判定しています。この為、次のような異なるメソッド名のスーパークラスメソッドの連続呼び出しであれば問題はありません。

```
		getTotal:function() {
			//異なるメソッド名であればスーパークラスメソッドを何度でも使用出来ます。
			var _editedNum = this.$super("getNum")() * 10;

			this.$super("setNum")(_editedNum);

			var _superResult = this.$super("getTotal")();
			return _superResult * 10;
		}
```

しかし、同一スコープ内で同一メソッド名のスーパークラスメソッドを二度以上呼び出すと正常に動作しません。

```
		getTotal:function() {
			if (this.$super("getTotal")() == 50
			||  this.$super("getTotal")() == 100)//ここでエラー
												 //もしくはサブクラスのさらにサブクラスのスーパーメソッドを返します。
				//trueの処理
			else
				//falseの処理
		}
```

これを回避するにはスーパークラスメソッドを一度変数に格納することです。

```
		getTotal:function() {
			var _superGetTotal = this.$super("getTotal");
			if (_superGetTotal() == 50
			||  _superGetTotal() == 100)
				//trueの処理
			else
				//falseの処理
		}
```

もしくは結果を格納します。

```
		getTotal:function() {
			var _superGetTotalResult = this.$super("getTotal")();
			if (_superGetTotalResult == 50
			||  _superGetTotalResult == 100)
				//trueの処理
			else
				//falseの処理
		}
```

このように同一スコープ内での同一メソッド名の連続呼び出しには注意が必要です。

## <a name="s7"></a> インスタンスの生成と破棄

cm.Classによって生成されたクラスオブジェクトのインスタンスはコンストラクタによって生成され、
destroyによって破棄されます。これは厳密なものではなくあくまで振る舞いとして用意されているものです。

ここではこの2つのメソッドが暗黙的に何を行なっているかを説明します。

### コンストラクタ

この中身は至ってシンプルです。呼び出された際にインスタンス総数を繰り上げ、
自身の継承元となるスーバークラスのコンストラクターを呼び出します。

```
//スーパークラスのコンストラクタはこのHelloWorldメソッドの前に暗黙的に呼び出されます。
cls.require(
{
	$name:"aaa.ccc.ddd.HelloWorld",
	$define:{
		HelloWorld:function() {
		},
		.
		.
```

ただし次の例のようにコンストラクタ内で「this.$super()」が明示的に呼び出されていた場合はこの限りではありません。

```
//この場合スーパークラスのコンストラクタは暗黙的には呼び出されません。
cls.require(
{
	$name:"aaa.ccc.ddd.HelloWorld",
	$define:{
		HelloWorld:function() {
			var a = 10 + 10;//この処理はコンストラクタより前に実行されます。
			this.$super()();
		.
		.
```

注意が必要なのは「this.$super()が明示的に呼び出されていた場合」という条件判定を厳密には調べていません。
その為、例えば次のようなトリッキーなコードはコンストラクタが呼ばれずに意図した動作にはならないでしょう。

```
cls.require(
{
	$name:"aaa.ccc.ddd.HelloWorld",
	$define:{
		HelloWorld:function(someFlag) {
			if (someFlag === true)
				this.$super()();
			else
			{
				//someFlagがfalseの場合はthis.$super()は呼ばない
			}
		.
		.
```

### デストラクタ（destroy）

デストラクタはコンストラクタより複雑です。呼び出された際にインスタンス総数を繰り下げ、
自身の継承元となるスーバークラスのデストラクタを呼び出す部分まではコンストラクタと同様です。（注意点についても）

デストラクタでは上記の2つの処理に加えて継承元となるクラスの全てのdestroyが呼び出された後に、
そのインスタンスに付与されているプロトタイプチェイン上に存在しないメンバを全て破棄します。

ガーベジコレクションによるメモリ管理が行われている言語での破棄とは参照を切る事です。
リテラル、配列、プリミティブデータへのnull代入とdelete、cm.Classによって生成されたクラスオブジェクトのインスタンスであった場合にはそのインスタンスのdestroyも呼び出します。

ここで注意が必要なのは次の例のように、あるインスタンスが別のインスタンスを保持する必要があり、
保持しているインスタンスの破棄については関与しない場合にこのデストラクタは悪さをする事になります。

```
cls.require(
{
	$name:"aaa.ccc.ddd.FumofuControll",
	$define:{
		FumofuControll:function() {
			//外部からFumofuクラスインスタンスを受け入れる
			this.mFumofus = [];
		},
		destroy:function() {
		},
		//追加
		addFumofu:function(fumofuInstance) {
			this.mFumofus.push(fumofuInstance);
		},
		//削除
		removeFumofu:function(fumofuInstance) {
			var i = this.mFumofus.indexOf(fumofuInstance);
			if (i > -1) this.mFumofus.splice(i, 1);
		},
		//何らかの制御
		someFumofuControll:function() {
			for (var i = 0, len = this.mFumofus.length; i < len; i++)
				this.mFumofus[i].hoge();
		}
	}
});
```

このようなインスタンスをdestroyした場合、this.mFumofus配列内の各インスタンスもdestroyが呼び出され、
外部でこれらのインスタンスを操作する人が困るでしょう。この問題を解決するためのメソッドがdestroyになります。

```
cls.require(
{
	$name:"aaa.ccc.ddd.FumofuControll",
	$define:{
		FumofuControll:function() {
			this.mFumofus = [];
		},
		destroy:function() {
			//this.mFumofus内のインスタンス破棄は担当しないからdestroy内で除外しておく
			this.mFumofus.length = 0;
		},
		addFumofu:function(fumofuInstance) {
			this.mFumofus.push(fumofuInstance);
		},
		removeFumofu:function(fumofuInstance) {
			var i = this.mFumofus.indexOf(fumofuInstance);
			if (i > -1) this.mFumofus.splice(i, 1);
		},
		someFumofuControll:function() {
			for (var i = 0, len = this.mFumofus.length; i < len; i++)
				this.mFumofus[i].hoge();
		}
	}
});
```

こうすることでthis.mFumofus以外のメンバは全て綺麗に破棄されmFumofuは安全に外部に引き渡せます。
javascriptではメンバの追加は用意に出来てしまうため思わぬ所で破棄の忘れ等が発生します。
なので一つ一つのメンバを手動で破棄するよりもまっさらにする前提を作り、その上で消したくないものを除外するという手法の方が色々と楽だし安全です。

## <a name="s8"></a> root.Origin
## <a name="s9"></a> パッケージ
## <a name="s10"></a> アプリケーションコードとデプロイ
## <a name="s11"></a> トップレベル関数