/**
 * @class このライブラリで使用する基本クラスです.
 * @name root.Origin
 */
cls.exports(
{
    $name:"root.Origin",
    $extends:"Object",
    $defaultConfig:{
        temp:{
            sampleConf:10,
        }
    },
    $define:
    /** @lends cm.BaseObejct.prototype */
    {
        /**
         * スーパークラスのメソッドを取得します.
         * コンストラクターを取得するには空の文字列を指定します.
         * @name $super
         * @param {String} methodName メソッド名
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
         * コンストラクターを実行します.
         * @name BaseObject
         * @constructor
         * @function
         */
        Origin:function() {
            ++this.$class._instanceCounter;
        },
        /**
         * このオブジェクトの破棄処理を実行します.
         * @name destroy
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
        getClassFullName:function() {
            return ex.string.concat(this.classPath, ".", this.className);
        },
        getSuperClassFullName:function() {
            return ex.string.concat(this.superClassPath, ".", this.superClassName);
        },
        getConfig:function() {
            return cls.config[this.getClassFullName()];
        },
        /**
         * 生成されたインスタンス数を取得します.
         * @name getRefCount
         */
        getRefCount:function() {
            return this.$class.getRefCount();
        },
        log:function()
        {
            Array.prototype.unshift.call(arguments, this.className);
            out.p.apply(this, arguments);
        },
        equal:function(val) {
            return val === this;
        }
        /**#@-*/
    }
});