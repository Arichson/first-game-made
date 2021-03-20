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
const theFirstBoard = document.querySelector("#boardOne")

const theColorsAvailable = ["red", "yellow", "green", "blue", "cyan", "purple"," grey"]

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
        pieceColor += `<div id=board1Col${i} class="${colParity(i)} column">`
        for(let j = 0; j<10; j++){
        const newDiv = `<div id="piece${j}${i}" class="${theColorsAvailable[randNum(theColorsAvailable.length)]} theHexagons"></div>`;
        pieceColor += newDiv;
        }
        pieceColor += `</div>`
    }
    theFirstBoard.innerHTML = pieceColor;
}

firstBoardMaker();


