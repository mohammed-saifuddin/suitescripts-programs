/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/search'], function (search) {

    function beforeSubmit(context) {

        if (context.type !== context.UserEventType.CREATE) {
            return;
        }

        var rec = context.newRecord;
        var recordType = rec.type;

        var prefix = '';

       
        if (recordType === 'salesorder') {
            prefix = 'SO';
        } else if (recordType === 'purchaseorder') {
            prefix = 'PO';
        } else if (recordType === 'invoice') {
            prefix = 'INV';
        } else {
            return;
        }

        
        var entityId = rec.getValue({ fieldId: 'entity' });
        var entityInitial = 'NA';

        if (entityId) {
          
            var entityData = search.lookupFields({
                type: (recordType === 'purchaseorder') ? 'vendor' : 'customer',
                id: entityId,
                columns: ['entityid']
            });

            var entityName = entityData.entityid || '';

            
            var words = entityName.split(' ');
            entityInitial = '';
            for (var i = 0; i < words.length; i++) {
                entityInitial += words[i].charAt(0).toUpperCase();
            }
        }

        
        var seq = 1;

        var tranSearch = search.create({
            type: recordType,
            filters: [],
            columns: [
                search.createColumn({
                    name: 'internalid',
                    summary: search.Summary.COUNT
                })
            ]
        });

        var result = tranSearch.run().getRange({ start: 0, end: 1 });

        if (result && result.length > 0) {
            seq = Number(result[0].getValue({
                name: 'internalid',
                summary: search.Summary.COUNT
            })) + 1;
        }

        var formattedSeq = ('000' + seq).slice(-3);

        
        var tranId = prefix + '-' + entityInitial + '-' + formattedSeq;

        rec.setValue({
            fieldId: 'otherrefnum',
            value: tranId
        });
        log.debug(tranId)
    }

    return {
        beforeSubmit: beforeSubmit
    };
});
