          /**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/error'], function(error) {
    function pageInit(context) {
        if (context.mode !== 'create')
            return;
        var currentRecord = context.currentRecord;
        currentRecord.setValue({
            fieldId: 'entity',
            value: 107
        });
    }
    function saveRecord(context) {
        var currentRecord = context.currentRecord;
        if (!currentRecord.getValue({fieldId: 'entity'}) || currentRecord.getLineCount({sublistId: 'item'}) < 1)
            throw error.create({
                name: 'MISSING_REQ_ARG',
                message: 'Please enter all the necessary fields on the salesorder before saving'
             });
        return true;
    }
    function validateField(context) {
        var currentRecord = context.currentRecord;
        var sublistName = context.sublistId;
        var sublistFieldName = context.fieldId;
        var line = context.line;
        if (sublistName === 'item') {
            if (sublistFieldName === 'quantity') {
                if (currentRecord.getCurrentSublistValue({
                    sublistId: sublistName,
                    fieldId: sublistFieldName
                }) < 3)
                    currentRecord.setValue({
                        fieldId: 'otherrefnum',
                        value: 'Quantity is less than 3'
                    });
                else
                    currentRecord.setValue({
                        fieldId: 'otherrefnum',
                        value: 'Quantity accepted'
                    });
                }
            }
       return true;
    }
    function fieldChanged(context) {
        var currentRecord = context.currentRecord;
        var sublistName = context.sublistId;
        var sublistFieldName = context.fieldId;
        var line = context.line;
        if (sublistName === 'item' && sublistFieldName === 'item')
            currentRecord.setValue({
                fieldId: 'memo',
                value: 'Item: ' + currentRecord.getCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item'
                }) + ' is selected'
            });
    }
    

   
    
    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        postSourcing: postSourcing,
        sublistChanged: sublistChanged,
        lineInit: lineInit,
        validateField: validateField,
        validateLine: validateLine,
        validateInsert: validateInsert,
        validateDelete: validateDelete,
        saveRecord: saveRecord
    };
}); 

        

        