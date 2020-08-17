enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = "123".length
}

enum ShapeKind {
  Circle,
  Square
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c: Circle = {
  kind: ShapeKind.Circle, // error: kind: ShapeKind.Square
  radius: 100
};

enum Direction1 {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}


enum E {
  Foo,
  Bar
}

function f(x: E) {
//   if (x !== E.Foo || x !== E.Bar) { // error because never true

//   }
}


 enum Enum {
  A = 1,
  B,
  C = 2
}

console.log(Enum) // { '1': 'A', '2': 'C', A: 1, B: 2, C: 2 }

