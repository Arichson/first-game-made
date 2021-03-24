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
const theSecondBoard = document.querySelector("#boardTwo");
const theThirdBoard = document.querySelector("#boardThree");
const startButton = document.querySelector("#start");
const openingModal = document.querySelector("#opening");
const colorChooseModal = document.querySelector("#colorChoose");
const enemyColorChooseModal = document.querySelector("#enemyColorChoose");
const redButton = document.querySelectorAll(".redButton");
const yellowButton = document.querySelectorAll(".yellowButton");
const greenButton = document.querySelectorAll(".greenButton");
const blueButton = document.querySelectorAll(".blueButton");
const cyanButton = document.querySelectorAll(".cyanButton");
const purpleButton = document.querySelectorAll(".purpleButton");
const greyButton = document.querySelectorAll(".greyButton");
const redButtonFake = document.querySelectorAll(".redButtonFake");
const yellowButtonFake = document.querySelectorAll(".yellowButtonFake");
const greenButtonFake = document.querySelectorAll(".greenButtonFake");
const blueButtonFake = document.querySelectorAll(".blueButtonFake");
const cyanButtonFake = document.querySelectorAll(".cyanButtonFake");
const purpleButtonFake = document.querySelectorAll(".purpleButtonFake");
const greyButtonFake = document.querySelectorAll(".greyButtonFake");
const fake1 = document.querySelector(".fake1")
const fake2 = document.querySelector(".fake2")
const whoseTurn = document.querySelector("#whoseTurn")
let wonFirstBoard = true;
let wonSecondBoard = false;
let wonThirdBoard = false;
///////////Variables
const theColorsAvailable = ["red", "yellow", "green", "blue", "cyan", "purple","grey"];
const unChoosableColorOne = [];
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
const turnChange = () =>{
    if(playersTurns() === players[0]){
        if(fake1.classList.contains("closeModal")){
            fake1.classList.remove("closeModal")
            colorChooseModal.classList.remove("closeModal")
            
            fake2.classList.add("closeModal")
            enemyColorChooseModal.classList.add("closeModal")
        
        }
    } else {
        if(fake2.classList.contains("closeModal")){
            fake2.classList.remove("closeModal")
            enemyColorChooseModal.classList.remove("closeModal")
            
            fake1.classList.add("closeModal")
            colorChooseModal.classList.add("closeModal")
        }
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
            const currentColor = theColorsAvailable[randNum(theColorsAvailable.length)];
            const newDiv = `<div id="piece${j}${i}" class="${currentColor} theHexagons ${owner()}"></div>`;
            pieceColor += newDiv;
            colArray.push({
                color: currentColor,
                column: i,
                row: j,
                owner: owner(),
                point: 1,
            })
            if(i===0 && j === 9 || i === 9 && j === 0){
                unChoosableColorOne.push(currentColor);
                const lostColor = document.querySelectorAll(`.${currentColor}ButtonFake`)
                lostColor[0].classList.remove("closeModal")
                lostColor[1].classList.remove("closeModal")
            } 
        }
        pieceColor += `</div>`
        firstBoardArray.push(colArray);
    }
    theFirstBoard.innerHTML = pieceColor;
}
const secondBoardMaker = () => {
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
                if(i===0 && j === 0){
                    return players[0];
                } else if (i === 9 && j === 9){
                    return players[1];
                } else if (i > 4 && i < 6 && j>4 && j < 6){
                    return "void"
                } else {
                    return "none";
                }
            }
            const currentColor = () => {
                if (i > 2 && i < 7 && j>2 && j < 7){
                    return "void"
                }
                return theColorsAvailable[randNum(theColorsAvailable.length)];
            }
            const colorChosen = currentColor();
            const newDiv = `<div id="piece${j}${i}" class="${colorChosen} theHexagons ${owner()}"></div>`;
            pieceColor += newDiv;
            colArray.push({
                color: colorChosen,
                column: i,
                row: j,
            })
            if(i===0 && j === 0 || i === 9 && j === 9){
                console.log(i)
                console.log(j)
                console.log(colorChosen)
                unChoosableColorOne.push(colorChosen);
                const lostColor = document.querySelectorAll(`.${colorChosen}ButtonFake`)
                lostColor[0].classList.remove("closeModal")
                lostColor[1].classList.remove("closeModal")
            } 
        }
        pieceColor += `</div>`
    }
    theSecondBoard.innerHTML = pieceColor;
}
const thirdBoardMaker = () => {
    let pieceColor = "";
    for(let i = 0; i < 14; i++) {
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
                if(i===13 && j === 5){
                    return players[0];
                } else if (i === 0 && j === 5){
                    return players[1];
                } else if (i > 4 && i < 6 && j>4 && j < 6){
                    return "void"
                } else {
                    return "none";
                }
            }
            const currentColor = () => {
                if (i > 2 && i < 7 && j>2 && j < 7){
                    return "void"
                }
                return theColorsAvailable[randNum(theColorsAvailable.length)];
            }
            const colorChosen = currentColor();
            const newDiv = `<div id="piece${j}${i}" class="${colorChosen} theThirdHexagons ${owner()}"></div>`;
            pieceColor += newDiv;
            colArray.push({
                color: colorChosen,
                column: i,
                row: j,
            })
            if(i===9 && j === 5 || i === 0 && j === 5){
                console.log(i)
                console.log(j)
                console.log(colorChosen)
                unChoosableColorOne.push(colorChosen);
                const lostColor = document.querySelectorAll(`.${colorChosen}ButtonFake`)
                lostColor[0].classList.remove("closeModal")
                lostColor[1].classList.remove("closeModal")
            } 
        }
        pieceColor += `</div>`
    }
    theThirdBoard.innerHTML = pieceColor;
}
const closeTheOpening = () => {
    openingModal.classList.add("closeModal");
    colorChooseModal.classList.remove("closeModal");
    fake1.classList.remove("closeModal")
    // firstBoardMaker();
    // secondBoardMaker();
    thirdBoardMaker();
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
const changePlayerColor = (board, currentColor, character) => {
    board.forEach( array =>{
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
const goForward = (board, currentColor) => {
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
            changePlayerColor(board, currentColor, playersTurns());
        }          
    }
}
const goBackwards = (board, currentColor) => {
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
            changePlayerColor(board, currentColor, playersTurns());
        }          
    }

}
const checkWin = () =>{
    let playerPoints = 0;
    let enemyPoints = 0;
    let noPoints = 0;

    for(let i = 0; i < 10; i++){
        for( let j = 0; j < 10; j++){
            const thePiece = document.querySelector(`#piece${j}${i}`);
            if(thePiece.classList.contains(players[0])){
                playerPoints +=1;
            }
            if(thePiece.classList.contains(players[1])){
                enemyPoints +=1;
            }
            if(thePiece.classList.contains('none')){
                noPoints +=1;
            }
        }
    }
    const totalPoints = playerPoints + enemyPoints + noPoints;
    const turnString = `<h4>Player: ${(playerPoints/totalPoints) * 100}% </h4><h1 id="tellTurn">${playersTurns().toUpperCase()}'S TURN<h1><h4>Enemy: ${(enemyPoints/totalPoints) * 100}% </h4>`;
    whoseTurn.innerHTML = turnString
    if(playerPoints/totalPoints >= 1/2 && wonFirstBoard === false){
        console.log("Player wins")
        wonFirstBoard = true;
        theFirstBoard.innerHTML = "";
        for (let i = 0; i < unChoosableColorOne; i++){
            unChoosableColorOne.shift();
        }
        secondBoardMaker();
    }
    if(enemyPoints/totalPoints >= 1/2 && wonFirstBoard === false){
        console.log("enemy wins")
    }
    if(playerPoints/totalPoints >= 1/2 && wonSecondBoard === false && wonFirstBoard === true){
        console.log("Player wins")
        wonSecondBoard = true;
        theSecondBoard.innerHTML = "";
        for (let i = 0; i < unChoosableColorOne; i++){
            unChoosableColorOne.shift();
        }
        thirdBoardMaker();
    }
    if(enemyPoints/totalPoints >= 1/2 && wonThirdBoard === false && wonSecondBoard === true){
        console.log("enemy wins")
    }
    if(playerPoints/totalPoints >= 1/2 && wonThirdBoard === false && wonSecondBoard === true){
        console.log("Player wins")
        wonThirdBoard = true;
        alert("YOU WON!!!!!!")
    }
    if(enemyPoints/totalPoints >= 1/2 && wonSecondBoard === false && wonFirstBoard === true){
        console.log("enemy wins")
    }
}
const gameFunction = (currentColor) => {
    if(wonFirstBoard === false){
        goForward(firstBoardArray, currentColor);
        goBackwards(firstBoardArray, currentColor);
        checkWin();
        turns += 1;
        turnChange();
    } else if (wonSecondBoard === false) {
        goForward(secondBoardArray, currentColor);
        goBackwards(secondBoardArray, currentColor);
        checkWin();
        turns += 1;
        turnChange();
    } else if (wonThirdBoard === false) {
        goForward(secondBoardArray, currentColor);
        goBackwards(secondBoardArray, currentColor);
        checkWin();
        turns += 1;
        turnChange();
    }
    
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
    unChoosableColorOne.push(theColorsAvailable[0]);
    redButtonFake[0].classList.remove("closeModal")
    redButtonFake[1].classList.remove("closeModal")
    const removedColor = unChoosableColorOne.shift();
    const hideFakeButton = document.querySelectorAll(`.${removedColor}ButtonFake`)
    hideFakeButton[0].classList.add("closeModal")
    hideFakeButton[1].classList.add("closeModal")
    closeColorChoose();
}
const chooseYellow = () =>{
    gameFunction(theColorsAvailable[1]);
    unChoosableColorOne.push(theColorsAvailable[1]);
    yellowButtonFake[0].classList.remove("closeModal")
    yellowButtonFake[1].classList.remove("closeModal")
    const removedColor = unChoosableColorOne.shift();
    const hideFakeButton = document.querySelectorAll(`.${removedColor}ButtonFake`)
    hideFakeButton[0].classList.add("closeModal")
    hideFakeButton[1].classList.add("closeModal")
    closeColorChoose();
}
const chooseGreen = () =>{
    gameFunction(theColorsAvailable[2]);
    unChoosableColorOne.push(theColorsAvailable[2]);
    greenButtonFake[0].classList.remove("closeModal")
    greenButtonFake[1].classList.remove("closeModal")
    const removedColor = unChoosableColorOne.shift();
    const hideFakeButton = document.querySelectorAll(`.${removedColor}ButtonFake`)
    hideFakeButton[0].classList.add("closeModal")
    hideFakeButton[1].classList.add("closeModal")
    closeColorChoose();
}
const chooseBlue = () =>{
    gameFunction(theColorsAvailable[3]);
    unChoosableColorOne.push(theColorsAvailable[3]);
    blueButtonFake[0].classList.remove("closeModal")
    blueButtonFake[1].classList.remove("closeModal")
    const removedColor = unChoosableColorOne.shift();
    const hideFakeButton = document.querySelectorAll(`.${removedColor}ButtonFake`)
    hideFakeButton[0].classList.add("closeModal")
    hideFakeButton[1].classList.add("closeModal")
    closeColorChoose();
}
const chooseCyan = () =>{
    gameFunction(theColorsAvailable[4]);
    unChoosableColorOne.push(theColorsAvailable[4]);
    cyanButtonFake[0].classList.remove("closeModal")
    cyanButtonFake[1].classList.remove("closeModal")
    const removedColor = unChoosableColorOne.shift();
    const hideFakeButton = document.querySelectorAll(`.${removedColor}ButtonFake`)
    hideFakeButton[0].classList.add("closeModal")
    hideFakeButton[1].classList.add("closeModal")
    closeColorChoose();
}
const choosePurple = () =>{
    gameFunction(theColorsAvailable[5]);
    unChoosableColorOne.push(theColorsAvailable[5]);
    purpleButtonFake[0].classList.remove("closeModal")
    purpleButtonFake[1].classList.remove("closeModal")
    const removedColor = unChoosableColorOne.shift();
    const hideFakeButton = document.querySelectorAll(`.${removedColor}ButtonFake`)
    hideFakeButton[0].classList.add("closeModal")
    hideFakeButton[1].classList.add("closeModal")
    closeColorChoose();
}
const chooseGrey = () =>{
    gameFunction(theColorsAvailable[6]);
    unChoosableColorOne.push(theColorsAvailable[6]);
    greyButtonFake[0].classList.remove("closeModal")
    greyButtonFake[1].classList.remove("closeModal")
    const removedColor = unChoosableColorOne.shift();
    const hideFakeButton = document.querySelectorAll(`.${removedColor}ButtonFake`)
    hideFakeButton[0].classList.add("closeModal")
    hideFakeButton[1].classList.add("closeModal")
    closeColorChoose();
}
////////////////Event Listeners
startButton.addEventListener("click", closeTheOpening)
redButton[0].addEventListener("click", chooseRed)
yellowButton[0].addEventListener("click", chooseYellow)
greenButton[0].addEventListener("click", chooseGreen)
blueButton[0].addEventListener("click", chooseBlue)
cyanButton[0].addEventListener("click", chooseCyan)
purpleButton[0].addEventListener("click", choosePurple)
greyButton[0].addEventListener("click", chooseGrey)
redButton[1].addEventListener("click", chooseRed)
yellowButton[1].addEventListener("click", chooseYellow)
greenButton[1].addEventListener("click", chooseGreen)
blueButton[1].addEventListener("click", chooseBlue)
cyanButton[1].addEventListener("click", chooseCyan)
purpleButton[1].addEventListener("click", choosePurple)
greyButton[1].addEventListener("click", chooseGrey)