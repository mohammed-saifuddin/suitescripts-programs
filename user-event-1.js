/**

* @NApiVersion 2.x

* @NScriptType UserEventScript

*/

define(['N/record','N/search','N/log'], function (record, search, log) {
 
    function afterSubmit(context) {
 
        if (context.type !== context.UserEventType.CREATE) {

            return;

        }

        try {

            var soRec = record.load({

                type: record.Type.SALES_ORDER,

                id: context.newRecord.id

            });

            var soNumber = soRec.getValue('tranid');
            
            var lineCount = soRec.getLineCount({ sublistId: 'item' });
 
            var vendorMap = {};
 
            for (var i = 0; i < lineCount; i++) {
 
                var itemId = soRec.getSublistValue({

                    sublistId: 'item',

                    fieldId: 'item',

                    line: i

                });
 
                var orderedQty = parseFloat(

                    soRec.getSublistValue({

                        sublistId: 'item',

                        fieldId: 'quantity',

                        line: i

                    })

                ) || 0;
 
                var locationId = soRec.getSublistValue({

                    sublistId: 'item',

                    fieldId: 'location',

                    line: i

                }) || soRec.getValue('location');
 
                if (!locationId) {

                    log.error('Missing Location','Line '+i+' has no location');

                    continue;

                }
 
              var locSearch = search.create({

                  type: 'item',

                  filters: [

                            ['internalid','anyof',itemId],

                            'AND',

                            ['inventorylocation','anyof',locationId]

                           ],

                  columns: [

                            search.createColumn({ name: 'locationquantityonhand' })

                           ]

              });
 
              var availableQty = 0;
 
              locSearch.run().each(function(result){

              var qty = result.getValue({ name:'locationquantityonhand' });

              availableQty = parseFloat(qty);

              if (isNaN(availableQty)) {

              availableQty = 0;

              }

              return false;

           });
 
            log.debug('Qty Check',

                      'Item:' + itemId +

                      ' Ordered:' + orderedQty +

                      ' Available:' + availableQty

                     );
 
               if (orderedQty <= availableQty) continue;
 
               var backOrderQty = Math.max(orderedQty - availableQty, 0);

              log.debug('backorder'+backOrderQty);

                var vendorId = null;
 
                var itemRec = record.load({

                type: record.Type.INVENTORY_ITEM,

                id: itemId

               });
 
               var vendorCount = itemRec.getLineCount({

               sublistId: 'itemvendor'

               });
 
               for (var v = 0; v < vendorCount; v++) {
 
               var isPreferred = itemRec.getSublistValue({

                sublistId: 'itemvendor',

                fieldId: 'preferredvendor',

                line: v

               });
 
               if (isPreferred === true || isPreferred === 'T') {
 
                  vendorId = itemRec.getSublistValue({

                  sublistId: 'itemvendor',

                  fieldId: 'vendor',

                  line: v

                  });

                   break;

                }

    }

                if (!vendorId) {

                    log.error('Missing Vendor','Item '+itemId+' has no preferred vendor');

                    continue;

                }
 
                if (!vendorMap[vendorId]) {

                    vendorMap[vendorId] = [];

                }
 
                vendorMap[vendorId].push({

                    item: itemId,

                    qty: backOrderQty,
                    line: i

                });

            }
 
            for (var vendorId in vendorMap) {
 
                var poRec = record.create({

                    type: record.Type.PURCHASE_ORDER,

                    isDynamic: true

                });
 
                poRec.setValue({

                    fieldId: 'entity',

                    value: vendorId

                });
 
                poRec.setValue({

                    fieldId: 'memo',

                    value: 'Auto-created from Sales Order ' + soNumber

                });
 
                var items = vendorMap[vendorId];
 
                for (var j = 0; j < items.length; j++) {
 
                    poRec.selectNewLine({ sublistId: 'item' });
 
                    poRec.setCurrentSublistValue({

                        sublistId: 'item',

                        fieldId: 'item',

                        value: items[j].item

                    });

                    poRec.setCurrentSublistValue({

                        sublistId: 'item',

                        fieldId: 'quantity',

                        value: items[j].qty

                    });
 
                    poRec.commitLine({ sublistId: 'item' });

                }

                var poId = poRec.save();
log.debug('PO Created','Vendor '+vendorId+' PO ID '+poId);

    // Reload SO to tag PO
    var soToUpdate = record.load({
    type: record.Type.SALES_ORDER,
    id: soRec.id
    });

    var poItems = vendorMap[vendorId];

           for (var k = 0; k < poItems.length; k++) {

      soToUpdate.setSublistValue({
        sublistId: 'item',
        fieldId: 'custcol8',
        line: poItems[k].line,
        value: poId
    });
    }

// Save SO with PO reference
     soToUpdate.save({
    ignoreMandatoryFields: true
     });


            }

        } catch (e) {

            log.error('Script Error', e);

          }

    }

    return {

        afterSubmit: afterSubmit

    };

});
 