// JavaScript Document

var _countryID = { "japan":0, "bhutan":1, "sri":2 , "nepal":3, "india":4 , "maldives":5 , "bangladesh":6, "pakistan":7 };
var _countryColor = { "japan":'#e40000', "bhutan":'#032c4b', "sri lanka":'#006382' , "nepal":'#0087a4', "india":'#00aac8' , "maldives":'#66c3d4' , "bangladesh":'#98d5dc', "pakistan":'#84bdc7' };
var _countryName = ["japan","bhutan","sri lanka","nepal","india","maldives","bangladesh","pakistan"];


//MyMenu

function showTips(value){
	$('#tooltips').html(value);
	TweenMax.to($('#tooltips'), 	.5 ,{autoAlpha:1 });
}

function hideTips(value){
	TweenMax.to($('#tooltips'), 	.5 ,{autoAlpha:0 });
}



function Menu(){
	
	this.currentID = 0;
	this.tweening = false;
	this.timeoutID = 0;
	
	var _this = this;
		$('#menu .item').on("click",function(evt){
			
			
			var id = $(this).attr("rel");
			
			if(id == 6){
				return;	
			}
			
			if(this.tweening) return;
			
			shown = 1;
			_this.goto(id);
			TweenMax.to($('#menu').find('.copy'), 	.5 ,{autoAlpha:0 });
		
	});	
	
	$('#menu .item').hover(function(evt){
			TweenMax.to($(this).find('.copy'), 	.5 ,{autoAlpha:1 });
	
	},function(evt){
		 if(shown==1)
		 TweenMax.to($(this).find('.copy'), 	.5 ,{autoAlpha:0 });
	});	
}

Menu.prototype = {
	constructor:Menu,
	
	goto:function(id){
		
		
		
		console.log("goto", id, this.currentID);
			
			if(id == this.currentID) return;
			
			if(this.tweening) return;
		
			this.tweening = true;
		
			if(currentSection) currentSection.hide(1,0);
			
			if(id!=5){
				TweenMax.to($(".index .icon2"), .5 ,{autoAlpha:1 });
			}else{
				TweenMax.to($(".index .icon2"), .5 ,{autoAlpha:1 });
			}
			
			currentID = id;
			currentSection = sections[id];
			currentSection.show(1,1);
			menu.setMenu(id , 1 , 0);
			
	},
	
	release:function(){
		
		
		this.tweening= false;
		
	},
	
	setMenu:function(id , duration , delay){
		
		if(id == this.currentID) return this;
		
		duration = (duration != null)?duration:1;
		delay = (delay)?delay:0;
		
		TweenMax.to("#menu .item .icon", 	duration ,{autoAlpha:0 ,delay:delay});
		TweenMax.to("#menu .item"+id+" .icon", 	duration ,{autoAlpha:1 ,delay:delay});
		this.currentID = id;
		
		return this;
	}
	
	
}


//Section 1
function Section1(){
	this.id = 1;
	this.init();
}

Section1.prototype = {
	constructor:Section1,
	init:function(){ 
		
		TweenMax.to($(".section1"),0,{autoAlpha:0});
		return this; 
	
	},
	show:function(duration, delay){ 
		
		var duration = (duration != null)?duration:.5;
		var delay = (delay != null)?delay:0;
		TweenMax.to($(".index"),duration,{autoAlpha:0 , delay:delay});
		TweenMax.fromTo($(".section1"),duration,{autoAlpha:0},{autoAlpha:1, delay:delay});
		TweenMax.fromTo($(".section1 .logo"),duration,{scale:1.6},{scale:1, delay:delay , onComplete:function(){ menu.release()  }});
		centerMap(duration);
		//TweenMax.fromTo($(".section1 .logo"),1,{rotationY:90},{rotationY:0});
	
		return this;
	},
	hide:function(duration, delay){ 
	
		var duration = (duration != null)?duration:.5;
		var delay = (delay != null)?delay:.5;
		
		TweenMax.to($(".section1"),duration,{autoAlpha:0 , delay:delay});
		TweenMax.to($(".section1 .logo"),duration,{scale:1.6, delay:delay });
		
		return this;
	},
	reset:function(duration, delay){ return this;}
}

//Section 2
function Section2(){
	this.id = 2;
	this.init();
}

Section2.prototype = {
	constructor:Section2,
	init:function(){ 
		
		TweenMax.to($(".section2"),0,{scale:.8,autoAlpha:0});
		return this; 
	
	},
	show:function(duration, delay){ 
		
		var duration = (duration != null)?duration:.5;
		var delay = (delay != null)?delay:0;
		TweenMax.to($(".index"),duration,{autoAlpha:0 , delay:delay});
		TweenMax.fromTo($(".section2"),duration,{scale:.5,autoAlpha:0},{scale:1,autoAlpha:1, delay:delay , onComplete:function(){ menu.release()  }});
		centerMap(duration);
		//TweenMax.fromTo($(".section1 .logo"),1,{rotationY:90},{rotationY:0});
	
		return this;
	},
	hide:function(duration, delay){ 
	
		var duration = (duration != null)?duration:.5;
		var delay = (delay != null)?delay:.5;
		
		TweenMax.to($(".section2"),duration,{autoAlpha:0 ,scale:.5, delay:delay});
		
		return this;
	},
	reset:function(duration, delay){ return this;}
}



