/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */

define(['N/record'], function (record) {

    function doPost(requestBody) {
        try {
            var customerRec = record.create({
                type: record.Type.CUSTOMER,
                isDynamic: true
            });

            customerRec.setValue({
                fieldId: 'companyname',
                value: requestBody.companyname
            });

            customerRec.setValue({
                fieldId: 'email',
                value: requestBody.email
            });

            customerRec.setValue({
                fieldId: 'phone',
                value: requestBody.phone
            });

            var customerId = customerRec.save();

            return JSON.stringify({
                status: "SUCCESS",
                customerId: customerId
            });

        } catch (e) {
            return JSON.stringify({
                status: "ERROR",
                message: e.message
            });
        }
    }

    function doGet() {
        return JSON.stringify({
            message: "Restlet is working fine"
        });
    }

    return {
        get: doGet,
        post: doPost
    };
});
