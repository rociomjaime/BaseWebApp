// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/Accessor ../../core/Identifiable ../../core/accessorSupport/decorators".split(" "),function(k,l,f,c,g,h,b){return function(e){function a(a){a=e.call(this)||this;a.active=!1;a.className=null;a.disabled=!1;a.id=null;a.indicator=!1;a.title=null;a.type=null;a.visible=!0;return a}f(a,e);d=a;a.prototype.clone=function(){return new d({active:this.active,className:this.className,disabled:this.disabled,
id:this.id,indicator:this.indicator,title:this.title,visible:this.visible})};var d;c([b.property()],a.prototype,"active",void 0);c([b.property()],a.prototype,"className",void 0);c([b.property()],a.prototype,"disabled",void 0);c([b.property()],a.prototype,"id",void 0);c([b.property()],a.prototype,"indicator",void 0);c([b.property()],a.prototype,"title",void 0);c([b.property()],a.prototype,"type",void 0);c([b.property()],a.prototype,"visible",void 0);return a=d=c([b.subclass("esri.support.actions.ActionBase")],
a)}(b.declared(g,h.Identifiable))});