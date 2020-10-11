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
        
function divide(item, index){
    randomizeArray(images, randomArray)
    randomArray.forEach(divideImages)
}

function myFunction(myID){
    if(selNo == 0 && gameOn == 1){
        eID(myID).style.opacity = "1"
        firstSel = myID
        selNo = 1
    } else if(selNo == 1 && gameOn == 1 && firstSel != myID) {
        eID(myID).style.opacity = "1"
        secondSel = myID.toString()    
        var x = eID(firstSel).src
        var y = eID(secondSel).src
        console.log(x)
        console.log(y)
        if(x == y){
            images.splice(images.indexOf(randomImg), 1)
            characters.splice(characters.indexOf(x))
            console.log("match")
            document.getElementById("card" + firstSel).style.height = "2vh"
            document.getElementById("card" + firstSel).style.backgroundColor = "yellow"
            document.getElementById("card" + firstSel).style.borderRadius = "50%"

            document.getElementById("card" + secondSel).style.height = "2vh"
            document.getElementById("card" + secondSel).style.backgroundColor = "yellow"
            document.getElementById("card" + secondSel).style.borderRadius = "50%"

            if(playerTurn == 1){
                player1Points += 1
                document.getElementById("p1points").innerHTML = player1Points
                document.getElementById("AB").innerHTML = "B"
                playerTurn = 2
            }else{
                player2Points += 1
                document.getElementById("AB").innerHTML = "A"
                document.getElementById("p2points").innerHTML = player2Points
                playerTurn = 1
            }
        } else {
            gameOn = 0
            setTimeout(clear, 1000, firstSel, secondSel);
            if(playerTurn == 1){
                playerTurn = 2
                document.getElementById("AB").innerHTML = "B"
            } else {
                playerTurn = 1
                document.getElementById("AB").innerHTML = "A"
            }
        }
        selNo = 0
    }
}

function clear(firstSel, secondSel){
    eID(firstSel).style.opacity = "0"
    eID(secondSel).style.opacity = "0"
    gameOn = 1
}

function eID(eid){
    return document.getElementById("img" + eid.toString())
}

function cID(eid){
    return document.getElementById("card" + eid.toString())
}