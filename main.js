const canvas=document.getElementById("canvas")

const pen=canvas.getContext("2d")



const cs=47; //cell size
const W=1200;
const H=600;
let food=null;
let count=0;
// this will initialise the game

class Snake{

    constructor(){
         this.init_len=5;//5 cells/blocks  long snake
         this.direction="right";
         this.cells=[];// blocks or cells
         
    }
    createSnake(){
        for(let i=0;i<this.init_len;i++){
            this.cells.push({
                x:i,
                y:0,
            })
        }
    }
    drawSnake(){
        for(let i=0;i<this.cells.length;i++){
            
            const cell=this.cells[i];

            if(i=== this.cells.length-1){
                pen.fillStyle="yellow";
                // head color --yellow
            }else{
                // rest of snake body-- red
                pen.fillStyle="red"

            }
            pen.fillRect(cell.x *cs,cell.y*cs,cs-2,cs-2)
        }
    }

    moveSnake(){//update snake

        const headX=this.cells[this.cells.length-1].x;
        const headY=this.cells[this.cells.length-1].y;

        
        
        let nextX=headX;
        let nextY=headY;

        if(food.x===headX && food.y===headY){
            food=randomFood();
            count++;

        }else{

            this.cells.shift();
        }

        // collision with bod?
        for(let i=0;i<this.cells.length-1;i++){

            const cell=this.cells[i];
            if(cell.x=== headX && cell.y===headY){

                // if snake head colide with its body
                gameOver();
                return;
            }
        }
        if(this.direction==="left"){
            nextX=headX-1;
            nextY=headY;
            if(nextX <0){
               gameOver();
            }
    
        }
       
        else if(this.direction==="up"){
            nextX=headX;
            nextY=headY-1;
            if(nextY <0){
                gameOver();
             }
    
        }
        else if(this.direction==="down"){
            nextX=headX;
            nextY=headY+1;
            if(nextY*cs >H){
                gameOver();
             }
    
        }else if(this.direction==="right"){

            nextX=headX+1;
            nextY=headY;
            if(nextX*cs >W){
                gameOver();
             }
        }

        this.cells.push({
            x:nextX,
            y:nextY,
        });
        

    }

    changeDirection(direction){

        this.direction = direction;
     }
     
}

const snake=new Snake();


function start(){
    snake.createSnake();
    snake.drawSnake();

    food=randomFood();
  

    function keypressed(e){

        if(e.key==="ArrowLeft"){
            snake.changeDirection("left")
        }
        else if(e.key==="ArrowRight"){
            snake.changeDirection("right")
        }
        else if(e.key==="ArrowUp"){
            snake.changeDirection("up")
            
        }else if (e.key==="ArrowDown"){
            snake.changeDirection("down")

        }

        // console.log(e.key)
    }

    document.addEventListener("keydown",keypressed);

    
}



// this will draw the updated game
function draw(){
    
    pen.clearRect(0,0,W,H);

    pen.fillStyle="red";

    pen.fillRect(food.x*cs,food.y*cs,cs,cs);
    pen.fillStyle="yellow";

    snake.drawSnake();

    pen.fillText(` Score : ${count*100}`,30,30)
    pen.font="30px sans-erif";
    // pen.clearRect(0,0,1200,600)//remove old frame 
    // pen.fillRect(init_x,init_y,67,67)//make new frame a little ahead 
}

// this will update the values of the snake

function update(){

    snake.moveSnake()

}


// game loop 

function gameloop(){

    update();
    draw();

}
function randomFood(){
    const foodX=Math.floor(Math.random()* (W-cs)/cs);
    const foodY=Math.floor(Math.random()* (H-cs)/cs);

    const food={
        x:foodX,
        y:foodY,
    }
    return food;
}

start();
const id = setInterval(gameloop,200);

function gameOver(){
    clearInterval(id)
}