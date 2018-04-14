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
       // this.fillRecGrid(100,0,700,300,1);
        this.generateTerrain(0,800,2);
        this.fillRecGrid(0,0,800,50,2);
        this.fillCircleGrid(400,300,50,0);
    }

    fillRecGrid(minx,miny,maxx,maxy,value){
        for(var i = minx; i < maxx; i++){
            for(var j = miny; j < maxy; j++){
                this.grid[i][j] = value;
            }
        }
    }
    
    fillCircleGrid(centerx,centery,radius,value){
        var startx = centerx - radius;
        var starty = centery - radius; 
        if(startx < 0)
            startx = 0;
        else if((centerx + radius) > this.sizex)
            startx = this.sizex;
        if(starty < 0)
            starty = 0;
        else if((centery + radius) > this.sizey)
            starty = this.sizey;

        for(var i = startx; i < (startx + radius*2); i++){
            for(var j = starty; j < (starty + radius*2); j++){
                if(Math.sqrt(Math.pow(Math.abs(i - centerx),2) + Math.pow(Math.abs(j - centery),2)) < radius){
                    this.grid[i][j] = value;
                }
            }
        }
    }
    generateTerrain(xmin,xmax, amount){
        var terrain = new Array(xmax-xmin);
        for(var i = 0; i < terrain.length; i++){
            terrain[i] = 0;
        }

        this.generateHeight(xmin,xmax-1,amount,terrain);
        console.log(terrain);
        var mid = Math.floor((xmax+xmin) / 2);
        var mul = 1;
        for(var i = 0; i < this.sizex;i++){

            for(var j = 0; j < terrain[i] + ((Math.sin(i/500.0)+1)/2)*200; j++){
                this.grid[i][j] = 1;
            }
        }
    }
    generateHeight(xmin,xmax,amount,list){
        if((xmin+1) == xmax) return;
        
        var mid = Math.floor((xmin + xmax) / 2);
        var val = (Math.random() * 2 - 1) * amount;
        list[mid] = (list[xmin] + list[xmax]) / 2 + val;

        this.generateHeight(xmin,mid,amount,list);
        this.generateHeight(mid,xmax,amount,list);

    }
}
//var m = new Map(800,600);