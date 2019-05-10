// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../Color ../../../core/numberUtils ../../../symbols/support/gfxUtils ./utils".split(" "),function(x,d,n,q,t,r){function m(a,b){a=u(a,b);var c=a.startIndex,g=a.endIndex;if(c===g)return b[c].color;b=n.blendColors(b[c].color,b[g].color,a.weight);return new n(b)}function u(a,b){var c=0,g=b.length-1;b.some(function(b,f){if(a<b.value)return g=f,!0;c=f;return!1});return{startIndex:c,endIndex:g,weight:(a-b[c].value)/(b[g].value-b[c].value)}}Object.defineProperty(d,"__esModule",
{value:!0});var v=[64,64,64],w=[255,255,255];d.getRampBorderColor=function(a){var b=null;if("simple"===a.type)b=a.symbol;else if("unique-value"===a.type||"class-breaks"===a.type)b=(a=(a=a.classBreakInfos||a.uniqueValueInfos)&&a[0])&&a.symbol;return(a=(a=b&&-1===b.type.indexOf("line-symbol")?t.getStroke(b):null)&&a.color)&&0<a.a&&!(240<=a.r&&240<=a.g&&240<=a.b)?a:null};d.getRampOverlayColor=function(a){var b=new n(w);b.a=1-a;return b};d.getRampStops=function(a,b,c){var g=!1,h=[],f=[];if(b.stops){var e=
b.stops,h=e.map(function(a){return a.value});(g=e.some(function(a){return!!a.label}))&&(f=e.map(function(a){return a.label}))}var p=h[0],e=h[h.length-1];if(null==p&&null==e)return null;var l=e-p;return h.map(function(e,d){var k;if("opacity"===b.type){k=c;void 0===k&&(k=v);k=new n(k);var m=a.getOpacity(e,{opacityInfo:b});null!=m&&(k.a=m)}else k=a.getColor(e,{colorInfo:b});d=g?f[d]:r.getLabelPrefix(d,h.length-1)+q.format(e);return{value:e,color:k,label:d,offset:l?1-(e-p)/l:1}}).reverse()};d.getRampStopsForPointCloud=
function(a){var b=!1,c=[],g=[],c=a.map(function(a){return a.value});(b=a.some(function(a){return!!a.label}))&&(g=a.map(function(a){return a.label}));var d=c[0],f=c[c.length-1];if(null==d&&null==f)return null;var e=f-d;return c.map(function(f,l){var h=m(f,a);l=b?g[l]:r.getLabelPrefix(l,c.length-1)+q.format(f);return{value:f,color:h,label:l,offset:e?1-(f-d)/e:1}}).reverse()};d.getColorFromPointCloudStops=m});