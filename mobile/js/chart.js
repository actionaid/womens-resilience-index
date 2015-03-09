// JavaScript Document
var radius = 270;
var radiusOffset = 16;
var centerX  = 640*.5;
var centerY  = 600*.5;
var center = { "x":centerX , "y":centerY };

var rad = Math.PI / 180;


function Section3(){
	this.id = 3; 
	this.s = Snap("#svg-3");
	this.data = data;
	this.group = this.s.group();
	this.group.node.id = "section"+this.id+"gp";
	this.bgGroup = this.s.group();
	this.bgGroup.appendTo(this.group);
	this.barGroup = this.s.group();
	this.barGroup.appendTo(this.group);
	this.barGroup.node.id = "section3_bar";
	this.bgBar = [];
	this.country = [];
	
	this.init();
	
}


Section3.prototype = {
	
	constructor:Section3,
	init:function(){
		
		var _this = this;
		
		
		var _this = this;
		for( var i = 0 ; i < 8 ; i++){
			this.bgBar[i] = new Bar(this.s,'bg_bar'+i,"#efefef" ,radius-(i*radiusOffset) , center);
			this.bgGroup.append(this.bgBar[i].track);
			this.bgBar[i].animate(360 , 360 , 0 , 0);
		}
		
		
		
		for( var i = 0 ; i < 8 ; i++){
			var barID = this.data[i].barID;
			var value = this.data[i]['section'+this.id].value;
			var color = this.data[i].color;
			var name = this.data[i].name;
			value = (value / 100) * 360;
			
			this.country[i] = new Bar(this.s,name,color,radius-(i*radiusOffset) , center, {} , value);
			this.barGroup.append(this.country[i].track);
			this.country[i].track.node.id = "section3_"+barID;
			
			this.country[i].animate(this.country[i].value , 360 , 1 , 0);
			
			
		}
		
		
	
		return this;
		
		
	}
};

function Section4(){
	
	this.s = Snap("#svg-4");
	this.timeout = 0;
	this.id = 4;
	this.data = data;
	this.group = this.s.group();
	this.group.node.id = "section"+this.id+"gp";
	this.bgGroup = this.s.group();
	this.bgGroup.appendTo(this.group);
	this.bgBar = [];
	this.barGroupArr = [];
	this.countryArr = [];
	this.copy;
	
	this.init();
	
}


Section4.prototype = {
	
	constructor:Section4,
	init:function(){
		
		
	for( var i = 0 ; i < 8 ; i++){
		this.bgBar[i] = new Bar(this.s,'bg_bar'+i,"#efefef" ,radius-(i*radiusOffset) , center);
		this.bgGroup.append(this.bgBar[i].track);
		this.bgBar[i].animate(360 , 360 , 0 , 0);
	}
	
	
	for(var i = 1 ; i <= 4 ; i++){
		
		var tmp = this.s.group();
		tmp.appendTo(this.group);
		tmp.node.id = "section4_bar"+i;
		tmp.transform("r"+(i-1)*90+","+center.x+","+center.y);
		this.barGroupArr[i] = tmp;
		this.countryArr[i] = [];
	}
	
	
		for(var j = 1 ; j <= 4 ; j++){
			
			
			var gp = this.countryArr[j];
	
			for( var i = 0 ; i < 8 ; i++){
				
				var barID = this.data[i].barID;
				var value = this.data[i]['section'+this.id][j].value;
				var color = this.data[i].color;
				var name = this.data[i].name;
				value = (value / 100) * 360;
				
				gp.push(new Bar(this.s,name,color,radius-(i*radiusOffset) , center, {} , 0));
				this.barGroupArr[j].append(gp[i].track);
	
				gp[i].track.node.id = "section4_"+j+"_"+barID;
				
				gp[i].animate(value , 90 , 1 , 0);
				
				
			}	
	
		}
	
		
		
		return this;
	}
	
};


