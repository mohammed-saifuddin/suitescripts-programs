/**
 * @NApiVersion 2.x
 * @NScriptType WorkflowActionScript
 */
define(['N/record'], function (record) {

    function onAction(context) {
        var rec = context.newRecord;

        // Set a field value
        rec.setValue({
            fieldId: 'custentity12',
            value: 'Alfalah bank'
        });

        return true; // required
    }

    return {
        onAction: onAction
    };
});
