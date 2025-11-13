class Predator{
    constructor(x,y){
        this.x = x
        this.y = y
        this.multiply = 0;
        this.minimummul = 4;
    }
    getDirections(symbol){
        let found = []
        let directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        for (let i in directions){
            let justX = directions[i][0]
            let justY = directions[i][1]
            if (justX<=columns && justY <= rows && justX >0 && justY>0 && matrix[justY-1][justX-1]==symbol){
                found.push([justX,justY])
            }
        }
        let selection = found[Math.floor(Math.random()*found.length)]
        return selection
    }
    eat(cords,type){
        
        if (type=="grass") {
            for (let i in grassArr){
                if (grassArr[i].x==this.x && grassArr[i].y==this.y) {
                    grassArr.splice(i,1)
                }
            }
        }
        else if (type=="grasseater") {
            for (let i in grassEaterArr){
                if (grassEaterArr[i].x==this.x && grassEaterArr[i].y==this.y) {
                    grassEaterArr.splice(i,1)
                }
            }
        }
        else if (type=="ground") {
            for (let i in grassEaterArr){
                if (grassEaterArr[i].x==this.x && grassEaterArr[i].y==this.y) {
                    grassEaterArr.splice(i,1)
                }
            }
        }
        matrix[this.y-1][this.x-1] = 0;
        matrix[cords[1]-1][cords[0]-1] = 3;
        this.x = cords[0]
        this.y = cords[1]

    }
    step(){
        let grassD = this.getDirections(1)
        if (this.multiply>this.minimummul){
            this.multiply = 0;
            let grassD = this.getDirections(1)
            let groundD = this.getDirections(0)
            let grassEaterD = this.getDirections(2)
            if (grassEaterD) {
                this.eat(grassEaterD,"grasseater")
            }
            else if (grassD) {
                this.eat(grassD,"grass")
            }
            else if(groundD){
                this.eat(groundD,"ground")
            }
            else{
                return
            }

        }
        this.multiply++;
        
    }
}