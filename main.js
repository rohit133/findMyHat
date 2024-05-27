const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

let currentlyPlaying = true;

class Field {
  constructor(field) {
    this._field = field;
    this.x = 0;
    this.y = 0;
  }
  print() {
    for (let row of this._field) {
      console.log(row.join(" "));
    }
  }
  moves() {
    // use a loop to run the program until it the user wins or lose!
    let move = prompt("Which way you would like to move?");
    switch (move.toLowerCase()) {
      case "u":
        console.log("Moving Up");
        this.y -= 1;
        break;
      case "d":
        console.log("Moving Down");
        this.y += 1;
        break;
      case "l":
        console.log("Moving Left");
        this.x -= 1;
        break;
      case "r":
        console.log("Moving Right");
        this.x += 1;
        break;
      default:
        console.log(
          "Please choose any of these Options: {r}: Right {l}: Left {u}: Up {d}: Down "
        );
        break;
    }
  }
  checkWin() {
    switch (this._field[this.x][this.y]) {
      case undefined:
        console.log("You lose - Out of boundary");
        currentlyPlaying = false;
        break;
      case hole:
        console.log("You lose - Fell down in a hole!");
        currentlyPlaying = false;
        break;
      case hat:
        console.log("You Win - You found the Hat");
        currentlyPlaying = false;
        break;
      case fieldCharacter:
        console.log("Keep looking for the hat...");
        this._field[this.y][this.x] = pathCharacter;
        break;
      case pathCharacter:
        console.log("You are stepping on *");
        break;
    }
  }
  static generateField(height, width, holes = 5) {
    let fieldArray = [];
    for (let i = 0; i < height; i++) {
      fieldArray.push([]);
      for (let j = 0; j < width; j++) {
        fieldArray[i].push(fieldCharacter);
      }
    }
    for (let k = holes; k > 0; k--) {
      fieldArray[Math.floor(Math.random() * height)][
        Math.floor(Math.random() * width)
      ] = hole;
    }
    fieldArray[Math.floor(Math.random() * height)][
      Math.floor(Math.random() * width)
    ] = hat;
    fieldArray[0][0] = pathCharacter;
    return fieldArray;
  }
}

// Testing code.
let myField;
let gameMaze = Field.generateField(4, 4 );
myField = new Field(gameMaze);

function play() {
  while (currentlyPlaying) {
    myField.print()
    myField.moves();
    myField.checkWin();
  }
  console.log("Game Over!");
}

play();
