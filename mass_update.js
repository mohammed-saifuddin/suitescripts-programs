/**
 * @NApiVersion 2.x
 * @NScriptType MassUpdateScript
 */
define(['N/record', 'N/log'], function (record, log) {

    function each(context) {

        var recType = context.type; // record type (Sales Order)
        var recId = context.id;     // record internal ID

        // Load the record
        var rec = record.load({
            type: recType,
            id: recId
        });

        // Update memo field
        rec.setValue({
            fieldId: 'memo',
            value: 'Updated via Mass Update Script'
        });

        // Save the record
        rec.save();
    }

    return {
        each: each
    };
});
