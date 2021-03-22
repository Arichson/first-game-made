////////// both side need to start with one square
// if you change your color, it has to be a different one from your current color and the enemies current color
//if you change color you take control of the colors you chose that is next to your squares
    // example if youre red and you change to blue, you take control of the blue hexagons
    // set classes to each tag? then change the classes when you take over it
        //example class green is your color then if you choose blue, it takes over all classes called blue and also changes the current class you have to blue( not green anymore)
// win condition is when you have 50% of the board. lose if opponent has 50% of the board
    //possibly store it all in an array and check if an array is filled?
    // or set each squares value to 1? and then when they add up to 50 you win.
//have a modal pop up everytime to choose the color you want
//modal in the beginning too


//////////DOM Stuff
const theFirstBoard = document.querySelector("#boardOne");
const startButton = document.querySelector("#start");
const openingModal = document.querySelector("#opening");
const colorChooseModal = document.querySelector("#colorChoose")
const redButton = document.querySelector("#redButton");
const yellowButton = document.querySelector("#yellowButton");
const greenButton = document.querySelector("#greenButton");
const blueButton = document.querySelector("#blueButton");
const cyanButton = document.querySelector("#cyanButton");
const purpleButton = document.querySelector("#purpleButton");
const greyButton = document.querySelector("#greyButton");




///////////Variables
const theColorsAvailable = ["red", "yellow", "green", "blue", "cyan", "purple","grey"]
const firstBoardArray = [];
const secondBoardArray = [];
const thirdBoardArray = [];
const players = ["player", "enemy"]
const playerCurrentColor = theColorsAvailable[0];
const enemyCurrentColor = theColorsAvailable[6];

let turns = 0;

///////////Functions
const playersTurns = () => {
 
    const currentTurn = turns % 2;
    turns += 1;
    if( currentTurn === 0) {
        return players[0]
    } else {
        return players[1]
    }
}
const randNum = (limit) => {
    return Math.floor(Math.random() * limit)
}
const firstBoardMaker = () => {
    let pieceColor = "";
    
    for(let i = 0; i < 10; i++) {
        const colParity = () => {
            if (i % 2 === 0){
                return "colEven"
            } else {
                return "colOdd"
            }
        }
        let character = "";
        const colArray = [];
        pieceColor += `<div id=board1Col${i} class="${colParity(i)} column">`;
        for(let j = 0; j<10; j++){
            if(i===0 && j === 9){
                character = players[0];
            } else if (i === 9 && j === 0){
                character = players[1];
            } else {
                character = "";
            }
            const owner = () =>{
                if(i===0 && j === 9){
                    return players[0]
                } else if (i === 9 && j === 0){
                    return players[1];
                } else {
                    return "none";
                }
            }
            const currentColor = theColorsAvailable[randNum(theColorsAvailable.length)];
            const newDiv = `<div id="piece${j}${i}" class="${currentColor} theHexagons ${character}"></div>`;
            pieceColor += newDiv;
            colArray.push({
                color: currentColor,
                column: i,
                row: j,
                owner: owner(),
            })
            
        }
        pieceColor += `</div>`
        firstBoardArray.push(colArray);
    }
    theFirstBoard.innerHTML = pieceColor;
}
firstBoardMaker();
// console.log(firstBoardArray[0][1].color)
// console.log(firstBoardArray[0])
// console.log(firstBoardArray[1])
// console.log(firstBoardArray)
// console.log(firstBoardArray[11])

const closeTheOpening = () => {
    openingModal.classList.add("closeModal")
    colorChooseModal.classList.remove("closeModal");
}
const closeColorChoose = () => {
    // colorChooseModal.classList.add("closeModal");
}
console.log(playersTurns())

const checkHexes = () => {
    // for(let i = 0; i < 10; i++){
    //     for(let j = 0; j < 10; j++){
    //         if(firstBoardArray[]){

    //         }
    //     }
    // }
}

