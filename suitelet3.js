/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget'], function (serverWidget) {

    function onRequest(context) {

        if (context.request.method === 'GET') {

            var form = serverWidget.createForm({
                title: 'suitelet script type example'
            });

            form.addField({
                id: 'custpage_email',
                type: serverWidget.FieldType.EMAIL,
                label: 'Email'
            });
           

            form.addSubmitButton('Submit');
            context.response.writePage(form);
        } else {

            var email = context.request.parameters.custpage_email;
            context.response.write('Submitted Email: ' + email);
            
        }
    }

    return {
        onRequest: onRequest
    };
});
