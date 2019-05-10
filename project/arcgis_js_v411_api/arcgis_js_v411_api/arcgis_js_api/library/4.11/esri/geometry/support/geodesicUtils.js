// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports @dojo/framework/shim/object ../../core/Error ../../core/Logger ../../core/unitUtils ../Point ../Polygon ../Polyline ../SpatialReference".split(" "),function(T,t,L,A,M,G,N,O,P,Q){function H(a){if(!a||!a.isGeographic)return null;if(a.wkid){var c=R[a.wkid];if(c)return c}if(a.wkt){a=S.exec(a.wkt);if(!a||2!==a.length)return null;c=a[1].split(",");if(!c||3!==c.length)return null;a=parseFloat(c[1]);c=parseFloat(c[2]);return isNaN(a)||isNaN(c)?null:{a:a,f:0===c?0:1/c}}return null}
function C(a){a=H(a||I);if("b"in a&&"eSq"in a&&"radius"in a)return a;var c=a.a*(1-a.f);return L.assign(a,{b:c,eSq:1-Math.pow(c/a.a,2),radius:(2*a.a+c)/3})}function D(a,c,g){var d=C(g);g=d.a;var d=d.eSq,e=Math.sqrt(d),b=Math.sin(c[1]*w);c=g*c[0]*w;g=0<d?g*(1-d)*(b/(1-d*b*b)-1/(2*e)*Math.log((1-e*b)/(1+e*b)))*.5:g*b;a[0]=c;a[1]=g;return a}function y(a){return null!==H(a)}function J(a,c){if("polyline"!==a.type&&"polygon"!==a.type)throw z.error("invalid geometry: the input geometry is neither polyline nor polygon"),
new A("geodesic-densify:invalid-geometry","the input geometry is neither polyline nor polygon");if(!y(a.spatialReference))throw z.error("invalid spatialreference: the input geometry spatialreference is not supported"),new A("geodesic-densify:invalid-spatial-reference","the input geometry spatial reference is not supported");var g=a.spatialReference,d=C(g).radius/1E4;c<d&&(c=d);for(var d=[],e=0,b="polyline"===a.type?a.paths:a.rings;e<b.length;e++){var f=b[e],m=[];d.push(m);m.push([f[0][0],f[0][1]]);
for(var p=f[0][0]*w,l=f[0][1]*w,h=void 0,k=void 0,q=0;q<f.length-1;q++)if(h=f[q+1][0]*w,k=f[q+1][1]*w,p!==h||l!==k){var k=F(l,p,k,h,g),h=k.azimuth,k=k.geodesicDistance,x=k/c;if(1<x){for(var u=1;u<=x-1;u++){var B=E(l,p,h,u*c,g);m.push([B.x,B.y])}x=E(l,p,h,(k+Math.floor(x-1)*c)/2,g);m.push([x.x,x.y])}l=E(l,p,h,k,g);m.push([l.x,l.y]);p=l.x*w;l=l.y*w}}return"polyline"===a.type?new P({paths:d,spatialReference:g}):new O({rings:d,spatialReference:g})}function E(a,c,g,d,e){var b=C(e),f=b.a,m=b.b,b=b.f,p=
Math.sin(g);g=Math.cos(g);var l=(1-b)*Math.tan(a);a=1/Math.sqrt(1+l*l);for(var h=l*a,k=Math.atan2(l,g),l=a*p,q=l*l,x=1-q,f=x*(f*f-m*m)/(m*m),u=1+f/16384*(4096+f*(-768+f*(320-175*f))),B=f/1024*(256+f*(-128+f*(74-47*f))),f=d/(m*u),K=2*Math.PI,v,n,r,t;1E-12<Math.abs(f-K);)r=Math.cos(2*k+f),v=Math.sin(f),n=Math.cos(f),t=B*v*(r+B/4*(n*(-1+2*r*r)-B/6*r*(-3+4*v*v)*(-3+4*r*r))),K=f,f=d/(m*u)+t;d=h*v-a*n*g;m=b/16*x*(4+b*(4-3*x));return new N((c+(Math.atan2(v*p,a*n-h*v*g)-(1-m)*b*l*(f+m*v*(r+m*n*(-1+2*r*r)))))/
w,Math.atan2(h*n+a*v*g,(1-b)*Math.sqrt(q+d*d))/w,e||I)}function F(a,c,g,d,e){var b=C(e),f=b.a;e=b.b;var m=b.f,p=b.radius,l=d-c,h=Math.atan((1-m)*Math.tan(a)),k=Math.atan((1-m)*Math.tan(g)),b=Math.sin(h),h=Math.cos(h),q=Math.sin(k),k=Math.cos(k),x=1E3,u=l,w,t,v,n,r,A,y,z;do{n=Math.sin(u);r=Math.cos(u);v=Math.sqrt(k*n*k*n+(h*q-b*k*r)*(h*q-b*k*r));if(0===v)return{geodesicDistance:0};r=b*q+h*k*r;A=Math.atan2(v,r);y=h*k*n/v;t=1-y*y;n=r-2*b*q/t;isNaN(n)&&(n=0);z=m/16*t*(4+m*(4-3*t));w=u;u=l+(1-z)*m*y*(A+
z*v*(n+z*r*(-1+2*n*n)))}while(1E-12<Math.abs(u-w)&&0<--x);if(0===x)return e=d-c,{azimuth:Math.atan2(Math.sin(e)*Math.cos(g),Math.cos(a)*Math.sin(g)-Math.sin(a)*Math.cos(g)*Math.cos(e)),geodesicDistance:Math.acos(Math.sin(a)*Math.sin(g)+Math.cos(a)*Math.cos(g)*Math.cos(d-c))*p};a=t*(f*f-e*e)/(e*e);c=a/1024*(256+a*(-128+a*(74-47*a)));return{azimuth:Math.atan2(k*Math.sin(u),h*q-b*k*Math.cos(u)),geodesicDistance:e*(1+a/16384*(4096+a*(-768+a*(320-175*a))))*(A-c*v*(n+c/4*(r*(-1+2*n*n)-c/6*n*(-3+4*v*v)*
(-3+4*n*n)))),reverseAzimuth:Math.atan2(h*Math.sin(u),h*q*Math.cos(u)-b*k)}}Object.defineProperty(t,"__esModule",{value:!0});var z=M.getLogger("esri.geometry.support.geodesicUtils"),w=Math.PI/180,I=Q.WGS84,S=/SPHEROID\[([^\]]+)]/i,R={4326:{a:6378137,f:1/298.257223563},104900:{a:2439700,f:0},104901:{a:6051E3,f:0},104902:{a:6051800,f:0},104903:{a:1737400,f:0},104904:{a:3393400,f:.005207166853303471},104905:{a:3396190,f:.005886007555525457},104906:{a:6200,f:0},104907:{a:11100,f:0},104908:{a:71492E3,
f:.06487439154031222},104909:{a:8200,f:0},104910:{a:83500,f:0},104911:{a:1E4,f:0},104912:{a:2409300,f:0},104913:{a:15E3,f:0},104914:{a:4E4,f:0},104915:{a:1562090,f:0},104916:{a:2632345,f:0},104917:{a:85E3,f:0},104918:{a:1821460,f:0},104919:{a:5E3,f:0},104920:{a:12E3,f:0},104921:{a:3E4,f:3},104922:{a:18E3,f:0},104923:{a:14E3,f:0},104924:{a:49300,f:0},104925:{a:60268E3,f:.09796243445941462},104926:{a:16E3,f:0},104927:{a:9500,f:0},104928:{a:56E4,f:0},104929:{a:249400,f:0},104930:{a:59500,f:0},104931:{a:16E3,
f:0},104932:{a:133E3,f:0},104933:{a:718E3,f:0},104934:{a:888E3,f:0},104935:{a:1986300,f:0},104936:{a:1E4,f:0},104937:{a:41900,f:0},104938:{a:11E4,f:0},104939:{a:50100,f:0},104940:{a:764E3,f:0},104941:{a:11E3,f:0},104942:{a:529800,f:0},104943:{a:2575E3,f:0},104944:{a:25559E3,f:.022927344575296365},104945:{a:578900,f:0},104946:{a:33E3,f:0},104947:{a:21E3,f:0},104948:{a:13E3,f:0},104949:{a:31E3,f:0},104950:{a:27E3,f:0},104951:{a:42E3,f:0},104952:{a:235800,f:0},104953:{a:761400,f:0},104954:{a:15E3,f:0},
104955:{a:54E3,f:0},104956:{a:77E3,f:0},104957:{a:27E3,f:0},104958:{a:788900,f:0},104959:{a:584700,f:0},104960:{a:24764E3,f:.01708124697141011},104961:{a:74E3,f:0},104962:{a:79E3,f:0},104963:{a:104E3,f:.14423076923076922},104964:{a:29E3,f:0},104965:{a:17E4,f:0},104966:{a:208E3,f:0},104967:{a:4E4,f:0},104968:{a:1352600,f:0},104969:{a:1195E3,f:0},104970:{a:593E3,f:0}};t.isSupported=y;t.geodesicAreas=function(a,c){if(a.some(function(a){return!y(a.spatialReference)}))throw z.error("invalid spatialreference: the input geometries spatialreference is not supported"),
new A("geodesic-areas:invalid-spatial-reference","the input geometries spatial reference is not supported");for(var g=[],d=0;d<a.length;d++){var e=a[d],b=e.spatialReference,b=.0015696101447650193*C(b).radius;g.push(J(e,b))}a=[];for(var d=[0,0],e=[0,0],f=0;f<g.length;f++){for(var b=g[f],m=b.rings,b=b.spatialReference,p=0,l=0;l<m.length;l++){var h=m[l];D(d,h[0],b);D(e,h[h.length-1],b);for(var k=e[0]*d[1]-d[0]*e[1],q=0;q<h.length-1;q++)D(d,h[q+1],b),D(e,h[q],b),k+=e[0]*d[1]-d[0]*e[1];p+=k}p=G.convertUnit(p,
"square-meters",c);a.push(p/-2)}return a};t.geodesicLengths=function(a,c){if(!a&&!a)throw z.error("invalid geometry type: the input geometries type is not supported"),new A("geodesic-lengths:invalid-geometries","the input geometries type is not supported");if(a.some(function(a){return!y(a.spatialReference)}))throw z.error("invalid spatialreference: the input geometries spatialreference is not supported"),new A("geodesic-lengths:invalid-spatial-reference","the input geometries spatial reference is not supported");
for(var g=[],d=0;d<a.length;d++){for(var e=a[d],b=e.spatialReference,e="polyline"===e.type?e.paths:e.rings,f=0,m=0;m<e.length;m++){for(var p=e[m],l=0,h=1;h<p.length;h++){var k=p[h-1][0]*w,q=p[h][0]*w,t=p[h-1][1]*w,u=p[h][1]*w;if(t!==u||k!==q)k=F(t,k,u,q,b),l+=k.geodesicDistance}f+=l}f=G.convertUnit(f,"meters",c);g.push(f)}return g};t.geodesicDensify=J;t.directGeodeticSolver=E;t.inverseGeodeticSolver=F});