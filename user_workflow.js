/**
 * @NApiVersion 2.x
 * @NScriptType WorkflowActionScript
 */
define(['N/record', 'N/email', 'N/runtime'], function (record, email, runtime) {

    function onAction(context) {

        var rec = context.newRecord;
        var customerId = rec.id;

      
        var actionType = context.workflowActionParameters.custscript_action_type;

       
        if (actionType === 'VALIDATE') {

            var gst = rec.getValue('custentity_gst_no');
            var pan = rec.getValue('custentity_pan_no');
            var creditLimit = rec.getValue('creditlimit');

            if (!gst || !pan || !creditLimit) {
                throw 'Mandatory onboarding fields missing: GST, PAN, Credit Limit';
            }
        }

       
        if (actionType === 'INIT') {

           
            record.submitFields({
                type: record.Type.CUSTOMER,
                id: customerId,
                values: {
                    custentity_onboarding_status: 'Pending'
                }
            });

       
            var task1 = record.create({
                type: record.Type.TASK,
                isDynamic: true
            });
            task1.setValue('title', 'Collect KYC Documents');
            task1.setValue('company', customerId);
            task1.setValue('assigned', runtime.getCurrentUser().id);
            task1.setValue('status', 'NOTSTART');
            task1.save();

        
            var task2 = record.create({
                type: record.Type.TASK,
                isDynamic: true
            });
            task2.setValue('title', 'Perform Credit Check');
            task2.setValue('company', customerId);
            task2.setValue('assigned', runtime.getCurrentUser().id);
            task2.setValue('status', 'NOTSTART');
            task2.save();

          
            email.send({
                author: runtime.getCurrentUser().id,
                recipients: runtime.getCurrentUser().email,
                subject: 'Customer Onboarding Started',
                body: 'Customer onboarding has started for Customer ID: ' + customerId
            });
        }

        return true;
    }

    return {
        onAction: onAction
    };
});
