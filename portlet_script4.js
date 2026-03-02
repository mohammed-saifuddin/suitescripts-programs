/**
 * @NApiVersion 2.x
 * @NScriptType Portlet
 */

define(['N/search'], function (search) {

    function render(params) {

        var portlet = params.portlet;
        portlet.title = 'Customer KPI';

        var count = 0;

        search.create({
            type: search.Type.CUSTOMER,
            filters: [['isinactive', 'is', 'F']]
        }).run().each(function () {
            count++;
            return true;
        });

        portlet.html =
            '<h2 style="color:green">' + count + '</h2>' +
            '<p>Active Customers</p>';
    }

    return {
        render: render
    };
});
