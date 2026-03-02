/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'], function (serverWidget) {

    function onRequest(context) {

        if (context.request.method === 'GET') {

            var form = serverWidget.createForm({
                title: 'Simple Item  Form'
            });

            form.addField({
                id: 'custpage_item_name',
                type: serverWidget.FieldType.TEXT,
                label: 'Item Name'
            });

            form.addSubmitButton({
                label: 'Submit'
            });

            context.response.writePage(form);

        } else {
            
            var itemValue = context.request.parameters.custpage_item_name;

            context.response.write(
                'You have searched for the item: ' + itemValue
            );
        }
    }

    return {
        onRequest: onRequest
    };
});
