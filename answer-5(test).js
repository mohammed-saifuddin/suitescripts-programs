/**
* @NApiVersion 2.x
* @NScriptType MapReduceScript
**/
define(['N/search','N/record','N/currentRecord'],function(){
 function getInputData(){
 
var mySearch = search.load({
    id: 'custom_search',
    status:'Active'
});

}
function map(context){
  var rec=context.currentRecord;
  var cust_id=rec.getValue({
  fieldId:'customer_id',

})

}
function summarize(context){
  log.debug("total number of customer processed are :",count)


}

return {
getInputData:getInputData,
map:map
summarize:summarize

}







});