// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define(["require","exports","./utils"],function(D,x,A){function C(a,c,g,n,b,f){f=A.getStride(b,f);var h=g,k=g+f,q=0,l=0,p=g=0,r=0,v=0;for(--n;v<n;v++,h+=f,k+=f){var d=c[h],m=c[h+1],t=c[h+2],u=c[k],w=c[k+1],y=c[k+2],e=d*w-u*m,p=p+e,q=q+(d+u)*e,l=l+(m+w)*e;b&&(e=d*y-u*t,g+=(t+y)*e,r+=e);d<a[0]&&(a[0]=d);d>a[1]&&(a[1]=d);m<a[2]&&(a[2]=m);m>a[3]&&(a[3]=m);b&&(t<a[4]&&(a[4]=t),t>a[5]&&(a[5]=t))}0<p&&(p*=-1);0<r&&(r*=-1);if(!p)return null;a=[q,l,.5*p];b&&(a[3]=g,a[4]=.5*r);return a}function B(a,c,g,n,b){b=
A.getStride(n,b);for(var f=c,h=c+b,k=0,q=0,l=0,p=0,r=0,v=g-1;r<v;r++,f+=b,h+=b){var d=a[f],m=a[f+1],t=a[f+2],u=a[h],w=a[h+1],y=a[h+2],e;if(n){e=u-d;var z=w-m,x=y-t;e=Math.sqrt(e*e+z*z+x*x)}else e=u-d,z=w-m,e=Math.sqrt(e*e+z*z);e&&(k+=e,n?(d=[d+.5*(u-d),m+.5*(w-m),t+.5*(y-t)],q+=e*d[0],l+=e*d[1],p+=e*d[2]):(d=[d+.5*(u-d),m+.5*(w-m)],q+=e*d[0],l+=e*d[1]))}return 0<k?n?[q/k,l/k,p/k]:[q/k,l/k]:0<g?n?[a[c],a[c+1],a[c+2]]:[a[c],a[c+1]]:null}Object.defineProperty(x,"__esModule",{value:!0});x.getCentroidOptimizedGeometry=
function(a,c,g,n){if(!c||!c.lengths.length)return null;a.lengths.length&&(a.lengths.length=0);a.coords.length&&(a.coords.length=0);for(var b=a.coords,f=[],h=g?[Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY]:[Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY],k=c.lengths,q=c.coords,l=A.getStride(g,n),p=0,r=0;r<k.length;r++){var v=k[r],d=C(h,q,p,v,
g,n);d&&f.push(d);p+=v*l}f.sort(function(a,c){var b=a[2]-c[2];0===b&&g&&(b=a[4]-c[4]);return b});f.length&&(l=6*f[0][2],b[0]=f[0][0]/l,b[1]=f[0][1]/l,g&&(l=6*f[0][4],b[2]=0!==l?f[0][3]/l:0),b[0]<h[0]||b[0]>h[1]||b[1]<h[2]||b[1]>h[3]||g&&(b[2]<h[4]||b[2]>h[5]))&&(b.length=0);if(!b.length)if(c=c.lengths[0]?B(q,0,k[0],g,n):null)b[0]=c[0],b[1]=c[1],g&&2<c.length&&(b[2]=c[2]);else return null;return a};x.lineCentroid=B});