/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/task', 'N/runtime'], function (record, task, runtime) {

    function afterSubmit(context) {

        if (context.type !== context.UserEventType.CREATE) return;

        var custId = context.newRecord.id;

        // Task 1
        var t1 = record.create({ type: record.Type.TASK });
        t1.setValue({
            fieldId: 'title',
            value: 'Collect KYC Documents'
        });
        t1.setValue({
            fieldId: 'assigned',
            value: runtime.getCurrentUser().id
        });
        t1.setValue({
            fieldId: 'company',
            value: custId
        });
        t1.save();

        // Task 2
        var t2 = record.create({ type: record.Type.TASK });
        t2.setValue({
            fieldId: 'title',
            value: 'Verify Customer Details'
        });
        t2.setValue({
            fieldId: 'assigned',
            value: runtime.getCurrentUser().id
        });
        t2.setValue({
            fieldId: 'company',
            value: custId
        });
        t2.save();
    }

    return {
        afterSubmit: afterSubmit
    };
});
