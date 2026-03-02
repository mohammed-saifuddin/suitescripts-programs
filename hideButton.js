/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/runtime'], function (runtime) {

    function beforeLoad(context) {

        
        if (context.type !== context.UserEventType.VIEW) {
            return;
        }

        var form = context.form;
        var rec = context.newRecord;

       
        var status = rec.getValue({
            fieldId: 'orderstatus'
        });

     
        if (rec.type === 'purchaseorder' && status === 'B') {

            

            form.addButton({
                id: 'custpage_btn',
                label: 'Receive By',
                functionName: 'onReceiveByClick'
            });
        }
    }

    return {
        beforeLoad: beforeLoad
    };
});
