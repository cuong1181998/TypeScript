//1. khai báo
function add (x: number, y: number): number {
  return x + y;
}

let myadd = function (x: number, y: number): number {
  return x + y;
}

//2. một biến với kiểu hàm
let anotherAdd: (baseValue: number, increment: number) => number = function (x: number, y: number): number {
  return x + y;
}

//3. optional & default parameter
function buildName (firstname?: string, lastname="Smith"): string {
  if (firstname) return firstname +" "+ lastname;
  return lastname;
}

//4. rest parameter
function buildName2 (firstname: string, ...args: string[]): void {
  console.log('firstname', firstname);
  console.log(args);
}

//5. this
/**
 * - method -> object owner
 * - function -> global
 * - arrow function -> object
 * - event -> element
 * - call(), apply() -> gán cho bất cứ cái nào
 */
let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function () {
    // return function () {
      return () => { // arrow func fix that problem
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit); // error because this -> global

//6. this parameter
interface Card {
  suit: string,
  card: number;
}

interface Desk {
  suits: string[];
  cards: number[];
  createCardPicker (this: Desk): () => Card;
}

let desk: Desk = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function (this: Desk) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { 
        suit: this.suits[pickedSuit],
        card: pickedCard % 13
      };
    }
  }
};

// let cardPicker = desk.createCardPicker();
// let pickedCard = cardPicker();

// console.log("card: " + pickedCard.card + " of " + pickedCard.suit);


//7. this parameter in callback
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

// declare const uiElement: UIElement;

class Handler {
  info: string;
  onClickBad = (e: Event) => {
    this.info = '';
    // e.message;
  }
}

// let h = new Handler();
// uiElement.addClickListener(h.onClickBad); // error!

//8. Overloads

let suits = ["hearts", "spades", "clubs", "diamonds"];


function pickCard (x: {suit: string; card: number}[]): number; // -> for system know
function pickCard (x: number): { suit: string; card: number}; // -> for system know
function pickCard (x: any): any {
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  } else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 },
];

let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);