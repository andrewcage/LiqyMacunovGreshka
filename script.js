
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let smugglerCountElement = document.getElementById('smugglerCount');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        weather = data.weather;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predatorCountElement.innerText = data.predatorCounter;
        smugglerCountElement.innerText = data.smugglerCounter;
        //! Every time it creates new Canvas with new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if(weather == "Winter"){
                        fill("white");
                    }
                    else if(weather == "Spring"){
                        fill("green");
                    }
                    else if(weather == "Summer"){
                        fill("green");
                    }
                    else if(weather == "Winter"){
                        fill("orange");
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("yellow");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('purple');
                    rect(j * side, i * side, side, side);
                }
                if (data.weather == 1) {
                    // console.log("garun")
                    document.body.style.backgroundColor = "green";
                    if (matrix[i][j] == 1) {
                        fill("#66ff66");
                        rect(j * side, i * side, side, side);
                    }
                }
                if (data.weather == 2) {
                    // console.log("amar")
                    document.body.style.backgroundColor = "yellow";
                    if (matrix[i][j] == 1) {
                        fill("#ffbf80");
                        rect(j * side, i * side, side, side);
                    }
                }
                if (data.weather == 3) {
                    // console.log("ashun")
                    document.body.style.backgroundColor = "cccc00";
                    if (matrix[i][j] == 1) {
                        fill("green");
                        rect(j * side, i * side, side, side);
                    }
                }
                if (data.weather == 4) {
                    // console.log("dzmer")
                    document.body.style.backgroundColor = "00cccc";
                    if (matrix[i][j] == 1) {
                        fill("#757557");
                        rect(j * side, i * side, side, side);
                    }
                }
            }
        }
    }
}