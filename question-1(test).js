/**
@NApiVersion 2.x
@NScriptType ClientScript
*
**/
define(['N/currentRecord'],function(){
function saveRecord(context){
var rec=context.currentRecord;
var count=rec.getLineCount({
sublistId:'item'
})
var qty=rec.getCurrentSublistValue({
sublistId:'item',
fieldId:'quantity'
})
for(var i=0;i<=count;i++){
     if(qty==0){
      alert("quantity cannot be zero ");
return false;
}

}
return true;
}
}
return {
saveRecord:saveRecord;
}
})