/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define([], function () {
    function pageinit(){
        alert("moving to next transactions")
    }

    function goToPage(pageIndex) {
        document.getElementById('custpage_pageindex').value = pageIndex;
        document.forms[0].submit();
    }

    return {
        
        pageinit:pageinit
    };
});
