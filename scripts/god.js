class God{
    constructor(x,y){
        this.x = x
        this.y = y  
    }
    move(ground){
        matrix[this.y-1][this.x-1]=0
        this.x = ground[0]
        this.y=ground[1]
        matrix[ground[1]-1][ground[0]-1]=6
        
    }
}