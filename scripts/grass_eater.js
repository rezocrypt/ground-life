class GrassEater{
    constructor(x,y,energy=5){
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.minimummul = 1
        this.energy = energy    
        this.mulenergy = 5
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
        matrix[this.y-1][this.x-1]=0
        for (let i in grassEaterArr){
            if (grassEaterArr[i].x==this.x && grassEaterArr[i].y==this.y){
                grassEaterArr.splice(i,1)
                break;
            }
        }
    }
    move(ground){
        matrix[this.y-1][this.x-1]=0
        this.x = ground[0]
        this.y=ground[1]
        matrix[ground[1]-1][ground[0]-1]=2
        this.energy--;
        if (this.energy<=0){
            this.die()
        }
    }
    eat(grass){
        this.energy += 1;
        if (this.energy>=15) {
            this.mul(grass)
            for (let i in grassArr){
                if (grassArr[i].x==this.x && grassArr[i].y==this.y) {
                    grassArr.splice(i,1)
                    //break;
                }
            }
            return
        }

        for (let i in grassArr){
            if (grassArr[i].x==this.x && grassArr[i].y==this.y) {
                grassArr.splice(i,1)
                //break;
            }
        }

        matrix[this.y-1][this.x-1]=0
        matrix[grass[1]-1][grass[0]-1]=2
        this.x = grass[0]
        this.y=grass[1]
        
        
        
    }
    mul(grass){
        this.energy = 0
        matrix[grass[1]-1][grass[0]-1]=2
        
        for (let i in grassArr){
            if (grassArr[i].x==this.x && grassArr[i].y==this.y) {
                grassArr.splice(i,1)
                break;
            }
        }
        grassEaterArr.push(new GrassEater(grass[0],grass[1],1))

    }            
    step(){
        let grassD = this.getDirections(1)
        let groundD = this.getDirections(0)
        if (this.multiply>this.minimummul){
            this.multiply = 0;
            if (grassD) {
                this.eat(grassD)
            }
            else if (groundD) {
                this.move(groundD)
            }
        }
        this.multiply++;
    }
}