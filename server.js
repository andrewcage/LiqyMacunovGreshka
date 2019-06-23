
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var Smuggler = require("./modules/Smuggler.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predArr = [];
smugArr = [];

matrix = [];

grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
smugglerHashiv = 0;
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grasseater, predator, smuggler) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grasseater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < smuggler; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
}
matrixGenerator(20, 60, 14, 16, 12);
//! Creating MATRIX -- END

weather = 1

setInterval(() => {
    weather++
    if (weather > 4) {
        weather = 1
    }
}, 3000)




//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            } else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y);
                predArr.push(pred);
                predatorHashiv++;
            } else if (matrix[y][x] == 4) {
                var smuggler = new Smuggler(x, y);
                smugArr.push(smuggler);
                smugglerHashiv++;
            }
        }
        
        
    }
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        if(weather != 4){
            for (var i in grassArr) {
                grassArr[i].mul();
            }
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (predArr[0] !== undefined) {
        for (var i in predArr) {
            predArr[i].eat();
        }
    }
    if (smugArr[0] !== undefined) {
        for (var i in smugArr) {
            smugArr[i].shoot();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        weather: weather,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        predatorCounter: predatorHashiv,
        smugglerCounter: smugglerHashiv
    }
    
    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData, "season");
}



setInterval(game, 1000)