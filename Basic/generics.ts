// one of the main tools in the toolbox for creating reusable components
// hello world with generics
function identity1(arg: any): any {
  console.log(typeof arg);
  return arg; // -> không biết kiểu dữ liệu cảu arg trong phần thân hàm với kiểu dữ liệu phức tạp
}

function identity<T>(arg: T): T {
  console.log(typeof arg);
  return arg;
}

function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

function loggingIdentity1<T>(arg: Array<T>): Array<T> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}

// interface
interface GenericIdentityFn<T> {
  (arg: T): T;
}
// classes
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

interface Lengthwise {
  length: number;
}

function loggingIdentity2<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
// loggingIdentity2(3); -> error
loggingIdentity2({ length: 10, value: 3 });