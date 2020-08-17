// 1. User-Defined Type Guards (lính canh => check)

interface Fish {
  swim: () => void
}

interface Bird {
  fly: () => void
}

// - Using type predicates
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// - Using the in operator
function move(pet: Fish | Bird) {
  if ("swim" in pet) {
    return pet.swim();
  }
  return pet.fly();
}

//2. typeof
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}

function padLeft(value: string, padding: string | number) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(" ") + value;
  }
  if (isString(padding)) {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

// 3. instanceof 
interface Padder {
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5
    ? new SpaceRepeatingPadder(4)
    : new StringPadder("  ");
}

let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
  padder;
  //   do something
}
if (padder instanceof StringPadder) {
  padder;
  //   do something
}

// 4. Nullable types
// 5. Type Aliases

type Second = number; // like interface but can name {primitives, unions, tuples, and any other types that you’d otherwise have to write by hand.}
let timeInSecond: number = 10;
let time: Second = 10;

// generic 
type Container<T> = { value: T };
// itself
type Tree<T> = {
  value: T;
  left?: Tree<T>;
  right?: Tree<T>;
};
// intersection
type LinkedList<Type> = Type & { next: LinkedList<Type> };

// !note: differences between interface and type


// 6. Polymorphic (Đa hình) this types

class BasicCalculator {
  public constructor(protected value: number = 0) {}
  public currentValue(): number {
    return this.value;
  }
  public add(operand: number): this {
    this.value += operand;
    return this;
  }
  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
  // ... other operations go here ...
}

let v1 = new BasicCalculator(2).multiply(5).add(1).currentValue();

class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) {
    super(value);
  }
  public sin() {
    this.value = Math.sin(this.value);
    return this;
  }
  // ... other operations go here ...
}

let v2 = new ScientificCalculator(2).multiply(5).sin().add(1).currentValue();
console.log(v2) // Without this types, ScientificCalculator would not have been able to extend BasicCalculator and keep the fluent interface.

// 7. index type
function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
  return propertyNames.map((n) => o[n]);
}

interface Car {
  manufacturer: string;
  model: string;
  year: number;
}

let taxi: Car = {
  manufacturer: "Toyota",
  model: "Camry",
  year: 2014,
};

let makeAndModel: string[] = pluck(taxi, ["manufacturer", "model"]);
let modelYear = pluck(taxi, ["model", "year"]);

console.log(makeAndModel);
console.log(modelYear);


// 8.Index types and index signatures

interface Dictionary<T> {
  [key: string]: T; // => string : {string || number}, number: { number } because T[42] <=> t["42"]
}
let keys: keyof Dictionary<number>;
//     ^ = let keys: string | number
let value: Dictionary<number>["foo"];
//      ^ = let value: number

// 9. Mapped types
// create new types based on old types
interface PersonSubset {
  name?: string;
  age?: number
}

interface PersonReadonly {
  readonly name: string;
  readonly age: number;
}

type Readonly1<T> = {
  readonly [P in keyof T]: T[P]
};

type Partial1<T> = {
  [P in keyof T]?: T[P];
};

type PersonPartial = Partial1<PersonSubset>;
type ReadonlyPerson = Readonly1<PersonSubset>;


type Proxy<T> = {
  get(): T;
  set(value: T): void;
}

type Proxify<T> = {
  [P in keyof T]: Proxy<P>
}

// function proxify<T>(o: T): Proxify<T> {
//   // ... wrap proxies ...
// }

let props = { rooms: 4 };
// let proxyProps = proxify(props);
//  ^ = let proxyProps: Proxify<{
//  rooms: number;
// }>


// 10. Conditional Types { T extends U ? X : Y }

type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object";

type T0 = TypeName<string>;
//   ^ = type T0 = "string"
type T1 = TypeName<"a">;
//   ^ = type T1 = "string"
type T2 = TypeName<true>;
//   ^ = type T2 = "boolean"
type T3 = TypeName<() => void>;
//   ^ = type T3 = "function"
type T4 = TypeName<string[]>;
//   ^ = type T4 = "object"