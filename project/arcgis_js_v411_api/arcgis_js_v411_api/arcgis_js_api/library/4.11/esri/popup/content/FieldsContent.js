// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/lang ../../core/accessorSupport/decorators ../FieldInfo ./Content".split(" "),function(l,m,f,c,g,b,h,k){return function(e){function a(a){a=e.call(this)||this;a.fieldInfos=null;a.type="fields";return a}f(a,e);d=a;a.prototype.writeFieldInfos=function(a,b){b.fieldInfos=a&&a.map(function(a){return a.toJSON()})};a.prototype.clone=function(){return new d({fieldInfos:Array.isArray(this.fieldInfos)?
g.clone(this.fieldInfos):null})};var d;c([b.property({type:[h]})],a.prototype,"fieldInfos",void 0);c([b.writer("fieldInfos")],a.prototype,"writeFieldInfos",null);c([b.property({type:String,readOnly:!0,json:{read:!1,write:!0}})],a.prototype,"type",void 0);return a=d=c([b.subclass("esri.popup.content.FieldsContent")],a)}(b.declared(k))});