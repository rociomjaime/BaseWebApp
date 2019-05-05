// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/JSONSupport ../../core/lang ../../core/accessorSupport/decorators ./domains ./FeatureTemplate".split(" "),function(n,p,h,d,k,l,b,f,m){return function(g){function a(c){c=g.call(this,c)||this;c.id=null;c.name=null;c.domains=null;c.templates=null;return c}h(a,g);a.prototype.readDomains=function(c){var a={},e;for(e in c)if(c.hasOwnProperty(e)){var b=c[e];switch(b.type){case "range":a[e]=f.RangeDomain.fromJSON(b);
break;case "codedValue":a[e]=f.CodedValueDomain.fromJSON(b);break;case "inherited":a[e]=f.InheritedDomain.fromJSON(b)}}return a};a.prototype.writeDomains=function(c,a){var b={},d;for(d in c)c.hasOwnProperty(d)&&(b[d]=c[d]&&c[d].toJSON());l.fixJson(b);a.domains=b};a.prototype.readTemplates=function(a){return a&&a.map(function(a){return new m(a)})};a.prototype.writeTemplates=function(a,b){b.templates=a&&a.map(function(a){return a.toJSON()})};d([b.property({json:{write:!0}})],a.prototype,"id",void 0);
d([b.property({json:{write:!0}})],a.prototype,"name",void 0);d([b.property({json:{write:!0}})],a.prototype,"domains",void 0);d([b.reader("domains")],a.prototype,"readDomains",null);d([b.writer("domains")],a.prototype,"writeDomains",null);d([b.property({json:{write:!0}})],a.prototype,"templates",void 0);d([b.reader("templates")],a.prototype,"readTemplates",null);d([b.writer("templates")],a.prototype,"writeTemplates",null);return a=d([b.subclass("esri.layers.support.FeatureType")],a)}(b.declared(k))});