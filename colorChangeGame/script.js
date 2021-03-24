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
const colorChooseModal = document.querySelector("#colorChoose");
const redButton = document.querySelector("#redButton");
const yellowButton = document.querySelector("#yellowButton");
const greenButton = document.querySelector("#greenButton");
const blueButton = document.querySelector("#blueButton");
const cyanButton = document.querySelector("#cyanButton");
const purpleButton = document.querySelector("#purpleButton");
const greyButton = document.querySelector("#greyButton");




///////////Variables
const theColorsAvailable = ["red", "yellow", "green", "blue", "cyan", "purple","grey"];
const firstBoardArray = [];
const secondBoardArray = [];
const thirdBoardArray = [];
const players = ["player", "enemy"];
const playerCurrentColor = theColorsAvailable[0];
const enemyCurrentColor = theColorsAvailable[6];

let turns = 0;

///////////Functions
const playersTurns = () => {
 
    const currentTurn = turns % 2;

    if( currentTurn === 0) {
        return players[0];
    } else {
        return players[1];
    }
}
const randNum = (limit) => {
    return Math.floor(Math.random() * limit);
}
const firstBoardMaker = () => {
    let pieceColor = "";
    
    for(let i = 0; i < 10; i++) {
        const colParity = () => {
            if (i % 2 === 0){
                return "colEven";
            } else {
                return "colOdd";
            }
        }
        const colArray = [];
        pieceColor += `<div id=board1Col${i} class="${colParity(i)} column">`;
        for(let j = 0; j<10; j++){
            const owner = () =>{
                if(i===0 && j === 9){
                    return players[0];
                } else if (i === 9 && j === 0){
                    return players[1];
                } else {
                    return "none";
                }
            }
            const currentColor = "red"
            // theColorsAvailable[randNum(theColorsAvailable.length);
            const newDiv = `<div id="piece${j}${i}" class="${currentColor} theHexagons ${owner()}"></div>`;
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
    openingModal.classList.add("closeModal");
    colorChooseModal.classList.remove("closeModal");
}
const closeColorChoose = () => {
    // colorChooseModal.classList.add("closeModal");
}
// console.log(playersTurns())

const removeColor = (theTarget) => {
    theColorsAvailable.forEach( color => {
        theTarget.classList.remove(color);
    })
}
const changePlayerColor = (currentColor, character) => {
    firstBoardArray.forEach( array =>{
        array.forEach(object => {
            if( object.owner === character){
                object.color = currentColor;
                const rowColTarget = document.querySelectorAll(`.${character}`);
                // console.log(rowColTarget.length);
                for( let i = 0; i < rowColTarget.length; i++){
                    removeColor(rowColTarget[i]);
                    rowColTarget[i].classList.add(currentColor);
                    // console.log(rowColTarget[i].classList.contains(character));
                }
            }
        })
    })
}
const checkAbove = (j, i, currentColor, character) => {
    const rowAbove = j-1;
    const rowAboveChecked = document.querySelector(`#piece${rowAbove}${i}`);
    const currentRowCol = document.querySelector(`#piece${j}${i}`);
    if(currentRowCol.classList.contains(character)){
        if(rowAboveChecked.classList.contains(currentColor) && (rowAbove >= 0 && rowAbove<=9) && rowAboveChecked.classList.contains('none')){
            rowAboveChecked.classList.remove('none');
            rowAboveChecked.classList.add(character);
        }
        console.log("above")
    }
}
const checkBelow = (j, i, currentColor, character) => {
    const rowBelow = j+1;
    const rowBelowChecked = document.querySelector(`#piece${rowBelow}${i}`);
    const currentRowCol = document.querySelector(`#piece${j}${i}`);
    if(currentRowCol.classList.contains(character)){
        if(rowBelowChecked.classList.contains(currentColor) && (rowBelow <= 9 && rowBelow >= 0) && rowBelowChecked.classList.contains('none')){
            rowBelowChecked.classList.remove('none');
            rowBelowChecked.classList.add(character);
        }
        console.log("below")
    }
}
const checkLeft = (j, i, currentColor, character) => {
    const sameRow = j;
    const rowBelow = j+1;
    const rowAbove = j - 1;
    const currentRowCol = document.querySelector(`#piece${j}${i}`);
    if( i % 2 === 0){
        const rowBotLeft = document.querySelector(`#piece${rowBelow}${i-1}`);
        const rowTopLeft = document.querySelector(`#piece${sameRow}${i-1}`);
        if(currentRowCol.classList.contains(character)){
            console.log("leftE")
            if(rowBelow <= 9 && rowBelow >= 0){
                if(rowBotLeft.classList.contains(currentColor) && rowBotLeft.classList.contains('none')){
                    rowBotLeft.classList.remove('none');
                    rowBotLeft.classList.add(character);
                }
            }  
            if(sameRow <= 9 && sameRow >= 0){ 
                if(rowTopLeft.classList.contains(currentColor) && rowTopLeft.classList.contains('none')){
                    rowTopLeft.classList.remove('none');
                    rowTopLeft.classList.add(character);
                }
            }
        }
    } else {
        const rowBotLeft = document.querySelector(`#piece${sameRow}${i-1}`);
        const rowTopLeft = document.querySelector(`#piece${rowAbove}${i-1}`);
        if(currentRowCol.classList.contains(character)){
            console.log("leftO")
            if(sameRow <= 9 && sameRow >= 0){
                if(rowBotLeft.classList.contains(currentColor) && rowBotLeft.classList.contains('none')){
                    rowBotLeft.classList.remove('none');
                    rowBotLeft.classList.add(character);
                }
            }
            if(rowAbove <= 9 && rowAbove >= 0){
                if(rowTopLeft.classList.contains(currentColor) && rowTopLeft.classList.contains('none')){
                    rowTopLeft.classList.remove('none');
                    rowTopLeft.classList.add(character);
                }
            }
        }
    }
}
const checkRight = (j, i, currentColor, character) => {
    const sameRow = j;
    const rowBelow = j+1;
    const rowAbove = j - 1;
    const currentRowCol = document.querySelector(`#piece${j}${i}`);
    if( i % 2 === 0){
        const rowBotRight = document.querySelector(`#piece${rowBelow}${i+1}`);
        const rowTopRight = document.querySelector(`#piece${sameRow}${i+1}`);
        if(currentRowCol.classList.contains(character)){
            console.log("rightE")
            if(rowBelow <= 9 && rowBelow >= 0){
                if(rowBotRight.classList.contains(currentColor) && rowBotRight.classList.contains('none')){
                    rowBotRight.classList.remove('none');
                    rowBotRight.classList.add(character);
                }
            }
            if(sameRow <= 9 && sameRow >= 0){
                if(rowTopRight.classList.contains(currentColor) && rowTopRight.classList.contains('none')){
                    rowTopRight.classList.remove('none');
                    rowTopRight.classList.add(character);
                }
            }
        }
    } else {
        const rowBotRight = document.querySelector(`#piece${sameRow}${i+1}`);
        const rowTopRight = document.querySelector(`#piece${rowAbove}${i+1}`);
        if(currentRowCol.classList.contains(character)){
            console.log("rightO")
            if(sameRow <= 9 && sameRow >= 0){
                if(rowBotRight.classList.contains(currentColor) && rowBotRight.classList.contains('none')){
                    rowBotRight.classList.remove('none');
                    rowBotRight.classList.add(character);
                }
            }
            if(rowAbove <= 9 && rowAbove >= 0){
                if(rowTopRight.classList.contains(currentColor) && rowTopRight.classList.contains('none')){
                    rowTopRight.classList.remove('none');
                    rowTopRight.classList.add(character);
                }
            }
        }
    }
}
const goForward = (currentColor) => {
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            if(j>0){
                checkAbove(j, i, currentColor, playersTurns());}
            if(j < 9) {
                checkBelow(j, i, currentColor, playersTurns());}
            if(i > 0 && j>=0 && j <= 9){
                checkLeft(j, i, currentColor, playersTurns())}
            if(i < 9 && j>=0 && j <= 9){
                checkRight(j, i, currentColor, playersTurns())}
                ////////so far this just checks one column? 
                ///////need to check the rows next to the columns too
            changePlayerColor(currentColor, playersTurns());
        }          
    }
}

const goBackwards = (currentColor) => {
    for(let i = 9; i >= 0; i--){
        for(let j = 9; j >= 0; j--){
            if(j>0){
                checkAbove(j, i, currentColor, playersTurns());}
            if(j < 9) {
                checkBelow(j, i, currentColor, playersTurns());}
            if(i > 0 && j>=0 && j <= 9){
                checkLeft(j, i, currentColor, playersTurns())}
            if(i < 9 && j>=0 && j <= 9){
                checkRight(j, i, currentColor, playersTurns())}
                ////////so far this just checks one column? 
                ///////need to check the rows next to the columns too
            changePlayerColor(currentColor, playersTurns());
        }          
    }

}


const gameFunction = (currentColor) => {
    goForward(currentColor);
    goBackwards(currentColor);
    goForward(currentColor);
    goBackwards(currentColor);
    goForward(currentColor);
    goBackwards(currentColor);


    turns += 1;
}


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



