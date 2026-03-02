/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget'], function (serverWidget) {

    function onRequest(context) {

        if (context.request.method === 'GET') {

            var form = serverWidget.createForm({
                title: 'Simple Suitelet Form'
            });

            form.addField({
                id: 'custpage_name',
                type: serverWidget.FieldType.TEXT,
                label: 'Name'
            });

            form.addField({
                id: 'custpage_email',
                type: serverWidget.FieldType.EMAIL,
                label: 'Email'
            });

            form.addSubmitButton({
                label: 'Submit'
            });

            context.response.writePage(form);
        }

        if (context.request.method === 'POST') {
            var name = context.request.parameters.custpage_name;
            var email = context.request.parameters.custpage_email;

            context.response.write(
                'Submitted Successfully <br>Name: ' + name + '<br>Email: ' + email
            );
        }
    }

    return {
        onRequest: onRequest
    };
});
