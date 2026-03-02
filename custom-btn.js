/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define([], function () {

    

       function beforeLoad(context) {
    if (context.type === context.UserEventType.VIEW) {
        context.form.addButton({
            id: 'custpage_test_btn',
            label: 'Click Me',
            functionName: 'showMessage'
        });
    }
}


        

        
    

    return {
        beforeLoad: beforeLoad
    };
});
