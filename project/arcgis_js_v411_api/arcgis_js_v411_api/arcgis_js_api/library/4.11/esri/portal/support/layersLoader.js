// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../request ../../core/asyncUtils ../../core/Error ../../core/promiseUtils ../../layers/support/lazyLayerLoader ../Portal ./jsonContext ../../renderers/support/styleUtils".split(" "),function(y,k,p,q,l,h,g,r,t,u){function v(b){var c=b.instance,a=c.portalItem,d=a.url,f=a.title,e=t.createForItem(a);if("group"===c.type)return c.read({title:f},e),w(c,b);d&&c.read({url:d},e);return m(b).then(function(a){a&&c.read(a,e);c.read({title:f},e);return q.safeCast(u.loadStyleRenderer(c,
e))})}function w(b,c){var a;a=b.portalItem.type;switch(a){case "Feature Service":a=g.layerLookupMap.FeatureLayer;break;case "Stream Service":a=g.layerLookupMap.StreamLayer;break;case "Scene Service":a=g.layerLookupMap.SceneLayer;break;case "Feature Collection":a=g.layerLookupMap.FeatureLayer;break;default:throw new l("portal:unsupported-item-type-as-group","The item type '"+a+"' is not supported as a 'GroupLayer'");}var d;return a().then(function(a){d=a;return m(c)}).then(function(a){return a&&Array.isArray(a.layers)?
n(b,d,a,c):x(b,d,c)})}function x(b,c,a){return b.portalItem.url?p(b.portalItem.url,{responseType:"json",query:{f:"json"}}).then(function(d){if((d=d.data)&&Array.isArray(d.layers))return d=d.layers.map(function(a){return{id:a.id,name:a.name}}),n(b,c,{layers:d},a)}):h.resolve()}function n(b,c,a,d){var f=a.showLegend;a=a.layers.slice();a.reverse();a.forEach(function(a){var d=new c({portalItem:b.portalItem,layerId:a.id,sublayerTitleMode:"service-name"});if("Feature Collection"===b.portalItem.type){var e=
{origin:"portal-item",portal:b.portalItem.portal||r.getDefault()};d.read(a,e);null!=f&&d.read({showLegend:f},e)}b.add(d)})}function m(b){if(!1===b.supportsData)return h.resolve();var c=b.instance;return c.portalItem.fetchData().catch(function(){return null}).then(function(a){var b,f;f="stream"===c.type?!1:"layerId"in c;if(f){f=!0;if(a&&Array.isArray(a.layers)){null==c.layerId&&(c.layerId=a.layers[0].id);for(var e=0;e<a.layers.length;e++)if(a.layers[e].id===c.layerId){b=a.layers[e];break}b&&(1===a.layers.length&&
(f=!1),null!=a.showLegend&&(b.showLegend=a.showLegend))}f&&"service-name"!==c.sublayerTitleMode&&(c.sublayerTitleMode="item-title-and-service-name");return b}return a})}Object.defineProperty(k,"__esModule",{value:!0});k.load=function(b){var c=b.instance.portalItem;return c&&c.id?c.load().then(function(){var a=b.instance.portalItem;if(-1===b.supportedTypes.indexOf(a.type))throw new l("portal:invalid-layer-item-type","Invalid layer item type '${type}', expected '${expectedType}'",{type:a.type,expectedType:b.supportedTypes.join(", ")});
}).then(function(){return v(b)}):h.resolve()}});