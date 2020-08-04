let isDone: boolean = false;

let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

let color: string = "red";
let sentence: string = `Hello my name is ${decimal}`;

let arr: number[] = [1, 2, 3];
let arr2: Array<Number> = [1, 2, 3];

let x: [number, string];
x = [2, 'cuong'];
x[0] = 1;


enum Color { Red = 5, Green = 9, Blue = 11};
let c: Color = Color.Blue;

let notSure: any = "String";

function warnUser() : void {
  console.log("This is my warning message!!");
}

let unusable: void = undefined;
unusable = null;

let u: undefined = undefined;
let n: null = null;


function error(message: string) : never {
  throw new Error(message);
}

declare function create(o: object | null): void;
create(null)





