/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define([], function () {

    function saveRecord(context) {
        var record = context.currentRecord;
        var qty = record.getValue({ fieldId: 'quantity' });

        if (qty === 0) {
            alert('Quantity cannot be zero');
            return false;
        }
        return true;
    }

    return {
        saveRecord: saveRecord
    };
});
