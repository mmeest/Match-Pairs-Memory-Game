// TODO list
//
// Randomize image array                    +++
// Page onload divide images                +++
// On first cell click reveal 1 image       +++
// On second cell click compare 2 images    +++
// Two players play one by one
// Animated background

var images = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13",
               "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13" ]     
var characters = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13" ]
var randomArray = []
var randomImg = ""
var selNo = 0
var firstSel = ""
var secondSel = ""
var gameOn = 1
var playerTurn = 1
var player1Points = 0
var player2Points = 0
var moves = 0
var rightMoves = 0

var chaSound = new Audio("sounds/Champion.mp3")
var dohSound = new Audio("sounds/Doh.mp3")
var kruSound = new Audio("sounds/Krusty.mp3")
var simSound = new Audio("sounds/Simpsons.mp3")
var cliSound = new Audio("sounds/Click.mp3")
var clikClick = cliSound.play()

// var gst // AUTO // SOLVE //
var gst = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13",              
    "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27" ]   

function randomizeArray(){
    for(i = images.length; i > 0; i -= 1){
        randomImg = images[Math.floor(Math.random() * images.length)]
        randomArray.push(randomImg)
        images.splice(images.indexOf(randomImg), 1)
    }
    console.log(randomArray)
    return randomArray
}

function divideImages(item, index){
    document.getElementById("img" + index.toString()).src = item + ".png"
}

// HTML body onload function
function divide(item, index){
    randomizeArray(images, randomArray)
    randomArray.forEach(divideImages)
    myVar = setInterval(myTimer ,1000)
}

var s = 0
var m = 0
// function to display timer 
function myTimer(){    
    s += 1
    if (s > 59){
        m += 1
        s = 0
    }
    if(s < 10){
        document.getElementById("time").innerHTML = "Time: " + m + ":0" + s + " min"
    }else{
        document.getElementById("time").innerHTML = "Time: " + m + ":" + s + " min"
    }
}

function myFunction(myID){
    // to play background music
    /* if(moves == 0){
        simSound.play().loop
    } */

    if(selNo == 0 && gameOn == 1){
        cliSound.play()
        eID(myID).style.opacity = "1"
        firstSel = myID
        selNo = 1
    } else if(selNo == 1 && gameOn == 1 && firstSel != myID) {
        cliSound.play()
        eID(myID).style.opacity = "1"
        secondSel = myID.toString()    
        var x = eID(firstSel).src
        var y = eID(secondSel).src
        if(x == y){
            console.log(firstSel + " " + secondSel + " " + gst.length)

            images.splice(images.indexOf(randomImg), 1)
            characters.splice(characters.indexOf(x))
            document.getElementById("card" + firstSel).style.height = "2vh"
            document.getElementById("card" + firstSel).style.backgroundColor = "yellow"
            document.getElementById("card" + firstSel).style.borderRadius = "50%"
            document.getElementById("img" + firstSel).style.height = "14vh"

            document.getElementById("card" + secondSel).style.height = "2vh"
            document.getElementById("card" + secondSel).style.backgroundColor = "yellow"
            document.getElementById("card" + secondSel).style.borderRadius = "50%"
            document.getElementById("img" + secondSel).style.height = "14vh"

            if(playerTurn == 1){
                player1Points += 1
                document.getElementById("p1points").innerHTML = player1Points
                document.getElementById("AB").innerHTML = "B"
                playerTurn = 2
            }else{
                player2Points += 1
                document.getElementById("AB").innerHTML = "A"
                document.getElementById("p2points").innerHTML = player2Points
                document.getElementById("card" + firstSel).style.backgroundColor = "blue"
                document.getElementById("card" + secondSel).style.backgroundColor = "blue"
                playerTurn = 1
            }
            rightMoves += 1
            if(rightMoves == 14){       // GAME OVER
                for(i = 0; i < 28; i++){
                    if(i % 2 == 0){     // to rotate characters at the end
                        for(k = 0; k < 28; k++){
                            if(k % 2 == 0){     // to rotate characters at the end
                                cID(k).classList.add("AA")
                            }else{
                                cID(k).classList.add("AB")
                            }
                        }
                    }else{
                        for(j = 0; j < 28; j++){
                            if(j % 2 == 0){     // to rotate characters at the end
                                cID(j).classList.add("BB")
                            }else{
                                cID(j).classList.add("BA")
                            }
                        }
                    }
                }
                document.getElementById("row0").classList.add("AB")
                document.getElementById("row1").classList.add("AA")
                document.getElementById("row2").classList.add("BA")
                document.getElementById("row3").classList.add("BB")

                document.getElementById("AB").style.visibility = "hidden"
                clearTimeout(myVar)     
            }
            moves += 1
            document.getElementById("moves").innerHTML = "Moves: " + moves
        } else {
            gameOn = 0
            setTimeout(clear, 1000, firstSel, secondSel);
            if(playerTurn == 1){
                playerTurn = 2
                document.getElementById("AB").innerHTML = "B"
                document.getElementById("AB").style.color = "blue"
            } else {
                playerTurn = 1
                document.getElementById("AB").innerHTML = "A"
                document.getElementById("AB").style.color = "yellow"
            }
            moves += 1
            document.getElementById("moves").innerHTML = "Moves: " + moves
        }
        selNo = 0
    }
}

