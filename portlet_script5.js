/**
 * @NApiVersion 2.x
 * @NScriptType Portlet
 */

define(['N/runtime'], function (runtime) {

    function render(params) {

        var portlet = params.portlet;
        var user = runtime.getCurrentUser();

        portlet.title = 'Welcome';

        portlet.html =
            '<b style="color:green">User:</b> ' + user.name +
            '<br><b>Role:</b> ' + user.role;
    }

    return {
        render: render
    };
});
