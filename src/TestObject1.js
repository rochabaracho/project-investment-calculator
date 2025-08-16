class User {
  name;
  age;
  constructor(name = null, age = null) {
    this.name = name;
    this.age = age;
  }
}

function main() {
  const user1 = new User();
  const user2 = new User("Beto Rocha", 67);

  console.log(user1.name, user1.age);
  console.log(user2.name, user2.age);

  const person1 = JSON.stringify(user1);
  const person2 = JSON.stringify(user2);

  console.log(person1);
  console.log(person2);

  console.log(person2.name);
  console.log(person2.age);

  const person3 = { name: "BETO ROCHA", age: 67 };
  console.log(person3.name);
  console.log(person3.age);
}

main();
