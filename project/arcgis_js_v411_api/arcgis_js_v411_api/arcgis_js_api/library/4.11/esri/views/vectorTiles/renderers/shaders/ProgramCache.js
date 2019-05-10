// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define(["require","exports","./Programs","../../../webgl/programUtils"],function(c,e,a,f){Object.defineProperty(e,"__esModule",{value:!0});c=function(){function b(){this._cache=Array(8);for(var a=0;8>a;a++)this._cache[a]={}}b.prototype.dispose=function(){this._programRepo&&(this._programRepo.dispose(),this._programRepo=null)};b.prototype.getProgram=function(a,b,c){var d=this._cache[a];d[b]||(a=this._programRepo.getProgram(this._getProgramTemplate(a),c),d[b]=a);return d[b]};b.prototype.getProgramAttributes=
function(b){switch(b){case 0:return a.background.attributes;case 5:return a.circle.attributes;case 1:return a.fill.attributes;case 4:return a.icon.attributes;case 3:return a.line.attributes;case 2:return a.outline.attributes;case 6:return a.text.attributes;case 7:return a.tileInfo.attributes}};b.prototype.initialize=function(a){this._programRepo||(this._programRepo=new f.ProgramCache(a))};b.prototype._getProgramTemplate=function(b){switch(b){case 0:return a.background;case 5:return a.circle;case 1:return a.fill;
case 4:return a.icon;case 3:return a.line;case 2:return a.outline;case 6:return a.text;case 7:return a.tileInfo}};return b}();e.default=c});