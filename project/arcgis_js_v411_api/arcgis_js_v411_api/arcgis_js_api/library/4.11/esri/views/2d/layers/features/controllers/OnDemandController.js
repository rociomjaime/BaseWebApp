// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/declareExtendsHelper ../../../../../core/tsSupport/decorateHelper ../../../../../core/tsSupport/assignHelper ../../../../../core/tsSupport/generatorHelper ../../../../../core/tsSupport/awaiterHelper @dojo/framework/shim/Set ../../../../../geometry ../../../../../core/Error ../../../../../core/has ../../../../../core/Logger ../../../../../core/promiseUtils ../../../../../core/accessorSupport/decorators ../../../../../layers/graphics/featureConversionUtils ../../../../../layers/graphics/data/FeatureStore ../../../../../layers/graphics/data/QueryEngine ../../../../../layers/support/FeatureProcessing ../../../../../tasks/operations/query ../../../../../tasks/support/QuantizationParameters ../../../../../tasks/support/Query ../../../engine/webgl/Utils ./BaseController ../support/DataTile ../support/DataTileFeaturesIndex ../support/Tile ../support/TileUpdateQueue ../../../tiling/TileQueue ../../../../../views/support/QueueProcessor".split(" "),
function(g,y,E,p,U,F,G,r,z,A,q,H,h,k,t,B,C,I,u,J,K,L,M,D,N,v,O,P,Q){Object.defineProperty(y,"__esModule",{value:!0});var w=H.getLogger("esri.views.2d.layers.features.controllers.OnDemandController");g=q("esri-featurelayer-webgl");q=q("esri-mobile");var R=g&&"object"===typeof g&&null!=g.maxDrillLevel?g.maxDrillLevel:q?1:4,S=g&&"object"===typeof g&&null!=g.maxRecordCountFactor?g.maxRecordCountFactor:q?1:3,T=g&&"object"===typeof g&&null!=g.enablePBFQuery?g.enablePBFQuery:!0,x=new r.default,l=[];r=function(g){function d(){var a=
null!==g&&g.apply(this,arguments)||this;a.type="on-demand";a._queryInfoHash=null;a._processingInMainThread=!1;a._dataTileIndex=new N.default;a._editsQueue=new Q({concurrency:1,ordered:!0,process:function(b){return a._processEditsEvent(b)}});return a}E(d,g);d.prototype.initialize=function(){var a=this;this._fetchQueue=new P({concurrency:10,strategy:"center-first",tileInfoView:this.tileStore.tileScheme,process:function(b){return a._fetchTile(b)}});this._updateQueue=new O.default({tileInfoView:this.tileStore.tileScheme,
process:function(b,c){return a._updateTile(b,c)}});this.handles.add(this.watch("processor",this._switchProcessor.bind(this)))};d.prototype.destroy=function(){this._fetchQueue.clear();this._updateQueue.clear();this._editsQueue.destroy();this.queryEngine&&(this.queryEngine.destroy(),this._set("queryEngine",null))};Object.defineProperty(d.prototype,"processing",{get:function(){return I.fromWorker(this.configuration.processing)},enumerable:!0,configurable:!0});Object.defineProperty(d.prototype,"updating",
{get:function(){return this._fetchQueue.updating||this._updateQueue.updating},enumerable:!0,configurable:!0});d.prototype.onEdits=function(a){var b=this;this._fetchQueue.pause();this._fetchQueue.reset();this._editsQueue.push(a).then(function(){0===b._editsQueue.length&&b._fetchQueue.resume()})};d.prototype.queryFeatures=function(a){return this.queryEngine?this.queryEngine.executeQuery(a):h.resolve({features:[],fields:[]})};d.prototype.queryFeatureCount=function(a){return this.queryEngine?this.queryEngine.executeQueryForCount(a):
h.resolve(0)};d.prototype.queryObjectIds=function(a){return this.queryEngine?this.queryEngine.executeQueryForIds(a):h.resolve([])};d.prototype.queryExtent=function(a){return this.queryEngine?this.queryEngine.executeQueryForExtent(a):h.reject({count:0,extent:null})};d.prototype.redraw=function(){this._updateQueue.pause();this._manageTiles(this.tileStore.tiles);this._updateQueue.resume()};d.prototype.refresh=function(){this.queryEngine&&this.queryEngine.destroy();this.featureStore&&this.featureStore.clear();
this._dataTileIndex.featureStore=null;this._dataTileIndex.clear();this._editsQueue.pause();this._fetchQueue.pause();this._updateQueue.pause();this._editsQueue.clear();this._fetchQueue.reset();this._updateQueue.clear();if(this.processor){var a=this.processor.queryInfo,b=a.definitionExpression,c=a.gdbVersion,a=a.historicMoment;this._set("featureStore",new B.default({geometryType:this.service.geometryType,hasM:!1,hasZ:!1}));this._set("queryEngine",new C.default({definitionExpression:b,fields:this.service.fields,
geometryType:this.service.geometryType,objectIdField:this.service.objectIdField,hasM:!1,hasZ:!1,spatialReference:this.spatialReference.toJSON(),cacheSpatialQueries:!0,gdbVersion:c,historicMoment:null!=a&&new Date(a),featureStore:this.featureStore}));this._dataTileIndex.featureStore=this.featureStore;this._dataTileIndex.clear();this._fetchQueue.resume();this._editsQueue.resume();this._updateQueue.resume();this._manageTiles(this.tileStore.tiles)}};d.prototype.setFilter=function(a){var b=a.index,c=a.filter;
return G(this,void 0,void 0,function(){var a;return F(this,function(e){switch(e.label){case 0:if(!this.processor)return this.setFilterBase(b,c),[2,{show:[],hide:[]}];this._updateQueue.pause();return[4,this.setFilterBase(b,c)];case 1:return a=e.sent(),this.processor.supportsTileUpdates||(this._updateQueue.clear(),this._manageTiles(this.tileStore.tiles)),this._updateQueue.resume(),[2,a]}})})};d.prototype.setViewState=function(a){this._fetchQueue.state=a;this._updateQueue.state=a};d.prototype.onTileUpdate=
function(a){this.queryEngine&&this._manageTiles(a.added,a.removed)};d.prototype._manageTiles=function(a,b){void 0===b&&(b=null);for(var c=this._dataTileIndex,e=this._fetchQueue,f=this._updateQueue,d="esriGeometryPoint"===this.service.geometryType,m=function(a){var b=c.get(a.id);b?(b.displayTile=a,d?c.forEach(function(c){v.isChildOf(c,b)&&(c.displayTile=a)}):b.done=!1):(b=new D.default,b.tile=a.clone(),b.displayTile=a,c.add(b));g._processDataTile(b)},g=this,h=0;h<a.length;h++){var n=a[h];m(n)}if(b)for(a=
0;a<b.length;a++)n=b[a],x.add(n),f.cancel(n.id);c.forEach(function(a){x.has(a.displayTile)&&l.push(a)});for(f=0;f<l.length;f++)n=l[f],e.has(n.id)&&e.getPromise(n.id).cancel(),c.delete(n);l.length=0;x.clear()};d.prototype._processDataTile=function(a){var b=this,c=a.key,e=this._fetchQueue,f=c.id,d=this._queryInfoHash,c=c.level-a.displayTile.key.level>=R;this._dataTileIndex.add(a);if(a.done||e.has(f)){if(a.queryInfoHash!==d||a.returnExceeded!==c)if(a.done)a.done=!1;else if(e.isOngoing(f))e.getPromise(f).cancel();
else{a.queryInfoHash=d;a.returnExceeded=c;return}}else a.queryInfoHash=d,a.returnExceeded=c;a.done?this._invalidateTile(a.displayTile):e.has(f)||e.push(a).then(function(c){return b._handleResponse(a,c)}).catch(function(b){"cancel"!==b.dojoType&&w.error(new A("featurelayer-controller:tile-error","Encountered an error when handling tile response",b));a.done=!0})};d.prototype._handleResponse=function(a,b){a.done=!0;t.hydrateOptimizedFeatureSet(b);if(b.exceededTransferLimit)if(a.returnExceeded)this._dataTileIndex.setTileFeatures(a,
b.features),this._deleteChildrenDataTiles(a);else{b=0;for(var c=a.tile.createChildTiles();b<c.length;b++){var e=c[b],f=new D.default;f.tile=e;f.displayTile=a.displayTile;this._processDataTile(f)}}else this._dataTileIndex.setTileFeatures(a,b.features),this._deleteChildrenDataTiles(a);this._invalidateTile(a.tile)};d.prototype._deleteChildrenDataTiles=function(a){this._dataTileIndex.forEach(function(b){v.isChildOf(b,a)&&l.push(b)});for(var b=0;b<l.length;b++){var c=l[b];this._fetchQueue.has(c.id)&&this._fetchQueue.getPromise(c.id).cancel();
this._dataTileIndex.delete(c)}l.length=0};d.prototype._fetchTile=function(a){var b=this;a=this._createQuery(a.displayTile,a.tile,a.returnExceeded);var c=this.service.source;return T&&this.service.capabilities.query.supportsFormatPBF?u.executeQueryPBF(c,a,{type:"optimized"}).then(function(a){return a.data}):u.executeQuery(c,a).then(function(a){return t.convertFromFeatureSet(a.data,b.service.objectIdField)})};d.prototype._invalidateTile=function(a){var b=this._updateQueue,c=0;for(a=this.tileStore.intersections(a,
this.processor.queryInfo.pixelBuffer);c<a.length;c++){var e=a[c].tile;b.push(e.id,e.updateTimestamp)}};d.prototype._updateTile=function(a,b){var c=this,e=this.tileStore.get(a);a=this.processor.queryInfo;a={pixelBuffer:a.pixelBuffer,returnGeometry:a.returnGeometry,returnCentroid:a.returnCentroid};var f=this._getFilterFlags.bind(this);a=this.queryEngine.executeTileQuery(e,a,f);var d=a.objectIds,m={geometryType:this.service.geometryType,features:a.features,fields:this.service.fields,objectIdFieldName:this.service.objectIdField,
transform:{originPosition:"upperLeft",scale:[e.resolution,e.resolution],translate:[e.bounds[0],e.bounds[3]]}};return this._applyProcessing(m).catch(function(a){a&&"cancel"!==a.dojoType&&w.error("update-tile",a);return m}).then(function(a){var f=[],m=!0;c._dataTileIndex.forEach(function(a){e.id!==a.id&&v.isChildOf(a,e)&&m&&!a.done&&(m=!1)});m&&e&&e.objectIds.forEach(function(a){d.has(a)||f.push(a)});d.forEach(function(a){e.objectIds.add(a)});e.updateTimestamp=b;return c.processor.onTileData(e,{addOrUpdate:a.features,
remove:f,transformParams:L.getTransformParams(a)}).catch(function(a){a&&"cancel"!==a.dojoType&&w.error("update-tile",a)})})};d.prototype._processEditsEvent=function(a){var b=this;return h.create(function(c,e){e=function(a){return a.objectId};var f=a.deletedFeatures.map(e),d=b._dataTileIndex.deleteFeaturesById(f),f=a.addedFeatures.concat(a.updatedFeatures).map(e);if(f.length)e=b.service.source,f=b._createObjectIdsQuery(f),u.executeQuery(e,f).then(function(a){if((a=a.data)&&a.features&&a.features.length)for(a=
t.convertFromFeatureSet(a,b.service.objectIdField).features,d.push.apply(d,b._dataTileIndex.addOrUpdateFeatures(a)),a=0;a<d.length;a++)b._invalidateTile(d[a].tile)}).then(c,c);else{for(e=0;e<d.length;e++)b._invalidateTile(d[e].tile);c()}})};d.prototype._switchProcessor=function(a,b){var c=a.queryInfo;b=c.definitionExpression;var e=c.gdbVersion,c=c.historicMoment;a=this._createQueryInfoHash(a);this._queryInfoHash!==a&&(this._queryInfoHash=a,this.queryEngine&&this.queryEngine.destroy(),this.featureStore&&
this.featureStore.clear(),this._set("featureStore",new B.default({geometryType:this.service.geometryType,hasM:!1,hasZ:!1})),this._set("queryEngine",new C.default({definitionExpression:b,fields:this.service.fields,geometryType:this.service.geometryType,objectIdField:this.service.objectIdField,hasM:!1,hasZ:!1,spatialReference:this.spatialReference.toJSON(),cacheSpatialQueries:!0,gdbVersion:e,historicMoment:null!=c&&new Date(c),featureStore:this.featureStore,timeInfo:this.service.timeInfo})),this._dataTileIndex.featureStore=
this.featureStore,this._dataTileIndex.forEach(function(a){a.done=!1}));this._editsQueue.pause();this._fetchQueue.pause();this._updateQueue.pause();this._editsQueue.clear();this._fetchQueue.reset();this._updateQueue.clear();this._manageTiles(this.tileStore.tiles);this._fetchQueue.resume();this._editsQueue.resume();this._updateQueue.resume()};d.prototype._createQuery=function(a,b,c){void 0===c&&(c=!0);var e=this.service.geometryType,d=this._createDefaultQuery();a="esriGeometryPoint"===this.service.geometryType?
b:a;d.maxRecordCountFactor=S;d.resultType="tile";d.returnExceededLimitFeatures=c;d.geometry=new z.Extent({xmin:b.bounds[0],ymin:b.bounds[1],xmax:b.bounds[2],ymax:b.bounds[3],spatialReference:this.spatialReference});if(this.service.capabilities.query.supportsQuantization)d.quantizationParameters=new J.default({mode:"view",originPosition:"upper-left",tolerance:a.resolution,extent:new z.Extent({xmin:a.bounds[0],ymin:a.bounds[1],xmax:a.bounds[2],ymax:a.bounds[3],spatialReference:this.spatialReference})}),
"esriGeometryPolyline"===e&&(d.maxAllowableOffset=a.resolution);else if("esriGeometryPolyline"===e||"esriGeometryPolygon"===e)d.maxAllowableOffset=a.resolution;return d};d.prototype._createObjectIdsQuery=function(a){var b=this._createDefaultQuery();b.objectIds=a;return b};d.prototype._createDefaultQuery=function(){var a=this,b=this.processor.queryInfo,c=new K;c.outSpatialReference=this.spatialReference;var d=b.outFields,f=b.orderByFields;this.processing&&(d=d&&d.filter(function(b){return!a.processing.getField(b)}),
f=f&&f.filter(function(b){return!a.processing.getField(b)}));d=.75<=d.length/this.service.fields.length?["*"]:d;c.gdbVersion=b.gdbVersion;c.historicMoment=null!=b.historicMoment?new Date(b.historicMoment):null;c.outFields=d;c.where=b.definitionExpression||"1\x3d1";c.returnGeometry=!0;c.returnCentroid=b.returnCentroid;c.orderByFields=f;return c};d.prototype._applyProcessing=function(a){var b=this.processing;if(!b)return h.resolve(a);if(this._processingInMainThread)return this.remoteClient.invoke("executeProcessing",
{featureSet:a});try{var c=b.process(a,b.options);return c?"then"in c?c:h.resolve(c):h.reject(new A("FeatureLayer","invalid processing.process() method, returns nothing"))}catch(e){return this._processingInMainThread=!0,this.remoteClient.invoke("executeProcessing",{featureSet:a})}};d.prototype._createQueryInfoHash=function(a){var b=this,c=a.queryInfo,d=c.orderByFields,c=c.outFields,f=a.queryInfo;a=f.definitionExpression;var g=f.gdbVersion,f=f.historicMoment;this.processing&&(c=c&&c.filter(function(a){return!b.processing.getField(a)}),
d=d&&d.filter(function(a){return!b.processing.getField(a)}));c&&c.sort();d&&d.sort();return JSON.stringify({definitionExpression:a,outFields:.75<=c.length/this.service.fields.length?["*"]:c,orderByFields:d,gdbVersion:g,historicMoment:f})};p([k.property()],d.prototype,"_fetchQueue",void 0);p([k.property()],d.prototype,"_updateQueue",void 0);p([k.property({readOnly:!0,dependsOn:["configuration"]})],d.prototype,"processing",null);p([k.property({readOnly:!0})],d.prototype,"queryEngine",void 0);p([k.property({readOnly:!0})],
d.prototype,"featureStore",void 0);p([k.property({dependsOn:["_fetchQueue.updating","_updateQueue.updating"]})],d.prototype,"updating",null);return d=p([k.subclass()],d)}(k.declared(M.default));y.default=r});