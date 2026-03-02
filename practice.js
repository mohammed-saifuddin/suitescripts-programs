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

            var field = form.addField({
                id: 'custpage_text',
                type: serverWidget.FieldType.TEXT,
                label: 'Name'
            });

            field.layoutType = serverWidget.FieldLayoutType.NORMAL;

            field.updateBreakType({
                breakType: serverWidget.FieldBreakType.STARTCOL
            });

            form.addField({
                id: 'custpage_date',
                type: serverWidget.FieldType.DATE,
                label: 'Date'
            });

            form.addField({
                id: 'custpage_currencyfield',
                type: serverWidget.FieldType.CURRENCY,
                label: 'Currency'
            });

            var select = form.addField({
                id: 'custpage_selectfield',
                type: serverWidget.FieldType.SELECT,
                label: 'Select'
            });

            select.addSelectOption({
                value: 'Albert',
                text: 'Albert'
            });

            select.addSelectOption({
                value: 'Baron',
                text: 'Baron'
            });

            var sublist = form.addSublist({
                id: 'sublist',
                type: serverWidget.SublistType.INLINEEDITOR,
                label: 'Inline Editor Sublist'
            });

            sublist.addField({
                id: 'sublist1',
                type: serverWidget.FieldType.DATE,
                label: 'Date'
            });
           

            sublist.addField({
                id: 'sublist2',
                type: serverWidget.FieldType.SELECT,
                label: 'subsidiary',
                source:'subsidiary'
            });
           sublist.addField({
                id: 'sublist3',
                type: serverWidget.FieldType.INTEGER,
                label: 'rate'
            });
             sublist.addField({
                id: 'sublist4',
                type: serverWidget.FieldType.INTEGER,
                label: 'quantity'
            });
             sublist.addField({
                id:'sublist5',
                type:serverWidget.FieldType.INTEGER,
                label:'Amount'
            })
            form.addSubmitButton({
                label: 'Submit Button'
            });

            context.response.writePage(form);
        } else {
            var delimiter = /\u0001/;
            var textField = context.request.parameters.custpage_text;
            var dateField = context.request.parameters.custpage_date;
            var currencyField = context.request.parameters.custpage_currencyfield;
            var selectField = context.request.parameters.custpage_selectfield;
            var sublistData = context.request.parameters.sublistdata.split(delimiter);
            var sublistField1 = sublistData[0];
            var sublistField2 = sublistData[1];
            var sublistField3 = sublistData[2];
            var sublistField4 = sublistData[3];
            var sublistField5 = sublistData[4];

            context.response.write('You have entered: ' + textField + ' ' + dateField + ' '
                + currencyField + ' ' + selectField + ' ' + sublistField1 + ' ' + sublistField2+' '+sublistField3+' '+sublistField4+' '+sublistField5);
        }
    }

    return {
        onRequest: onRequest
    };
});