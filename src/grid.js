class Map {
    constructor(sizex,sizey){
        this.sizex = sizex;
        this.sizey = sizey;
        this.grid = new Array(sizex);
        for(var i = 0; i < sizex; i++){
            this.grid[i] = new Array(sizey);
            for(var j = 0; j < sizey; j++){
                this.grid[i][j] = 0;
            }
        }
        if(this.sizex == 800 && this.sizey == 600) {
            this.simpleMap();
        }
            
    }

    //Made for 800x600 map
    simpleMap() {
        this.fillRecGrid(100,0,700,300,1);
        this.fillRecGrid(0,0,800,50,2);
    }

    fillRecGrid(minx,miny,maxx,maxy,value){
        for(var i = minx; i < maxx; i++){
            for(var j = miny; j < maxy; j++){
                this.grid[i][j] = value;
            }
        }
    }
    fillCircleGrid(centerx,centery,radius,value){
        
    }
}
var m = new Map(800,600);
console.log(m.grid[300][100]);