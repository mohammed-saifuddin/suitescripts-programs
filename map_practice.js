/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 */
define([], function () {

    function getInputData() {
        // Step 1: Input data
        return [1, 2, 3, 4, 5];
    }

    function map(context) {
        // Step 2: Runs once per value
        var number = context.value;

        context.write({
            key: number,
            value: number
        });
    }

    function reduce(context) {
        // Step 3: Runs once per key
        log.debug('Number', context.key);
    }

    function summarize(summary) {
        // Step 4: Final stage
        log.audit('Done', 'Map Reduce completed');
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    };
});
