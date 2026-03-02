/**
 * @NApiVersion 2.x
 * @NScriptType Portlet
 */

define(['N/ui/serverWidget'], function (serverWidget) {

    function render(params) {

        var portlet = params.portlet;
        portlet.title = 'Simple Input Portlet';

        var field = portlet.addField({
            id: 'custpage_text',
            type: serverWidget.FieldType.TEXT,
            label: 'Enter Text'
        });

        field.defaultValue = 'Hello';
    }

    return {
        render: render
    };
});
