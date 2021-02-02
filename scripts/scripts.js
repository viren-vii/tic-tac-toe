var box = document.querySelectorAll('.box');
var board = [0,1,2,3,4,5,6,7,8];
var turn;
var restartAfterWin = false;
var finalWinner;
var boxId;
var winnerComibations = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
];
var pO = []; //O
var pX = []; //X
var xText = document.getElementById('xText');
var oText = document.getElementById('oText');
var tik = new Audio("../css/tik.mp3");
var tok = new Audio("../css/tok.mp3");
startGame();
var currentBoard = { };
function startGame(){
	clearBoard();
	box.forEach(box => box.addEventListener('click', handleClick, false));
}
function handleClick(square){
	boxOb = square.target;
	boxId = boxOb.id;
	turn%2 ? handleTurn(boxOb,'X',pX,oText,xText,tik) : handleTurn(boxOb,'O',pO,xText,oText,tok);
	turn++;
	if(turn>4){
		if(pO.length >= 3 && turn%2==1)
			checkWinner(pO,'O');
		if(pX.length >= 3 && turn%2==0)
			checkWinner(pX,'X');
	}
}

function handleTurn(boxOb,p,player,dom,rec,audio){
	currentBoard[boxId] = p;
	console.log(currentBoard);
	
	audio.play();
	boxOb.innerText = p;
	boxOb.removeEventListener('click',handleClick);
	rec.style.fontSize = '80px';
	rec.style.opacity = '0.5';
	dom.style.fontSize = '100px';
	dom.style.opacity = '1';
	player.push(parseInt(boxOb.id));
	
	//console.log(Object.keys(currentBoard).length);
	if(Object.keys(currentBoard).length == 9)winner('tie');
}

function checkWinner(player,p){
	//console.log("CHECKING "+p);
	player.sort();
	
	for(i =0; i<winnerComibations.length; i++){
		found = 0;
		for(j =0; j<winnerComibations[i].length; j++){
			//console.log(winnerComibations[i]+"---"+player);
			if(player.includes(winnerComibations[i][j]))
				found++;
			else break;
		}
		if(found==3){
			winnerBlocks = winnerComibations[i];
			winner(p);
			break;
		}
	}
	return;
}

function winner(p){
	if(p == 'tie'){
		document.getElementById('winner').innerText = 'Its a tie!';
		document.getElementById('winner').style.visibility = 'visible';
		document.getElementById('currentTurn').classList.add('rotate');
		oText.style.opacity = '1';
		xText.style.opacity = '1';
		oText.style.fontSize = '100px';
		xText.style.fontSize = '100px';
		return;
	}
	console.log(p+" WON");
	document.getElementById('winner').innerText = p+' is the Winner!';
	if(p == 'O'){
		oText.style.fontSize = '120px';
		oText.style.opacity = '1';
		xText.style.fontSize = '80px';
		xText.style.opacity = '0.5';
	}
	else{
		xText.style.fontSize = '120px';
		xText.style.opacity = '1';
		oText.style.fontSize = '80px';
		oText.style.opacity = '0.5';
	}
	document.getElementById('winner').style.visibility = 'visible';
	//if(p == 'O')document.body.style.backgroundImage = "url('../css/circle.png')";
	//else if (p == 'X')document.body.style.backgroundImage = "url('../css/cross.png')";
	box[winnerBlocks[0]].classList.add('blink_me');
	box[winnerBlocks[1]].classList.add('blink_me');
	box[winnerBlocks[2]].classList.add('blink_me');
	restartAfterWin = true;
	box.forEach(box => box.removeEventListener('click', handleClick));
	document.getElementById('currentTurn').classList.add('rotate');
	finalWinner = p;
}

function clearBoard(){
	box.forEach(box => box.innerText ='');
	oText.style.fontSize = '100px';
	oText.style.opacity = '1';
	xText.style.fontSize = '100px';
	xText.style.opacity = '1';
	pO = [];
	pX = [];
	p='';
	currentBoard = { };
	if(finalWinner == 'O')turn = 1;
	else turn = 0;
	
	if(restartAfterWin){
		box[winnerBlocks[0]].classList.remove('blink_me');
		box[winnerBlocks[1]].classList.remove('blink_me');
		box[winnerBlocks[2]].classList.remove('blink_me');
	}
	document.getElementById('currentTurn').classList.remove('rotate');

	
	document.getElementById('winner').style.visibility = 'hidden';
	document.body.style.removeProperty('background-image');
	document.body.style.backgroundColor = "black";

}

window.addEventListener('load', function(e) {
    if (navigator.onLine) {
        console.log('We\'re online!');
    } else {
        console.log('We\'re offline...');
    }
}, false);
