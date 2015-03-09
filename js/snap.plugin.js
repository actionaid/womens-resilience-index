Snap.plugin( function( Snap, Element, Paper, global ) {

  function addLoadedFrags( whichSVG, fragList, runWhenFinishedFunc ) { // This is called once all the loaded frags are complete
    for( var count = 0; count < fragList.length; count++ ) {
        myEl = whichSVG.append( fragList[ count ] );
    }
    runWhenFinishedFunc();
  }
  
  function arc(xloc, yloc, value, total, R, width){
	 		if(!width) width = R * 0.4;
					var alpha = 360 / total * value,
						a = (90 - alpha) * Math.PI / 180,
						w = width / 2,
						r1 = R + w,
						r2 = R - w,
						x1 = xloc + r1 * Math.cos(a),
						y1 = yloc - r1 * Math.sin(a),
						x2 = xloc + r2 * Math.cos(a),
						y2 = yloc - r2 * Math.sin(a),
						path;
					if (total == value) {
						
						path = "M"+xloc+","+(yloc - r1);
						path += "A"+r1+","+r1+","+0+","+1+","+1+","+(xloc - 0.01)+","+(yloc - r1);
						path += "Z";
						path += "M"+(xloc - 0.01)+","+(yloc - r2);
						path += "A"+r2+","+r2+","+0+","+1+","+0+","+(xloc)+","+(yloc - r2);
						path += "Z";
						
					} else {
					
						var largeArc = ((alpha > 180) ? 1 : 0);
						
						path = "M"+xloc+","+(yloc - r1);
						path += "A"+r1+","+r1+","+0+","+largeArc+","+1+","+(x1)+","+(y1);
						path += "L"+x2+","+y2;
						path += "A"+r2+","+r2+","+0+","+largeArc+","+0+","+(xloc)+","+(yloc - r2);
						path += "L"+xloc+","+(yloc - r1);
						path += "Z";
						
					}
					return  path;
					
 }
  
   function sector(cx, cy, startAngle, endAngle, r) {
	
		 var largeArc = ((endAngle - startAngle > 180) ? 1 : 0);
		 var direction = 1
		 if(endAngle < startAngle){
			direction = 0;
		 }
		 
	     var rad = Math.PI / 180;
		 startAngle =  90 - startAngle;
		 endAngle =  90 - endAngle;
		 var x1 = cx + r * Math.cos(-startAngle * rad),
		 x2 = cx + r * Math.cos(-endAngle * rad),
		 y1 = cy + r * Math.sin(-startAngle * rad),
		 y2 = cy + r * Math.sin(-endAngle * rad);
	
		 return "M"+cx+","+cy+"L"+x1+","+ y1+"A"+r+","+r+","+0+","+ largeArc+","+ direction+","+x2+","+y2+"Z";
			 
	};

  Element.prototype.animateSector = function(current, value, attr , duration , easing , callback) {
	  
	  var _this = this;
	 var param = {};
	 
	 if(!easing) easing = mina.easeinout;
	 if(!callback) callback = function(){};
	 if(duration == null) duration = 1000;
		
	 if(attr){
		 
		_this.animate(attr,duration); 
	 }
	 
	 Snap.animate(current,value, function(val){
		  
		  param.d = sector(_this.centerX, _this.centerY, _this.startAngle, val, _this.radius);
		  
		  _this.attr(param);
		  _this.value = val;

	  },duration, easing , callback);
	  
  };
	
	
  
  Element.prototype.animateArc = function(current, value, total, attr , duration , easing , callback) {
	  //console.log(this);
	  
	  //console.log();
	
	 var _this = this;
	 var param = {};
	 
	 if(!easing) easing = mina.easeinout;
	 if(!callback) callback = function(){};
	 if(duration == null) duration = 1000;
		
	 if(attr){
		 
		_this.animate(attr,duration); 
	 }
	
		
	  Snap.animate(current,value, function(val){
		  
		  param.d = arc(_this.centerX, _this.centerY, val, total, _this.radius, _this.arcWidth);
		  
		  _this.attr(param);
		  _this.value = val;

	  },duration, easing , callback);
	  
  };
	

  Paper.prototype.sector = function(cx, cy, startAngle, endAngle, r) {
	  var tmp =this.paper.path(sector(cx, cy, startAngle, endAngle, r));
	  
	  tmp.centerX = cx;
	  tmp.centerY = cy;
	  tmp.radius = r;
	  tmp.startAngle = startAngle;
	  tmp.value = endAngle;
	  
	  return tmp;
	  
  }
  
  Paper.prototype.arc = function(xloc, yloc, value, total, R, width) {
	  var tmp =  this.paper.path(arc(xloc, yloc, value, total, R, width));
	  
	  tmp.centerX = xloc;
	  tmp.centerY = yloc;
	  tmp.radius = R;
	  tmp.arcWidth = width;
	  tmp.value = value;
	  
	  return tmp;
  }
  
   Paper.prototype.sectorPath= function(cx, cy, startAngle, endAngle, r) {
	  return sector(cx, cy, startAngle, endAngle, r);
  }
  
  Paper.prototype.arcPath= function(xloc, yloc, value, total, R, width) {
	  return arc(xloc, yloc, value, total, R, width);
  }

  Paper.prototype.loadFilesDisplayOrdered = function( path , list, afterAllLoadedFunc, onEachElementLoadFunc ) {
     var image, fragLoadedCount = 0, listLength = list.length, fragList = new Array(), whichSVG = this;

      for( var count = 0; count < listLength; count++ ) {
        (function() {
          var whichEl = count,
          fileName = list[ whichEl ],
          image = Snap.load( path+fileName, function ( loadedFragment ) { 
               fragLoadedCount++;
               onEachElementLoadFunc( loadedFragment, fileName );
               fragList[ whichEl ] = loadedFragment;
               if( fragLoadedCount >= listLength ) {
                  addLoadedFrags( whichSVG, fragList, afterAllLoadedFunc );
               }
            } );  
        })();
     }
  };

});


