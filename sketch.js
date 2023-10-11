
var bgimg
var playbutton,mutebutton,settingsbutton,soundbutton
var gameState = "wait"
let rows,cols
let cellSize=80
let maze=[]
var scorllimg
var goldimg,playerimg,tileimg,player,refreshbutton


function preload(){
bgimg=loadImage("SHADOW SWAP.gif")
playerimg=loadImage("RUNNING1.png")
// scorllimg=loadImage("tile1.png")
// scorllimg=loadImage("scroll.png")
goldimg=loadImage("burger.gif")

}

function setup(){
createCanvas(windowWidth,windowHeight)

rows=floor(height/cellSize)
cols=floor(width/cellSize)
frameRate(10)



playbutton = createImg("play.png")
playbutton.position(width/2-200,height-150)
playbutton.size(130,100)

soundbutton = createImg("sound.png")
soundbutton.position(playbutton.x+200,height-150)
soundbutton.size(130,100)
// soundbutton.hide()

mutebutton = createImg("mute.png")
mutebutton.position(playbutton.x+200,height-150)
mutebutton.size(130,100)
mutebutton.hide()

refreshbutton = createImg("reset.png")
refreshbutton.position(width/2-60,height-100)
refreshbutton.size(130,100)
refreshbutton.hide()

// settingsbutton = createImg("settings.png")
// settingsbutton.position(playbutton.x-200,height-150)
// settingsbutton.size(130,100)

// settingsbutton.hide()


// generate a random maze
for(let i=0;i<rows;i++){
    let row=[]
    for(let j=0;j<cols;j++){
        if(random(1) < 0.4){
            row.push(1); // 1 represents an obstacle
        } else {
          row.push(0); // 0 represents an open path
        }
      }
      maze.push(row);
    }



    // create Player
    player={
        x:0,
        y:0,
        size:cellSize*1.5
    }
 // Set winning and losing conditions
 maze[rows - 1][cols - 1] = 2; // Winning cell
 maze[0][0] = 0; // Starting cell
}

function draw(){

    if (gameState === "wait") {
background(bgimg)
playbutton.show()
soundbutton.show()
mutebutton.hide()
refreshbutton.hide()

}

playbutton.mousePressed(()=>{
    gameState="aboutGame"
    playbutton.hide()
    soundbutton.hide()
    mutebutton.hide()
})


refreshbutton.mousePressed(()=>{
  resetGame()
})

if(gameState=="aboutGame"){
    gamedetails()
}
  
if (gameState =="Level1"){
    imageMode(CENTER)
    background(220)
    refreshbutton.show()
    player.debug=true
 // Draw the maze
 for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        fill("cyan")
      if (maze[i][j] === 1) {
        // fill("cyan");
        // rect(j * cellSize, i * cellSize, cellSize, cellSize);
       rect(j * cellSize, i * cellSize, cellSize+100, cellSize)

    //     image(scorllimg,j * cellSize, i * cellSize, cellSize, cellSize)
       } else if (maze[i][j] === 2) {
        // fill(0, 255, 0); // Green cell represents the winning condition
       rect(j * cellSize, i * cellSize, cellSize+100, cellSize)
       
        // image(scorllimg,j * cellSize, i * cellSize, cellSize, cellSize)
         image(goldimg,j * cellSize, i * cellSize, cellSize*2, cellSize*2)
        // rect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  }

  // Draw the player
//   fill(255, 0, 0);
   image(playerimg,
    player.x * cellSize + cellSize / 2,
    player.y * cellSize + cellSize / 2,
    player.size,player.size
    
  );

  // Check for winning condition
  if (player.x === cols - 1 && player.y === rows - 1) {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text("You Win!", width / 2, height / 2);
    noLoop();
  }

  // Check for losing condition
  if (maze[player.y][player.x] === 1) {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text("You Lose!", width / 2, height / 2);
    noLoop();
  }


}

}



function keyPressed(){
let newX=player.x;
let newY=player.y;

if(keyCode==UP_ARROW && player.y>0){
    newY--
}
else if(keyCode==DOWN_ARROW && player.y<rows-1){
    newY++
}

else if(keyCode==LEFT_ARROW && player.x>0){
    newX--
}
else if(keyCode==RIGHT_ARROW && player.x<cols-1){
    newX++
}

// check for collissions with walls
if(maze[newY][newX]!==1){
    player.x = newX;
    player.y = newY;
}

}

function gamedetails(){

    swal({

title:'This is a Maze Game.. So be careful!!',
text: 'Avoid touching the bricks and find your way to BURGER ..',
imageUrl:"maze.jpg",
imageSize:"250x250",
confirmButtonText: "PLAY",
            confirmButtonColor: "red"

    },
    function (isConfirm) {
        if (isConfirm) {
            gameState = "Level1"
        }
    }
    )
}


function   resetGame()
{
    swal({

        title:'If the Maze is not SolveAble !!',
        text: 'I am here to give you a new path to the Food ..',
        imageUrl:"reset.png",
        imageSize:"250x250",
        confirmButtonText: "New MAZE",
                    confirmButtonColor: "red"
        
            },
            function (isConfirm) {
                if (isConfirm) {
                    gameState="wait"
                    location.reload();

                }
            }
            )

}