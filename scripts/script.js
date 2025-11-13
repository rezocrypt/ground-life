// Makeing important variables
var matrix;
var columns;
var rows;
var side;
var canvasWidth;
var canvasHeight;
var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var wallArr = [];
var dogArr = [];
var god;
var mode = "smile"
var run = true

// Function for generateing matrix
function GenerateMatrix(height, width, ground, grass, grassEater, predator, dog) {
    let matrix = [];
    let objects = [];
    for (let i = 0; i < ground; i++) { objects.push(0) }
    for (let i = 0; i < grass; i++) { objects.push(1) }
    for (let i = 0; i < grassEater; i++) { objects.push(2) }
    for (let i = 0; i < predator; i++) { objects.push(3) }
    for (let i = 0; i < dog; i++) { objects.push(5) }
    for (var y = 0; y < height; y++) {
        let row = [];
        for (var x = 0; x < width; x++) {
            row.push(objects[Math.floor(Math.random() * objects.length)]);
        }
        matrix.push(row);
    }
    
    return matrix;
}

// Function for setuping all variables and processes
function setupAll() {
    grassArr=[]
    grassEaterArr=[]
    predatorArr=[]
    dogArr=[]
    wallArr=[]
    rows = +document.getElementById("rows").value
    columns = +document.getElementById("columns").value
    canvasWidth = window.screen.width
    side = canvasWidth / columns
    canvasHeight = side * rows
    var cnv = createCanvas(canvasWidth, canvasHeight);
    console.log(document.getElementById("grass").value);
    cnv.background(153);
    cnv.parent("cnv")
    // matrix = GenerateMatrix(rows, columns, 1000, 0, 0, 0, 100);  // Matrix with God and dogs
    matrix = GenerateMatrix(rows, columns, document.getElementById("ground").value,  document.getElementById("grass").value,  document.getElementById("grasseater").value, document.getElementById("predator").value , document.getElementById("dog").value );
    god = new God(1, 1)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                let a = grassEaterArr.push(new GrassEater(x + 1, y + 1))
            }
            else if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x + 1, y + 1))
            }
            else if (matrix[y][x] == 3) {
                predatorArr.push(new Predator(x + 1, y + 1))
            }
            else if (matrix[y][x] == 5) {
                dogArr.push(new Dog(x + 1, y + 1))
            }


        }
    }
    strokeWeight(0);


}

// Function for calling setup
function setup() {
    setupAll();
}

// Function for updating settings
function updateSettings() {
    run = false
    mode = document.getElementById("mode").value 
    setupAll()
    run=true
}

// Function for drawing
function draw() {
    if (!run){
        return
    }
    //alert("hi")
    clear()
    let bgc;
    if (mode=="shape"){
        bgc = "#d4d9d0"
    }
    if (mode=="emoji"){
        bgc = "#7a2d06"
    }
    if (mode=="smile"){
        bgc = "#ffffff"
    }
    if (mode=="letter"){
        bgc = "#d4d9d0"
    }
    background(bgc)

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (mode=="shape"){
                if (matrix[y][x] == 0) {
                    continue
                }
                if (matrix[y][x] == 1) {
                    fill("green");
                }

                else if (matrix[y][x] == 2) {
                    fill("yellow");
                }
                else if (matrix[y][x] == 3) {
                    fill("red");
                }
                else if (matrix[y][x] == 4) {
                    fill("grey");
                }
                else if (matrix[y][x] == 5) {
                    fill("blue");
                }
                else if (matrix[y][x] == 6) {
                    fill(255, 16, 240);
                }
                rect(x * side, y * side, side, side);
            }
            if (mode=="emoji"){
                var t
                if (matrix[y][x] == 0) {
                    continue
                }
                else if (matrix[y][x] == 1) {
                    t = "🥦"
                }

                else if (matrix[y][x] == 2) {
                    t="🐰"
                }
                else if (matrix[y][x] == 3) {
                    t="🐯"
                }
                else if (matrix[y][x] == 4) {
                    t="🧱"
                }
                else if (matrix[y][x] == 5) {
                    t="🐶"
                }
                else if (matrix[y][x] == 6) {
                    t="😃"
                }
                text(t,(x) * side, (y+1) * side,);
            }
            if (mode=="smile"){
                var s
                if (matrix[y][x] == 0) {
                    continue
                }
                else if (matrix[y][x] == 1) {
                    s = "🤢"
                }

                else if (matrix[y][x] == 2) {
                    s="😈"
                }
                else if (matrix[y][x] == 3) {
                    s="😡"
                }
                else if (matrix[y][x] == 4) {
                    s="🥶"
                }
                else if (matrix[y][x] == 5) {
                    s="😱"
                }
                else if (matrix[y][x] == 6) {
                    s="😇"
                }
                text(s,(x) * side, (y+1) * side,);
            }
            if (mode=="letter"){
                var s
                if (matrix[y][x] == 0) {
                    continue
                }
                else if (matrix[y][x] == 1) {
                    s = "-"
                }

                else if (matrix[y][x] == 2) {
                    s="o"
                }
                else if (matrix[y][x] == 3) {
                    s="M"
                }
                else if (matrix[y][x] == 4) {
                    s="#"
                }
                else if (matrix[y][x] == 5) {
                    s="&"
                }
                else if (matrix[y][x] == 6) {
                    s="%"
                }
                text(s,(x) * side, (y+1) * side,);
            }
        }
    }
    dogX = Math.floor(mouseX / side)
    dogY = Math.floor(mouseY / side)
    
    if (keyIsDown(83)) {
        if (god.y+1<=rows) {
            god.move([god.x,god.y+1])
        }
    }
    if (keyIsDown(65)) {
            if (god.x-1>0) {
                god.move([god.x-1,god.y])
            }
    }
    if (keyIsDown(68)){
        if (god.x+1<=columns) {
            god.move([god.x+1,god.y])
        }
    }
    if (keyIsDown(87)){
            if (god.y-1>0) {
                god.move([god.x,god.y-1])
            }
    }



    for (var i in grassEaterArr) {
        grassEaterArr[i].step()
    }
    for (var i in grassArr) {
        grassArr[i].step()
    }
    for (var i in predatorArr) {
        predatorArr[i].step()
    }
    for (var i in dogArr) {
        dogArr[i].step()
    }

}




// Function for mouse click
function mouseDragged() {
    let wallX = Math.floor(mouseX / side)
    let wallY = Math.floor(mouseY / side)
    if (wallY<0 || wallY>=rows || wallX <0 || wallX>=columns){
        return;
    }

    isWall = false
    for (let i in wallArr) {
        if (wallX == wallArr[i].x && wallY == wallArr[i].y && matrix[wallY][wallX]==4) {
            isWall = true
            break
        }
    }
    if (isWall == false) {
        if (matrix[wallY][wallX]==1){
            for (let i in grassArr){
                if (grassArr[i].x==wallX && grassArr[i].y==wallY) {
                    for (let i in grassArr){
                        if (grassArr[i].x==wallX && grassArr[i].y==wallY) {
                            grassArr.splice(i,1)
                        }
                    }
                }
            }
        }
        if (matrix[wallY][wallX]==2){
            for (let i in grassEaterArr){
                if (grassEaterArr[i].x==wallX && grassEaterArr[i].y==wallY) {
                    for (let i in grassEaterArr){
                        if (grassEaterArr[i].x==wallX && grassEaterArr[i].y==wallY) {
                            grassEaterArr.splice(i,1)
                        }
                    }
                }
            }
        }
        
        wallArr.push(new Wall(wallX, wallY))
    }
    return false;
}


