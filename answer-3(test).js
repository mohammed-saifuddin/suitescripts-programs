/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/search', 'N/log'], function (search, log) {

    function afterSubmit(context) {

        if (context.type !== context.UserEventType.CREATE) {
            return;
        }

        var rec = context.newRecord;

        var customerId = rec.getValue({
            fieldId: 'entity'
        });

        if (!customerId) return;

       
        var invoiceSearch = search.create({
            type: search.Type.INVOICE,
            filters: [
                ['entity', 'anyof', customerId],
                'AND',
                ['status', 'anyof', 'CustInvc:A'] 
            ],
            columns: ['internalid']
        });

        var count = invoiceSearch.runPaged().count;
        log.debug({
            title:'count',
            details:count
        })
        if (count > 5) {
            log.debug({
                title: 'Warning',
                details: 'Customer has more than 5 open invoices'
            });
        }
    }

    return {
        afterSubmit: afterSubmit
    };
});
