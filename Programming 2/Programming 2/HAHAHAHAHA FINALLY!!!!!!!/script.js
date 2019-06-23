var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var smugglerArr = [];
var side = 20;



let matrix = []; 
let rows = 30; 
let columns = 30; 

for (let y = 0; y < rows; y++) {
    matrix[y] = []; 
    for (let x = 0; x < columns; x++) {
        let a = Math.floor(Math.random() * 100);
        if (a >= 0 && a < 5) {
            matrix[y][x] = 0; 
        }
        if (a >= 5 && a < 57) {
            matrix[y][x] = 1; 
        }
        else if (a >= 57 && a < 87) {
            matrix[y][x] = 2; 
        }
        else if (a >= 87 && a < 97) {
            matrix[y][x] = 3; 
        }
        else if (a >= 97 && a < 100) {
            matrix[y][x] = 4; 
        }
    }
}



function setup() {
    frameRate(30);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

   

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var et = new GrassEater(x, y, 2);
                grassEaterArr.push(et);
            }
            else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y, 3);
                predatorArr.push(pred);
            }
            else if (matrix[y][x] == 4) {
                var smug = new Smuggler(x, y, 4);
                smugglerArr.push(smug);
            }
        }
    }
}


function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("purple");
                rect(x * side, y * side, side, side);
            }
        }
    }

 
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
        grassEaterArr[i].die();
    }
    for (var i in predatorArr) {
        predatorArr[i].move();
        predatorArr[i].eat();
        predatorArr[i].mul();
        predatorArr[i].die();
    }
    for (var i in smugglerArr) {
        smugglerArr[i].move();
        smugglerArr[i].shoot();
        smugglerArr[i].leave();
    }
}
