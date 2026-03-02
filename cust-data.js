/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 */
define(['N/search', 'N/log'], function (search, log) {

    function getInputData() {
        return search.create({
            type: search.Type.CUSTOMER,
            columns: ['internalid', 'entityid']
        });
    }

    function map(context) {
        var data = JSON.parse(context.value);

        log.debug({
            title: 'Customer Found',
            details: 'ID: ' + data.id + 
                     ', Name: ' + data.values.entityid
        });
    }

    return {
        getInputData: getInputData,
        map: map
    };
});