//Section 3 
function Section3(){
	
	this.id = 3;
	this.timeout = 0;
	this.data = data;
	this.s = s;
	this.group = this.s.group();
	this.group.node.id = "section"+this.id+"gp";
	this.bgGroup = this.s.group();
	this.bgGroup.appendTo(this.group);
	this.barGroup = this.s.group();
	this.barGroup.appendTo(this.group);
	this.barGroup.node.id = "section3_bar";
	this.topGroup = this.s.group();
	this.topGroup.appendTo(this.group);
	this.topGroup.node.id = "section3C";
	
	this.bgBar = [];
	this.country = [];
	
	for( var i = 0 ; i < 8 ; i++){
		this.bgBar[i] = new Bar(this.s,'bg_bar'+i,"#efefef" ,radius-(i*radiusOffset) , center);
		this.bgGroup.append(this.bgBar[i].track);
	}
	
	//console.log("Section3");
	
	this.init();
	
}

Section3.prototype = {
	
	constructor:Section3,
	init:function(){
		
		$(".section3 .button").click(function(event){
				
			var cID = $(this).attr('rel');
			
			var cData = data[cID-1];
			
			$(".scroll").mCustomScrollbar("disable",true);
			$(".scroll").mCustomScrollbar("update");
			
			$(".section3-popup .content").hide();
			$(".section3-popup .c"+cID).show();
			
			$(".section3-popup .case-study").hide();
			$(".section3-popup	.case-btn").removeClass("select-dim")
			 $(".section3-popup	.case-btn-1").addClass("select-dim")
			$(".section3-popup	.c"+cID +" .case-study-1").show();
			
			TweenMax.to($(".index"),.5,{autoAlpha:0 , delay:0});
			
			TweenMax.to(".section3-popup .bg", .5, {backgroundColor:cData.color});
			TweenMax.to(".section3-popup", .5, {autoAlpha:1});
			
		});
		
		$(".section3-popup .close-btn").click(function(event){
			TweenMax.to($(".index"),.5,{autoAlpha:1 , delay:0});
			TweenMax.to(".section3-popup", .5, {autoAlpha:0 , onComplete:function(){
				
				
				
				$('iframe').each(function(index , element){
					$(element).attr("src",$(element).attr("src"));
				});
			
				
			}});
			
			
			
		});
		
		
		$(".section3-popup .case-btn").click(function(event){
			event.preventDefault();
			$('iframe').each(function(index , element){
					$(element).attr("src",$(element).attr("src"));
				});
		
			var sID = $(this).attr("ref")
			console.log(sID)
		
			$(".section3-popup	.case-study").hide()
			$(".section3-popup	.case-btn").removeClass("select-dim")
			$(".section3-popup	.case-study-"+sID).show();
		    $(".section3-popup	.case-btn-"+sID).addClass("select-dim")
			
			
			
			
		});
		
		$(".section3-popup .hit").click(function(event){
			
				console.log("ABC");
			
				TweenMax.to(".section3-popup", .5, {autoAlpha:0 , onComplete:function(){
				
				console.log("ABCD");
			
				
				$('iframe').each(function(index , element){
					$(element).attr("src",$(element).attr("src"));
				});	
				
			}});
		
		});
		
		
		
		
		this.initBar();
		this.initTop();
		
		return this;
		
	},
	
	mouseEventHandle:function(id){
	
			var target = id		
			var barID = target.split("section3_")[1];
			var cData = data[_countryID[barID]];
			var mapLoc = cData.mapLoc;
			var cID = _countryID[barID] + 1;
			
			//this.topGroup.select("#section3CCircle").animate({opacity: 1},1000);
			
			console.log("cID :",cID);
			
			
			if(cID == 1 || cID == 2 || cID == 3 || cID == 6){
			$(".section3 .button").hide();
			}else{
			$(".section3 .button").show();
			}
			
			
			TweenMax.to("#map", 1, mapLoc);
	
			hideAllCountry(.5);
			map.select("#"+barID).stop().animate({opacity: 1},1000);
			$(".section3 .country").html(cData.name);
			$(".section3 .value").html(cData.section3.value);
			
			$(".section3 .desc div").hide();
			
			if(cID!=1 && cID !=8){
				$(".section3 .desc .c0").show();
			}else{
				$(".section3 .desc .c"+cID).show();
			}
			
			$(".section3 .button").attr("rel",cID);
			
			
			TweenMax.to(".section3 .country", .5, {color:cData.color});
			TweenMax.to(".section3 .value", .5, {color:cData.color});
			TweenMax.to(".section3 .content", .5, {autoAlpha:1});
			TweenMax.to(".section3 .title", .5, {autoAlpha:0});
			TweenMax.to("#section3CCircle", .5, {autoAlpha:1});
			
			
			s.select("#section3CCircle").animate({  fill: cData.color},500);
			mapMask.animate({r: 270}, 500, mina.easeout);
	
	
		
	
	},
	
	initTop:function(){
		//console.log("initTop");
		var bar = new Bar(this.s,'section3_center',"#cccccc" ,140 , center,null,null,null,null,null,5);
		bar.animate(360 , 360 , 0 );
		bar.track.node.id = "section3CCircle";
		bar.track.appendTo(this.topGroup);
		bar.track.attr({opacity: 0});
	
		return this;
		
	},
	
	initBar:function(){
		
		var _this = this;
		for( var i = 0 ; i < 8 ; i++){
			var barID = this.data[i].barID;
			var value = this.data[i]['section'+this.id].value;
			var color = this.data[i].color;
			var name = this.data[i].name;
			value = (value / 100) * 360;
			
			this.country[i] = new Bar(this.s,name,color,radius-(i*radiusOffset) , center, {} , 0);
			this.barGroup.append(this.country[i].track);
			this.country[i].track.node.id = "section3_"+barID;
			this.country[i].track.mouseup(function(){  _this.mouseEventHandle(this.node.id)});
			
			this.country[i].track.mouseover(function(){  
			
			var barID = this.node.id.split("_");
			var cData = data[_countryID[barID[1]]];
			//console.log(cData);
			showTips(cData.name + " - Value : " + cData.section3.value); 
			
			});
			this.country[i].track.mouseout(function(){ hideTips(); });
			
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
	hideBar:function(duration, delay){
		
		var duration = (duration != null)?duration:1;
		var delay = (delay)?delay:0;
		
		for( var i = 0 ; i < 8 ; i++){

			this.country[i].animate(0 , 360 , duration , delay);
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
	hideBg:function(duration, delay){
		
		
		var duration = (duration != null )?duration:1;
		var delay = (delay)?delay:0;
		
		for( var i = 0 ; i < 8 ; i++){
			this.bgBar[i].animate(0 , 360 , duration , delay);
		}
		
		return this;
		
	},
	
	show:function(duration, delay){
		
		//console.log("show");
		var duration = (duration != null )?duration:.5;
		var delay = (delay)?delay:0;
		
		this.showBg(duration, delay);
		this.showBar(duration, delay+1);
		TweenMax.to($(".index"),duration,{autoAlpha:1 , delay:delay});
		TweenMax.to(".section3", .5, {autoAlpha:1, delay:1 });
		
		TweenMax.to(this,duration,{timeout:0, delay:delay+1, onComplete:function(){ menu.release(); }});
		
		return this;
		
	},
	
	hide:function(duration, delay){
		
		this.reset();
		
		var duration = (duration != null )?duration:1;
		var delay = (delay)?delay:0;
		
		TweenMax.to(".section3", .5, {autoAlpha:0 , onComplete:function(){
			
			$('iframe').each(function(index , element){
				$(element).attr("src",$(element).attr("src"));
			});	
			
		}});
		this.hideBg();
		this.hideBar();
		
		
		
		return this;
	},
	reset:function(){
		hideAllCountry(.5);
		TweenMax.to("#section3CCircle", .5, {autoAlpha:0});
		TweenMax.to(".section3 .content", .5, {autoAlpha:0});
		TweenMax.to(".section3 .title", .5, {autoAlpha:1});
		mapMask.animate({r: 1000}, 500, mina.easeout);
		centerMap(1);
		
		
			
	}
	
}

//Section 3 END




//Section 4 
function Section4(){
	this.timeout = 0;
	this.id = 4;
	this.data = data;
	this.s = s;
	this.group = this.s.group();
	this.group.node.id = "section"+this.id+"gp";
	this.bgGroup = this.s.group();
	this.bgGroup.appendTo(this.group);
	this.bgBar = [];
	this.barGroupArr = [];
	this.countryArr = [];
	this.copy;
	
	for(var i = 1 ; i <= 4 ; i++){
		
		var tmp = this.s.group();
		tmp.appendTo(this.group);
		tmp.node.id = "section4_bar"+i;
		tmp.transform("r"+(i-1)*90+","+center.x+","+center.y);
		this.barGroupArr[i] = tmp;
		this.countryArr[i] = [];
	}
	
	this.topGroup = this.s.group();
	this.topGroup.appendTo(this.group);
	this.topGroup.node.id = "section4C";
	
	for( var i = 0 ; i < 8 ; i++){
		this.bgBar[i] = new Bar(this.s,'bg_bar'+i,"#efefef" ,radius-(i*radiusOffset) , center);
		this.bgGroup.append(this.bgBar[i].track);
	}
	
	$('.section4 .bar > div').click(function(){
		
		
		console.log($(this).attr("rel"));
		
		var rel = $(this).attr("rel").split("_");
		
		   $(".section4 .content .copy ul").hide();
			$(".section4 .content .copy .d"+rel[0]+"-"+rel[1]).show();
			
			TweenMax.to(".section4 .num div", 0, {autoAlpha:.3});
			TweenMax.to(".section4 .bar > div > div", 0, {autoAlpha:.3});
			
			TweenMax.to(".section4 .num"+rel[1], 0, {autoAlpha:1});
			TweenMax.to(".section4 .b"+rel[1], 0, {autoAlpha:1});
			
		
		
	});
	
	
	
	this.init();
	
}

Section4.prototype = {
	
	constructor:Section4,
	init:function(){
		
		for(var i = 1 ; i <= 4 ; i++){
			this.initBar(this.countryArr[i],i);
		}
		
		
		$('.section4 .close-btn').click(this.closeOverlay);
	
		this.initTop();
		
		return this;
		
	},
	
	setCopy:function(svg){
		
		//console.log("setCopy");
		this.copy = s.group();
		this.group.append(this.copy);
		
		this.copy.append(svg);
		
		this.copy.node.id = "section4Copy";
		
		this.copy.mouseover(function(){
			
			TweenMax.to("#section4Copy #button-on", .5, {autoAlpha:1});
			
		});
		
		this.copy.mouseout(function(){
			
			TweenMax.to("#section4Copy #button-on", .5, {autoAlpha:0});
			
		});
		
		this.copy.mousedown(function(){
			
			TweenMax.to(".section4", .5, {autoAlpha:1});
			TweenMax.to(".section4 .indicator", .5, {autoAlpha:1});
			TweenMax.to(".section4 .content", 0, {autoAlpha:0});
			TweenMax.to(".section4 .wrapper",.5, {backgroundColor:"#FFF"});
			
		});
		
		//button-on
		TweenMax.to("#section4Copy", 0, {x:345 , y:146 , autoAlpha:0});
		
		TweenMax.to("#section4Copy #button-on", 0, {autoAlpha:0});
		
	},
	
	closeOverlay:function(){
		
		TweenMax.to(".section4", .5, {autoAlpha:0});
		
	},
	showIndicator:function(){
		
			TweenMax.to(".section4 .wrapper",.5, {backgroundColor:'#fff'});
			TweenMax.to(".section4 .content", 0, {autoAlpha:0});
			TweenMax.to(".section4 .indicator", 0, {autoAlpha:1});
			TweenMax.to(".section4", .5, {autoAlpha:1});
		
	},
	
	mouseEventHandle:function(id){
	
		var target = id		
		
			
			var barID = target.split("_");
			var cData = data[_countryID[barID[2]]];
			//var mapLoc = cData.mapLoc;
			
			////console.log(barID , cData);
			
			//$('.section4 .country').html(cData.name);
			
			for( var i = 1 ; i <=4 ; i++){
				$('.section4 .num'+i).html(cData.section4[i].value);
				
				$('.section4 .b'+i).width(cData.section4[i].value+"px");
				
				//$('.section4 .b'+i).attr("rel",_countryID[barID[2]]+"_"+i);
				$('.section4 .b'+i).parent().attr("rel",_countryID[barID[2]]+"_"+i);
				
				
			}
			
			//console.log(_countryID[barID[2]]);
			
			//TweenMax.to(".section4 .copy div", 0, {autoAlpha:0});
			$(".section4 .content .copy ul").hide();
			$(".section4 .content .copy .d"+_countryID[barID[2]]+"-"+barID[1]).show();
			
			$(".section4 .content .country div").hide();
			$(".section4 .content .country .c"+(_countryID[barID[2]]+1)).show();
			
			TweenMax.to(".section4 .num div", 0, {autoAlpha:.3});
			TweenMax.to(".section4 .bar > div > div", 0, {autoAlpha:.3});
			
			TweenMax.to(".section4 .num"+barID[1], 0, {autoAlpha:1});
			TweenMax.to(".section4 .b"+barID[1], 0, {autoAlpha:1});
			
			TweenMax.to(".section4 .content", 0, {autoAlpha:1});
			TweenMax.to(".section4 .indicator", 0, {autoAlpha:0});
			TweenMax.to(".section4 .wrapper",.5, {backgroundColor:cData.color});
			TweenMax.to(".section4", .5, {autoAlpha:1});
		
	
	},
	
	initTop:function(){
			
		return this;
		
	},
	
	initBar:function(gp , id){
		
		var _this = this;
		for( var i = 0 ; i < 8 ; i++){
			var barID = this.data[i].barID;
			
			////console.log('section'+this.id, this.data[i]['section'+this.id]);
			
			var value = this.data[i]['section'+this.id][id].value;
			
			
			
			var color = this.data[i].color;
			var name = this.data[i].name;
			value = (value / 100) * 360;
			
			gp.push(new Bar(this.s,name,color,radius-(i*radiusOffset) , center, {} , 0));
			this.barGroupArr[id].append(gp[i].track);
			
			
			
			gp[i].track.node.id = "section4_"+id+"_"+barID;
			gp[i].track.mouseup(function(){  _this.mouseEventHandle(this.node.id)});
			
			
			gp[i].track.mouseover(function(){  
			
			var barID = this.node.id.split("_");
			var cData = data[_countryID[barID[2]]];
			
			//console.log(cData , barID[1]);
			
			showTips(cData.name+" - value: "+cData.section4[barID[1]].value); 
			
			
			});
			gp[i].track.mouseout(function(){ hideTips(); });
		}
		
		return this;
	},
	
	showBar:function(gp, id , duration, delay){
		
		
		var duration = (duration != null)?duration:1;
		var delay = (delay)?delay:0;
		
		for( var i = 0 ; i < 8 ; i++){
			
			var value = this.data[i]['section'+this.id][id].value;
			value = (value / 100) * 360;
			
			gp[i].animate(value , 90 , duration , delay);
		}
		
		return this;
		
	},
	hideBar:function(gp, id , duration, delay){
		
		var duration = (duration != null)?duration:1;
		var delay = (delay)?delay:0;
		
		for( var i = 0 ; i < 8 ; i++){

			gp[i].animate(0 , 360 , duration , delay);
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
	hideBg:function(duration, delay){
		
		
		var duration = (duration != null )?duration:1;
		var delay = (delay)?delay:0;
		
		for( var i = 0 ; i < 8 ; i++){
			this.bgBar[i].animate(0 , 360 , duration , delay);
		}
		
		return this;
		
	},
	
	show:function(duration, delay){
		
		//console.log("show");
		var duration = (duration != null )?duration:.5;
		var delay = (delay)?delay:0;
		
		this.showBg(duration, delay);
		
		for(var i = 1 ; i <= 4 ; i++){
			this.showBar(this.countryArr[i] , i ,duration, delay+1);
		}
		
		TweenMax.to("#section4Copy", duration, {autoAlpha:1, delay:delay+1});
		
		TweenMax.to($(".index"),duration,{autoAlpha:1 , delay:delay});
		
		
		TweenMax.to(this,duration,{timeout:0, delay:delay+1, onComplete:function(){ menu.release(); }});
		
		/*TweenMax.to(".section3", .5, {autoAlpha:1});*/
		
		//this.showIndicator();
		
		return this;
		
	},
	
	hide:function(duration, delay){
		
		this.reset();
		
		var duration = (duration != null )?duration:1;
		var delay = (delay)?delay:0;
	
		for(var i = 1 ; i <= 4 ; i++){
			this.hideBar(this.countryArr[i], 1 ,.5);
		}
		
		this.closeOverlay();
		
		TweenMax.to("#section4Copy", duration, {autoAlpha:0});
		
		
		this.hideBg(.5,.5);
		
		
		return this;
	},
	reset:function(){
	
		centerMap(1);
			
	}
	
}

//Section 4 END


//Section 5 
function Section5(){
	this.timeout = 0;
	this.id = 5;
	this.data = data;
	this.s = s;
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
	this.isExpand = false;
	
	for(var i = 1 ; i <= 20 ; i++){
	
		var tmp = this.s.group();
		tmp.appendTo(this.group);
		tmp.node.id = "section5_bar"+i;
		tmp.transform("r"+(i-1)*18+","+center.x+","+center.y);
		this.barGroupArr[i] = tmp;
		this.countryArr[i] = [];
	}
	
	this.topGroup = this.s.group();
	this.topGroup.appendTo(this.group);
	this.topGroup.node.id = "section5C";
	
	for( var i = 0 ; i < 8 ; i++){
		this.bgBar[i] = new Bar(this.s,'bg_bar'+i,"#efefef" ,radius-(i*radiusOffset) , center);
		this.bgGroup.append(this.bgBar[i].track);
	}
	
	
	this.smoothFilter = s.paper.filter(Snap.filter.blur(.2, .2));
	
	
	this.init();
	
}

Section5.prototype = {
	
	constructor:Section5,
	init:function(){
		
		for(var i = 1 ; i <= 20 ; i++){
			this.initBar(this.countryArr[i],i);
		}
		
		
		//$('.section5 .close-btn').click(this.closeOverlay);
	
		this.initTop();
		
		this.hideHit();
		
		return this;
		
	},
	
	blockGp:function(id){
		
		if(id == 1 || id == 5){
			
			return true;
			
		}else{
			
			return false;	
		}
	},
	
	showOverlay:function(){
		
		TweenMax.to(".section5 .wrapper", .5, {autoAlpha:1});
		
	},
	
	hideOverlay:function(){
		
		TweenMax.to(".section5 .wrapper", .5, {autoAlpha:0});
		
	},
	showIndicator:function(){
		
			TweenMax.to(".section5 .wrapper",.5, {backgroundColor:'#fff'});
			TweenMax.to(".section5 .content", 0, {autoAlpha:0});
			TweenMax.to(".section5 .indicator", 0, {autoAlpha:1});
			TweenMax.to(".section5", .5, {autoAlpha:1});
		
	},
	expandHit:function(gp){
		
		
		
		
		
		/*if(gp == 4 || gp == 5 || gp == 10 || gp == 11){
			console.log("*");
			$(".indicator-title").css("visibility","hidden");
			$(".indicator").addClass("no-content");
		
		}else{
			console.log("#");
			$(".indicator-title").css("visibility","inherit");
			$(".indicator").removeClass("no-content");
		}
		
		for(var j = 1 ; j <= 20 ; j++){
			
			if(j == gp){
				TweenMax.to("#hitGp"+gp, 0, {opacity:1});
			}else{
				TweenMax.to("#hitGp"+gp, 0, {opacity:0});
			}
		
		}*/
	
		for(var i = 0 ; i < 8 ; i++){
	
			var cname = _countryName[i];
			
			if( cname == "sri lanka"){
				cname = "sri";	
			}
			
			
			$("#section5_"+gp+"_"+cname+"_hit").css("visibility","inherit");
			this.hitGroupObjArr["section5_"+gp+"_"+i].animate(360 , 360 , 0 , 0);
			
		}
		
		
	
	},
	
	
	resetHit:function(){
		
		for(var i = 0 ; i < this.hitGroupArr.length ; i++){
			TweenMax.to("#"+this.hitGroupArr[i], .5, {opacity:0});
		}
	},
	hideHit:function(){
		
		for(var i = 0 ; i < this.hitGroupArr.length ; i++){
			$("#"+this.hitGroupArr[i]).css("visibility","hidden");
			//
		}
		
		console.log(this.hitGroupObjArr);
		
	},
	showHit:function(){
		
		for(var i = 0 ; i < this.hitGroupArr.length ; i++){
			$("#"+this.hitGroupArr[i]).css("visibility","inherit");
		}
		
		for(var gp = 1 ; gp <= 20 ; gp++){
			for(var i = 0 ; i < 8 ; i++){
		
				var cname = _countryName[i];
				
				if( cname == "sri lanka"){
					cname = "sri";	
				}
				
				this.hitGroupObjArr["section5_"+gp+"_"+i].animate(360 , 17.5 , 0 , 0);
				
			}
		}
		
		
	},
	
	mouseEventHandle:function(id, type){
	
		var target = id		
		
			
			var barID = target.split("_");
			//var cData = data[_countryID[barID[2]]];
			
			
			
			//var mapLoc = cData.mapLoc;
			
			////console.log(id);
			
			switch(type){
				
				case("up"):	
					//TweenMax.to("#"+id, .5, {autoAlpha:1});
					
					if(this.isExpand) return;
					
					this.resetHit();
					TweenMax.to("#"+id, .5, {opacity:1});
					
					var cID = _countryID[barID[2]];
					var cData = data[_countryID[barID[2]]];
					
					
					var pin = this.data[cID]['section5'].pin;
					
					//console.log(cID , barID[1]*1 , pin );
		
					if($.inArray(barID[1]*1, pin) != -1){
						TweenMax.to(".section5 .button", 0, {autoAlpha:1});
					}else{
						TweenMax.to(".section5 .button", 0, {autoAlpha:0});
					}
					
					
					$('.section5 .page1').addClass("select");
					
					$('.section5 .page1 .country').html(cData.name);
					$('.section5 .page1 .indicator').html(indicator2[barID[1]]);
					$('.section5 .page1 .value').html(cData.section5.value[barID[1]-1]);
					
					$('.section5 .button a').attr("rel",id);
					
					//console.log(cData);
				break;
				case("over"):	
					
					//TweenMax.to("#"+id, .5, {autoAlpha:1});
					var cID = _countryID[barID[2]];
					var cData = data[_countryID[barID[2]]];
					
					showTips(cData.name+" - value: "+cData.section5.value[barID[1]-1]);
					
				break;
				case("out"):	
					//TweenMax.to("#"+id, .5, {autoAlpha:0});
					hideTips();
				break;
			
			}
			
			
			/*$('.section4 .country').html(cData.name);
			
			for( var i = 1 ; i <=4 ; i++){
				$('.section4 .num'+i).html(cData.section4[i].value);
				
				$('.section4 .b'+i).width(cData.section4[i].value+"px");
				
				
			}
			
			//console.log(_countryID[barID[2]]);
			
			//TweenMax.to(".section4 .copy div", 0, {autoAlpha:0});
			$(".section4 .content .copy ul").hide();
			
			//TweenMax.to(".section4 .copy .d"+_countryID[barID[2]], 0, {autoAlpha:1});
			$(".section4 .content .copy .d"+_countryID[barID[2]]).show();
			
			TweenMax.to(".section4 .content", 0, {autoAlpha:1});
			TweenMax.to(".section4 .indicator", 0, {autoAlpha:0});
			TweenMax.to(".section4 .wrapper",.5, {backgroundColor:cData.color});
			TweenMax.to(".section4", .5, {autoAlpha:1});*/
		
	
	},
	
	lock:function(){
		this.isTween = true;
	},
	
	unlock:function(){
		this.isTween = false;
	},
	
	
	initTop:function(){
			
		return this;
		
	},
	
	initBar:function(gp , id){
		
		var _this = this;
		var pin;
	
		//if(this.blockGp()) return;
		
		for( var i = 0 ; i < 8 ; i++){
			var barID = this.data[i].barID;
	
			var value = this.data[i]['section'+this.id].value[id-1];
			
			var color = this.data[i].color;
			var name = this.data[i].name;
			value = (value / 100) * 360;
			
			//filter: this.smoothFilter 
			
			gp.push(new Bar(this.s,name,color,radius-(i*radiusOffset) , center, {} , 0,360,null,{"pointer-events":"none","fill":color}));
			this.barGroupArr[id].append(gp[i].track);
			
			
			gp[i].track.node.id = "section5_"+id+"_"+barID;
			//gp[i].track.mouseup(function(){  _this.mouseEventHandle(this.node.id)});
			
			
			
			
		}
		
		var hitGp = s.group();
		
		hitGp.node.id = "hitGp"+id;
		
		this.barGroupArr[id].append(hitGp);
		
		for( var i = 0 ; i < 8 ; i++){
			
			var barID = this.data[i].barID;
			var value = this.data[i]['section'+this.id].value[id-1];
			
			var color = this.data[i].color;
			var name = this.data[i].name;
			value = (value / 100) * 360;
			
			
			pin = this.data[i]['section'+this.id].pin;
		
			//if($.inArray(id, pin) != -1){
	
				var bar = new Bar(this.s,name,null,radius-(i*radiusOffset) , center,{},360,360,null,{"stroke-width":"2","fill":"transparent","stroke":"#000","opacity":"0","cursor":"pointer"});
				hitGp.append(bar.track);
				
				bar.track.node.id = "section5_"+id+"_"+barID+"_hit";
				this.hitGroupArr.push(bar.track.node.id);
				this.hitGroupObjArr["section5_"+id+"_"+i] = bar;
				bar.track.mouseup(function(){  _this.mouseEventHandle(this.node.id, "up")});
				bar.track.mouseover(function(){  _this.mouseEventHandle(this.node.id,"over")});
				bar.track.mouseout(function(){  _this.mouseEventHandle(this.node.id,"out")});
				
				bar.animate(360 , 17.5 , 0 , 0);
				
			//}
	
			
		}
		
		
		
		
		
		var pinGp = s.group();
		
		pinGp.node.id = "pinGp"+id;
		
		pinGp.attr({
			
			"opacity":"0"	
			
		});
		
		this.barGroupArr[id].append(pinGp);
		
		for( var i = 0 ; i < 8 ; i++){
			
			pin = this.data[i]['section'+this.id].pin;
		
		if($.inArray(id, pin) != -1){
				//console.log("Pin", id )
				pinGp.append(s.paper.circle(center.x, center.y - (270-(16*(i))), 3).attr({
				"fill":"#fff",
				"stroke-width":".5",
				"stroke-linejoin":"round",
				"pointer-events":"none",
				"stroke":"#020202",
				"opacity":"1",
				}));
			}
		}
		
		
		var circle = s.paper.circle(center.x, center.y - 135, 1).attr({
				"fill":"#020202",
				"stroke-width":".5",
				"stroke-linejoin":"round",
				"stroke":"#020202",
				"opacity":"0",
				});
				
				circle.node.id = "section5_"+id+"_pin";
		this.barGroupArr[id].append(circle);
		
		return this;
	},
	
	showBar:function(gp, id , duration, delay){
		
		
	
		
		var duration = (duration != null)?duration:1;
		var delay = (delay)?delay:0;
		
		TweenMax.to("#pinGp"+id, .5, {autoAlpha:1 , delay:delay});
		TweenMax.to("#hitGp"+id, .5, {autoAlpha:1 , delay:delay});
		
		
		this.barGroupArr[id].animate({"opacity":"1"},duration*1000);

		
		for( var i = 0 ; i < 8 ; i++){
			
			var value = this.data[i]['section'+this.id].value[id-1];
			value = (value / 100) * 360;
			
			gp[i].animate(value , 17.5 , duration , delay);
		}
		
		//clearTimeout(this.pinTimeout);
		
		
		
		return this;
		
	},
	hideBar:function(gp, id , duration, delay){
		
		
		
		var duration = (duration != null)?duration:1;
		var delay = (delay)?delay:0;
		
		for( var i = 0 ; i < 8 ; i++){

			gp[i].animate(0 , 360 , duration , delay);
		}
		
		TweenMax.to("#pinGp"+id, .5, {autoAlpha:0});
		TweenMax.to("#hitGp"+id, .5, {autoAlpha:0});
		
		return this;
		
		
	},
	expandBar:function(id, duration, delay){
		
		
		
		if(this.isTween == true) return;
		this.currentPin = id;
		this.shrinkBar();
		this.lock();
		
		var _this = this;
		
		this.isExpand = true;
		this.hideHit();
		this.expandHit(id);
		TweenMax.to("#hitGp"+id, .5, {autoAlpha:0});
		//TweenMax.to("#"+this.hitGroupArr[id], .5, {opacity:0});
		
		var duration = (duration != null)?duration*1000:1000;
		
		TweenMax.to("#pinGp"+id, .5, {autoAlpha:0});
		TweenMax.to(".section5 .page1", .5, {autoAlpha:0});
		TweenMax.to(".section5 .page2", .5, {autoAlpha:1});
		
		$(".section5 a[rel="+id+"]").addClass('select');
		
		 for( var i = 1 ; i <= 20 ; i++){
			 
			 if(id == i){
				this.barGroupArr[i].animate({"opacity":"1" },500);
				
				
				
				for( var j = 0 ; j < 8 ; j++){
			
					var value = this.data[j]['section'+this.id].value[id-1];
					value = (value / 100) * 360;
					
					this.countryArr[i][j].animate(value , 360 , .5 ,0 , function(){
						
						_this.unlock();
					});
				}
				
				
				
			 }else{
				 this.barGroupArr[i].animate({"opacity":"0" },0);
			 }
			 
			 
		 }
		 
		 return this;
		
	},
	
	shrinkBar:function(duration, delay){
		
		$(".section5 a").removeClass('select');
		
		//this.resetHit();
		this.showHit();
		this.isExpand = false;
		
		var duration = (duration != null)?duration*1000:1000;
		
		 for( var i = 1 ; i <= 20 ; i++){
				
				for( var j = 0 ; j < 8 ; j++){
			
					var value = this.data[j]['section'+this.id].value[i-1];
					value = (value / 100) * 360;
					
					this.countryArr[i][j].animate(value , 17.5 , .2 , 0);
					
					TweenMax.to("#pinGp"+i, .5, {autoAlpha:1});
				}
				
			this.barGroupArr[i].animate({"transform":"r"+(i-1)*18+","+center.x+","+center.y},0);
			 
			 
		 }
		 
		 return this;
		
	},
	
	showPin:function( duration){
		
		var duration = (duration != null)?duration*1000:1000;
		
	   for( var id = 1 ; id <= 20 ; id++){
	
			this.barGroupArr[id].select("#section5_"+id+"_pin").animate({"opacity":"1"},duration);
	   }
		
		return this;
	},
	
	hidePin:function(){
		
		var duration = (duration != null)?duration*1000:1000;
		
	   for( var id = 1 ; id <= 20 ; id++){
	
			this.barGroupArr[id].select("#section5_"+id+"_pin").animate({"opacity":"0"},duration);
	   }
		
		return this;
		
		
	},
	
	highlightPin:function(i){
		
		 for( var id = 1 ; id <= 20 ; id++){
			
			if(id== i){
				this.barGroupArr[id].select("#section5_"+id+"_pin").animate({"opacity":"1"},100);
			}else{
				this.barGroupArr[id].select("#section5_"+id+"_pin").animate({"opacity":".1"},100);
			}
				
	   }
		
		return this;
	},
	resetPin:function(i){
		
		 for( var id = 1 ; id <= 20 ; id++){
			
			
				this.barGroupArr[id].select("#section5_"+id+"_pin").animate({"opacity":"1"},100);
			
				
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
	hideBg:function(duration, delay){
		
		
		var duration = (duration != null )?duration:1;
		var delay = (delay)?delay:0;
		
		for( var i = 0 ; i < 8 ; i++){
			this.bgBar[i].animate(0 , 360 , duration , delay);
		}
		
		return this;
		
	},
	
	show:function(duration, delay, clear){
		
		//console.log("show");
		var duration = (duration != null )?duration:.5;
		var delay = (delay!= null)?delay:0;
		var clear = (clear!= null)?clear:1;
		
		this.showBg(duration, delay);
		//this.resetHit();
		this.showHit();
		
		for(var i = 1 ; i <= 20 ; i++){
			this.showBar(this.countryArr[i] , i ,duration, delay+1);
			
			
		}
		
		clearTimeout(	this.pinTimeout );
		var _this = this;
		this.pinTimeout = setTimeout(function(){_this.showPin()},(delay+1)*1000);
		
		TweenMax.to(".section5 .page1", .5, {autoAlpha:1, delay:delay});
		TweenMax.to(".section5 .page2", 0, {autoAlpha:0});
		TweenMax.to(".section5", .5, {autoAlpha:1 , delay:delay});
		
		if(clear == 1){
			
			this.resetHit();
			$(".section5 .page1").removeClass("select");
			$(".section5 .page1 .country").html("Country");
			$(".section5 .page1 .indicator").html("Indicator");
			
			$(".section5 .page1 .value").html("");
			TweenMax.to(".section5 .button", 0, {autoAlpha:0});
		}
	
		TweenMax.to($(".index"),duration,{autoAlpha:1 , delay:delay});
	
		//TweenMax.to(".section5", .5, {autoAlpha:1});
		
		//this.showIndicator();
		TweenMax.to(".section5 .list", .5, {autoAlpha:1, delay:delay+1.5});
		
		TweenMax.to(this,duration,{timeout:0, delay:delay+1.5, onComplete:function(){ menu.release(); }});
		
		return this;
		
	},
	
	hide:function(duration, delay){
		
		this.reset();
		
		var duration = (duration != null )?duration:1;
		var delay = (delay)?delay:0;
	
		for(var i = 1 ; i <= 20 ; i++){
			this.hideBar(this.countryArr[i], i ,.5);
		}
		
		this.hideOverlay();
		
		this.hidePin();
		this.hideBg(.5,.5);
		$(".section5 a").removeClass('select');
		TweenMax.to(".section5 .close-btn", .5, {autoAlpha:0});
		TweenMax.to(".section5 .list", .5, {autoAlpha:0});
		TweenMax.to(".section5", .5, {autoAlpha:0});
		
		
		return this;
	},
	reset:function(){
	
		centerMap(1);
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
	}
	
}

function Donut(){
	
	this.track = [];	
	
}