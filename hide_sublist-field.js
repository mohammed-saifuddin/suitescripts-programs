/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * 
 */
define(['N/ui/serverWidget','N/log'],function(serverWidget,log){
    function beforeLoad(context){
     if(context.type === context.UserEventType.EDIT){
        hideColumn(context.form,'item','item');
        hideColumn(context.form,'item','class');
        hideColumn(context.form,'item','department');
     }
    }
    function hideColumn(form,sublistId,fieldId){
        try{
            var formSublist=form.getSublist({
                id:sublistId
            })
            if(formSublist){
               var formField=formSublist.getField({
                id:fieldId
            })
            if(formField){
                formField.updateDisplayType({
                    displayType:serverWidget.FieldDisplayType.HIDDEN
                })
            }
            log.debug("it is working")
            }
            

        }catch(error){
              log.error({
                title:'error has occured',
                details:JSON.stringify({
                    sublistId:sublistId,
                    fieldId:fieldId
                })
              })
        }
    }
    return {
        beforeLoad:beforeLoad
    }
})