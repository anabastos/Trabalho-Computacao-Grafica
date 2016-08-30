'use strict'

const w = 1000;
const h = 600;

const letras= {};

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

function fazerPonto (x, y, cor){
	context.fillStyle = cor;
	context.fillRect(x, y, 5, 5);
}

function fazerPontinho (numero, cor) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	fazerPonto(w/2, h/2, cor);

	var j = 1;
	for (var i = 1 ; i < numero; i++){
		if (i % 2 == 1){
			fazerPonto(w/2 + 10 * j, h/2, cor);
			fazerPonto(w/2 - 10 * j, h/2, cor);
			fazerPonto(w/2, h/2 + 10 * j, cor);
			fazerPonto(w/2, h/2 - 10 * j, cor);
		}

		if (i % 2 == 0){
			fazerPonto(w/2 + 10 * j, h/2 - 10, cor);
			fazerPonto(w/2 - 10 * j, h/2 + 10, cor);
			fazerPonto(w/2 + 10, h/2 + 10 * j, cor);
			fazerPonto(w/2 - 10, h/2 - 10 * j, cor);
			j++
		}

	}
}

function fazerReta (x1, y1, x2, y2, cor) {
	x1 = Number(x1);
	x2 = Number(x2);
	y1 = Number(y1);
	y2 = Number(y2);
	context.clearRect(0, 0, canvas.width, canvas.height);
	//equacao da reta
	var dx = x2 - x1;
	var dy = y2 - y1;
	var d = 2 * dy - dx;
	var y = y1;

	context.beginPath();
	for (var x = x1; x < x2; x += 1) {
		if (d <= 0) {
			d += 2 * dy;
		} else {
			d += 2 * (dy - dx);
			y += 1;
		}
		context.moveTo(x, canvas.height - y);
		fazerPonto(x, canvas.height - y, cor);
	}
	context.stroke();
}

function fazerCirculo (h, k, r, corlinha, cordentro, limpa = 1){
	var step = 2*Math.PI/200;
	if (limpa == 1){
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
	context.beginPath(); 

	for(var theta=0;  theta < 2*Math.PI;  theta+=step) {
		var x = Number(h) + Number(r)*Math.cos(theta);
			var y = Number(k) - Number(r)*Math.sin(theta);  
			context.fillStyle = cordentro;
			context.fill();
			context.lineWidth = 5;
			context.strokeStyle = corlinha;
			context.lineTo(x,y);
	}

		context.closePath();   
		context.stroke();  
}


function fazerLetra (letra, cor) {
	context.clearRect(0, 0, canvas.width, canvas.height);

	var a = [[1 , 1 , 1],
	[1 , 0 , 1],
	[1 , 1 , 1],
	[1 , 0 , 1],
	[1 , 0 , 1]];

	var b = [[1 , 1 , 1],
	[1 , 0 , 1],
	[1 , 1 , 0],
	[1 , 0 , 1],
	[1 , 1 , 1]];

	var c = [[1 , 1 , 1],
	[1 , 0 , 0],
	[1 , 0 , 0],
	[1 , 0 , 0],
	[1 , 1 , 1]];

	var d = [[1 , 1 , 0],
	[1 , 0 , 1],
	[1 , 0 , 1],
	[1 , 0 , 1],
	[1 , 1 , 0]];

	var e = [[1 , 1 , 1],
	[1 , 0 , 0],
	[1 , 1 , 1],
	[1 , 0 , 0],
	[1 , 1 , 1]];

	var f = [[1 , 1 , 1],
	[1 , 0 , 0],
	[1 , 1 , 1],
	[1 , 0 , 0],
	[1 , 0 , 0]];

	var g = [[1 , 1 , 1],
	[1 , 0 , 0],
	[1 , 1 , 1],
	[1 , 0 , 1],
	[1 , 1 , 1]];

	var h = [[1 , 0 , 1],
	[1 , 0 , 1],
	[1 , 1 , 1],
	[1 , 0 , 1],
	[1 , 0 , 1]];

	var i = [[0 , 1 , 0],
	[0 , 0 , 0],
	[0 , 1 , 0],
	[0 , 1 , 0],
	[0 , 1 , 0]];

	var j = [[0 , 0 , 1],
	[0 , 0 , 1],
	[0 , 0 , 1],
	[1 , 0 , 1],
	[0 , 1 , 0]];

	var k = [[1 , 0 , 1],
	[1 , 0 , 1],
	[1 , 1 , 0],
	[1 , 0 , 1],
	[1 , 0 , 1]];


	var l = [[1 , 0 , 0],
	[1 , 0 , 0],
	[1 , 0 , 0],
	[1 , 0 , 0],
	[1 , 1 , 1]];

	var m = [[1 , 0 , 1],
	[1 , 1 , 1],
	[1 , 0 , 1],
	[1 , 0 , 1],
	[1 , 0 , 1]];

	var n = [[1 , 0 , 1],
	[1 , 1 , 1],
	[1 , 1 , 1],
	[1 , 0 , 1],
	[1 , 0 , 1]];

	var o = [[1 , 1 , 1],
	[1 , 0 , 1],
	[1 , 0 , 1],
	[1 , 0 , 1],
	[1 , 1 , 1]];

	var p = [[1 , 1 , 1],
	[1 , 0 , 1],
	[1 , 1 , 1],
	[1 , 0 , 0],
	[1 , 0 , 0]];

	var q = [[1 , 1 , 1],
	[1 , 0 , 1],
	[1 , 0 , 1],
	[1 , 1 , 1],
	[0 , 0 , 1]];


	var r = [[1 , 1 , 1],
	[1 , 0 , 1],
	[1 , 1 , 0],
	[1 , 1 , 1],
	[1 , 0 , 1]];

	var s = [[1 , 1 , 1],
	[1 , 0 , 0],
	[1 , 1 , 1],
	[0 , 0 , 1],
	[1 , 1 , 1]];

	var t = [[1 , 1 , 1],
	[0 , 1 , 0],
	[0 , 1 , 0],
	[0 , 1 , 0],
	[0 , 1 , 0]];

	var u = [[1 , 0 , 1],
	[1 , 0 , 1],
	[1 , 0 , 1],
	[1 , 0 , 1],
	[1 , 1 , 1]];

	var v = [[1 , 0 , 1],
	[1 , 0 , 1],
	[1 , 0 , 1],
	[1 , 0 , 1],
	[0 , 1 , 0]];

	var x = [[1 , 0 , 1],
	[1 , 0 , 1],
	[1 , 1 , 1],
	[1 , 0 , 1],
	[1 , 0 , 1]];

	var y = [[1 , 0 , 1],
	[1 , 0 , 1],
	[1 , 1 , 1],
	[0 , 1 , 0],
	[0 , 1 , 0]];

	var z = [[1 , 0 , 1],
	[0 , 0 , 0],
	[1 , 1 , 0],
	[1 , 0 , 0],
	[1 , 1 , 1]];

	letra = eval(letra.toLowerCase());
	var i, j;
	for (i = 0; i < letra.length; i++){
		for (j = 0; j < letra[i].length; j ++){
			if (letra[i][j] == 1){
				fazerCirculo (250 + (j + 1)* 130, (i + 1) * 100, 50, cor, cor, 0);
			}
		}
	}
}


