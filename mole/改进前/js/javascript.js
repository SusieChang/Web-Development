var count = 30;
var sign = 0;
var random = 0;
var pause = 0;

window.onload = function() {
	document.getElementById("change").addEventListener('click',changeState);
	document.getElementById("pause").addEventListener('click',pauseGame);
	var current_time = document.getElementById("Time");
	var current_score = document.getElementById("Score");
	var state = document.getElementById("state");
	document.getElementById("map").onmouseover = function(event){
		event.target.style.cursor = "pointer";
	};

//创建moles
	for (var i = 0; i < 60; i++) {
		var map = document.getElementById("map");
		var select = document.createElement("input");
		var hole = document.createElement("div");	
		select.setAttribute("name", "selector");
		select.setAttribute("type", "radio");
		select.style.cssText="width:20px;height:20px;opacity:0;margin:0;";
		hole.style.cssText="width:15px;height:15px;overflow:hidden;background-color:white;display:inline-block;margin:4px;border-radius:50%;border:1px solid grey;";
		hole.setAttribute("name","moles");
		hole.appendChild(select);
		hole.addEventListener('click',hit);
		map.appendChild(hole);
	}

	var grid = document.getElementsByName("moles");

//按钮改变状态
	function changeState(){
		cleanscreen();
		if(sign == 0 && pause == 0) {
			state.value ="Playing";
			startGame();
		} else {
				endGame();
			} 
		}

//开始游戏
	function startGame() {
		random = parseInt(Math.random()*59);
		grid[random].style.backgroundColor="black";
		count = 30;
		pause = 0;
		sign = 1;
		time = setInterval(timeCount,1000);
		current_time.value = count;
	}
//结束游戏
	function endGame() {
		grid[random].style.backgroundColor="white";
		window.clearInterval(time);
		alert("Game Over.\nYour Score: "+ current_score.value);
		state.value ="Game Over";
		count = 30;
		sign = 0;
		pause = 0;
		current_score.value = 0;
		current_time.value = 30;
	}
//暂停游戏
	function pauseGame() {
		if(pause == 0) {
			window.clearInterval(time);
			state.value ="Pause";
			pause = 1;
			sign = 0;
		} else {
			time = setInterval(timeCount,1000);
			state.value ="Playing";
			pause = 0;
			sign = 1;
		}
		
	}
//打地鼠
	function hit(event) {
		if(sign == 1) {
			if(this == grid[random]) {
			current_score.value = Number(current_score.value) + 1;
			this.style.backgroundColor = "white";
			random = parseInt(Math.random()*59);
			grid[random].style.backgroundColor="black";
		} else {
			current_score.value = Number(current_score.value) - 1;
		}
		}
	}
//定时器
	function timeCount() {
		current_time.value = count;
		if(count > 0) {
			count=count-1;
		} else {
			endGame();
		}
	}

function cleanscreen() {
	for (var i = grid.length - 1; i >= 0; i--) {
	grid[i].style.backgroundColor = "white";
	}
}
};