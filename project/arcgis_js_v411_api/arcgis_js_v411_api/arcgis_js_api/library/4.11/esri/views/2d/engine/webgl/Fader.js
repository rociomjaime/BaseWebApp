// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(c,d){Object.defineProperty(d,"__esModule",{value:!0});c=function(){function b(a){void 0===a&&(a=400);this.duration=a;this._value=this._elapsed=this._lastTime=0;this._finished=!1}Object.defineProperty(b.prototype,"value",{get:function(){return this._value},enumerable:!0,configurable:!0});b.prototype.reset=function(){this._value=this._elapsed=this._lastTime=0};b.prototype.step=function(){var a=performance.now();if(0===this._lastTime)return this._lastTime=a,this._value=
0,!0;if(this._elapsed>=this.duration)return!0;this._elapsed+=a-this._lastTime;this._lastTime=a;this._value=Math.min(this._elapsed/this.duration,1);return!1};return b}();d.default=c});