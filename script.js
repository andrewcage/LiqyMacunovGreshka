
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
    let seasonElement = document.getElementById('season');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures, "season");

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        weather = data.weather;
        var seasonText;
        if(weather == 1){
            seasonText = "Գարուն"
        }
        else if(weather == 2){
            seasonText = "Ամառ"
        }
        else if(weather == 3){
            seasonText = "Աշուն"
        }
        else if(weather == 4){
            seasonText = "Ձմեռ"
        }
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predatorCountElement.innerText = data.predatorCounter;
        smugglerCountElement.innerText = data.smugglerCounter;
        seasonElement.innerText = seasonText;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill("green");
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
                if (weather == 1) {
                    document.body.style.backgroundColor = "green";
                    if (matrix[i][j] == 1) {
                        fill("#66ff66");
                        rect(j * side, i * side, side, side);
                    }
                }
                if (weather == 2) {                   
                    document.body.style.backgroundColor = "yellowgreen";
                    if (matrix[i][j] == 1) {
                        fill("green");
                        rect(j * side, i * side, side, side);
                    }
                }
                if (weather == 3) {                   
                    document.body.style.backgroundColor = "cccc00";
                    if (matrix[i][j] == 1) {
                        fill("orange");
                        rect(j * side, i * side, side, side);
                    }
                }
                if (weather == 4) {                   
                    document.body.style.backgroundColor = "00cccc";
                    if (matrix[i][j] == 1) {
                        fill("white");
                        rect(j * side, i * side, side, side);
                    }
                }
            }
        }
    }
}

