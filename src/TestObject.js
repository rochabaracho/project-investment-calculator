class User {
  #name;
  #age;
  constructor(name = null, age = null) {
    this.#name = name;
    this.#age = age;
  }

  display() {
    console.log(this.#name, this.#age);
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
  }

  get age() {
    return this.#age;
  }

  set age(age) {
    this.#age = age;
  }
}

function main() {
  const user1 = new User();
  const user2 = new User("Beto Rocha", 67);

  console.log(user1.name, user1.age);
  console.log(user2.name, user2.age);

  const person1 = { name: user1.name, age: user1.age };
  const person2 = { name: user2.name, age: user2.age };

  console.log(person1);
  console.log(person2);

  console.log(person2.name);
  console.log(person2.age);
}

main();
