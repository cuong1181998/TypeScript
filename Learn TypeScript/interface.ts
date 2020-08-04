// 1.Introduction, Optional Properties
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare (config: SquareConfig): {color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

// let mySquare = createSquare({ color: "Black" });

// 2.Readonly properties
// readonly properties

interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20};
// p1.x = 5; // error

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

// a = ro; // error
a = ro as number[]; // not error


let squareOptions = { colour: "red" };
// let mySquare = createSquare(squareOptions);
// console.log(mySquare);

// 3. Function Types
// interface function
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc;
mySearch = function (src: string, sub: string) {
  let result = src.search(sub);
  return result > -1;
}

// 4. Indexable Types
// interface array, index signature
interface StringArray {
  [index: string]: string;
  // [index: number]: string;
}

let myArray: StringArray = {"OMG": "string", "OMG1": "string", "OMG2": "string", "OMG3": "string"};
// access by myArray["OMG"];
// let myArray: StringArray = ["a", "b"];
// access by myArray[0]


interface NumberDictionary {
  [index: string]: number | string; // => index signature
  length: number;
  name: string;
}

let name1: NumberDictionary = { length: 2, name: "test" };


// 5. Class Types 
// implement interface, class type

// interface ClockInterface {
//   currentTime: Date;
//   setTime (d: Date): void;
// }

// class Clock implements ClockInterface {
//   currentTime: Date = new Date();
//   setTime (d: Date) {
//     this.currentTime = d;
//   }
//   constructor (h: number, m: number) { }
// }

// 6.
// static side and instance side
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void
}

function createClock (ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() { 
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface {
  constructor (h: number, m: number) { };
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);


// 6. Extending Interface
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;


// 7. Hybrid Types: kiểu hỗn hợp
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = (function (start: number) { }) as Counter;
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

//7. Interface extends classes
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {};
}

class TextBox extends Control {
  // select () {};
}

// error
// class Image implements SelectableControl {
//   private state: any;
//   select () {}
// }

// error
// class Location {

// }