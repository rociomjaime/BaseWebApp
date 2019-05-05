// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper dojo/i18n!./nls/FeatureForm ../../moment ../../core/Accessor ../../core/lang ../../core/accessorSupport/decorators ../../layers/support/CodedValueDomain ../../layers/support/domains ../../layers/support/fieldUtils ../../support/arcadeUtils".split(" "),function(t,u,n,d,g,l,p,q,c,r,h,e,f){return function(m){function a(b){b=m.call(this)||this;b.config=null;b.feature=null;b.field=null;b.layer=null;b.description=
null;b.editorType=null;b.error=null;b.format=null;b.group=null;b.hint=null;b.name=null;return b}n(a,m);Object.defineProperty(a.prototype,"compiledFunc",{get:function(){return f.createFunction(this.get("config.visibilityExpression"))},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"evaluatedVisibility",{get:function(){var b=this.compiledFunc;if(b)return f.executeFunction(b,f.createExecContext(this.feature))},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"domain",
{get:function(){var b=this.layer.typeIdField,a=b===this.name,c=this.get("field.domain");if(a&&!c)return new r({name:"__internal-type-based-coded-value-domain__",codedValues:this.layer.types.map(function(b){return{code:b.id,name:b.name}})});a=this.feature;b=b&&this.layer.getFieldDomain(this.name,{feature:a})||c;c=this.get("config.domain");return this._isDomainCompatible(c)?c:b},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"editable",{get:function(){return this.layer.capabilities.operations.supportsEditing&&
this.field.editable&&!1!==this.get("config.editable")},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"errorMessage",{get:function(){return this._toErrorMessage()},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"label",{get:function(){return this.get("config.label")||this.field.alias||this.field.name},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"maxLength",{get:function(){if("date"===this.type)return-1;var b=this.get("field.length"),a=this.get("config.maxLength");
return!isNaN(a)&&-1<=a&&(-1===b||a<=b)?a:b},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"required",{get:function(){var b=this.get("field.nullable"),a=this.get("config.required");return this.editable&&(!b||!0===a)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"type",{get:function(){var b=this.field;return e.isNumericField(b)?"number":e.isStringField(b)?"text":e.isDateField(b)?"date":"unsupported"},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,
"valid",{get:function(){var b=this.editable?this._validate():null;this._set("error",b);return null===b},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"value",{get:function(){return this._get("value")},set:function(b){this.notifyChange("evaluatedVisibility");this._set("value",b)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"visible",{get:function(){return this._isEditorField()?!1:"boolean"===typeof this.evaluatedVisibility?this.evaluatedVisibility:!!this.config||
this._shownByDefault()},enumerable:!0,configurable:!0});a.prototype._isDomainCompatible=function(b){var a=this.field;if(b&&"coded-value"===b.type){var c=typeof b.codedValues[0].code;if("string"===c&&e.isStringField(a)||"number"===c&&e.isNumericField(a))return!0}return b&&"range"===b.type&&e.isNumericField(a)?!0:!1};a.prototype._validate=function(){var a=this.domain,c=this.field,d=this.value;return a?null!==d||this.required?h.validateDomainValue(a,d):null:e.validateFieldValue(c,d)};a.prototype._shownByDefault=
function(){var a=this.get("field.type");return"oid"!==a&&"global-id"!==a&&!this._isGeometryField()};a.prototype._isEditorField=function(){return-1<e.getFeatureEditFields(this.layer).indexOf(this.name)};a.prototype._isGeometryField=function(){return-1<e.getFeatureGeometryFields(this.layer).indexOf(this.name)};a.prototype._toErrorMessage=function(){var a=this.domain,c=this.field,d=this.value,f=this.type,k=this.error;return this.required&&null===d?g.validationErrors.cannotBeNull:k===h.DomainValidationError.VALUE_OUT_OF_RANGE||
k===e.NumericRangeValidationError.OUT_OF_RANGE?(c=h.getDomainRange(a)||e.getFieldRange(c),a=c.min,c=c.max,q.substitute({max:"date"===f?l(c).format("L LTS"):c,min:"date"===f?l(a).format("L LTS"):a},g.validationErrors.outsideRange)):k===h.DomainValidationError.INVALID_CODED_VALUE?g.validationErrors.invalidCodedValue:k===e.TypeValidationError.INVALID_TYPE?g.validationErrors.invalidType:null};d([c.property({dependsOn:["config.visibilityExpression"]})],a.prototype,"compiledFunc",null);d([c.property({dependsOn:["compiledFunc",
"feature"]})],a.prototype,"evaluatedVisibility",null);d([c.property()],a.prototype,"config",void 0);d([c.property()],a.prototype,"feature",void 0);d([c.property()],a.prototype,"field",void 0);d([c.property()],a.prototype,"layer",void 0);d([c.property({aliasOf:"config.description"})],a.prototype,"description",void 0);d([c.property({dependsOn:["config","feature","field","layer"]})],a.prototype,"domain",null);d([c.property({dependsOn:["config","field","layer"]})],a.prototype,"editable",null);d([c.property({aliasOf:"config.editorType"})],
a.prototype,"editorType",void 0);d([c.property({readOnly:!0})],a.prototype,"error",void 0);d([c.property({dependsOn:["error","value"]})],a.prototype,"errorMessage",null);d([c.property({aliasOf:"config.format"})],a.prototype,"format",void 0);d([c.property()],a.prototype,"group",void 0);d([c.property({aliasOf:"config.hint"})],a.prototype,"hint",void 0);d([c.property({dependsOn:["field","config"]})],a.prototype,"label",null);d([c.property({dependsOn:["field.length","config"]})],a.prototype,"maxLength",
null);d([c.property({aliasOf:"field.name"})],a.prototype,"name",void 0);d([c.property({dependsOn:["field","config"]})],a.prototype,"required",null);d([c.property({dependsOn:["field"]})],a.prototype,"type",null);d([c.property({dependsOn:["config","domain","field","layer","value"]})],a.prototype,"valid",null);d([c.property({value:null})],a.prototype,"value",null);d([c.property({dependsOn:["config","evaluatedVisibility","field","layer"]})],a.prototype,"visible",null);return a=d([c.subclass("esri.widgets.FeatureForm.InputField")],
a)}(c.declared(p))});