/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/search'], function (serverWidget, search) {

    function safeValue(val) {
        return (val !== null && val !== undefined && val !== '') ? val.toString() : '';
    }

    function onRequest(context) {

        var request = context.request;
        var response = context.response;

        var pageIndex = parseInt(request.parameters.custpage_pageindex, 10) || 0;

       

        var form = serverWidget.createForm({
            title: 'Transaction Saved Search '
        });
      
        var inlineHtml = form.addField({
    id: 'custpage_inlinehtml',
    type: serverWidget.FieldType.INLINEHTML,
    label: 'Inline HTML'
});

inlineHtml.defaultValue =
    '<script>' +
    'function goToPage(pageIndex){' +
    '  document.getElementById("custpage_pageindex").value = pageIndex;' +
    '  document.forms[0].submit();' +
    '}' +
    '</script>';

       

        var pageField = form.addField({
            id: 'custpage_pageindex',
            type: serverWidget.FieldType.INTEGER,
            label: 'Page Index'
        });
        pageField.updateDisplayType({
            displayType: serverWidget.FieldDisplayType.HIDDEN
        });
        pageField.defaultValue = pageIndex.toString();

   

        var fromDateFld = form.addField({
            id: 'custpage_fromdate',
            type: serverWidget.FieldType.DATE,
            label: 'Transaction From Date'
        });
        fromDateFld.defaultValue = request.parameters.custpage_fromdate || '';

        var toDateFld = form.addField({
            id: 'custpage_todate',
            type: serverWidget.FieldType.DATE,
            label: 'Transaction To Date'
        });
        toDateFld.defaultValue = request.parameters.custpage_todate || '';

        var tranIdFld = form.addField({
            id: 'custpage_tranid',
            type: serverWidget.FieldType.TEXT,
            label: 'Transaction Name / ID'
        });
        tranIdFld.defaultValue = request.parameters.custpage_tranid || '';
       var typeFld = form.addField({
    id: 'custpage_trantype',
    type: serverWidget.FieldType.SELECT,
    label: 'Transaction Type'
});

typeFld.addSelectOption({ value: '', text: '-- All --' });
typeFld.addSelectOption({ value: 'SalesOrd', text: 'Sales Order' });
typeFld.addSelectOption({ value: 'PurchOrd', text: 'Purchase Order' });

typeFld.defaultValue = request.parameters.custpage_trantype || '';

        var statusFld = form.addField({
            id: 'custpage_status',
            type: serverWidget.FieldType.SELECT,
            label: 'Status',
            
        });
        statusFld.addSelectOption({ value: '', text: '-- All --' });

statusFld.addSelectOption({ value: 'SalesOrd:A', text: 'Sales Order : Pending Approval' });
statusFld.addSelectOption({ value: 'SalesOrd:B', text: 'Sales Order : Pending Fulfillment' });
statusFld.addSelectOption({ value: 'SalesOrd:D', text: 'Sales Order : Billed' });

statusFld.addSelectOption({ value: 'PurchOrd:A', text: 'Purchase Order : Pending Approval' });
statusFld.addSelectOption({ value: 'PurchOrd:B', text: 'Purchase Order : Pending Receipt' });

statusFld.defaultValue = request.parameters.custpage_status || '';

        statusFld.defaultValue = request.parameters.custpage_status  || '';

        form.addSubmitButton({
            label: 'Search'
        });

        

        var filters = [];

        if (request.parameters.custpage_fromdate) {
            filters.push(['trandate', 'onorafter', request.parameters.custpage_fromdate]);
        }

        if (request.parameters.custpage_todate) {
            if (filters.length) filters.push('AND');
            filters.push(['trandate', 'onorbefore', request.parameters.custpage_todate]);
        }

        if (request.parameters.custpage_tranid) {
            if (filters.length) filters.push('AND');
            filters.push(['tranid', 'contains', request.parameters.custpage_tranid]);
        }
       

        if (request.parameters.custpage_status) {

    var statusVal = request.parameters.custpage_status;
    var tranType = statusVal.split(':')[0]; 

    if (filters.length) filters.push('AND');

    filters.push([
        ['type', 'anyof', tranType],
        'AND',
        ['status', 'anyof', statusVal]
    ]);
}


       

        var transactionSearch = search.create({
            type: search.Type.TRANSACTION,
            filters: filters,
            columns: [
                search.createColumn({ name: 'internalid', summary: 'GROUP' }), // UNIQUE
                search.createColumn({ name: 'tranid', summary: 'GROUP' }),
                search.createColumn({ name: 'trandate', summary: 'GROUP' }),
                search.createColumn({ name: 'type', summary: 'GROUP' }),
                search.createColumn({ name: 'statusref', summary: 'GROUP' }),
                search.createColumn({ name: 'amount', summary: 'SUM' })
            ]
        });

        var pagedData = transactionSearch.runPaged({
            pageSize: 100
        });

       

        var sublist = form.addSublist({
            id: 'custpage_results',
            type: serverWidget.SublistType.LIST,
            label: 'Transactions'
        });

        sublist.addField({ id: 'col_tranid', type: serverWidget.FieldType.TEXT, label: 'Transaction ID' });
        sublist.addField({ id: 'col_date', type: serverWidget.FieldType.TEXT, label: 'Date' });
        sublist.addField({ id: 'col_type', type: serverWidget.FieldType.TEXT, label: 'Type' });
        sublist.addField({ id: 'col_status', type: serverWidget.FieldType.TEXT, label: 'Status' });
        sublist.addField({ id: 'col_amount', type: serverWidget.FieldType.CURRENCY, label: 'Amount' });

     

        if (pagedData.pageRanges.length > 0 && pageIndex < pagedData.pageRanges.length) {

            var page = pagedData.fetch({
                index: pageIndex
            });

            for (var i = 0; i < page.data.length; i++) {

                var row = page.data[i];

                sublist.setSublistValue({
                    id: 'col_tranid',
                    line: i,
                    value: safeValue(row.getValue({ name: 'tranid', summary: 'GROUP' }))
                });

                sublist.setSublistValue({
                    id: 'col_date',
                    line: i,
                    value: safeValue(row.getValue({ name: 'trandate', summary: 'GROUP' }))
                });

                sublist.setSublistValue({
                    id: 'col_type',
                    line: i,
                    value: safeValue(row.getText({ name: 'type', summary: 'GROUP' }))
                });

                sublist.setSublistValue({
                    id: 'col_status',
                    line: i,
                    value: safeValue(row.getText({ name: 'statusref', summary: 'GROUP' }))
                });

                sublist.setSublistValue({
                    id: 'col_amount',
                    line: i,
                    value: safeValue(row.getValue({ name: 'amount', summary: 'SUM' })) || '0'
                });
            }
        }

        

        if (pageIndex > 0) {
            form.addButton({
                id: 'custpage_prev',
                label: 'Previous',
                functionName: "goToPage(" + (pageIndex - 1) + ")"
            });
        }

        if (pageIndex < pagedData.pageRanges.length - 1) {
            form.addButton({
                id: 'custpage_next',
                label: 'Next',
                functionName: "goToPage(" + (pageIndex + 1) + ")"
            });
        }

      

        

        response.writePage(form);
    }

    return {
        onRequest: onRequest
    };
});
