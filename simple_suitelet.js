
    /**
     * @NApiVersion 2.x
     * @NScriptType Suitelet
     */
    define(['N/ui/serverWidget', 'N/format'], function (ui, format) {

        function onRequest(context) {

            if (context.request.method === 'GET') {

                var request = context.request;

                var eventDate = request.parameters.date || '';
                var eventTitle = request.parameters.title || '';
                var amenity=request.parameters.amenity || '';
                
                var form = ui.createForm({
                    title: 'Booking Form'
                });
                var css = form.addField({
        id: 'custpage_css',
        type: ui.FieldType.INLINEHTML,
        label: 'css'
    });

    css.defaultValue =
        '<style>' +
        '  body { padding: 20px !important; font-family: Arial, sans-serif; }' +

        '  table.uir-table, table.uir-list { width: 100% !important; }' +

        '  td.uir-field-wrapper { padding: 10px 0 !important; }' +

        '  .uir-field-wrapper label { font-weight: 600; margin-bottom: 4px; display: block; }' +

        '  input, textarea, select {' +
        '    width: 100% !important;' +
        '    padding: 8px !important;' +
        '    box-sizing: border-box;' +
        '  }' +

        '  textarea { min-height: 120px; }' +
        '</style>';
                var titleField = form.addField({
                    id: 'custpage_title',
                    type: ui.FieldType.TEXT,
                    label: 'Event Title'
                });

                titleField.defaultValue = decodeURIComponent(eventTitle);

                var dateField = form.addField({
                    id: 'custpage_date',
                    type: ui.FieldType.DATETIMETZ,
                    label: 'Event Time'
                });

            if (eventDate) {

        var utcDate = new Date(parseInt(eventDate));

        
        var utcTime = utcDate.getTime() + (utcDate.getTimezoneOffset() * 60000);

        
        var istTime = new Date(utcTime + (330 * 60000));

        var formattedDate = format.format({
            value: istTime,
            type: format.Type.DATETIMETZ
        });

        dateField.defaultValue = formattedDate;
    }

                var evntAmenity=form.addField({
                    id: 'custpage_amenity',
                    type: ui.FieldType.TEXT,
                    label:'amenity'
                });
                evntAmenity.defaultValue = decodeURIComponent(amenity);
                form.addSubmitButton({
                    label: 'Save'
                });

                context.response.writePage(form);
            }
        }

        return { onRequest: onRequest };
    });
