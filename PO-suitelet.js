/**
* @NApiVersion 2.1
* @NScriptType Suitelet
*/
define([
    'N/ui/serverWidget',
    'N/search',
    'N/record',
    'N/redirect',
    'N/runtime'
], function (ui, search, record, redirect, runtime) {
 
    function onRequest(context) {
        if (context.request.parameters.action === 'getitems') {
            var vendorId = context.request.parameters.vendor;
            var data = [];
 
            search.create({
                type: search.Type.ITEM,
                filters: [
                    ['isinactive', 'is', 'F'],
                    'AND',
                    ['vendor.internalid', 'anyof', vendorId]
                ],
                columns: ['itemid', 'baseprice']
            }).run().each(function (r) {
                data.push({
                    id: r.id,
                    name: r.getValue('itemid'),
                    rate: r.getValue('baseprice') || 0
                });
                return true;
            });
 
            context.response.write(JSON.stringify(data));
            return;
        }
        if (context.request.method === 'GET') {
 
            var form = ui.createForm({
                title: 'Purchase Order Creation'
            });
 
            var vendorFld = form.addField({
                id: 'custpage_vendor',
                type: ui.FieldType.SELECT,
                label: 'Vendor',
                source: 'vendor'
            });
 
            form.addField({
                id: 'custpage_action',
                type: ui.FieldType.TEXT,
                label: 'Action'
            }).updateDisplayType({
                displayType: ui.FieldDisplayType.HIDDEN
            });
 
            var sublist = form.addSublist({
                id: 'custpage_items',
                type: ui.SublistType.INLINEEDITOR,
                label: 'Items'
            });
 
            sublist.addField({
                id: 'custpage_itemid',
                type: ui.FieldType.TEXT,
                label: 'Item ID'
            }).updateDisplayType({ displayType: ui.FieldDisplayType.HIDDEN });
 
            sublist.addField({
                id: 'custpage_item',
                type: ui.FieldType.TEXT,
                label: 'Item'
            }).updateDisplayType({ displayType: ui.FieldDisplayType.DISABLED });
 
            sublist.addField({
                id: 'custpage_rate',
                type: ui.FieldType.CURRENCY,
                label: 'Rate'
            }).updateDisplayType({ displayType: ui.FieldDisplayType.DISABLED });
 
            sublist.addField({
                id: 'custpage_qty',
                type: ui.FieldType.INTEGER,
                label: 'Quantity'
            });
 
            sublist.addField({
                id: 'custpage_amount',
                type: ui.FieldType.CURRENCY,
                label: 'Amount'
            }).updateDisplayType({ displayType: ui.FieldDisplayType.DISABLED });
 
            form.addSubmitButton({ label: 'Submit' });
            form.addButton({
                id: 'custpage_preview',
                label: 'Preview',
                functionName: 'previewPO'
            });
 
            form.clientScriptModulePath = './po_client.js';
            context.response.writePage(form);
        }
        else {
            var vendor = context.request.parameters.custpage_vendor;
            var action = context.request.parameters.custpage_action || 'submit';
 
            if (action === 'preview') {
 
 
                var params = {
        custparam_vendor: vendor
    };
 
    var count = context.request.getLineCount({ group: 'custpage_items' });
 
    var itemData = [];
 
    for (var i = 0; i < count; i++) {
        var qty = context.request.getSublistValue({
            group: 'custpage_items',
            name: 'custpage_qty',
            line: i
        });
 
        if (qty && Number(qty) > 0) {
            itemData.push({
                item: context.request.getSublistValue({
                    group: 'custpage_items',
                    name: 'custpage_itemid',
                    line: i
                }),
                qty: qty,
                rate: context.request.getSublistValue({
                    group: 'custpage_items',
                    name: 'custpage_rate',
                    line: i
                })
            });
        }
    }
 
    params.custparam_items = JSON.stringify(itemData);
 
                redirect.toRecord({
                    type: record.Type.PURCHASE_ORDER,
                    isEditMode: true,
                    parameters: {
        custparam_vendor: vendor,
        custparam_items: JSON.stringify(itemData)
    }
                });
                return;
            }
 
            var po = record.create({
                type: record.Type.PURCHASE_ORDER,
                isDynamic: true
            });
 
            po.setValue({ fieldId: 'entity', value: vendor });
 
            var count = context.request.getLineCount({ group: 'custpage_items' });
 
            for (var i = 0; i < count; i++) {
                var qty = context.request.getSublistValue({
                    group: 'custpage_items',
                    name: 'custpage_qty',
                    line: i
                });
 
                if (qty && Number(qty) > 0) {
                    po.selectNewLine({ sublistId: 'item' });
                    po.setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'item',
                        value: context.request.getSublistValue({
                            group: 'custpage_items',
                            name: 'custpage_itemid',
                            line: i
                        })
                    });
                    po.setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'quantity',
                        value: qty
                    });
                    po.setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'rate',
                        value: context.request.getSublistValue({
                            group: 'custpage_items',
                            name: 'custpage_rate',
                            line: i
                        })
                    });
                    po.commitLine({ sublistId: 'item' });
                }
            }
 
            var poId = po.save();
            redirect.toRecord({ type: record.Type.PURCHASE_ORDER, id: poId });
        }
    }
 
    return { onRequest: onRequest };
});