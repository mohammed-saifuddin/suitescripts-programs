/**
 * @NApiVersion 2.x
 * @NScriptType WorkflowActionScript
 */
define(['N/record', 'N/email', 'N/runtime'], 
function (record, email, runtime) {

    function onAction(context) {

        var rec = context.newRecord;
        var actionType = context.action; 
        // action value comes from workflow (approve / reject)

        var customerId = rec.id;

        if (actionType === 'approve') {

            // 1️⃣ Set Approved Status
            rec.setValue({
                fieldId: 'custentity_onboarding_status',
                value: 'Approved'
            });

            // 2️⃣ Lock onboarding fields
            lockFields(rec, true);

            // 3️⃣ Send approval email
            sendEmail(
                'Customer Onboarding Approved',
                'Customer onboarding has been approved.',
                runtime.getCurrentUser().id,
                rec.getValue('email')
            );
        }

        if (actionType === 'reject') {

            // 1️⃣ Set Rejected Status
            rec.setValue({
                fieldId: 'custentity_onboarding_status',
                value: 'Rejected'
            });

            // 2️⃣ Unlock onboarding fields
            lockFields(rec, false);

            // 3️⃣ Send rejection email
            sendEmail(
                'Customer Onboarding Rejected',
                'Customer onboarding has been rejected. Please review.',
                runtime.getCurrentUser().id,
                rec.getValue('email')
            );
        }
    }

    // 🔐 Lock / Unlock fields
    function lockFields(rec, lock) {

        var fieldsToLock = [
            'email',
            'phone',
            'subsidiary'
        ];

        fieldsToLock.forEach(function (fld) {
            rec.setField({
                fieldId: fld,
                displayType: lock ? 'disabled' : 'normal'
            });
        });
    }

    // 📧 Email helper
    function sendEmail(subject, body, author, recipient) {

        if (!recipient) return;

        email.send({
            author: author,
            recipients: recipient,
            subject: subject,
            body: body
        });
    }

    return {
        onAction: onAction
    };
});
