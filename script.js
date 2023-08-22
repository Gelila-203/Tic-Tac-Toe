
const tiles= document.querySelectorAll(".tile");
const Player_X = "X";
const Player_O = "O";
let turn= Player_X;

const boardState= Array(tiles.length);
boardState.fill(null);
//Elements
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");

playAgain.addEventListener('click',startNewGame);

tiles.forEach((tile) => tile.addEventListener('click',tileClick));
  
function setHoverText(){
    //remove
    tiles.forEach((tile) =>{
        tile.classList.remove("x-hover");
        tile.classList.remove("o-hover");

    });
    const hoverClass=`${turn.toLowerCase()}-hover`;
    tiles.forEach((tile) =>{
        if(tile.innerText ==""){
            tile.classList.add(hoverClass);
        }

    });

  }


function tileClick(event){
    if(gameOverArea.classList.contains('visible')){
        return;
    }
    const tile = event.target;
    const tileNumber= tile.dataset.index;
    if(tile.innerText !=""){
        return;
    }
    if(turn === Player_X){
        tile.innerText = Player_X;
        boardState[tileNumber]= Player_X; 
        turn = Player_O;
    }
    else{
        tile.innerText = Player_O;
        boardState[tileNumber]= Player_O; 
        turn =Player_X;
    }
    
    setHoverText();
    checkWinner();

}


const winningCombinations= [
// to check for a row
    {combo:[0,1,2],strikeClass:"strike-row-1"},
    {combo:[3,4,5],strikeClass:"strike-row-2"},
    {combo:[6,7,8],strikeClass:"strike-row-3"},
//to check for a column
    {combo:[1,4,7],strikeClass:"strike-column-1"},
    {combo:[2,5,8],strikeClass:"strike-column-2"},
    {combo:[3,6,9],strikeClass:"strike-column-3"},
//to check for a diagonal
    {combo:[0,4,8],strikeClass:"strike-diagonal-1"},
    {combo:[2,4,6],strikeClass:"strike-diagonal-2"},

];

function checkWinner(){
    for(const winningCombination of winningCombinations) {
   
        const combo = winningCombination.combo;
        const strikeClass = winningCombination.strikeClass;
       
        const cellA=boardState[combo[0]];
        const cellB=boardState[combo[1]];
        const cellC=boardState[combo[2]];
        if(cellA != null && 
            cellA === cellB && 
            cellA === cellC) 
            {
            strike.classList.add(strikeClass);
            gameOverScreen(cellA);
            return;
        }
    }
    //check for a draw
    const allTileFilledIn = boardState.every((tile)=> tile !==null);
    if(allTileFilledIn){
        gameOverScreen(null);
    }

}

function gameOverScreen(winnerText){
    let text="Draw!";
    if(winnerText !=null){
        text=`winner is ${winnerText}!`;

    }
    gameOverArea.className ="visible";
    gameOverText.innerText= text;
    
}

function startNewGame(){
    strike.className = "strike";
    gameOverArea.className="hidden";
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText =""));
    turn = Player_X;
    setHoverText();
}