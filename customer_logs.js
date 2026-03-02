/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 */
define(['N/search'], function (search) {

    function getInputData() {
        return search.create({
            type: search.Type.CUSTOMER,
            filters: [['isinactive', 'is', 'F']],
            columns: ['entityid']
        });
    }

    function map(context) {
        var result = JSON.parse(context.value);
        var name = result.values.entityid;

        log.debug('Customer Name', name);
    }

    return {
        getInputData: getInputData,
        map: map
    };
});
