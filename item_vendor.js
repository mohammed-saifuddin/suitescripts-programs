/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */
define(['N/search'], function(search) {
    function get(context) {
        var vendorId = context.vendorId; // Passed as a URL parameter

        var itemFilters = [
            ['vendor', 'anyof', vendorId]
        ];
        var itemColumns = [{
            name: 'internalid'
        }, {
            name: 'itemid'
        }];

        var itemSearch = search.create({
            type: search.Type.ITEM,
            filters: itemFilters,
            columns: itemColumns
        });

        var items = [];
        itemSearch.run().each(function(result) {
            items.push({
                id: result.getValue({
                    name: 'internalid'
                }),
                name: result.getValue({
                    name: 'itemid'
                })
            });
            return true;
        });

        return items; // Returns JSON response
    }

    return {
        'get': get
    };
});
