
var AbstractSuperClass = require('./abstractsuperclass');

class MyClass extends AbstractSuperClass {

    constructor() {
        super();
        this.var = 'azerty';
    }

    method1() {
    }

    method2() {
    }

    static methodStatic(foo1, foo2) {
    }

}

module.exports = MyClass;
