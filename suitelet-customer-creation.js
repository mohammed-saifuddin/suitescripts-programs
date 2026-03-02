/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/record'], function (serverWidget, record) {

    function onRequest(context) {

        if (context.request.method === 'GET') {

            var form = serverWidget.createForm({
                title: 'Create Customer'
            });

            form.addField({
                id: 'custpage_company',
                type: serverWidget.FieldType.TEXT,
                label: 'Company Name'
            });

            form.addField({
                id: 'custpage_email',
                type: serverWidget.FieldType.EMAIL,
                label: 'Email'
            });

            form.addField({
                id: 'custpage_subsidiary',
                type: serverWidget.FieldType.SELECT,
                label: 'Subsidiary',
                source: 'subsidiary'
            });

            form.addSubmitButton({
                label: 'Create Customer'
            });

            context.response.writePage(form);
        }

        // POST BLOCK
        if (context.request.method === 'POST') {

            //  Create the record FIRST
            var custRec = record.create({
                type: record.Type.CUSTOMER,
                isDynamic: true
            });

            //  Set mandatory field FIRST
            custRec.setValue({
                fieldId: 'subsidiary',
                value: context.request.parameters.custpage_subsidiary
            });

            //  Set other values
            custRec.setValue({
                fieldId: 'companyname',
                value: context.request.parameters.custpage_company
            });

            custRec.setValue({
                fieldId: 'email',
                value: context.request.parameters.custpage_email
            });

            // Save
            var custId = custRec.save();

            context.response.write(
                'Customer created successfully. Internal ID: ' + custId
            );
        }
    }

    return {
        onRequest: onRequest
    };
});
