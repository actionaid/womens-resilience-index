// JavaScript Document

var _countryID = { "japan":0, "bhutan":1, "sri":2 , "nepal":3, "india":4 , "maldives":5 , "bangladesh":6, "pakistan":7 };
var _countryColor = { "japan":'#e40000', "bhutan":'#032c4b', "sri lanka":'#006382' , "nepal":'#0087a4', "india":'#00aac8' , "maldives":'#66c3d4' , "bangladesh":'#98d5dc', "pakistan":'#84bdc7' };
var _countryName = ["japan","bhutan","sri lanka","nepal","india","maldives","bangladesh","pakistan"];

function Section(id){
	
	this.id = id;
	this.data = data;
	this.s = s;
	this.group = this.s.group();
	this.bgGroup = this.s.group();
	this.bgGroup.appendTo(this.group);
	this.barGroup = this.s.group();
	this.barGroup.appendTo(this.group);
	this.topGroup = this.s.group();
	this.topGroup.appendTo(this.group);
	this.topGroup.node.id = "section2C";
	
	this.bgBar = [];
	this.country = [];
	
	for( var i = 0 ; i < 8 ; i++){
		this.bgBar[i] = new Bar(this.s,'bg_bar'+i,"#efefef" ,radius-(i*radiusOffset) , center);
		this.bgGroup.append(this.bgBar[i].track);
	}
	
}

Section.prototype = {
	
	constructor:Section,
	init:function(){
		
		//this.initBar();
		
		return this;
		
	},
	
	mouseEventHandle:function(){
		
		console.log(this.node.id);
		
		var target = this.node.id;
		
		if(currentSection.id == 2){
						
		    //console.log(target.split("section2_")[1]);
			
			var barID = target.split("section2_")[1];
			var cData = data[_countryID[barID]];
			var mapLoc = cData.mapLoc;
			
			//TweenMax.to("#map", 1, {x:mapLoc.x,y:mapLoc.y,scale:mapLoc.scale});
			
			TweenMax.to("#map", 1, mapLoc);
			
			//console.log(mapLoc , 't'+(mapLoc.x/mapLoc.scale)+','+(mapLoc.y/mapLoc.scale)+'S'+mapLoc.scale+','+mapLoc.scale);
			
			//map.animate({ transform: 's1,1t-3000,-783' },0,mina.easeinout);
			
			//map.animate({ transform: 's0.2,0.2t-100,-149' },1000,mina.easeinout);
			
			//map.animate({ transform: 't'+mapLoc.x+','+mapLoc.y },1000,mina.easeinout);
			
			//"mapLoc":{ "x":-967, "y":-487, "scale":0.2}
			//TweenMax.to("#map", 1, {x:mapLoc.x,y:mapLoc.y});
			//TweenMax.to("#mapWrapper", 1, {scale:mapLoc.scale});
			
			//TweenMax.to(".section2 .value", 2, {color:cData.color});
			
			//mapWrapper.animate({ transform: 'S'+mapLoc.scale+','+mapLoc.scale },1000,mina.easeinout);
			
			hideAllCountry(.5);
			map.select("#"+barID).stop().animate({opacity: 1},1000);
			$(".section2 .country").html(cData.name);
			$(".section2 .value").html(cData.section2.value);
			TweenMax.to(".section2 .country", 2, {color:cData.color});
			TweenMax.to(".section2 .value", 2, {color:cData.color});
			s.select("#section2CCircle").animate({  fill: cData.color},1000);
			mapMask.animate({r: 270}, 1000, mina.easeout);
			
			//TweenMax.to("#section2CC", 2, {color:cData.color});
			
			
			//currentSection.topGroup.select("path").animate({  fill: cData.color},1000);
			
			
			
		}
		
		
		
	},
	
	initTop:function(){
		
		var bar = new Bar(this.s,'section2_center',"#cccccc" ,140 , center,null,null,null,null,null,5);
		bar.animate(360 , 360 , 0 );
		bar.track.node.id = "section2CCircle";
		bar.track.appendTo(this.topGroup);
		
		/*var tmp;
		
		tmp = this.s.text(490,230, "Bangladesh").attr({ fontSize: '20px', "fill":"#EE9955", "font-family": "'Open Sans Condensed', sans-serif", opacity: 1 });
		tmp.node.id = "country_txt";
		tmp.appendTo(this.topGroup);
		
		tmp = this.s.text(490,280, "45.9").attr({ fontSize: '50px', "fill":"#EE9955", "font-family": "'Open Sans Condensed', sans-serif", opacity: 1 });
		tmp.node.id = "num_txt";
		tmp.appendTo(this.topGroup);
		*/
		
		
		return this;
		
	},
	
	initBar:function(){
		
		
		
		for( var i = 0 ; i < 8 ; i++){
			var barID = this.data[i].barID;
			var value = this.data[i]['section'+this.id].value;
			var color = this.data[i].color;
			var name = this.data[i].name;
			value = (value / 100) * 360;
			
			this.country[i] = new Bar(this.s,name,color,radius-(i*radiusOffset) , center, {} , 0);
			this.barGroup.append(this.country[i].track);
			this.country[i].track.node.id = "section2_"+barID;
			this.country[i].track.mouseup(this.mouseEventHandle);
		}
		
		return this;
	},
	
	showBar:function(duration, delay){
		
		
		var duration = (duration != null)?duration:1;
		var delay = (delay)?delay:0;
		
		for( var i = 0 ; i < 8 ; i++){
			
			var value = this.data[i]['section'+this.id].value;
			value = (value / 100) * 360;
			
			this.country[i].animate(value , 360 , duration , delay);
		}
		
		return this;
		
	},
	
	showBg:function(duration, delay){
		
		
		var duration = (duration != null )?duration:1;
		var delay = (delay)?delay:0;
		
		for( var i = 0 ; i < 8 ; i++){
			this.bgBar[i].animate(360 , 360 , duration , delay);
		}
		
		return this;
		
	},
	
	show:function(duration, delay){
		
		console.log("show");
		var duration = (duration != null )?duration:1;
		var delay = (delay)?delay:0;
		
		this.showBg(duration, delay);
		this.showBar(duration, delay+1);
		
		return this;
		
	},
	
	hide:function(duration, delay){
		
		return this;
	}
	
}




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
	animate:function(value, total , duration, delay){
		
		var _this = this;
		var value = (value)?value:this.value;
		var total = (total)?total:this.total;
		
	
		
		var duration = (duration!=null)?duration*1000:1000;
		var delay = (delay)?delay*1000:0;
		
		value = value * ( total / 360 );
		
		
		console.log(duration);
		
		clearTimeout(this.timeoutID);
		
		setTimeout(function(){
			_this.track.animateArc(_this.track.value , value, 360 , null , duration);
		},delay);
		
		return this;
	},
	
	setMapLocation:function(x,y){
		this.mapLoc.x = x;
		this.mapLoc.y = y;	
	},
	getMapLocation:function(){
		return this.mapLoc;
	}
	
}

function Donut(){
	
	this.track = [];	
	
}