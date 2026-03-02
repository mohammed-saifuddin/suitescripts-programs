/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/record','N/ui/serverWidget'],function(record,server){
    function beforeLoad(context){
        if(context.type !== context.UserEventType.CREATE){
                  return;
        }
        var rec=context.form;
        var notesField=rec.getField({
           id:'comments'
        })
        notesField.updateDisplayType({
          displayType:server.FieldDisplayType.DISABLED
        })

    }
    function beforeSubmit(context){
        if(context.type !== context.UserEventType.CREATE){
            return;
        }
        var rec=context.newRecord;
        rec.setValue({
            fieldId:'comments',
            value:'before submit value updated'
        })
    }
    function afterSubmit(context){
       if(context.type !== context.UserEventType.CREATE){
        return;
       }
       var employyeeRec=context.newRecord;
       var firstName=employyeeRec.getValue({
        fieldId:'firstName'
       })
       
       var supervisor=employyeeRec.getValue({
        fieldId:'supervisor'
       })
       if(supervisor){
        var newTask=record.create({
            type:record.Type.TASK,
            isDynamic:true
        })
        newTask.setValue({
            fieldId:'title',
            value:"Orientation of the task for " +firstName 
        })
        newTask.setValue({
            fieldId:'assigned',
            value:supervisor
        })
        log.debug(supervisor)
        try{
            var taskId=newTask.save();
            log.debug({
                title:"Task created succesfully",
                details:'the task id is :'+ taskId
            })
        }catch(e){
          log.error({
            title: e.name,
            details: e.message
          })
        }
       }
    }
    return{
        beforeLoad:beforeLoad,
        beforeSubmit:beforeSubmit,
        afterSubmit:afterSubmit
    }
})