/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */
define(['N/ui/dialog'], function (dialog) {

    function pageInit(context) {
        dialog.alert({
            title: 'Page Init',
            message: 'this comes when the page is being loaded'
        })    }

    function fieldChanged(context) {

        if (context.fieldId === 'entity') {

            alert("vendor has been selected");
            var rec=context.currentRecord;
            rec.setValue({
                fieldId:"otherrefnum",
                value:"saifuddin"
            })
            rec.setValue({
                fieldId:'department',
                value:4
            })
            rec.setValue({
                fieldId:'class',
                value:1
            })
        }
        
    }
    
    function lineInit(context) {
        if (context.sublistId === 'item') {
            alert('Item line selected');
            

        }
        
    }
    function validateLine(context){
        var rec=context.currentRecord;
            var itemtype=rec.getCurrentSublistValue({
                sublistId:'item',
                fieldId:'itemtype'
            })
            if(itemtype==='InvtPart'){
                rec.setCurrentSublistValue({
                    sublistId:'item',
                    fieldId:'department',
                    value:5
                })
                rec.setCurrentSublistValue({
                    sublistId:'item',
                    fieldId:'class',
                    value:1
                })
                alert("selected item is inventory item")
            }
            else if(itemtype==='NonInvtPart'){
                rec.setCurrentSublistValue({
                    sublistId:'item',
                    sublistId:'item',
                    fieldId:'department',
                    value:4
                })
                rec.setCurrentSublistValue({
                    sublistId:'item',
                    fieldId:'class',
                    value:4
                })
                alert("selected item is non inventory item")
            }
            else if(itemtype === 'Assembly'){
                rec.setCurrentSublistValue({
                    sublistId:'item',
                    fieldId:'department',
                    value:2
                })
                rec.setCurrentSublistValue({
                    sublistId:'item',
                    fieldId:'class',
                    value:5
                })
                alert("selected item is assembly item")
            }
            else{
                alert("other items type is selected")
                rec.setCurrentSublistValue({
                    sublistId:'item',
                    fieldId:"department",
                    value:5
                })
                rec.setCurrentSublistValue({
                    sublistId:'item',
                    fieldId:'class',
                    value:1
                })
            }
            return true;
    }
    function sublistChanged(context) {

        if (context.sublistId === 'item') {

            var rec = context.currentRecord;
            var total=0;
            var count = rec.getLineCount({
                sublistId: 'item'
            });
            for(var i=0;i<count;i++){
                var itemtype=rec.getSublistValue({
                    sublistId:'item',
                    fieldId:'itemtype',
                    line:i
                })
                if(itemtype === 'InvtPart'){
                var amt=rec.getSublistValue({
                sublistId:'item',
                fieldId:'amount',
                line:i
            })|| 0;
                total +=parseFloat(amt)
                }
               
            }
            
            rec.setValue({
                fieldId:'memo',
                value:total
            })
            alert('total items line selected are: '+ count)
        }
    }
    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        sublistChanged: sublistChanged,
        lineInit:lineInit,
        validateLine:validateLine
    };
});
