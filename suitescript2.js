/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget'], function (serverWidget) {

    function onRequest(context) {

        if (context.request.method === 'GET') {

            var form = serverWidget.createForm({
                title: 'Simple Form'
            });

            form.addField({
                id: 'custpage_name',
                type: serverWidget.FieldType.TEXT,
                label: 'Name'
            });
            form.addField({
                id: 'custpage_email',
                type: serverWidget.FieldType.TEXT,
                label: 'email'
            });
            form.addSubmitButton({
                label: 'Submit'
            });

            context.response.writePage(form);
        }
    }

    return {
        onRequest: onRequest
    };
});
