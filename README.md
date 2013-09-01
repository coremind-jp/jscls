
# [CoremindJS v0.9.0](https://github.com/otn83)

## 概要

CoremindJSはJavaScriptをよりOOPらしく記述するためのライブラリです。
このライブラリは中規模以上のアプリケーション開発を行う際にコードの可読性と堅牢性を高める目的で開発しています。
具体的には以下のような機能をサポートします。

* prototypeチェインを使用した煩わしいクラス定義を簡潔に記述できるようになります。
* extendsやimportを明示的に定義するため、ソース（クラス）ファイル間の関連性が把握しやすくなります。
* 新規作成したクラスに必要なソース（クラス）ファイルを動的にロード、パッケージングできます。(パッケージドメインも柔軟に変更可能)
* ソースファイルの結合処理にも対応しているので必要最小限のソースのみ結合させる事ができ本番環境ではコンパクトな形にまとめることができます。

## 導入方法

特に混みいった事情が無ければ[masterブランチ](https://github.com/otn83/CoremindJS/archive/master.zip)からダウンロードしたファイル一式をお使いのサーバーへアップロードするだけで使用することができます。

しかしcoremindパッケージのルートディレクトリとmanifest.jsの配置先が異なる様な場合はmanifest.jsを編集する必要があります。manifest.js内のデフォルト設定はcoremindパッケージのルートディレクトリはmanifest.jsと同階層にある前提で設定されているためです。
[see:manifest.js](https://github.com/otn83/CoremindJS/wiki/manifest.js)

アップロードを済ませたら組み込みたいHTMLページにmanifest.jsとcoremind.js、それとアプリケーションのメインコードを用意します。例えばこんな具合です。

```HTML
script type="text/javascript" src="http://your_server.com/js/manifest.js"
script type="text/javascript" src="http://your_server.com/js/coremind.js"
script type="text/javascript" src="http://your_server.com/js/your_application_maincode.js"
```

スクリプトタグの挿入位置はheaderでもbodyでも構いません。

しかし読み込む順序には次の通りにする必要があります。
1. manifest.js
2. coremind.js
3. your_application_maincode.js

## 使用方法

[see:how to use]()

## ブランチについて

CoremindJSは3つのブランチによってコードを管理しています。
各ブランチの位置づけは次の表の通りです。prototypeではmasterに無い様々な機能が盛り込まれていますが、
ドキュメントの整備と単体テストが後回しになっているためmaster, betaには含まれていません。

興味の湧いた方は是非覗いてみてください。アドバイスも歓迎です。:D

|ブランチ名| 単体テスト | ドキュメント | IF確度 
|:-----------|:-:|:-:|:-:|
| master     | ◎| ◯| ◎|
| beta       | ◯| ☓| △|
| prototype  | △| ☓| ☓|

## Authors

**Hirotaka Nakahara**[@COREMIND](http://coremind.jp/blog/)

+ http://github.com/otn83

## Copyright and license
Copyright 2012 Coremind

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.