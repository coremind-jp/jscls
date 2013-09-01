describe('jscls utility function test', function()
{
    describe('eq', function()
    {
        describe('isBoolean', function()
        {
            it('eq.isBooleanに関数の参照がある',　function() {
                expect(eq.isBoolean).toBeDefined();
            });
            it('Booleanにはtrueを返す',　function() {
                expect(eq.isBoolean(true)).toBeTruthy();
                expect(eq.isBoolean(false)).toBeTruthy();
            });
            it('Boolean以外にはfalseを返す',　function() {
                expect(eq.isBoolean(1267)).toBeFalsy();
                expect(eq.isBoolean("hoge")).toBeFalsy();
                expect(eq.isBoolean({})).toBeFalsy();
                expect(eq.isBoolean([])).toBeFalsy();
                expect(eq.isBoolean(function(){})).toBeFalsy();
                expect(eq.isBoolean(null)).toBeFalsy();
                expect(eq.isBoolean(undefined)).toBeFalsy();
            });
        });
        describe('isString', function()
        {
            it('eq.isStringに関数の参照がある',　function() {
                expect(eq.isString).toBeDefined();
            });
            it('Stringにはtrueを返す',　function() {
                expect(eq.isString("hoge")).toBeTruthy();
            });
            it('String以外にはfalseを返す',　function() {
                expect(eq.isString(true)).toBeFalsy();
                expect(eq.isString(false)).toBeFalsy();
                expect(eq.isString(1267)).toBeFalsy();
                expect(eq.isString({})).toBeFalsy();
                expect(eq.isString([])).toBeFalsy();
                expect(eq.isString(function(){})).toBeFalsy();
                expect(eq.isString(null)).toBeFalsy();
                expect(eq.isString(undefined)).toBeFalsy();
            });
        });
        describe('isNumber', function()
        {
            it('eq.isNumberに関数の参照がある',　function() {
                expect(eq.isNumber).toBeDefined();
            });
            it('Numberにはtrueを返す',　function() {
                expect(eq.isString(1267)).toBeFalsy();
            });
            it('Number以外にはfalseを返す',　function() {
                expect(eq.isString(true)).toBeFalsy();
                expect(eq.isString(false)).toBeFalsy();
                expect(eq.isBoolean("hoge")).toBeFalsy();
                expect(eq.isString({})).toBeFalsy();
                expect(eq.isString([])).toBeFalsy();
                expect(eq.isString(function(){})).toBeFalsy();
                expect(eq.isString(null)).toBeFalsy();
                expect(eq.isString(undefined)).toBeFalsy();
            });
        });
        describe('isArray', function()
        {
            it('eq.isArrayに関数の参照がある',　function() {
                expect(eq.isArray).toBeDefined();
            });
            it('Arrayにはtrueを返す',　function() {
                expect(eq.isString([])).toBeTruthy();
            });
            it('Array以外にはfalseを返す',　function() {
                expect(eq.isString(true)).toBeFalsy();
                expect(eq.isString(false)).toBeFalsy();
                expect(eq.isString(1267)).toBeFalsy();
                expect(eq.isBoolean("hoge")).toBeFalsy();
                expect(eq.isString({})).toBeFalsy();
                expect(eq.isString(function(){})).toBeFalsy();
                expect(eq.isString(null)).toBeFalsy();
                expect(eq.isString(undefined)).toBeFalsy();
            });
        });
        describe('isFunction', function()
        {
            it('eq.isFunctionに関数の参照がある',　function() {
                expect(eq.isFunction).toBeDefined();
            });
            it('Functionにはtrueを返す',　function() {
                expect(eq.isString(function(){})).toBeTruthy();
            });
            it('Function以外にはfalseを返す',　function() {
                expect(eq.isString(true)).toBeFalsy();
                expect(eq.isString(false)).toBeFalsy();
                expect(eq.isString(1267)).toBeFalsy();
                expect(eq.isBoolean("hoge")).toBeFalsy();
                expect(eq.isString({})).toBeFalsy();
                expect(eq.isString([])).toBeFalsy();
                expect(eq.isString(null)).toBeFalsy();
                expect(eq.isString(undefined)).toBeFalsy();
            });
        });
        describe('isObject', function()
        {
            it('eq.isObjectに関数の参照がある',　function() {
                expect(eq.isObject).toBeDefined();
            });
            it('Obejctにはtrueを返す',　function() {
                expect(eq.isString({})).toBeTruthy();
            });
            it('Obejct以外にはfalseを返す',　function() {
                expect(eq.isString(true)).toBeFalsy();
                expect(eq.isString(false)).toBeFalsy();
                expect(eq.isString(1267)).toBeFalsy();
                expect(eq.isBoolean("hoge")).toBeFalsy();
                expect(eq.isString([])).toBeFalsy();
                expect(eq.isString(function(){})).toBeFalsy();
                expect(eq.isString(null)).toBeFalsy();
                expect(eq.isString(undefined)).toBeFalsy();
            });
        });
        describe('isUndefined', function()
        {
            it('eq.isUndefinedに関数の参照がある',　function() {
                expect(eq.isUndefined).toBeDefined();
            });
            it('undefinedにはtrueを返す',　function() {
                expect(eq.isString(undefined)).toBeTruthy();
            });
            it('undefined以外にはfalseを返す',　function() {
                expect(eq.isString(true)).toBeFalsy();
                expect(eq.isString(false)).toBeFalsy();
                expect(eq.isString(1267)).toBeFalsy();
                expect(eq.isBoolean("hoge")).toBeFalsy();
                expect(eq.isString({})).toBeFalsy();
                expect(eq.isString([])).toBeFalsy();
                expect(eq.isString(function(){})).toBeFalsy();
                expect(eq.isString(null)).toBeFalsy();
            });
        });
        describe('typeOf', function()
        {
            it('eq.typeOfに関数の参照がある',　function() {
                expect(eq.typeOf).toBeDefined();
            });
            it('trueは"boolean"を返す',　function() {
                expect(eq.typeOf(true)).toEqual("boolean");
            });
            it('"boolean"を返す',　function() {
                expect(eq.typeOf(false)).toEqual("boolean");
            });
            it('数値は"number"を返す',　function() {
                expect(eq.typeOf(1267)).toEqual("number");
            });
            it('文字列は"string"を返す',　function() {
                expect(eq.typeOf("hoge")).toEqual("string");
            });
            it('オブジェクトは"obejct"を返す',　function() {
                expect(eq.typeOf({})).toEqual("object");
            });
            it('配列は"array"を返す',　function() {
                expect(eq.typeOf([])).toEqual("array");
            });
            it('関数は"function"を返す',　function() {
                expect(eq.typeOf(function(){})).toEqual("function");
            });
            it('nullはnullを返す',　function() {
                expect(eq.typeOf(null)).toBeNull(null);
            });
            it('undefinedはundefinedを返す',　function() {
                expect(eq.typeOf(undefined)).toBeUndefined(undefined);
            });
        });
    });
    describe('ex.object', function()
    {
        describe('clone', function()
        {
            it('ex.object.cloneに関数の参照がある',　function() {
                expect(ex.object.clone).toBeDefined();
            });
            it('オブジェクトのクローンを生成する(deep = false)',　function()
            {
                var _src = {
                    a:9,
                    b:"hoge",
                    c:[9506, "06654", undefined],
                    d:true,
                    e:false,
                    f:null,
                    g:{
                        hoge:0
                    }
                };
                var _clone = ex.object.clone(_src);
                expect(_src).toEqual(_clone);
                expect(_src.g).toBe(_clone.g);
                expect(_src).not.toBe(_clone);
            });
            it('オブジェクトのクローンを生成する(deep = true)',　function()
            {
                var _src = {
                    a:9,
                    b:"hoge",
                    c:[9506, "06654", undefined],
                    d:true,
                    e:false,
                    f:null,
                    g:{
                        hoge:0
                    }
                };
                var _clone = ex.object.clone(_src, {}, true);
                expect(_src).toEqual(_clone);
                expect(_src.g).not.toBe(_clone.g);
                expect(_src).not.toBe(_clone);
            });
        });
    });
    describe('ex.string', function()
    {
        describe('concat', function()
        {
            it('ex.string.concatに関数の参照がある',　function() {
                expect(ex.string.concat).toBeDefined();
            });
            it('文字列を結合する',　function()
            {
                expect(ex.string.concat("a", "b", "c")).toBe("abc");
            });
            it('文字列をキャピタライズする',　function()
            {
                expect(_src).not.toBe(_clone);
            });
        });
        describe('capitalize', function()
        {
            it('ex.string.capitalizeに関数の参照がある',　function() {
                expect(ex.string.capitalize).toBeDefined();
            });
            it('文字列をキャピタライズする',　function()
            {
                expect(ex.string.capitalize("test")).toBe("Test");
            });
        });
    });
});