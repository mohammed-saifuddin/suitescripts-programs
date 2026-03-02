/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define([], function () {

    function saveRecord(context) {

        var rec = context.currentRecord;

        var requiredFields = [
            'email',
            'phone',
            'subsidiary'
        ];

        for (var i = 0; i < requiredFields.length; i++) {
            if (!rec.getValue(requiredFields[i])) {
                alert('Please fill all onboarding mandatory fields');
                return false;
            }
        }
        return true;
    }

    return {
        saveRecord: saveRecord
    };
});