function Section5(){
	
	this.s = Snap("#svg-5");
	this.timeout = 0;
	this.id = 5;
	this.data = data;
	this.group = this.s.group();
	this.group.node.id = "section"+this.id+"gp";
	this.bgGroup = this.s.group();
	this.bgGroup.appendTo(this.group);
	this.bgBar = [];
	this.barGroupArr = [];
	this.countryArr = [];
	this.hitGroupArr = [];
	this.hitGroupObjArr = [];
	this.pinTimeout = 0;
	this.currentPin = 0;
	this.isTween = false;
	
	this.init();
	
}


Section5.prototype = {
	
	constructor:Section5,
	init:function(){
		
		for(var i = 1 ; i <= 20 ; i++){
	
			var tmp = this.s.group();
			tmp.appendTo(this.group);
			tmp.node.id = "section5_bar"+i;
			tmp.transform("r"+(i-1)*18+","+center.x+","+center.y);
			this.barGroupArr[i] = tmp;
			this.countryArr[i] = [];
			
		}
	
		for( var i = 0 ; i < 8 ; i++){
			this.bgBar[i] = new Bar(this.s,'bg_bar'+i,"#efefef" ,radius-(i*radiusOffset) , center);
			this.bgGroup.append(this.bgBar[i].track);
			this.bgBar[i].animate(360 , 360 , 0 , 0);
		}
	
		this.smoothFilter = this.s.paper.filter(Snap.filter.blur(.2, .2));
		
		
		
		for(var j = 1 ; j <= 20 ; j++){
			
			
			var gp = this.countryArr[j]
			
			for( var i = 0 ; i < 8 ; i++){
				
				var barID = this.data[i].barID;
		
				var value = this.data[i]['section'+this.id].value[j-1];
				
				var color = this.data[i].color;
				var name = this.data[i].name;
				value = (value / 100) * 360;
				
				//filter: this.smoothFilter 
				
				gp.push(new Bar(this.s,name,color,radius-(i*radiusOffset) , center, {} , 0,360,null,{"pointer-events":"none","fill":color}));
				this.barGroupArr[j].append(gp[i].track);
				
				
				gp[i].track.node.id = "section5_"+j+"_"+barID;
				
				gp[i].animate(value , 18 , 1 , 0);
	
			}
	
			
		}
	
		return this;
	}
	
};



function Bar(snap , name, color, radius , centerLoc ,  mapLoc , value , total , transform , param, width){
	
	this.s = snap;
	this.name = name;
	this.color = (color)?color:"#333333";
	this.radius = (radius)?radius:100;
	this.value = (value)?value:45;
	this.total = (total)?total:360;
	this.transform = (transform)?transform:{};
	this.param = (param)?param:{fill:this.color};
	this.centerLoc = (centerLoc)?centerLoc:{"x":100, "y":100 };
	this.mapLoc = (mapLoc)?mapLoc:{"x":0, "y":0 };
	this.width = (width)?width:15;
	
	this.value = this.value * ( this.total / 360 );
	
	this.track = this.s.arc(this.centerLoc.x,this.centerLoc.y,0, 360, this.radius,this.width).attr(this.param);
	
	this.timeoutID = 0;
	
	
	
}

Bar.prototype = {
	
	constructor:Bar,
	animate:function(value, total , duration, delay , callBack){
		
		var _this = this;
		var value = (value != null)?value:this.value;
		var total = (total != null)?total:this.total;
		
		var callBack = (callBack != null)?callBack:function(){};
		
		var duration = (duration!=null)?duration*1000:1000;
		var delay = (delay)?delay*1000:0;
		
		value = value * ( total / 360 );
		
		
		//console.log(duration);
		
		clearTimeout(this.timeoutID);
		
		setTimeout(function(){
			_this.track.animateArc(_this.track.value , value, 360 , null , duration , null, callBack);
		},delay);
		
		return this;
	},
	
	setMapLocation:function(x,y){
		this.mapLoc.x = x;
		this.mapLoc.y = y;	
	},
	getMapLocation:function(){
		return this.mapLoc;
	},
	hello:function(){
		console.log("Hi");	
	}
	
}

function Donut(){
	
	this.track = [];	
	
}


