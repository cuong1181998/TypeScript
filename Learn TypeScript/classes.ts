//1. classes
class Greeter {
  greeting: string;

  constructor (message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }

}

let greeter = new Greeter("world");

//2. Inheritance
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }

  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m. `)
  }
}

// class Dog extends Animal {
//   bark() {
//     console.log("Woof! Woof!");
//   }
// }

// const dog = new Dog();
// dog.bark();
// dog.move(10);

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }

  move(distanceInMeters = 5) { // override method
    console.log("SLithering ...");
    super.move(distanceInMeters); 
  }
}

class Horse extends Animal {
  constructor (name: string) {
    super(name);
  }

  move(distanceInMeters = 45) { // override method
    console.log("Galloping ...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

//3. public, private, protected
// public by default
class Animal1 {
  public name: string;

  public constructor(theName: string) {
    this.name = theName;
  }

  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
// private

// class Animal2 {
//   #name: string; // 3.8 syntax 
//   constructor(theName: string) {
//     this.#name = theName;
//   }
// }

// new Animal2("Cat").#name; // -> can't accessible outside class -> private

class Animal3 {
  private name: string;

  constructor(theName: string) {
    this.name = theName;
  }
}

// new Animal3("Cat").name; // -> can't accessible outside class -> private
class Animal4 {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

class Rhino extends Animal4 {
  constructor() {
    super("Rhino");
  }
}

class Employee {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

let animal = new Animal4("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
// animal = employee; -> error

// protected
class Person {
  protected name: string;
  constructor (name: string) {
    this.name = name;
  }
}

class Employee1 extends Person {
  private department: string;

  constructor(name: string, deparment: string) {
    super(name);
    this.department = deparment;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}
let howard = new Employee1("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.name); -> access only by its or its subclass

class Person1 {
  protected name: string;
  protected constructor(theName: string) {
    this.name = theName;
  }
}

class Employee2 extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard1 = new Employee2("Howard", "Sales");
// let john = new Person1("John"); // error

//3. readonly modifier

class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;

  constructor(theName: string) {
    this.name = theName;
  }
}

let dad = new Octopus("Man with the 8 strong legs");
// console.log(dad.name)
// dad.name = "Man with the 3-piece suit"; -> error

//4. Parameter properties
class Octopus1 {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) {} // cú pháp ngắn hơn không cần khai báo thuộc tính
  // constructor(readonly name: string, private a, protected b, public c) {}
}

let dad1 = new Octopus("Man with the 8 strong legs");
console.log(dad.name);


// 5. setter, getter
const FULL_NAME_MAX_LENGTH = 10;

class Employee4 {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (newName && newName.length > FULL_NAME_MAX_LENGTH) {
      throw new Error("fullName has a max length of " + FULL_NAME_MAX_LENGTH);
    }
    this._fullName = newName;
  }
}

// 6. static properties

class Grid {
  static origin = { x: 0, y: 0 }; // general value for all grids

  calculateDistanceFromOrigin (point: { x: number, y: number}) {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.x - Grid.origin.y;

    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }

  constructor(public scale: number) {};
}

let grid1 = new Grid(1.0); // 1x scale
let grid2 = new Grid(5.0); // 5x scale


// 7. abstract classes -> base class, not has instance
abstract class Animal5 {
  abstract makeSound(): void;

  move(): void {
    console.log("roaming the earth...");
  }
}

abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    console.log("Department name: " + this.name);
  }

  abstract printMeeting(): void; // must be implemented in derived classes
}

class AccountingDepartment extends Department {

  constructor() {
    super("Accounting and Auditing"); // constructors in derived classes must call super()
  }

  printMeeting(): void {
    console.log("The Accounting Department meets each Monday at 10am.");
  }
  
  generateReports(): void {
    console.log("Generating accounting reports...");
  }
}

let department: Department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
// department.generateReports(); // -> error

// 8. Advanced Techniques


let Greeter1 = (function () {
  function Greeter(message) {
    this.greeting = message;
  }

  Greeter.prototype.greet = function () {
    return "Hello, " + this.greeting;
  };

  return Greeter;
})();

let greeter1;
greeter1 = new Greeter1("world");
console.log(greeter1.greet()); // "Hello, world"

// using class as interface 

class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };

/**
 * class -> {extends class, implement interface}
 * interface -> {extends interface, extends class}
 * 
 * interface: {
 *  basic type,
 *  function type, 
 *  class type,
 *  instance type != static type,
 * 
 *  literal types,
 *  union & intersection type
 * }
 */
