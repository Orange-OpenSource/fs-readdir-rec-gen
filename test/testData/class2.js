
var AbstractSuperClass = require('./abstractsuperclass');

class SuperClass2 extends AbstractSuperClass {
}

module.exports = SuperClass2;

class MyClass2 extends SuperClass2 {

    constructor() {
        super();
    }

    method1() {
    }

    method2() {
    }

    method3(foo, bar) {
    }
}

module.exports = MyClass2;
