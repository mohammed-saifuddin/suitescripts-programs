/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/currentRecord'],function(){
    function pageInit(context){
        var rec=context.currentRecord;
        if(context.mode ==='create'){
           rec.setValue({
            fieldId:'memo',
            value:"autofilled with page load",
            ignoreFieldSourcing:true
           })
        }
        alert("auto value updated")
    }
    function fieldChanged(context){
        if(context.sublistId === 'item' && context.sublistId === 'quantity'){
            var rec=context.currentRecord;
            var qty=rec.getCurrentSublistValue({
                sublistId:'item',
                fieldId:'quantity',
                
            })
            var rate=rec.getCurrentSublistValue({
                sublistId:'item',
                fieldId:'rate'
            })
            rec.setCurrentSublistValue({
                sublistId:'item',
                fieldId:'amount',
                value:qty * rate
            })
        }
        
    }
    function lineinit(context){
        if(context.sublistId === 'item'){
            alert("line item is being selected")
        }
    }
    function validateLine(context){
        var rec=context.currentRecord;
        if(context.sublistId === 'item'){
           var qty=rec.getCurrentSublistValue({
                sublistId:'item',
                fieldId:'quantity'
                    });
                    if(!qty){
                        alert("please enter the quantity for line item")
                        return false;
                    }
        }
        return true;
        
    }
    function sublistChanged(context){
        if(context.sublistId === 'item'){
            alert("sublist is changed")
        }

    }
    function postSourcing(context){
        if(context.sublistId === 'item' && context.fieldId === 'item'){
            context.currentRecord.setCurrentSublistValue({
                sublistId:'item',
                fieldId:'quantity',
                value:3
            })
            context.currentRecord.setCurrentSublistValue({
                sublistId:'item',
                fieldId:'description',
                value:'the item entered is vendors purchase order'
            })
        }
    }
    function saveRecord(context){
        var count=context.currentRecord.getLineCount({
            sublistId:'item'
        })
        if(count === 0){
            alert("select one line item")
            return false;
        }
        return true
    }
    function validateDelete(context) {
    return confirm('Are you sure you want to delete this line?');
}
function testFn() {
        alert('Test button clicked');
    }
    return{
        pageInit:pageInit,
        fieldChanged:fieldChanged,
        lineInit:lineinit,
        validateLine:validateLine,
        sublistChanged:sublistChanged,
        postSourcing:postSourcing,
        saveRecord:saveRecord,
        validateDelete:validateDelete,
        testFn:testFn

    }
})