function clear(firstSel, secondSel){
    eID(firstSel).style.opacity = "0"
    eID(secondSel).style.opacity = "0"
    gameOn = 1
}

eID = eid => document.getElementById("img" + eid.toString())

/* function eID(eid){
    return document.getElementById("img" + eid.toString())
} */

cID = eid => document.getElementById("card" + eid.toString())

/* function cID(eid){
    return document.getElementById("card" + eid.toString())
} */


//////////////////////// GAME /// SOLVER ////////////////////


var test = []
let firstRandom = ""
let secondRandom = ""
function gameSolver(){
    firstRandom = getRandom(gst)
    secondRandom = getRandom(gst)
    if(gst.length > 0){
        testout(firstRandom, secondRandom)
    }
}
function testout(firstRandom, secondRandom){
    if(firstRandom == secondRandom){
        gameSolver()
    } else {
        gSolver(firstRandom, secondRandom)
    }
}
function getRandom(gst){
    return gst[Math.floor(Math.random() * gst.length)]
}
function gSolver(firstRandom, secondRandom){
    console.log(gst)
    var v = eID(firstRandom).src
    var w = eID(secondRandom).src
    if(v === w){
        gst.splice(gst.indexOf(firstRandom), 1)
        gst.splice(gst.indexOf(secondRandom), 1)
    }
    if(gst.length > 0){
        setTimeout(gameSolver, 1500)
    }    
    onKlick(firstRandom)
    onKlick(secondRandom)
}
function onKlick(input){
    document.getElementById("card" + input).click()
}

mute = 0
function muteFunction(){
    console.log("hello")
    if(mute == 0){
        cliSound = ""
        document.getElementById("mute").style.borderColor = "green"
        document.getElementById("mute").innerHTML = "&#128266"
        mute = 1
    } else {
        cliSound = new Audio("sounds/Click.mp3")
        document.getElementById("mute").style.borderColor = "red"
        document.getElementById("mute").innerHTML = "&#x1f507;"
        mute = 1
    }
}

// Suvalise trajektoori genereerimise funktsioon
function randomizeMovement() {
  const randomX1 = Math.random() * 1000 - 500; // Väike juhuslik x-koordinaat
  const randomY1 = Math.random() * 1000 - 500; // Väike juhuslik y-koordinaat
  const randomX2 = Math.random() * 1000 - 500;
  const randomY2 = Math.random() * 1000 - 500;
  const randomX3 = Math.random() * 1000 - 500;
  const randomY3 = Math.random() * 1000 - 500;

  // Korrigeerime CSS-i @keyframes väärtusi vastavalt suvalistele trajektooridele
  const keyframes = `
    @keyframes example {
      0% { left: 0px; top: 0px; }
      25% { left: ${randomX1}px; top: ${randomY1}px; }
      50% { left: ${randomX2}px; top: ${randomY2}px; }
      75% { left: ${randomX3}px; top: ${randomY3}px; }
      100% { left: 0px; top: 0px; }
    }
  `;

  // Lisame uue CSS-i @keyframes reegli <style> elemendisse
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

  // Uuendame animatsiooni
  const alien = document.getElementById('aliens');
  alien.style.animation = 'example 12s infinite cubic-bezier(0.25, 0.8, 0.25, 1)';
}

// Käivitage randomizeMovement() kui leht laeb
window.onload = function() {
  randomizeMovement();
};
