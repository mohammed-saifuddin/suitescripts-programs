/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define([], function () {

    function fieldChanged(context) {

        var rec = context.currentRecord;

        if (context.sublistId === 'item' && context.fieldId === 'item') {

            var bodyDiscount = Number(rec.getValue({
                fieldId: 'custbody9'
            })) || 0;

            rec.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'custcol4',
                value: bodyDiscount,
                ignoreFieldChange: true
            });
        }

        if (
            context.sublistId === 'item' &&
            (context.fieldId === 'rate' || context.fieldId === 'quantity')
        ) {

            var rate = Number(rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'rate'
            })) || 0;

            var discount = Number(rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'custcol4'
            })) || 0;

            if (rate <= 0 || discount <= 0) 
                return;

            var discountedRate = rate - (rate * discount / 100);

            rec.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'rate',
                value: discountedRate,
                ignoreFieldChange: true
            });
        }
    }

    return {
        fieldChanged: fieldChanged
    };
});
