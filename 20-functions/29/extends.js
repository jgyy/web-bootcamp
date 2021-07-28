class Pet {
  constructor(name, age) {
    console.log("IN PET CONSTRUCTOR!");
    this.name = name;
    this.age = age;
  }
  eat() {
    return `${this.name} is eating!`;
  }
}

class Cat extends Pet {
  constructor(name, age, lives = 9) {
    console.log("IN CAT CONSTRUCTOR!");
    super(name, age);
    this.lives = lives;
  }
  meow() {
    return "MEOWWWW!!";
  }
}

class Dog extends Pet {
  bark() {
    return "WOOOOF!!";
  }
  eat() {
    return `${this.name} scarfs its food!`;
  }
}

const cat = new Cat("cat", 9);
console.log(cat.name, cat.age, cat.lives);
console.log(cat.eat());
console.log(cat.meow());

const dog = new Dog("dog", 5);
console.log(dog.name, dog.age);
console.log(dog.bark());
console.log(dog.eat());
