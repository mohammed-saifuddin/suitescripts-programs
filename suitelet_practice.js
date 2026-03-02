/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'],function(ui){
    function onRequest(context){
      
        var form=ui.createForm({
            title:'Custom suitlet'
        });
        
        form.addField({
            id: 'custpage_name',
            type: ui.FieldType.SELECT,
            label: 'Customer name',
            source:'customer'
        });
        var sublist=form.addSublist({
            id:'custpage_item',
            type:ui.SublistType.LIST,
            label:'contact'

        })
        sublist.addField({
            id:'custpage_items',
            type:ui.FieldType.TEXT,
            label:'contact'
        })
         sublist.addField({
            id:'custpage_rate',
            type:ui.FieldType.SELECT,
            label:'subsidiary'
        })
         sublist.addField({
            id:'custpage_amount',
            type:ui.FieldType.INTEGER,
            label:'amount'
        })
        form.addButton({
            id:'cust_btn',
            label:'custom btn',
            functionName:'testFn'
        })
      form.clientScriptModulePath = './client_practice.js'
        form.addSubmitButton({
            label:'ok'
        });
        context.response.writePage(form)
      
     
    }
    return{
        onRequest:onRequest
    }
})