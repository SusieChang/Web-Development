var img = "img/puzzle.jpg";
var ismove = 0;
var is_disrupt = 0;
var offSet = new Array();
var index = new Array();
var re_index = new Array();
var re_blank = new Array();
var blockWidth = 88;
var blockHeight = 88;
var blank_value = 15;
var complexity=14;//设置复杂度
var music;

window.onload = function() {
	initial();
	document.getElementById("tip").addEventListener('click',tip);
	document.getElementById("restart").addEventListener('click',disrupt_block);
};

/*初始布局和绑定点击拼图块事件*/
function initial() {
	offSet = [];
	index = [];
	re_index = [];
	re_blank = [];
	ismove = 0;
	is_disrupt = 0;
	for (var i = 0; i < 16; i++) {
		var inner = document.getElementById("inner");
		var block = document.createElement("div");
		block.className ="block";
		var top= "-" + parseInt(i%4)*blockHeight+"px";
		var left = "-" + parseInt(i/4)*blockWidth+"px";
		var t = String(top + " " + left);
		offSet.push(t);
		block.style.backgroundPosition = t;
		block.addEventListener('click',move);
		block.value = i;
		index.push(i);
		if(i == 15) block.style.backgroundImage="url()";
		inner.appendChild(block);
	}
}

/*移动后重新布局*/
function re_puzzle() {
	var puzzle =document.getElementsByClassName("block");
	for (var i =puzzle.length - 1; i >= 0; i--) {
	if(i == blank_value) puzzle[i].style.backgroundImage = "url()";
	else {puzzle[i].style.backgroundImage="url("+img+")";}
	puzzle[i].style.backgroundPosition = offSet[index[i]];
	}
}

/*移动拼图*/
function move() {
	ismove++;
	var temp = blank_value;
	if(this.value == blank_value) return;
	var row = Math.abs(parseInt(blank_value%4)-parseInt(this.value%4));
	var col = Math.abs(parseInt(blank_value/4)-parseInt(this.value/4));
		if((row == 1 && col == 0)||(row == 0 && col == 1)) {
			re_index.unshift(this.value);
			re_blank.unshift(blank_value);
			index[blank_value] = index[this.value];
			index[this.value] = index[blank_value];
			blank_value = this.value;
			re_puzzle();
		}
		is_Win();
}

/*判断是否拼对*/
function is_Win() {
	for(var i = 0; i < 15; i++) {
		if(i != index[i]) {
			return;
		}
	}
	if(ismove > 0 && is_disrupt > 0)
	alert("you win!");
	re_initial();
}

/*打乱拼图块*/
function disrupt_block(event) {
	re_initial();
	while(true) {
	if(re_index.length > complexity) break;
	var ind = parseInt(Math.random()*15);
	if(ind == blank_value) continue;
	var row = Math.abs(parseInt(blank_value%4)-parseInt(ind%4));
	var col = Math.abs(parseInt(blank_value/4)-parseInt(ind/4));
		if((row == 1 && col == 0)||(row == 0 && col == 1)) {
			if(index[ind] != index[blank_value]){
			re_index.unshift(ind);
			re_blank.unshift(blank_value);
			index[blank_value] = index[ind];
			index[ind] = index[blank_value];
			blank_value = ind;
			} 	
		}
	}
	is_disrupt++;
	re_puzzle();
	is_Win();
	event.target.blur();
}

/*提示一步*/
function tip(event) {
	if(re_index.length == 0) {
		return;
	}
	var t1 = re_index.shift();
	var t2 = re_blank.shift();
	index[blank_value] = index[t2];
	index[t1] = index[blank_value];
	blank_value = t2;
	re_puzzle();
	event.target.blur();
	ismove = 0;
}

/*重新开始后，清空以前的数据*/
function re_initial() {
	index = [];
	re_index = [];
	re_index.length = 0;
	re_blank = [];
	ismove = 0;
	is_disrupt = 0;
	blank_value = 15;
	for (var i = 0; i < 16; i++) {
		index.push(i);
	}
	re_puzzle();
}