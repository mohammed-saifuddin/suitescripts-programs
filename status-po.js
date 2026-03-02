/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/ui/serverWidget'], function (serverWidget) {

    function beforeLoad(context) {

        if (context.type === context.UserEventType.CREATE ||
            context.type === context.UserEventType.EDIT) {

            var form = context.form;

           
            var statusField = form.addField({
                id: 'custpage_status',
                type: serverWidget.FieldType.SELECT,
                label: 'Approval Status'
            });

            
            statusField.addSelectOption({
                value: '',
                text: '-- Select --'
            });
            statusField.addSelectOption({
                value: 'P',
                text: 'Pending'
            });
            statusField.addSelectOption({
                value: 'A',
                text: 'Approved'
            });
            statusField.addSelectOption({
                value: 'R',
                text: 'Rejected'
            });

           
            
        }
    }

    return {
        beforeLoad: beforeLoad
    };
});
