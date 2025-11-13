class Dog {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.minmultiply = 3
    }
    getDirections(symbol) {
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
        for (let i in directions) {
            let justX = directions[i][0]
            let justY = directions[i][1]
            if (justX <= columns && justY <= rows && justX > 0 && justY > 0 && matrix[justY - 1][justX - 1] == symbol) {
                found.push([justX, justY])
            }
        }
        return found
    }
    move(ground){
        matrix[this.y-1][this.x-1]=0
        this.x = ground[0]
        this.y=ground[1]
        matrix[ground[1]-1][ground[0]-1]=5
    }
    step() {
        if (this.multiply >= this.minmultiply) {
            let directions = this.getDirections(0)
            if (directions && directions.length>0) {
                this.multiply = 0
                var best_step;
                var best_count = 10*100;
                var count
                for (let i in directions) {
                    count = 0
                    count += Math.abs(directions[i][0] - god.x)
                    count += Math.abs(directions[i][1] - god.y)
                    if (count<best_count) {
                        best_count = count
                        best_step = directions[i]
                    }
                }
                if ((Math.abs(best_step[0] - god.x)+Math.abs(best_step[1] - god.y)) < (Math.abs(this.x - god.x)+Math.abs(this.y - god.y))) {
                    
                    this.move(best_step)
                }

            }
        }
        this.multiply++
    }
}