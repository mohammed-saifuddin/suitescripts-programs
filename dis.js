/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/currentRecord'], function (currentRecord) {

    function pageInit(context) {
        var rec = currentRecord.get();

        // Disable the field
        var field = rec.getField({
            fieldId: 'email'
        });
          rec.setValue({
            fieldId: 'url',
            value: 'https://aws.amazon.com'
        });
        if (field) {
            field.isDisabled = true;
            
        }
    }
    function saveRecord(context){
        alert("customer is being created & record is being saved")
        return true;
    }

    return {
        pageInit: pageInit,
        saveRecord:saveRecord
    };
});
