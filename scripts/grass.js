class Grass{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.minimummul = 0+Math.floor(Math.random()*50)
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
    die(){
        for (let i in grassArr){
            if (grassArr[i][0]==this.x && grassArr[i][1]==this.y){
                    grassArr.splice(i,1)
            }
        }
    }
    
    step(){
        let newCell = this.getDirections(0)
        
        if (newCell) {
            if (this.multiply>this.minimummul) {
                let x = newCell[0]
                let y = newCell[1]
                matrix[y-1][x-1] = 1
                grassArr.push(new Grass(x,y))
                this.multiply = 0
            }
            else{
                this.multiply++;
            }
        }

    }
}