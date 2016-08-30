// CanvasSwirl 0.8 (2011 09 21)

// The original author of this code is Andrew Stibbard at http://xhva.net
// (xhva.net@gmail.com), copyright 2011 except where noted.
// You are hereby granted a licence to copy, extend and produce derivative
// works based upon this code for non-commercial purposes as long as this
// notice is reproduced in plain sight inside the derivative file or project.
// For commercial use please contact Andrew at the above address.

// Questions? Improvements? Contact me: http://xhva.net/work or xhva.net@gmail.com .
// Cheers!

// requestAnimationFrame wrapper by Paul Irish. Thanks!
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/

window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||false;})();(function(){if(typeof Object.create!=='function'){Object.create=function(o){function F(){}
F.prototype=o;return new F();};}
var CanvasSwirl=window.CanvasSwirl=function(canvas,config){if(!canvas){return false;}
var self=this;var fps=this._fps=60;this.canvas=canvas;this._context=this.canvas.getContext("2d");this._tick=0;this._startTime=Date.now();this._transitions={};this._transitionEffects={opacity:1,count:1,rotationVelocity:1,distanceVelocity:1};this.paused=false;this.onTick=null;var currentConfig=this._currentConfig=Object.create(new this._ConfigDefault());var currentConfigRaw=this._currentConfigRaw=Object.create(new this._ConfigDefault());var points=this._points=[];if(config){this.applyConfig(config);}
if(window.requestAnimFrame){window.requestAnimFrame(function(){self._main();},canvas);}
else{setInterval(function(){self._main();},1000/fps);}};CanvasSwirl.prototype.getCurrentConfig=function(){return this._currentConfig;};CanvasSwirl.prototype._getUsedValueForProperty=function(prop,value){var canvas=this.canvas;switch(prop){case"count":return parseInt(value,10);case"originXOffsetMin":case"originXOffsetMax":if(value.toString().substr(-1)==="%"){return parseFloat(value)/100*canvas.width;}
return parseFloat(value);case"originYOffsetMin":case"originYOffsetMax":if(value.toString().substr(-1)==="%"){return parseFloat(value)/100*canvas.height;}
return parseFloat(value);case"radiusInnerMin":case"radiusInnerMax":case"radiusOuterMin":case"radiusOuterMax":if(value.toString().substr(-1)==="%"){return parseFloat(value)/100*Math.max(canvas.width,canvas.height);}
return parseFloat(value);case"originX":if(value.toString()==="left"){return 0;}
if(value.toString()==="right"){return canvas.width;}
if(value.toString()==="center"){return canvas.width/2;}
if(value.toString().substr(-1)==="%"){return parseFloat(value)/100*canvas.width;}
return parseFloat(value);case"originY":if(value.toString()==="top"){return 0;}
if(value.toString()==="bottom"){return canvas.height;}
if(value.toString()==="center"){return canvas.height/2;}
if(value.toString().substr(-1)==="%"){return parseFloat(value)/100*canvas.height;}
return parseFloat(value);case"opacityScaleIsRelative":case"lightnessScaleIsRelative":case"saturationScaleIsRelative":return value;case"shape":switch(value){case"lines":return 0;case"dots":return 1;case"circles":return 2;case"random":return-1;}
return 0;default:return parseFloat(value);}};CanvasSwirl.prototype.applyConfig=function(config){var c=this._currentConfig;var cRaw=this._currentConfigRaw;var points=this._points;var p;for(p in c){delete c[p];delete cRaw[p];}
for(p in config){switch(p){case"radiusMin":c.radiusOuterMin=config[p];cRaw.radiusOuterMin=config[p];break;case"radiusMax":c.radiusOuterMax=config[p];cRaw.radiusOuterMax=config[p];break;default:c[p]=config[p];cRaw[p]=config[p];}}
for(p in c){c[p]=this._getUsedValueForProperty(p,c[p]);}
points.length=0;var i=c.count;while(i--){points.push(new this._Point(c));}};CanvasSwirl.prototype.applyConfigProperty=function(prop,value){var canvas=this.canvas;var c=this._currentConfig;var cRaw=this._currentConfigRaw;var points=this._points;c[prop]=this._getUsedValueForProperty(prop,value);cRaw[prop]=value;points.length=0;var i=c.count;while(i--){points.push(new this._Point(c));}};CanvasSwirl.prototype.getCurrentConfigRaw=function(){var
r={},p,cRaw=this._currentConfigRaw;for(p in cRaw){r[p]=cRaw[p];}
return r;};CanvasSwirl.prototype._ConfigDefault=function(){return{count:400,shape:"lines",radiusInnerMax:"0%",radiusInnerMin:"0%",radiusOuterMax:"50%",radiusOuterMin:"50%",thicknessMin:1,thicknessMax:1,fadeTime:0.25,rotationVelMin:0.2,rotationVelMax:0.4,originX:"center",originY:"center",originXOffsetMin:0,originXOffsetMax:0,originYOffsetMin:0,originYOffsetMax:0,distanceVelMin:0.25,distanceVelMax:0.6,saturationMin:35,saturationMax:75,lightnessMin:30,lightnessMax:70,hueMin:0,hueMax:360,hueIncrement:1,opacityMin:1,opacityMax:1,opacityScaleAtCenter:1,opacityScaleAtEdge:1,opacityScaleIsRelative:true,lightnessScaleAtCenter:1,lightnessScaleAtEdge:1,lightnessScaleIsRelative:true,saturationScaleAtCenter:1,saturationScaleAtEdge:1,saturationScaleIsRelative:true,distanceJitterMin:0,distanceJitterMax:0,rotationJitterMin:0,rotationJitterMax:0};};CanvasSwirl.prototype._update=function(){var points=this._points;var c=this._currentConfig;var te=this._transitionEffects;var i=0;for(i=0;i<c.count;i++){points[i].rotAngle+=(points[i].rotVel/this._fps)*te.rotationVelocity;points[i].rotAngleDrawn=points[i].rotAngle+(Math.random()*(c.rotationJitterMax-c.rotationJitterMin)+c.rotationJitterMin);points[i].distanceAngle+=(points[i].distanceVel/this._fps)*te.distanceVelocity;points[i].distance=((Math.sin(points[i].distanceAngle)*points[i].radius/2)+points[i].radius/2)+points[i].radiusInner;points[i].distanceDrawn=points[i].distance+(Math.random()*(c.distanceJitterMax-c.distanceJitterMin)+c.distanceJitterMin);points[i].x=points[i].originX+Math.cos(points[i].rotAngleDrawn)*points[i].distanceDrawn;points[i].y=points[i].originY+Math.sin(points[i].rotAngleDrawn)*points[i].distanceDrawn;points[i].color.hue=(points[i].color.hue+c.hueIncrement);if(points[i].color.hue>c.hueMax){points[i].color.hue=c.hueMin;}else if(points[i].color.hue<c.hueMin){points[i].color.hue=c.hueMax;}}};CanvasSwirl.prototype._draw=function(){var
context=this._context,points=this._points,c=this._currentConfig,hue=0,sat=0,light=0,opacity=0,distanceRatio=0,te=this._transitionEffects,i=0;context.globalCompositeOperation="destination-out";var clearOpacity=(c.fadeTime?1/c.fadeTime/this._fps:1);if(clearOpacity<0.004){clearOpacity=0.004;}
context.fillStyle="rgba(0,0,0,"+clearOpacity+")";context.fillRect(0,0,this.canvas.width,this.canvas.height);context.globalCompositeOperation="source-over";for(i=0;i<c.count;i++){distanceRatio=(points[i].distanceDrawn-points[i].radiusInner)/points[i].radius-0.000001;hue=Math.floor(points[i].color.hue);sat=(distanceRatio*(c.saturationScaleAtEdge-c.saturationScaleAtCenter)+c.saturationScaleAtCenter)*(c.saturationScaleIsRelative?points[i].color.saturation:100);light=(distanceRatio*(c.lightnessScaleAtEdge-c.lightnessScaleAtCenter)+c.lightnessScaleAtCenter)*(c.lightnessScaleIsRelative?points[i].color.lightness:100);opacity=((distanceRatio*(c.opacityScaleAtEdge-c.opacityScaleAtCenter)+c.opacityScaleAtCenter)*(c.opacityScaleIsRelative?points[i].color.opacity:1))*te.opacity;if(i<Math.floor(c.count*te.count)){switch(points[i].shape){case 0:context.strokeStyle="hsla("+hue+", "+sat+"%, "+light+"%, "+opacity+")";context.lineWidth=points[i].thickness;context.beginPath();context.moveTo(points[i].lastX||points[i].x,points[i].lastY||points[i].y);context.lineTo(points[i].x,points[i].y);context.closePath();context.stroke();break;case 1:context.fillStyle="hsla("+hue+", "+sat+"%, "+light+"%, "+opacity+")";context.fillRect(points[i].x-points[i].thickness/2,points[i].y-points[i].thickness/2,points[i].thickness,points[i].thickness);break;case 2:context.fillStyle="hsla("+hue+", "+sat+"%, "+light+"%, "+opacity+")";context.beginPath();context.arc(points[i].x,points[i].y,points[i].thickness,0,Math.PI*2,true);context.closePath();context.fill();break;}}
points[i].lastX=points[i].x;points[i].lastY=points[i].y;}};CanvasSwirl.prototype._Point=function(config){this.originX=config.originX+(Math.random()*(config.originXOffsetMax-config.originXOffsetMin)+config.originXOffsetMin);this.originY=config.originY+(Math.random()*(config.originYOffsetMax-config.originYOffsetMin)+config.originYOffsetMin);var radiusInner=Math.random()*(config.radiusInnerMax-config.radiusInnerMin)+config.radiusInnerMin;this.radius=Math.random()*(config.radiusOuterMax-config.radiusOuterMin)+config.radiusOuterMin-radiusInner;this.radiusInner=radiusInner;this.rotAngle=Math.random()*360;this.rotVel=(Math.random()*(config.rotationVelMax-config.rotationVelMin)+config.rotationVelMin)*(2*Math.PI);this.distanceVel=(Math.random()*(config.distanceVelMax-config.distanceVelMin)+config.distanceVelMin)*Math.PI*(Math.random()<0.5?-1:1);this.distanceAngle=(Math.random()*360)*(Math.PI/180);this.color={hue:Math.floor(Math.random()*(config.hueMax-config.hueMin)+config.hueMin),saturation:Math.floor(Math.random()*(config.saturationMax-config.saturationMin)+config.saturationMin),lightness:Math.floor(Math.random()*(config.lightnessMax-config.lightnessMin)+config.lightnessMin),opacity:Math.random()*(config.opacityMax-config.opacityMin)+config.opacityMin};this.thickness=Math.random()*(config.thicknessMax-config.thicknessMin)+config.thicknessMin;this.shape=(config.shape===-1?Math.round(Math.random()*2):config.shape);};CanvasSwirl.prototype._wrapNumber=function(num,min,max){if(num>=min&&num<max){return num;}
if(min===0){num=num%max;}
else{num=(num-min)%(max-min);}
if(num<0){return max+num;}
return num+min;};CanvasSwirl.prototype._main=function(){var self=this;if(!this.paused){this._tick++;this._update();this._processTransitions();this._draw();}
if(typeof this.onTick==='function'){this.onTick({tick:this._tick,timeElapsed:Date.now()-this._startTime,swirlObject:this});}
if(window.requestAnimFrame){window.requestAnimFrame(function(){self._main();},this.canvas);}};CanvasSwirl.prototype.addTransition=function(type,value,msDuration,finishCallback){var t=this._transitions;var te=this._transitionEffects;if(t[type]){return false;}
if(!msDuration||isNaN(msDuration)||msDuration<0){return false;}
if(finishCallback&&typeof finishCallback!=='function'){return false;}
var from,to;switch(type){case"opacity":from=te.opacity;break;case"count":from=te.count;break;case"rotationVelocity":from=te.rotationVelocity;break;case"distanceVelocity":from=te.distanceVelocity;break;default:return false;}
t[type]={msDuration:msDuration,finishCallback:finishCallback||null,startTime:Date.now(),from:from,to:value};};CanvasSwirl.prototype._processTransitions=function(){var t=this._transitions;var te=this._transitionEffects;var points=this._points;var i;var timeRatio;for(i in t){timeRatio=(Date.now()-t[i].startTime)/t[i].msDuration;switch(i){case"opacity":te.opacity=(timeRatio*(t[i].to-t[i].from))+t[i].from;if(te.opacity<0){te.opacity=0;}
if(te.opacity>1){te.opacity=1;}
break;case"count":te.count=(timeRatio*(t[i].to-t[i].from))+t[i].from;if(te.count<0){te.count=0;}
if(te.count>this._currentConfig.count){te.count=this._currentConfig.count;}
break;case"rotationVelocity":te.rotationVelocity=(timeRatio*(t[i].to-t[i].from))+t[i].from;break;case"distanceVelocity":te.distanceVelocity=(timeRatio*(t[i].to-t[i].from))+t[i].from;break;}
if((Date.now()-t[i].startTime)>=t[i].msDuration){if(t[i].finishCallback&&typeof t[i].finishCallback==='function'){t[i].finishCallback(i);}
delete t[i];}}};CanvasSwirl.prototype.resetTransitionEffects=function(){var te=this._transitionEffects;var i;for(i in te){te[i]=1;}};})();


//http://jsswirl.com/