var box = document.querySelectorAll('.box');
var board = [0,1,2,3,4,5,6,7,8];
var turn;
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
startGame();

function startGame(){
	clearBoard();
	box.forEach(box => box.addEventListener('click', handleClick, false));
}
function handleClick(square){
	boxOb = square.target;
	boxId = boxOb.id;
	turn%2 ? handleTurn(boxOb,'X',pX,oText,xText) : handleTurn(boxOb,'O',pO,xText,oText);
	turn++;
	if(turn>4){
		if(pO.length >= 3 && turn%2==1)
			checkWinner(pO,'O');
		if(pX.length >= 3 && turn%2==0)
			checkWinner(pX,'X');
	}
}

function handleTurn(boxOb,p,player,dom,rec){
	boxOb.innerText = p;
	boxOb.removeEventListener('click',handleClick);
	rec.style.fontSize = '80px';
	rec.style.opacity = '0.5';
	dom.style.fontSize = '100px';
	dom.style.opacity = '1';
	player.push(parseInt(boxOb.id));
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
			winner(p);
			break;
		}
	}
	return;
}

function winner(p){
	op = document.getElementById('winner').style.opacity;
	i = 0;
	while(i!=1){
		op = i;
		i+=0.1;
	}
}

function clearBoard(){
	box.forEach(box => box.innerText ='');
	oText.style.fontSize = '100px';
	oText.style.opacity = '1';
	xText.style.fontSize = '100px';
	xText.style.opacity = '1';
	pO = [];
	pX = [];
	turn = 0;
}

window.addEventListener('load', function(e) {
    if (navigator.onLine) {
        console.log('We\'re online!');
    } else {
        console.log('We\'re offline...');
    }
}, false);
