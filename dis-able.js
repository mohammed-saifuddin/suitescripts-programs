/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define([], function () {

    function beforeLoad(context) {

        if (context.type !== context.UserEventType.CREATE &&
            context.type !== context.UserEventType.EDIT) {
            return;
        }

        var form = context.form;

        // Custom field
        var fieldObj = form.getField({
            id: 'custentity3'
        });

        if (fieldObj) {
            fieldObj.isDisabled = true;
        }
    }

    return {
        beforeLoad: beforeLoad
    };
});
