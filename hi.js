window.onload = function(){
	var r, g, b, gray;
	var character, line = "";
	
	var sprite = document.getElementById("sprite");
	var W = sprite.width;
	var H = sprite.height;
	var tcanvas = document.createElement("canvas");
	tcanvas.width = W;
	tcanvas.height = H;
	var tc = tcanvas.getContext("2d");
	tc.fillStyle = "white";
	tc.fillRect(0, 0, W, H);
	tc.drawImage(sprite, 0, 0, W, H);
	
	var pixels = tc.getImageData(0, 0, W, H);
	var colordata = pixels.data;
	var ascii = document.getElementById("ascii");
	for(var i = 0; i < colordata.length; i = i+4)
	{
		r = colordata[i];
		g = colordata[i+1];
		b = colordata[i+2];
		gray = r*0.2126 + g*0.7152 + b*0.0722;
		if(gray > 250) character = " "; 
		else if(gray > 230) character = "`";
		else if(gray > 200) character = ":";
		else if(gray > 175) character = "*";
		else if(gray > 150) character = "+";
		else if(gray > 125) character = "#";
		else if(gray > 50) character = "W";
		else character = "@";
		
		if(i != 0 && (i/4)%W == 0)
		{
			ascii.appendChild(document.createTextNode(line));
			ascii.appendChild(document.createElement("br"));
			line = "";
		}
		
		line += character;
	}
	
	var frames = 10;
	var container = document.getElementById("container");
	var frame_width = parseInt(window.getComputedStyle(container).width)/frames;
	container.style.width = frame_width+"px";
	ascii.style.marginLeft = "0";
	
	setInterval(loop, 1000/60);
	function loop()
	{
		var current_ml = parseFloat(ascii.style.marginLeft);
		if(current_ml == frame_width*(frames-1)*-1)
			ascii.style.marginLeft = "0";
		else
			ascii.style.marginLeft = (current_ml - frame_width) + "px";
	}
	
}