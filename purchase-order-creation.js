/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/record','N/log'], function (record, log) {

    function onRequest(context) {

        if (context.request.method === 'GET') {

            var poRec = record.create({
                type: record.Type.PURCHASE_ORDER,
                isDynamic: true
            });

            poRec.setValue('entity', 1351);      
            poRec.setValue('subsidiary', 1);    
            poRec.setValue('location', 1);     
            poRec.setValue('memo', 'PO created via Suitelet');

            poRec.selectNewLine({ sublistId: 'item' });

            poRec.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'item',
                value: 403
            });

            poRec.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                value: 5
            });

            poRec.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'rate',
                value: 100
            });

            poRec.commitLine({ sublistId: 'item' });

            var poId = poRec.save({
                enableSourcing: true,
                ignoreMandatoryFields: false
            });

            context.response.write('Purchase Order Created. PO ID: ' + poId);
        }
    }

    return {
        onRequest: onRequest
    };
});
