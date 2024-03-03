class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setAge(age) {
        this.age = age;
        return this;
    }

    showInfo() {
        console.log(`姓名：${this.name},年龄：${this.age}`);
    }
}

let p = new Person().setName('张三').setAge(18);
p.showInfo();