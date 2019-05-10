// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../../../core/libs/gl-matrix-2/vec3 ../../../../core/libs/gl-matrix-2/vec3f64 ../../support/buffer/InterleavedLayout ../lib/GLMaterial ../lib/Material ../lib/Util ./internal/MaterialUtil ./renderers/MergedRenderer ../shaders/MeasurementArrowPrograms ../../../webgl/renderState".split(" "),function(q,J,r,c,d,A,B,C,h,n,D,E,p){q=function(c){function a(a,b){b=c.call(this,b)||this;b.params=n.copyParameters(a,F);return b}r(a,c);a.prototype.dispose=
function(){};a.prototype.setParameterValues=function(a){n.updateParameters(this.params,a)&&this.notifyDirty("matChanged")};a.prototype.getParameters=function(){return this.params};a.prototype.intersect=function(a,b,c,h,k,K,l,m){};a.prototype.createBufferWriter=function(){return new G};a.prototype.createRenderer=function(a,b){return new D(a,b,this)};a.prototype.getGLMaterials=function(){return{color:H,depthShadowMap:void 0,normal:void 0,depth:void 0,highlight:void 0}};a.prototype.getAllTextureIds=
function(){return[]};return a}(C);var H=function(c){function a(a,b,L){a=c.call(this,a,b)||this;a.updateParameters();return a}r(a,c);a.prototype.selectProgram=function(){this.program=this.programRep.getProgram(E.colorPass);this.pipelineState=p.makePipelineState({polygonOffset:this.params.polygonOffset&&{factor:0,units:-4},depthTest:{func:513},depthWrite:p.defaultDepthWriteParams,colorWrite:p.defaultColorWriteParams})};a.prototype.updateParameters=function(){this.params=n.copyParameters(this.material.getParameters());
this.selectProgram()};a.prototype.beginSlot=function(a){return 4===a};a.prototype.getProgram=function(){return this.program};a.prototype.getDrawMode=function(){return 5};a.prototype.bind=function(a,b){b=this.program;a.bindProgram(b);a.setPipelineState(this.pipelineState);b.setUniform1f("width",this.params.width);b.setUniform1f("outlineSize",this.params.outlineSize);b.setUniform4fv("outlineColor",this.params.outlineColor);b.setUniform1f("stripeLength",this.params.stripeLength);b.setUniform4fv("stripeEvenColor",
this.params.stripeEvenColor);b.setUniform4fv("stripeOddColor",this.params.stripeOddColor)};a.prototype.bindView=function(a,b){a=b.origin;var c=this.getProgram();n.bindView(a,b.view,c)};a.prototype.bindInstance=function(a,b){this.getProgram().setUniformMatrix4fv("model",b.transformation)};a.prototype.release=function(a){};return a}(B),F={width:32,outlineSize:.2,outlineColor:[1,.5,0,1],stripeLength:1,stripeEvenColor:[1,1,1,1],stripeOddColor:[1,.5,0,1],polygonOffset:!1},I=A.newLayout().vec3f(h.VertexAttrConstants.POSITION).vec3f(h.VertexAttrConstants.NORMAL).vec2f(h.VertexAttrConstants.UV0).f32(h.VertexAttrConstants.AUXPOS1),
l=d.vec3f64.create(),t=d.vec3f64.create(),v=d.vec3f64.create(),m=d.vec3f64.create(),w=d.vec3f64.create(),G=function(){function d(){this.vertexBufferLayout=I}d.prototype.allocate=function(a){return this.vertexBufferLayout.createBuffer(a)};d.prototype.elementCount=function(a){return 2*(a.indices[h.VertexAttrConstants.POSITION].length/2+1)};d.prototype.write=function(a,f,b,d,n){var k=f.vertexAttr[h.VertexAttrConstants.POSITION].data,p=f.vertexAttr[h.VertexAttrConstants.NORMAL].data;b=k.length/3;(f=f&&
f.indices&&f.indices.position)&&f.length!==2*(b-1)&&console.warn("MeasurementArrowMaterial does not support indices");f=a.transformation;for(var q=a.invTranspTransformation,r=d.position,z=d.normal,x=d.uv0,g=a=0;g<b;++g){var e=3*g;c.vec3.set(l,k[e],k[e+1],k[e+2]);g<b-1&&(e=3*(g+1),c.vec3.set(t,k[e],k[e+1],k[e+2]),c.vec3.set(w,p[e],p[e+1],p[e+2]),c.vec3.normalize(w,w),c.vec3.subtract(v,t,l),c.vec3.normalize(v,v),c.vec3.cross(m,w,v),c.vec3.normalize(m,m));e=c.vec3.distance(l,t);f&&q&&(c.vec3.transformMat4(l,
l,f),c.vec3.transformMat4(t,t,f),c.vec3.transformMat4(m,m,q));var u=n+2*g,y=u+1;r.setVec(u,l);r.setVec(y,l);z.setVec(u,m);z.setVec(y,m);x.set(u,0,a);x.set(u,1,-1);x.set(y,0,a);x.set(y,1,1);g<b-1&&(a+=e)}d=d.auxpos1;for(g=0;g<2*b;++g)d.set(n+g,a)};return d}();return q});