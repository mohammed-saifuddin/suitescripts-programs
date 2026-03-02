/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define([], function () {

    function beforeLoad(context) {
      

            var field = context.form.getField({ id: 'email' });
            var field1=context.form.getField({id:"phone"});
            if (field && field1) {
                field.isMandatory = true;
                field1.isMandatory=true;
            }
            
        }
    

    return { beforeLoad:beforeLoad };
});
