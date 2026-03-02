/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */
define(['N/ui/dialog'], function (dialog) {

    function pageInit() {
        dialog.alert({
            title: 'Hello!',
            message: 'Welcome to the NetSuite task training'
        });
    }

    function fieldChanged(context) {

        if (context.sublistId === 'item' && context.fieldId === 'quantity') {

            var rec = context.currentRecord;

            var qty = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity'
            });

            var rate = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'rate'
            });

            rec.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'amount',
                value: qty * rate
            });
        }
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged
    };
});
