cls.exports(
{
    $name:"cls.Origin",
    $extends:"Object",
    $define:
    /** @lends cls.Origin# */
    {
        /**
         * スーパークラスのメソッドを取得します.
         * <br>コンストラクターを取得するには空の文字列を指定します.
         * @param {String} methodName スーパークラスが保持するメソッド名
         * @return {Function} スーパークラスメソッド
         */
        $super:function(methodName)
        {
            if (eq.isUndefined(methodName) || methodName === "")
                methodName = "initialize";

            if (eq.isUndefined(this.__currentSuper__))
                this.__currentSuper__ = {};
            
            this.__currentSuper__[methodName] =
                eq.isUndefined(this.__currentSuper__[methodName]) ?
                    this.$class.superClass:
                    this.__currentSuper__[methodName].superClass;

            var _method = methodName == "initialize" ?
                this.__currentSuper__[methodName].prototype.constructor:
                this.__currentSuper__[methodName].prototype[methodName];

            var _this = this;
            return function()
                {
                    var _result = _method.apply(_this, arguments);
                    
                    //super method finish code.
                    delete _this.__currentSuper__[methodName];

                    if (methodName == "destroy")
                        delete _this.__currentSuper__;
                        
                    return _result;
                };
        },
        /**
         * クラスが保持するメソッドをインスタンス自身にバインドした無名関数を返します.
         * <br>生成した無名関数は内部で保持され同一性を保てるためバインド化はこのメソッドから行う事を推奨します。
         * @param  {String} methodName クラスが保持するメソッド名
         * @return {Function} インスタンスにバインドされたクラスメソッド
         */
        $bind:function(methodName)
        {
            if (eq.isUndefined(this.__bindCache__))
                this.__bindCache__ = new Object();
                
            if (eq.isUndefined(this.__bindCache__[methodName]))
            {
                var _this = this;
                this.__bindCache__[methodName] = function bind() {
                    return _this[methodName].apply(_this, arguments);
                };
            }
            
            return this.__bindCache__[methodName];
        },
        /**
         * @constructs
         * @extends Object
         * @return {root.Origin} 新しいインスタンス.
         */
        Origin:function() {
            ++this.$class._instanceCounter;
        },
        /**
         * このインスタンスを破棄します.
         * <br>このメソッドが呼び出されると暗黙的にインスタンスが保持するプロトタイプメンバ以外のプロパティーの削除を試みます。
         */
        destroy:function() {
            --this.$class._instanceCounter;
            this._deletePropertys(this);
        },
        _deletePropertys:function(target)
        {
            var _props = ex.object.getOwnPropertyNames(target);
            for (var i = 0, len = _props.length; i < len; i++)
            {
                var p = _props[i];
                var _pValue = target[p];

                if (p == "__currentSuper__" || !_pValue)
                    continue;
                else
                if (eq.isDomElement(_pValue))
                {
                    if (!eq.isUndefined(_pValue.cmDisplay))
                        cm.core.DisplayInterface.detach(_pValue);
                }
                else
                if (eq.isObject(_pValue))
                {
                    if (eq.isFunction(_pValue.destroy))
                        _pValue.destroy();
                    this._deletePropertys(_pValue);
                }
                else
                if (eq.isArray(_pValue))
                    this._deletePropertys(_pValue);
                else
                {
                    target[p] = null;
                    delete target[p];
                }
            }
        },
        /**
         * インスタンスの生成元クラス名をパッケージパスを含めた形で返します.
         * @return {String} パッケージパスを含めたクラス名
         */
        getClassFullName:function() {
            return ex.string.concat(this.classPath, ".", this.className);
        },
        /**
         * インスタンスの生成元クラスのスーパークラス名をパッケージパスを含めた形で返します.
         * @return {String} パッケージパスを含めたスーパークラス名
         */
        getSuperClassFullName:function() {
            return ex.string.concat(this.superClassPath, ".", this.superClassName);
        },
        /**
         * インスタンスの生成元クラスの設定オブジェクトを取得します.
         * @return {Object} 設定オブジェクト
         */
        getConfig:function() {
            return cls.config[this.getClassFullName()];
        },
        /**
         * インスタンスの生成元クラスのインスタンス生成数を取得します.
         * @return {Number} インスタンス生成数
         */
        getRefCount:function() {
            return this.$class.getRefCount();
        },
        /**
         * このインスタンスの生成元クラス名を付けて文字列をコンソールへ出力します.
         * <br>引数(可変長引数)に渡された文字列をコンソールへ出力します。
         * @param  {String} ... 入力文字列
         */
        log:function()
        {
            Array.prototype.unshift.call(arguments, this.className);
            out.p.apply(this, arguments);
        },
        /**
         * valがこのインスタンスと等価(===)かを示す値を返します.
         * @param  {Object} val オブジェクト
         * @return {Boolean} 等しい場合true, それ以外の場合false
         */
        equal:function(val) {
            return val === this;
        }
    }
});