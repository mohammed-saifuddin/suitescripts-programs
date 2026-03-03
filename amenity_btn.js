/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'], (ui) => {

    const onRequest = (context) => {

        if (context.request.method === 'GET') {

            const params = context.request.parameters;
            const date = params.date || '';
            const title = params.title || '';
            const amenity = params.amenity || '';

            const form = ui.createForm({
                title: ' '
            });

            /* =========================
               MODAL CONTENT
            ========================== */

            const content = form.addField({
                id: 'custpage_content',
                type: ui.FieldType.INLINEHTML,
                label: 'Content'
            });

            const modalTitle = title ? 'Reschedule Booking' : 'Booking Actions';

            content.defaultValue =
                '<style>' +

                /* Remove NetSuite spacing */
                'td.uir-field-wrapper { padding:0 !important; }' +
                'table.uir-table-layout { width:100% !important; }' +

                /* Center container */
                '.modal-wrapper {' +
                '   display:flex;' +
                '   flex-direction:column;' +
                '   align-items:center;' +
                '   justify-content:center;' +
                '   padding:50px 20px;' +
                '   text-align:center;' +
                '}' +

                '.modal-title {' +
                '   font-size:22px;' +
                '   font-weight:600;' +
                '   margin-bottom:40px;' +
                '}' +

                '.btn-group {' +
                '   display:flex;' +
                '   gap:20px;' +
                '   justify-content:center;' +
                '}' +

                '.action-btn {' +
                '   padding:14px 28px;' +
                '   font-size:15px;' +
                '   font-weight:600;' +
                '   border:none;' +
                '   border-radius:6px;' +
                '   cursor:pointer;' +
                '   min-width:160px;' +
                '}' +

                '.new-btn {' +
                '   background:#2A3A76;' +
                '   color:#ffffff;' +
                '}' +

                '.reschedule-btn {' +
                '   background:#8e24aa;' +
                '   color:#ffffff;' +
                '}' +

                '.action-btn:hover {' +
                '   opacity:0.9;' +
                '}' +

                '</style>' +

                '<div class="modal-wrapper">' +
                '<div class="modal-title">' + modalTitle + '</div>' +

                '<div class="btn-group">' +
                '<button type="button" class="action-btn new-btn" id="new-btn" onclick="goToNew()">➕ New Booking</button>' +
                '<button type="button" class="action-btn reschedule-btn" onclick="goToReschedule()">🔄 Reschedule</button>' +
                '</div>' +

                '</div>'+
'<script>' +

'var selectedDate = "' + date + '";' +
'var selectedTitle = "' + title + '";' +
'var selectedAmenity = "' + amenity + '";' +

'function goToNew(){' +
'   var frame = window.parent.document.getElementById("nsFrame");' +
'   if(frame){' +
'       frame.src = "/app/site/hosting/scriptlet.nl?script=1000&deploy=1"' +
'           + "&mode=new"' +
'           + "&return=action"' +
'           + "&ifrmcntnr=T"' +


'   }' +
'}' +

'function goToReschedule(){' +
'   var frame = window.parent.document.getElementById("nsFrame");' +
'   if(frame){' +
'       frame.src = "/app/site/hosting/scriptlet.nl?script=1000&deploy=1"' +
'           + "&mode=reschedule"' +
'           + "&return=action"' +
'           + "&ifrmcntnr=T"' +
'           + "&date=" + selectedDate' +
'           + "&title=" + encodeURIComponent(selectedTitle)' +
'           + "&amenity=" + encodeURIComponent(selectedAmenity);' +
'   }' +
'}' +

'</script>';
            

            const dateFld = form.addField({
                id: 'custpage_date',
                type: ui.FieldType.TEXT,
                label: 'Date'
            });
            dateFld.updateDisplayType({ displayType: ui.FieldDisplayType.HIDDEN });
            dateFld.defaultValue = date;

            const titleFld = form.addField({
                id: 'custpage_title',
                type: ui.FieldType.TEXT,
                label: 'Title'
            });
            titleFld.updateDisplayType({ displayType: ui.FieldDisplayType.HIDDEN });
            titleFld.defaultValue = title;

            const amenityFld = form.addField({
                id: 'custpage_amenity',
                type: ui.FieldType.TEXT,
                label: 'Amenity'
            });
            amenityFld.updateDisplayType({ displayType: ui.FieldDisplayType.HIDDEN });
            amenityFld.defaultValue = amenity;

           // form.clientScriptModulePath = './amenity_action_btn.js';

            context.response.writePage(form);
        }
    };

    return { onRequest };
});