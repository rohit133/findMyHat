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

  play() {
    this.print();
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

    if (this._field[this.y][this.x] === undefined) {
      console.log(`You currently stepped on ${this._field[this.x][this.y]}`);
      console.log("You lose - Out of boundary");
      currentlyPlaying = false;
    } else if (this._field[this.y][this.x] === hole) {
      console.log(`You currently stepped on ${this._field[this.x][this.y]}`);
      console.log("You lose - Fell down in a hole!");
      currentlyPlaying = false;
    } else if (this._field[this.y][this.x] === hat) {
      console.log(`You currently stepped on ${this._field[this.x][this.y]}`);
      console.log("You Win - You found the Hat");
      currentlyPlaying = false;
    } else if (this._field[this.y][this.x] === fieldCharacter) {
      console.log(`You currently stepped on ${this._field[this.x][this.y]}`);
      console.log("Keep looking for the hat...");
      this._field[this.y][this.x] = pathCharacter;
    } else if (this._field[this.x][this.y] === pathCharacter) {
      console.log(`You currently stepped on ${this._field[this.x][this.y]}`);
      console.log("You are stepping on *");
    }
  }

  static generateField(height, width, holes = 2) {
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
let counter = 0;
console.log(`First count ${counter}`);
const gameMaze = Field.generateField(6, 4, 4);
const myField = new Field(gameMaze);



function start() {
  counter += 1;
  while (currentlyPlaying) {
    myField.play();
  }
  console.log("Game Over!");
}

start();
