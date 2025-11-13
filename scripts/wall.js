class Wall{
    constructor (x,y){
        this.x = x
        this.y = y
        try {
            if (matrix[y][x] == 2){
                for (let i in grassEaterArr){
                    if (grassEaterArr[i].x==this.x && grassEaterArr[i].y==this.y){
                        grassEaterArr[i].die()
                    }
                }
            }
            matrix[y][x] = 4;   
        } catch (error) {
            
        }
        
    }

    die(){
        for (let i in wallArr){
            if (wallArr[i].x==this.x && wallArr[i].y==this.y){
                wallArr.slice(i,1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}