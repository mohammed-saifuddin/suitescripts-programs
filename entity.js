/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define([], function () {

    function fieldChanged(context) {
        if (context.fieldId === 'entity') {
            alert("Customer selected");
        }
        
    }

    return {
        fieldChanged: fieldChanged
    };
});
