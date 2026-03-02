/**
* @NApiVersion 2.x
* @NScriptType UserEventScript
*/
define([],function(){
function beforeSubmit(context){
var rec=context.newRecord;
if(context.type === context.UserEventType.CREATE){
var payterm=rec.getValue({
fieldId:'terms'
})
var mem=rec.getValue({
fieldId:'memo'
})
if(payterm === 'Net 30' && mem === '')
{
rec.setValue({
fieldId:'memo',
value:'Invoice created with net 30 terms'
})
}

}
}
return {
beforeSubmit:beforeSubmit
}
})