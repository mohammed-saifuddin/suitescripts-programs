/**
* @NApiVersion 2.1
* @NScriptType Suitelet
*/
  define(['N/ui/serverWidget', 'N/search', 'N/url'], 
(serverWidget, search, url) => {
 
    const safeValue = (val) => {
        return (val !== null && val !== undefined && val!=='') ? val.toString() : '';
    };
 
    const onRequest = (context) => {
 
        const request = context.request;
        const response = context.response;
 
        let pageIndex = parseInt(request.parameters.page) || 0;
 
       
        const form = serverWidget.createForm({
            title: 'Transaction Search'
        });
 
        const fDate = form.addField({
            id: 'custpage_date',
            type: serverWidget.FieldType.DATE,
            label: 'Transaction Date'
        });
 
        const fTranId = form.addField({
            id: 'custpage_tranid',
            type: serverWidget.FieldType.TEXT,
            label: 'Transaction Name/ID'
        });
 
        const fStatus = form.addField({
            id: 'custpage_status',
            type: serverWidget.FieldType.TEXT,
            label: 'Status'
        });
 
        form.addSubmitButton('Search');
 
       
        const sublist = form.addSublist({
            id: 'custpage_results',
            type: serverWidget.SublistType.LIST,
            label: 'Results'
        });
 
        sublist.addField({ id:'date', label:'Date', type:serverWidget.FieldType.TEXT });
        sublist.addField({ id:'name', label:'Name', type:serverWidget.FieldType.TEXT });
        sublist.addField({ id:'status', label:'Status', type:serverWidget.FieldType.TEXT });
        sublist.addField({ id:'link', label:'View', type:serverWidget.FieldType.URL });
 
        
        const filters = [];
 
        if (request.parameters.custpage_date)
            filters.push(['trandate','on',request.parameters.custpage_date]);
 
        if (request.parameters.custpage_tranid)
            filters.push('AND',['tranid','contains',request.parameters.custpage_tranid]);
 
        if (request.parameters.custpage_status)
            filters.push('AND',['status','contains',request.parameters.custpage_status]);
 
        const tranSearch = search.create({
            type: search.Type.TRANSACTION,
            filters: filters,
           columns: [
   search.createColumn({ name:'trandate' }),
   search.createColumn({ name:'tranid' }),
   search.createColumn({ name:'status' }),
   search.createColumn({ name:'internalid' }),
   search.createColumn({ name:'recordtype' })
]
        });
 
        const paged = tranSearch.runPaged({ pageSize: 100 });
        const page = paged.fetch({ index: pageIndex });
 
        let i = 0;
        page.data.forEach(r => {
 
            const recUrl = url.resolveRecord({
                recordType: r.getValue('recordtype'),
                recordId: r.getValue('internalid')
            });
 
        const dateVal   = safeValue(r.getValue('trandate'));
const nameVal   = safeValue(r.getValue('tranid'));
const statusVal = safeValue(r.getText('status'));
const linkVal   = safeValue(recUrl);
 
if (dateVal)
    sublist.setSublistValue({ id:'date', line:i, value: dateVal });
 
if (nameVal)
    sublist.setSublistValue({ id:'name', line:i, value: nameVal });
 
if (statusVal)
    sublist.setSublistValue({ id:'status', line:i, value: statusVal });
 
if (linkVal)
    sublist.setSublistValue({ id:'link', line:i, value: linkVal });
 
            i++;
        });
 
    
if (pageIndex > 0)
    form.addButton({
        id: 'prev',
        label: 'Previous',
        functionName: "window.location.href='?page=" + (pageIndex - 1) + "'"
    });
 
if (pageIndex < paged.pageRanges.length - 1)
    form.addButton({
        id: 'next',
        label: 'Next',
        functionName: "window.location.href='?page=" + (pageIndex + 1) + "'"
    });
 
        response.writePage(form);
    };
 
    return { onRequest };
});