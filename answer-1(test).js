/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/currentRecord'], function (currentRecord) {

    function saveRecord(context) {

        var rec = context.currentRecord;

        var count = rec.getLineCount({
            sublistId: 'item'
        });

        for (var i = 0; i < count; i++) {

            var qty = rec.getSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                line: i
            });

            if (qty === 0 || qty === '0') {
                alert('Quantity cannot be zero  ');
                return false; 
            }
        }

        return true; 
    }

    return {
        saveRecord: saveRecord
    };
});
