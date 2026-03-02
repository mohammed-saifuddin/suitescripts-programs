/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/record'], function (dialog) {

    function beforeSubmit(context) {
        var newRec = context.newRecord;

        newRec.setValue({
            fieldId: 'memo',
            value: 'Updated using User Event Script'
        });
        newRec.setValue({
            fieldId:'location',
            value:'10'
        })
        var record = context.currentRecord;
        record.getField({ fieldId: 'memo' }).isDisabled = true;
       
    }
    
        

    return {
        beforeSubmit: beforeSubmit,
        
        
    };
});
