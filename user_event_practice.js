/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define([],function(){
     
    function beforeLoad(context){
    context.form.clientScriptModulePath = './client_practice.js'
       if(context.type=== context.UserEventType.CREATE){
        context.form.addButton({
            id:'custpage_btn',
            label:'add button',
            functionName:'testFn'
        })
       }
        var vendor=context.newRecord.getValue({
        fieldId:'entity'
    })
    log.debug(vendor)
    }
   function beforeSubmit(context) {

    var rec = context.newRecord;

    
    var line = rec.getLineCount({
        sublistId: 'item'
    });
    
   
    rec.setSublistValue({
        sublistId: 'item',
        fieldId: 'item',
        line: line,
        value: 123   
    });

    rec.setSublistValue({
        sublistId: 'item',
        fieldId: 'quantity',
        line: line,
        value: 2
    });

    rec.setSublistValue({
        sublistId: 'item',
        fieldId: 'rate',
        line: line,
        value: 100
    });
    
}
function afterSubmit(context){
    if(context.type === context.UserEventType.CREATE){
        log.debug("record id is :",context.newRecord.id)
    }
}

    return{
        beforeLoad:beforeLoad,
        beforeSubmit:beforeSubmit,
        afterSubmit:afterSubmit
    }
})