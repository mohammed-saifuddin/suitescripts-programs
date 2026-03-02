/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define([
    'N/currentRecord',
    'N/runtime',
    'N/ui/message'
], function (currentRecord, runtime, message) {

    function pageInit(context) {

        var rec = context.currentRecord;

       
        var fieldValue = rec.getValue({
            fieldId: 'memo'
        });

        console.log('Memo Value:', fieldValue);

        if (!fieldValue || fieldValue === 'autofilled with page load') {
            rec.setValue({
                fieldId: 'memo',
                value: 'changing from netsuite to odoo'
            });
        }

        
        var btn = document.getElementById('custpage_btn');
        if (btn) {
            btn.disabled = true;
            btn.isHidden=true;
        }
         if(typeof window != 'undefined' && window.document){
            window.document.querySelector('#custpage_btn').disabled = true; // id from add button call in user event script
        }
       
    }

    return {
        pageInit: pageInit
    };
});