const gameFunction = (colorChosen) => {
    /////fix later
    
    
    //check if color matches color of next hexagons
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            const firstBoardRowCol = document.querySelector(`#piece${j}${i}`) 
            ////changes players color to the chosen color
            if(firstBoardRowCol.classList.contains(`player`)){
                for(let p = 0; p < theColorsAvailable.length; p++){
                    //change the players current color to the same color
                        //remove the current color
                        firstBoardRowCol.classList.remove(theColorsAvailable[p]);        
                }
                    // if(firstBoardRowColclassList.contains(`${theColorsAvailable[0]}`))
                //add the new color
                firstBoardRowCol.classList.add(colorChosen);           
            } else { console.log("nope")}
            /////adds player class to the colors
            if (colorChosen === firstBoardArray[i][j].color){
                //come up with a way that only changes to player class if the hexes are touching
                checkHexes();
                firstBoardRowCol.classList.add("player")
                firstBoardArray[i][j].owner = players[0]
            }
                // console.log(firstBoardArray[i][j].color)
        }
    }

    //to do that need to determine where your hexagons are
    
    //change current color into the color chosen
        //find the classes that has player and change color

    //add player marks on all color that touches the player hex with same color
    //check rows and colums of nearby stuff
    //maybe a while loop for all of these



    /////after this function elds, it turns to the enemy players turn
}

/*
const gameFunction = (colorChosen) => {
// Check each column then row if its owned by player 
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            let col = i;
            let row = j;
            const currentRowCol = document.querySelector(`#piece${j}${i}`)
            // const firstBoardRowCol = document.querySelector(`#piece${j}${i}`)

            const rowAbove = document.querySelector(`#piece${j-1}${i}`)
            const rowBelow = document.querySelector(`#piece${j+1}${i}`)
            //check for class player
            for( let z = 0; z < 5; z++){}
            if(currentRowCol.classList.contains(`player`)){
                // check the row above and below if it has the current color
                if(rowAbove.classList.contains(currentColor)){
                    rowAbove.classList.add("player");
                    row-=1;
                }
                if(rowBelow.classList.contains(currentColor)){
                    rowBelow.classList.add("player");
                    row+=1;
                }

                ////////so far this just checks one column? 
                ///////need to check the rows next to the columns too
            }
        }
    }
}*/


////////need to somehow limit the color able to choose by current ones played
//maybe put up a modal in the exact position of the color thats not clickable? 
// the modal will lock the color next turn
//maybe make an array that stores 2 colors at a time and it will close those 2
    //ex. color = [blue, red]
    // push(new color) and remove hidden class from that modal color
    //shift first index and give the modal a hidden class
const chooseRed = () =>{
    gameFunction(theColorsAvailable[0]);
    closeColorChoose();
}
const chooseYellow = () =>{
    gameFunction(theColorsAvailable[1]);
        closeColorChoose();
}
const chooseGreen = () =>{
    gameFunction(theColorsAvailable[2]);
        closeColorChoose();
}
const chooseBlue = () =>{
    gameFunction(theColorsAvailable[3]);
        closeColorChoose();
}
const chooseCyan = () =>{
    gameFunction(theColorsAvailable[4]);
        closeColorChoose();
}
const choosePurple = () =>{
    gameFunction(theColorsAvailable[5]);
        closeColorChoose();
}
const chooseGrey = () =>{
    gameFunction(theColorsAvailable[6]);
        closeColorChoose();
}










////////////////Event Listeners
startButton.addEventListener("click", closeTheOpening)
redButton.addEventListener("click", chooseRed)
yellowButton.addEventListener("click", chooseYellow)
greenButton.addEventListener("click", chooseGreen)
blueButton.addEventListener("click", chooseBlue)
cyanButton.addEventListener("click", chooseCyan)
purpleButton.addEventListener("click", choosePurple)
greyButton.addEventListener("click", chooseGrey)



