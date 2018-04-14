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
            this.mazeMap();
        }
            
    }

    //Made for 800x600 map
    simpleMap() {
        this.fillRecGrid(100,0,700,300,1);
        //this.generateTerrain(0,800,2);
        this.fillRecGrid(0,0,800,50,2);
        this.fillCircleGrid(400,300,50,0);
    }
    //Made for 800x600 map
    mazeMap(param){
        this.fillRecGrid(0,0,800,50,1);
        this.fillRecGrid(0,0,50,600,1);
        this.fillRecGrid(0,550,800,600,1);
        this.fillRecGrid(750,0,800,600,1);

        var xgrid = 14*2;
        var ygrid = 10*2;

        var maze = new Array(xgrid);
        var stack = new Array();
        for(var i = 0; i < xgrid; i++){
            maze[i] = new Array(ygrid);
            for(var j = 0; j < ygrid; j++){
                maze[i][j] = {v:false,right:true,above:true,x:i,y:j};
                stack.push(maze[i][j]);
            }
        }
        var current = stack.pop();
        current.v = true;
        while(stack.length > 0){
            var unvisited = new Array();
            if(current.x > 0 && !maze[current.x-1][current.y].v){
                unvisited.push(maze[current.x-1][current.y]);
            }
            if(current.x < (maze.length-1) && !maze[current.x+1][current.y].v){
                unvisited.push(maze[current.x+1][current.y]);
            }
            if(current.y > 0 && !maze[current.x][current.y-1].v){
                unvisited.push(maze[current.x][current.y-1]);
            }
            if(current.y < (maze[current.x].length-1) && !maze[current.x][current.y+1].v){
                unvisited.push(maze[current.x][current.y+1]);
            }
            if(unvisited.length > 0){
                var tmp = unvisited[Math.floor(Math.random()*unvisited.length)];
                if(tmp.x < current.x){
                    tmp.right = false;
                } else if(tmp.x > current.x){
                    current.right = false;
                }
                else if(tmp.y < current.y) {
                    tmp.above = false;
                } else{
                    current.above = false;
                }
                stack.push(current);
                current = tmp;
                current.v = true;
            } else{
                current = stack.pop();
                current.v = true;
            }
        }
        var offset = 50;
        var width = (800 - offset*2) / xgrid;
        var height = (600 - offset*2) / ygrid;
        var thickness = 2;
  

        for(var i = 0; i < maze.length;i++){
            var waterlevel = Math.sin(i)*Math.sin(i) * 100;
            for(var j = 0; j < maze[i].length; j++){
                if(maze[i][j].right){
                    this.fillRecGrid((offset+width-thickness)+width*i,offset+height*j,(offset+width+thickness)+width*i,offset+height*(j+1),1);
                }
                if(maze[i][j].above){
                    this.fillRecGrid(offset+width*i,(offset+height-thickness)+height*j,offset+width*(i+1),(offset+height+thickness)+height*j,1);
                }
            }
        }
    }

    fillRecGrid(minx,miny,maxx,maxy,value){
        for(var i = minx; i < maxx; i++){
            for(var j = miny; j < maxy; j++){
                this.grid[i][j] = value;
            }
        }
    }
    
    fillCircleGrid(centerx,centery,radius,value){
        var startx = (centerx - radius).clamp(0, centerx + radius);
        var starty = (centery - radius).clamp(0, centery + radius);

        for(var i = startx; i < (startx + radius*2); i++){
            for(var j = starty; j < (starty + radius*2); j++){
                if(distance(i, j, centerx, centery) < radius){
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

            for(var j = 0; j < terrain[i] + ((Math.sin(i/250.0)+1)/2)*100; j++){
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
