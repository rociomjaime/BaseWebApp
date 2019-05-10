// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../request ../../../core/arrayUtils ../../../core/arrayUtils ../../../core/Logger ../../../core/promiseUtils ../../../core/screenUtils ../../../core/unitUtils ../../../core/watchUtils ../../../core/accessorSupport/decorators ../../../core/libs/gl-matrix-2/vec3 ../../../core/libs/gl-matrix-2/vec3f32 ../../../geometry/support/aaBoundingBox ../../../layers/support/PromiseQueue ../../../symbols/support/unitConversionUtils ./LayerView3D ./PointCloudWorker ./i3s/I3SUtil ./i3s/LoDUtil ./i3s/PagedNodeIndex ./i3s/PointCloudRendererUtil ./i3s/PointRenderer ./support/layerViewUpdatingProperties ../support/geometryUtils ../support/orientedBoundingBox ../support/projectionUtils".split(" "),
function(R,S,z,h,u,p,A,B,m,C,D,g,e,E,v,F,G,H,I,J,w,q,K,l,x,L,y,M,N){var r=B.getLogger("esri.views.3d.layers.PointCloudLayerView3D"),O=y.plane.create();return function(t){function b(){var a=null!==t&&t.apply(this,arguments)||this;a.maximumPointCount=4E6;a.slicePlaneEnabled=!1;a._renderer=null;a._rendererAdded=!1;a._renderedNodes=new Set;a._updateViewNeeded=!0;a._lodFactor=1;a._worker=new J.PointCloudWorker;a._maxLoggedBoxWarnings=5;a._pageMultiplier=1;a._indexQueue=[];a._workQueue=[];a._idleQueue=
new G.PromiseQueue;a._indexPagesLoading=new Map;a._loadingNodes=new Map;a._layerIsVisible=!1;a._totalWork=0;a._index=null;a._loadingInitNodePage=!1;a._nodeIdArray=[];return a}z(b,t);Object.defineProperty(b.prototype,"pointScale",{get:function(){var a=l.getSplatSizeAlgorithm(this.layer.renderer);return a&&null!=a.scaleFactor?a.scaleFactor:1},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"useRealWorldSymbolSizes",{get:function(){var a=l.getFixedSizeAlgorithm(this.layer.renderer);
return a&&null!=a.useRealWorldSymbolSizes?a.useRealWorldSymbolSizes:!1},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"pointSize",{get:function(){var a=l.getFixedSizeAlgorithm(this.layer.renderer);return a&&null!=a.size?a.size:0},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"inverseDensity",{get:function(){return this.layer.renderer?96/this.layer.renderer.pointsPerInch:5},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"_clippingBox",{get:function(){var a=
F.create();return N.extentToBoundingBox(this.view.clippingArea,a,this.view.renderSpatialReference)?a:null},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"_elevationOffset",{get:function(){var a=this.layer.elevationInfo;if(a&&"absolute-height"===a.mode){var c=D.getMetersPerVerticalUnitForSR(this.layer.spatialReference),b=H.getMetersPerUnit(a.unit);return(a.offset||0)*b/c}return 0},enumerable:!0,configurable:!0});b.prototype.initialize=function(){var a=this;w.checkPointCloudLayerValid(this.layer);
w.checkPointCloudLayerCompatibleWithView(this.layer,this.view);this._initRenderer();var c=this._initNodePages(),b=this.view.resourceController.memoryController;this._memCache=b.getMemCache(this.layer.uid);this.handles.add(g.init(this,"_clippingBox",function(){return a._setUpdateViewNeeded()}));this.handles.add(g.init(this,"_elevationOffset",function(){return a._elevationOffsetChanged()}));this.handles.add(g.init(this.layer,"renderer",function(){return a._rendererChanged()}));this.handles.add(g.init(this.layer,
"filters",function(){return a._filterChanged()}));this.handles.add(g.init(this,"clippingArea",function(){a._setUpdateViewNeeded()}));this.handles.add(this.view.state.watch("camera",function(){return a._setUpdateViewNeeded()}));b.events.on("quality-changed",function(){return a._setUpdateViewNeeded()});this.addResolvingPromise(c);var d=this.view.resourceController.scheduler;this.when(function(){a.handles.add([d.registerTask(2,function(c){return a._process(c)},function(){return a._needsUpdate()}),d.registerIdleStateCallbacks(function(){return a._idleBegin()},
function(){return a._idleEnd()}),g.init(a,"suspended",function(c){c?a._clearNodeState():a._setUpdateViewNeeded()})])})};b.prototype._setUpdateViewNeeded=function(){this._updateViewNeeded=!0;this._updateLoading()};b.prototype.destroy=function(){this._cancelNodeLoading();this._worker.destroy();this._worker=null;this._destroyRenderer();this._memCache.destroy();this._memCache=null};b.prototype._initRenderer=function(){var a=this;this._renderer=new x;this._renderer.layerUid=this.layer.uid;this.handles.add(g.init(this,
"_clippingBox",function(c){return a._renderer.clippingBox=c}));this.handles.add(g.init(this,"suspended",function(c){return a._setPointsVisible(!c)}));this.handles.add(g.init(this,"pointScale",function(c){return a._renderer.scaleFactor=c}));this._renderer.minSizePx=Math.sqrt(2);this.handles.add(g.init(this,"useRealWorldSymbolSizes",function(c){return a._renderer.useRealWorldSymbolSizes=c}));this.handles.add(g.init(this,"pointSize",function(c){var b=C.pt2px(c);a._renderer.size=c;a._renderer.sizePx=
b}));this.handles.add(g.init(this,"slicePlaneEnabled",function(c){return a._renderer.slicePlaneEnabled=c}));this.handles.add(g.init(this,["inverseDensity","maximumPointCount"],function(){return a._setUpdateViewNeeded()}));this.handles.add(g.init(this.view,"qualitySettings.sceneService.pointCloud.lodFactor",function(c){a._lodFactor=c;a._setUpdateViewNeeded()}))};b.prototype._destroyRenderer=function(){this._renderer.removeAll();this._setPointsVisible(!1)};b.prototype._setPointsVisible=function(a){a&&
!this._rendererAdded?(this.view._stage.addRenderPlugin([5],this._renderer),this._rendererAdded=!0):!a&&this._rendererAdded&&(this.view._stage.removeRenderPlugin(this._renderer),this._rendererAdded=!1)};b.prototype._rendererChanged=function(){this._clearNodeState();this._memCache.clear();this._renderer.useFixedSizes=l.rendererUsesFixedSizes(this.layer.renderer);this._setUpdateViewNeeded()};b.prototype._filterChanged=function(){this._clearNodeState();this._memCache.clear();this._setUpdateViewNeeded()};
b.prototype._elevationOffsetChanged=function(){this._clearNodeState();this._memCache.clear();this._initNodePages()};b.prototype.displayNodes=function(a){this._workQueue=q.nodeDiff(p.keysOfSet(this._renderedNodes),a,this._index);q.sortFrontToBack(this._workQueue,this.view.state.camera.viewForward,this._index);q.splitWorkEntries(this._workQueue,8,this._index);this._updateQueues();this._totalWork=this._computeWork();this._updateLoading();this._layerIsVisible=0<a.length||this._loadingInitNodePage;this.notifyChange("suspended")};
b.prototype.cancelLoading=function(){this._cancelNodeLoading();this._cancelIndexLoading()};b.prototype._cancelNodeLoading=function(){var a=[];this._loadingNodes.forEach(function(c){return a.push(c)});this._loadingNodes.clear();for(var c=0;c<a.length;c++)a[c].cancel();this._workQueue=[];this._idleQueue.cancelAll();this._totalWork=this._computeWork();this._updateLoading()};b.prototype._updateQueues=function(){var a=this,c=new Set;this._workQueue.forEach(function(a){a.load.forEach(function(a){c.add(a)})});
var b=[],d=new Map;this._loadingNodes.forEach(function(a,k){c.has(k)?d.set(k,a):b.push(a)});this._loadingNodes=d;for(var f=0;f<b.length;f++)b[f].cancel();this._workQueue=this._workQueue.filter(function(c){var b=0;for(c=c.load;b<c.length;b++)if(a._loadingNodes.has(c[b]))return!1;return!0});this._totalWork=this._computeWork();this._updateLoading()};b.prototype._cancelIndexLoading=function(){this._indexQueue=[];this._indexPagesLoading.forEach(function(a){return a.cancel()});this._indexPagesLoading.clear();
this._totalWork=this._computeWork();this._updateLoading()};b.prototype._clearNodeState=function(){var a=this;this._renderedNodes.forEach(function(c){return a._removeFromRenderer(c)});this._cancelNodeLoading()};b.prototype._idleBegin=function(){this._setUpdateViewNeeded()};b.prototype._idleEnd=function(){this._setUpdateViewNeeded()};b.prototype._needsUpdate=function(){return this.suspended?this._updateViewNeeded:this._updateViewNeeded||0<this._indexQueue.length||0<this._workQueue.length||0<this._idleQueue.length};
b.prototype._process=function(a){var c=this;if(this.suspended)this._updateViewNeeded&&(this._updateViewNeeded=!1,a=this._isRootNodeVisible(),a!==this._layerIsVisible&&(this._layerIsVisible=a,this.notifyChange("suspended")));else{for(a.run(function(){return c._updateWorkQueues()});0<this._indexQueue.length&&a.run(function(){return c._processIndexQueue()}););for(this._processWorkQueue(a);0<this._idleQueue.length&&a.run(function(){return c._idleQueue.process()}););}};b.prototype._processIndexQueue=function(){var a=
this,c=this._indexQueue.shift();this._indexPagesLoading.set(c,this._loadNodePage(c));this._indexPagesLoading.get(c).then(function(b){a._index.addPage(c,b,a._elevationOffset);a._setUpdateViewNeeded()}).then(function(){a._indexPagesLoading.delete(c)},function(){a._indexPagesLoading.delete(c)});return!0};b.prototype._processWorkQueue=function(a){for(;!a.done;){var c=this._scheduleWorkEntry();if(!c)break;this._processWorkEntry(c);a.madeProgress()}};b.prototype._scheduleWorkEntry=function(){var a=this;
if(8<=this._loadingNodes.size)return null;for(var c=0;c<this._workQueue.length;++c){var b=this._workQueue[c];if(!A.find(b.remove,function(c){return!a._renderedNodes.has(c)})){for(;0<c;--c)this._workQueue[c]=this._workQueue[c-1];this._workQueue.shift();return b}}return null};b.prototype._processWorkEntry=function(a){var c=this;if(0===a.load.length)for(var b=0;b<a.remove.length;b++)this._removeFromRenderer(a.remove[b]);else m.all(a.load.map(function(a){var b=c._memCache.pop(a.toString());b?c._loadingNodes.set(a,
m.resolve(b)):c._loadingNodes.has(a)||c._loadingNodes.set(a,c.loadNode(a));return c._loadingNodes.get(a)})).then(function(b){for(var d=0;d<a.load.length;d++)if(b[d]){var k=c._setupRendererData(a.load[d],b[d]);c._addToRenderer(k)}for(d=0;d<a.remove.length;d++)c._removeFromRenderer(a.remove[d])}).catch(function(){}).then(function(){for(var b=0;b<a.load.length;b++)c._loadingNodes.delete(a.load[b]);c._updateLoading()}),this._updateLoading()};b.prototype._computeWork=function(){for(var a=0,c=0;c<this._workQueue.length;c++)a+=
this._workQueue[c].load.length;a+=this._loadingNodes.size;a+=(this._indexQueue.length+this._indexPagesLoading.size)*this._index.pageSize;a+=this._loadingInitNodePage?100:0;return a+=this._updateViewNeeded?100:0};Object.defineProperty(b.prototype,"updatingPercentageValue",{get:function(){var a=this._computeWork();return 100*Math.min(this._totalWork,a)/this._totalWork},enumerable:!0,configurable:!0});b.prototype._updateLoading=function(){this.notifyChange("updating");this.notifyChange("updatingPercentageValue")};
b.prototype.canResume=function(){return this.inherited(arguments)&&this._layerIsVisible};b.prototype.isUpdating=function(){return 0<this._computeWork()};b.prototype._initNodePages=function(){var a=this,c=this.layer.store.index;this._index=new K(this.layer.spatialReference,this.view.renderCoordsHelper.spatialReference,c.nodesPerPage||c.nodePerIndexBlock);this._cancelIndexLoading();this._traverseVisible=this._index.createVisibilityTraverse();this._layerIsVisible=this._loadingInitNodePage=!0;this.notifyChange("suspended");
this._updateLoading();this._pageMultiplier=null!=c.nodesPerPage?1:c.nodePerIndexBlock;return this._loadNodePage(0).then(function(c){a._index.addPage(0,c,a._elevationOffset);a._loadingInitNodePage=!1;a._setUpdateViewNeeded()})};b.prototype._loadNodePage=function(a){var c=this;return this._requestJSON(this.baseUrl+"/nodepages/"+a*this._pageMultiplier).then(function(b){return b.data.nodes.map(function(b,k){return{resourceId:null!=b.resourceId?b.resourceId:a*c._index.pageSize+k,obb:b.obb,firstChild:b.firstChild,
childCount:b.childCount,vertexCount:null!=b.vertexCount?b.vertexCount:b.pointCount,lodThreshold:null!=b.lodThreshold?b.lodThreshold:b.effectiveArea}})})};b.prototype._updateWorkQueues=function(){if(!this._updateViewNeeded)return!1;for(var a=this.inverseDensity/this._lodFactor*this._getLodMemoryFactor(),c=this.maximumPointCount*this._lodFactor*this._getLodMemoryFactor(),b=this._computeNodesForMinimumDensity(a),d=this._computePointCount(b),f=Math.sqrt(d/(.75*c));d>c;)a*=f,b=this._computeNodesForMinimumDensity(a),
d=this._computePointCount(b),f=Math.sqrt(2);this.displayNodes(b);this._updateViewNeeded=!1;this._updateLoading();return!0};b.prototype._computePointCount=function(a){for(var c=0,b=0;b<a.length;b++){var d=this._index.getNode(a[b]);d&&(c+=d.vertexCount)}return c};b.prototype._getLodMemoryFactor=function(){return this.view.resourceController.memoryController.memoryFactor};b.prototype._isRootNodeVisible=function(){var a=!1;this._traverseVisible({frustumPlanes:this.view.state.camera.frustum.planes,clippingBox:this._clippingBox},
{predicate:function(c,b,d){a=d;return!1},pageMiss:function(a,b){}});return a};b.prototype._computeNodesForMinimumDensity=function(a){var c=this,b=this.view.state.camera,d=b.frustum,f=this._clippingBox,g=b.viewForward,e=E.vec3.dot(g,b.eye),h=y.plane.fromNormalAndOffset(g,-e,O),P=b.perScreenPixelRatio/2,Q=a*a,n=this._nodeIdArray;n.length=0;this._traverseVisible({frustumPlanes:d.planes,clippingBox:f},{predicate:function(a,b,d){if(!d)return!1;if(0===b.childCount)return n.push(a),!1;d=c._index.getRenderObb(a);
return c._computeAveragePixelArea(d,b.lodThreshold,b.vertexCount,h,P)<=Q?(n.push(a),!1):!0},pageMiss:function(a,b){n.push(a);0>c._indexQueue.indexOf(b)&&c._indexQueue.push(b)}});return n};b.prototype._computeAveragePixelArea=function(a,c,b,d,f){a=Math.max(1E-7,M.minimumDistancePlane(a,d));return c/(a*a)/(4*f*f)/b};b.prototype.loadNode=function(a){var b=this,k=this._index.getNode(a),d=l.getRendererInfo(this.layer),f=l.getFilterInfo(this.layer),g=k.resourceId,e=[],h=function(a){a=b.loadAttribute(g,
a);e.push(a);return a};return this._idleQueue.push().then(function(){var a=b.loadGeometry(g);e.push(a);var c=h(d.primaryAttribute),k=h(d.modulationAttribute),l=f.map(function(a){return h(a.attributeInfo)});return m.all([a,c,k,m.all(l)])}).then(function(c){var k=c[0],e=c[1],g=c[2],h=c[3];c=[k];e&&c.push(e);g&&c.push(g);for(var l=0;l<h.length;l++)c.push(h[l]);k={geometryBuffer:k,primaryAttribute:e,modulationAttribute:g,filterAttributes:h,schema:b.layer.store.defaultGeometrySchema,rendererInfo:d,filterInfo:f,
obb:b._index.getRenderObb(a),elevationOffset:b._elevationOffset,inSR:b.layer.spatialReference.toJSON(),outSR:b.view.renderCoordsHelper.spatialReference.toJSON()};return b._worker.transform(k,c)}).catch(function(a){if(null==a||"CancelError"!==a.name&&"AbortError"!==a.name)r.error(a);else for(var b=0;b<e.length;b++)e[b].cancel();return m.reject(a)})};b.prototype.loadGeometry=function(a){return this._requestBinary(this.baseUrl+"/nodes/"+a+"/geometries/0").then(function(a){return a.data})};b.prototype.loadAttribute=
function(a,b){return b&&b.storageInfo?this._requestBinary(this.baseUrl+"/nodes/"+a+"/attributes/"+b.storageInfo.key).then(function(a){return a.data}):m.resolve(null)};b.prototype._requestJSON=function(a){return u(a,{query:{f:"json"},responseType:"json"})};b.prototype._requestBinary=function(a){return u(a,{responseType:"array-buffer"})};b.prototype._removeFromRenderer=function(a){if(this._renderedNodes.has(a)){var b=this._renderer.removeNode(a);this._renderedNodes.delete(a);this._memCache.put(b.id.toString(),
b,5*b.coordinates.length+128)}};b.prototype._addToRenderer=function(a){this._renderedNodes.has(a.id)||(this._renderedNodes.add(a.id),this._renderer.addNode(a))};b.prototype._setupRendererData=function(a,b){var c=this._index.getNode(a),d=Math.sqrt(c.lodThreshold/c.vertexCount),f=this._index.getRenderObb(a);if(x.isInstanceOfNode(b))return b.splatSize=d,b.obb=f,b.origin=v.vec3f32.clone(b.obb.center),b;if(b.obb.halfSize[0]>f.halfSize[0]||b.obb.halfSize[1]>f.halfSize[1]||b.obb.halfSize[2]>f.halfSize[2])0<
this._maxLoggedBoxWarnings&&(r.warn("Node "+a+" reported bounding box too small. got "+("["+f.halfSize.join(", ")+"]")+" but points cover "+("["+b.obb.halfSize.join(", ")+"]")),0===--this._maxLoggedBoxWarnings&&r.warn("  Too many bounding box errors, stopping reporting for this layer.")),this._index.setRenderObb(a,b.obb);return{id:a,coordinates:b.points,origin:v.vec3f32.clone(f.center),rgb:b.rgb,splatSize:d,obb:f,isLeaf:0===c.childCount}};b.prototype.getUsedMemory=function(){var a=this;return p.keysOfSet(this._renderedNodes).reduce(function(b,
e){return b+15*a._index.getNode(e).vertexCount+128},0)};b.prototype.getUnloadedMemory=function(){var a=this,b=this._renderedNodes.size;if(4>b)return 0;for(var e=p.keysOfSet(this._renderedNodes).reduce(function(b,c){return b+a._index.getNode(c).vertexCount}),d=this._loadingNodes.size,f=0;f<this._workQueue.length;f++)d+=this._workQueue[f].load.length,d-=this._workQueue[f].remove.length;return 0>d?0:d*e/b*15+128*d};b.prototype.ignoresMemoryFactor=function(){return!1};b.prototype.getStats=function(){var a=
this;return{"Rendered Nodes":this._renderedNodes.size,"Rendered Points":p.keysOfSet(this._renderedNodes).reduce(function(b,e){return b+a._index.getNode(e).vertexCount},0),"Loading Nodes":this._loadingNodes.size,"Index Queue":this._indexQueue.length,"Work Queue":this._workQueue.length,"Idle Queue":this._idleQueue.length}};h([e.property()],b.prototype,"layer",void 0);h([e.property({readOnly:!0,aliasOf:"layer.parsedUrl.path"})],b.prototype,"baseUrl",void 0);h([e.property({readOnly:!0,dependsOn:["layer.renderer"]})],
b.prototype,"pointScale",null);h([e.property({readOnly:!0,dependsOn:["layer.renderer"]})],b.prototype,"useRealWorldSymbolSizes",null);h([e.property({readOnly:!0,dependsOn:["layer.renderer"]})],b.prototype,"pointSize",null);h([e.property({readOnly:!0,dependsOn:["layer.renderer"]})],b.prototype,"inverseDensity",null);h([e.property()],b.prototype,"maximumPointCount",void 0);h([e.property({readOnly:!0,dependsOn:["view.clippingArea"]})],b.prototype,"_clippingBox",null);h([e.property({readOnly:!0,dependsOn:["layer.elevationInfo"]})],
b.prototype,"_elevationOffset",null);h([e.property({type:Boolean})],b.prototype,"slicePlaneEnabled",void 0);h([e.property(L.updatingPercentage)],b.prototype,"updatingPercentage",void 0);h([e.property({readOnly:!0})],b.prototype,"updatingPercentageValue",null);return b=h([e.subclass("esri.views.3d.layers.PointCloudLayerView3D")],b)}(e.declared(I))});