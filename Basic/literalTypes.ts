//1. Literal Narrowing
const helloWorld = "Hello world"; // -> type of "Hello world" is not string
let hiWorld = "Hi world"; // -> type of "Hi world" is string
// case 2 smaller than case 1, infinite for case 1 declare 


//2. String Literal Types
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
      // ...
    } else if (easing === "ease-out") {
    } else if (easing === "ease-in-out") {
    } else {
      // It's possible that someone could reach this
      // by ignoring your types though.
    }
  }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
// button.animate(0, 0, "uneasy"); -> error
// override
// function createElement(tagName: "img"): HTMLImageElement;
// function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
// function createElement(tagName: string): Element {
//   // ... code goes here ...
// }

//3. Numeric Literal Types
type score = 1 | 2 | 3 | 4 | 5 | 6;
function rollDice(): score {
  return (Math.floor(Math.random() * 6)) as score;
}

interface MapConfig {
  lng: number;
  lat: number;
  titleSize: 8 | 16 | 32;
}

const myMap: MapConfig = {lng: -73.993434343, lat: 40.737473, titleSize: 16};