// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../request"],function(f,a,d){Object.defineProperty(a,"__esModule",{value:!0});a.dataURItoBlob=function(b){var e=atob(b.split(",")[1]);b=b.split(",")[0].split(":")[1].split(";")[0];for(var a=new ArrayBuffer(e.length),d=new Uint8Array(a),c=0;c<e.length;c++)d[c]=e.charCodeAt(c);return new Blob([a],{type:b})};a.requestImage=function(a){return d(a,{responseType:"image"}).then(function(a){return a.data})}});