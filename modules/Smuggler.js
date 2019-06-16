var LivingCreature = require("./LivingCreature.js")
var random = require("./random.js")

module.exports = class Smuggler extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 15
    }
    getNewCoordinatesShoot() {
        this.directionsShoot = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }

    getNewCoordinatesMove() {
        this.directionsMove = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCellShoot(character) {
        this.getNewCoordinatesShoot();
        return super.chooseCell(character);
    }

    chooseCellMove(character) {
        this.getNewCoordinatesMove();
        return super.chooseCell(character);
    }


    move() {

        var newCell = random(this.chooseCellMove(0));
        var newCell2 = random(this.chooseCellMove(1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
        }
        else if (newCell2) {
            var newX2 = newCell2[0];
            var newY2 = newCell2[1];


            matrix[this.y][this.x] = 1;
            matrix[newY2][newX2] = this.index;

            this.y = newY2;
            this.x = newX2;
        }

        this.energy -= 1;

    }


    shoot() {

        var newCell = this.chooseCellShoot(2);
        var newCell2 = this.chooseCellShoot(3);
        var newCell3 = newCell.concat(newCell2)
        var newCell = random(newCell3)

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = this.index;
            matrix[newY][newX] = 0;


            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            }

            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break;
                }
            }
            this.energy += 1;
        }
    }

    leave() {

        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in smugglerArr) {
                if (this.x == smugglerArr[i].x && this.y == smugglerArr[i].y) {
                    smugglerArr.splice(i, 1)
                }
            }
        }
    }
}


