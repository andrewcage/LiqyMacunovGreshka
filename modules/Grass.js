var LivingCreature = require("./LivingCreature.js")
var random = require("./random.js")

module.exports = class Grass extends LivingCreature {

    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 4 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
            grassHashiv++
        }
        
    }
}