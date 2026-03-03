/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
define(['N/redirect'], function (redirect) {
    function pageInit(){

    }

    function goToNew() {

        var date = document.getElementById('custpage_date').value;

        redirect.toSuitelet({
            scriptId: 'customscript_bookingform',   // Booking Form Suitelet
            deploymentId: 'customdeploy_bookingform',
            parameters: {
                date: date
            }
        });
    }

    function goToReschedule() {

        var date = document.getElementById('custpage_date').value;
        var title = document.getElementById('custpage_title').value;
        var amenity = document.getElementById('custpage_amenity').value;

        redirect.toSuitelet({
            scriptId: 'customscript_bookingform',
            deploymentId: 'customdeploy_bookingform',
            parameters: {
                date: date,
                title: title,
                amenity: amenity
            }
        });
    }

    return {
        pageInit:pageInit,
        goToNew: goToNew,
        goToReschedule: goToReschedule
        
    };
});