/**
* @NApiVersion 2.1
* @NScriptType UserEventScript
*/
define(['N/log'], function (log) {
 
    function beforeLoad(context) {

        if (context.type !== context.UserEventType.CREATE) return;
 
        var request = context.request;


        if (!request) return;
 
        var itemsJson = request.parameters.custparam_items;


        var vendor = request.parameters.custparam_vendor;
 
        if (!itemsJson || !vendor) return;
 
        var rec = context.newRecord;
 
        rec.setValue({
            fieldId: 'entity',
            value: vendor
        });
 
        var items;
        try {
            items = JSON.parse(itemsJson);
        } catch (e) {
            log.error('Invalid JSON', e);
            return;
        }


        for (var i = 0; i < items.length; i++) {

            rec.insertLine({
                sublistId: 'item',


                line: i


            });
 
            rec.setSublistValue({


                sublistId: 'item',


                fieldId: 'item',


                line: i,


                value: items[i].item


            });
 
            rec.setSublistValue({


                sublistId: 'item',


                fieldId: 'quantity',


                line: i,


                value: items[i].qty


            });
 
            if (items[i].rate) {


                rec.setSublistValue({


                    sublistId: 'item',


                    fieldId: 'rate',


                    line: i,


                    value: items[i].rate


                });


            }


        }
 
        log.debug('Preview custom po populated', items.length);


    }
 
    return {


        beforeLoad: beforeLoad


    };


});

 