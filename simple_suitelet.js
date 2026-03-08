/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'], function (ui) {

    function onRequest(context) {

        if (context.request.method === 'GET') {

            var request = context.request;

           var mode = request.parameters.mode || 'new';

            var eventDate = request.parameters.date || '';
            var eventTitle = request.parameters.title || '';
            var amenity = request.parameters.amenity || '';

            var isReschedule = (mode === 'reschedule');

            var form = ui.createForm({
                title: ' '
            });

            var html = form.addField({
                id: 'custpage_html',
                type: ui.FieldType.INLINEHTML,
                label: ' '
            });

            html.defaultValue =

                '<style>' +

                'body { background:#f4f6f9; }' +

                '.modal-card {' +
                '   width:520px;' +
                '   margin:40px auto;' +
                '   background:#ffffff;' +
                '   padding:30px;' +
                '   border-radius:12px;' +
                '   box-shadow:0 8px 30px rgba(0,0,0,0.08);' +
                '   font-family:Arial, sans-serif;' +
                '}' +

                '.modal-title {' +
                '   text-align:center;' +
                '   font-size:22px;' +
                '   font-weight:600;' +
                '   color:#2A3A76;' +
                '   margin-bottom:25px;' +
                '}' +

                '.form-group {' +
                '   margin-bottom:18px;' +
                '}' +

                '.form-group label {' +
                '   display:block;' +
                '   font-weight:600;' +
                '   margin-bottom:6px;' +
                '   font-size:13px;' +
                '}' +

                '.form-group input {' +
                '   width:100%;' +
                '   padding:8px 10px;' +
                '   border:1px solid #ccc;' +
                '   border-radius:6px;' +
                '   font-size:13px;' +
                '}' +

                '.form-footer {' +
                '   display:flex;' +
                '   justify-content:flex-end;' +
                '   gap:12px;' +
                '   margin-top:25px;' +
                '}' +

                '.btn {' +
                '   padding:8px 18px;' +
                '   border-radius:6px;' +
                '   border:none;' +
                '   font-weight:600;' +
                '   cursor:pointer;' +
                '}' +

                '.btn-cancel {' +
                '   background:#e0e0e0;' +
                '}' +

                '.btn-save {' +
                '   background:#2A3A76;' +
                '   color:#fff;' +
                '}' +

                '</style>' +

                '<div class="modal-card">' +

                '<div class="modal-title">' +
                (isReschedule ? 'Reschedule Booking' : 'New Booking') +
                '</div>' +

                '<form method="POST">' +

                '<div class="form-group">' +
                '<label>Event Title</label>' +
                '<input type="text" name="event_title" value="' + decodeURIComponent(eventTitle) + '" />' +
                '</div>' +

                '<div class="form-group">' +
                '<label>Event Time</label>' +
                '<input type="datetime-local" name="event_time" />' +
                '</div>' +

                '<div class="form-group">' +
                '<label>Amenity</label>' +
                '<input type="text" name="amenity" value="' + decodeURIComponent(amenity) + '" />' +
                '</div>' +

                '<div class="form-footer">' +
                '<button type="button" class="btn btn-cancel" onclick="goBack()">Cancel</button>' +
                '<button type="submit" class="btn btn-save">Save Booking</button>' +
                '</div>' +

                '</form>' +

                '</div>' +

                '<script>' +
                'function closeModal(){' +
                '   if(window.parent){' +
                '       window.parent.document.getElementById("nsModal").style.display="none";' +
                '       window.parent.document.getElementById("nsFrame").src="";' +
                '   }' +
                '}' +

                'var selectedDate = "' + eventDate + '";' +
                'var selectedTitle = "' + eventTitle + '";' +
                'var selectedAmenity = "' + amenity + '";' +

                'function goBack(){' +
                '   if(window.parent){' +
                '       window.parent.document.getElementById("nsFrame").src =' +
                '           "/app/site/hosting/scriptlet.nl?script=2870&deploy=1&ifrmcntnr=T"' +
                '           + "&date=" + selectedDate' +
                '           + "&title=" + encodeURIComponent(selectedTitle)' +
                '           + "&amenity=" + encodeURIComponent(selectedAmenity);' +
                '   }' +
                '}' +

                '</script>';

            context.response.writePage(form);
        }
    }

    return { onRequest: onRequest };
});