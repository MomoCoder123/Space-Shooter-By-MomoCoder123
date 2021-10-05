window.onload = function(){
	const canvas = document.querySelector("canvas");
	const ctx = canvas.getContext("2d");
	
	{
		var playerx = 425;
		var playery = 545;
		var lasers = [];
		var laserY = [];
		var meteor = [];
		var meteorY = [];
	}
	
	function tick(){
		ctx.beginPath();
		drawBg();
		drawPlayer(playerx, playery);
		drawLaser();
		drawMeteor();
		collision();
		spawn_meteor();
		update_meteor();
		update_lasers();
	}
	var interval = setInterval(tick, 0);

	//functions

	function drawBg(){
		var bg = new Image();
		bg.src = "bg.jpeg"
		addImage(bg, 0, 0, 1100, 692)
	}
	
	function spawn_meteor(){
		if (Math.floor(Math.random() * 200) == 1){
			meteor.push(Math.floor(Math.random() * 1025))
			meteorY.push(0)
		}
	}
	
	function drawPlayer(x, y){
		var playerImg = new Image();
		playerImg.src = "player.png"
		
		addImage(playerImg, x, y, 200, 200);
	}
	
	function drawLaser(){
		if (lasers.length > 0){
			for(i=0; i<lasers.length; i++){
				var laserImg = new Image();
				laserImg.src = "Laser.png"; 
				addImage(laserImg, lasers[0 + i] - 50, laserY[0 + i], 100, 100);
			}
		}
	}

	function collision(){
		if (lasers.length > 0){
			for(laser=0;laser<lasers.length;laser++){
				for(me=0;me<meteor.length;me++){
					if (Math.sqrt(Math.pow(meteor[me] - lasers[laser] + 80, 2) + Math.pow(meteorY[me] - laserY[laser], 2)) < 100){ 
						meteor.shift()
						meteorY.shift()
						lasers.pop()
						laserY.pop()
					}
				}
			}
		}
	}
	
	function drawMeteor(){
		if (meteor.length > 0){
			for(mee=0;mee<meteor.length;mee++){
				var meteorImg = new Image();
				meteorImg.src = "meteor1" + ".png";
				addImage(meteorImg, meteor[mee], meteorY[mee], 150, 150);
			}
		}
	}
	
	function update_lasers(){
		if (laserY.length > 0){
			for(item=0; item<laserY.length; item++){
				laserY[item] -= 5
			}
		}
	}
	
	function update_meteor(){
		if (meteor.length > 0){
			for(m=0;m<meteorY.length;m++){
				meteorY[m] += 2
			}
		}
	}
		
	function addImage(Img, x, y, wid, hei){
		var img = Img
		img.onload = function(){
			ctx.drawImage(img, x, y, wid, hei)
		}
	}
	
	document.addEventListener("mousemove", function(event){
		playerx = event.x - 100;
	});
	
	document.addEventListener("click", function(event){
		lasers.push(event.x);
		laserY.push(500);
	});
}	