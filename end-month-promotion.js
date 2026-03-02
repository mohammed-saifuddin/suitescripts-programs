/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/currentRecord','N/runtime','N/ui/serverWidget'],function(currentRecord,runtime,serverWidget){
    function beforeLoad(context){
        if(context.type === context.UserEventType.CREATE){
                var form =context.form;
                var fieldId='custpage_ch'
                var fieldLabel='Eligible for EOM promotions'
                var today=new Date();
                var month=today.getMonth();
                var date=today.getDate()
                if(month === 1){
                    if(date === 24 || date === 25 || date === 26 || date === 27 || date ==28 || date ===29){
                        form.addField({
                            id:fieldId,
                            label:fieldLabel,
                            type:serverWidget.FieldType.CHECKBOX

                        })
                    }else if(month === 0 || month === 2 || month === 3 || month === 4 || month === 5 || month === 6 || month === 7 || 
                        month === 8 || month === 9 || month === 10 || month === 11){
                            if(date ===26 || date ===27 || date ===28 || date ===29 || date == 30 || date ===31){
                        form.addField({
                            id:fieldId,
                            label:fieldLabel,
                            type:serverWidget.FieldType.CHECKBOX

                        })
                    }
                        }else{
                            if(date ===26 || date ===27 || date === 28 || date ===29 || date ==30 || date ===31){
                        form.addField({
                            id:fieldId,
                            label:fieldLabel,
                            type:serverWidget.FieldType.CHECKBOX

                        })
                    }
                        }
                }
            

        }

    }
    return{
        beforeLoad:beforeLoad
    }
})