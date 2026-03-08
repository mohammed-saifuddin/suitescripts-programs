/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
define([], () => {
    function pageInit(){
        console.log("hi")
    }
    const forgotPassword = () => {
        alert("Redirecting to Forgot Password Page");
    };

    return {
        pageInit:pageInit,
        forgotPassword:forgotPassword
    };

});