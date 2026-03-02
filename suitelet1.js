/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/search'], function (serverWidget, search) {

    function onRequest(context) {

        var form = serverWidget.createForm({
            title: 'Customer Filter'
        });

        var subField = form.addField({
            id: 'custpage_subsidiary',
            type: serverWidget.FieldType.SELECT,
            label: 'Subsidiary',
            source: 'subsidiary'
        });

        var sublist = form.addSublist({
            id: 'custpage_list',
            type: serverWidget.SublistType.LIST,
            label: 'Customers'
        });

        sublist.addField({
            id: 'custpage_name',
            type: serverWidget.FieldType.TEXT,
            label: 'Name'
        });

        if (context.request.method === 'POST') {

            var filters = [['isinactive', 'is', 'F']];
            var selectedSub = context.request.parameters.custpage_subsidiary;

            if (selectedSub) {
                filters.push('AND');
                filters.push(['subsidiary', 'anyof', selectedSub]);
            }

            var custSearch = search.create({
                type: search.Type.CUSTOMER,
                filters: filters,
                columns: ['entityid']
            });

            var i = 0;
            custSearch.run().each(function (res) {
                sublist.setSublistValue({
                    id: 'custpage_name',
                    line: i,
                    value: res.getValue('entityid')
                });
                i++;
                return true;
            });
        }

        form.addSubmitButton('Search');
        context.response.writePage(form);
    }

    return {
        onRequest: onRequest
    };
});
