/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget'], function (serverWidget) {

    function onRequest(context) {

        var form = serverWidget.createForm({
            title: 'Welcome Page'
        });

        form.addField({
            id: 'custpage_info',
            type: serverWidget.FieldType.INLINEHTML,
            label: 'Info'
        }).defaultValue = '<h3>Welcome to NetSuite Suitelet</h3>';

        context.response.writePage(form);
    }

    return {
        onRequest: onRequest
    };
});
