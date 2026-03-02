/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/log'], function (log) {

    function beforeLoad(context) {
        log.debug('beforeLoad', 'User Event is running');
        
        if (context.form) {
            context.form.addField({
                id: 'custpage_test',
                type: 'text',
                label: 'TEST FIELD'
            });
        }
    }

    return {
        beforeLoad: beforeLoad
    };
});
