const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field;
    this.x = 0;
    this.y = 0;
    this.currentlyPlaying = true;
  }

  print() {
    for (let row of this._field) {
      console.log(row.join(" "));
    }
  }

  play() {
    this.print();
    let move = prompt("Which way you would like to move? ");
    switch (move.toLowerCase()) {
      case "u":
        this.y -= 1;
        break;
      case "d":
        this.y += 1;
        break;
      case "l":
        this.x -= 1;
        break;
      case "r":
        this.x += 1;
        break;
      default:
        console.log(
          "Please choose any of these Options: {r}: Right {l}: Left {u}: Up {d}: Down "
        );
        return;
    }

    if (this.y < 0 || this.y >= this._field.length || this.x < 0 || this.x >= this._field[0].length) {
      console.log("You lose - Out of boundary");
      this.currentlyPlaying = false;
    } else if (this._field[this.y][this.x] === hole) {
      console.log("You lose - Fell down in a hole!");
      this.currentlyPlaying = false;
    } else if (this._field[this.y][this.x] === hat) {
      console.log("You Win - You found the Hat");
      this.currentlyPlaying = false;
    } else {
      this._field[this.y][this.x] = pathCharacter;
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

    while (holes > 0) {
      let holeY = Math.floor(Math.random() * height);
      let holeX = Math.floor(Math.random() * width);
      if (fieldArray[holeY][holeX] === fieldCharacter) {
        fieldArray[holeY][holeX] = hole;
        holes--;
      }
    }

    let hatY, hatX;
    do {
      hatY = Math.floor(Math.random() * height);
      hatX = Math.floor(Math.random() * width);
    } while (fieldArray[hatY][hatX] !== fieldCharacter);

    fieldArray[hatY][hatX] = hat;
    fieldArray[0][0] = pathCharacter;
    return fieldArray;
  }
}

// Testing code.
let counter = 0;
console.log(`First count ${counter}`);
const gameMaze = Field.generateField(4, 4);
const myField = new Field(gameMaze);

function start() {
  counter += 1;
  while (myField.currentlyPlaying) {
    myField.play();
  }
  console.log("Game Over!");
}

start();
