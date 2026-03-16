/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget','N/record','N/search'], (serverWidget,record,search) => {

const onRequest = (context) => {

if(context.request.method === 'GET'){

var form = serverWidget.createForm({ title: ' ' });

form.hideNavBar = true;
var empOptions = '<option value="">Select</option>';

var empSearch = search.create({
    type: 'employee',
    filters: [
        ['isinactive','is','F']
    ],
    columns: ['internalid','entityid']
});

empSearch.run().each(function(result){

    var id = result.getValue('internalid');
    var name = result.getValue('entityid');

    empOptions += '<option value="'+id+'">'+name+'</option>';

    return true;
});

var html = form.addField({
    id: 'custpage_html',
    type: serverWidget.FieldType.INLINEHTML,
    label: ' '
});

html.defaultValue = `

<style>

body{
margin:0 !important;
}

#div__body{
padding:0 !important;
margin:0 !important;
}

.header{
width:calc(100% + 40px);
margin-left:-20px;
margin-top:-20px;
}

.portal-header{
width:calc(100% + 40px);
margin-left:-20px;
margin-top:-20px;
}

.uir-page-title{
display:none !important;
}

.uir-page-main,
.uir-page-wrapper,
.uir-page-body{
border:none !important;
box-shadow:none !important;
background:white !important;
padding:0 !important;
}

.main-container{
font-family:Arial;
}

.form-grid{
display:grid;
grid-template-columns:200px 1fr 200px 1fr;
gap:10px;
align-items:center;
margin-bottom:25px;
}

.form-grid label{
font-weight:600;
}

.form-grid input,
.form-grid select{
width:100%;
padding:6px;
border:1px solid #ccc;
border-radius:3px;
}

.product-table{
width:100%;
border-collapse:collapse;
}

.product-table th{
background:#6f3ba2;
color:white;
padding:10px;
border:1px solid #ccc;
}

.product-table td{
border:1px solid #ccc;
padding:8px;
}

.product-table input{
width:100%;
padding:6px;
border:1px solid #ccc;
}

.savebtn{
margin-top:20px;
padding:10px 20px;
background:#6f3ba2;
color:white;
border:none;
cursor:pointer;
}

</style>

<form method="POST">

<div class="main-container">

<div class="form-grid">

<label>Customer Name</label>
<input type="text" name="customername">

<label>Proforma Invoice</label>
<input type="text" name="invoice">

<label>Account Manager</label>
<select name="accountmanager">
${empOptions}
</select>

<label>Scheduled UAT Date</label>
<input type="date" name="uatdate">

<label>Project Manager</label>
<select name="projectmanager">
${empOptions}
</select>

<label>Scheduled Go Live Date</label>
<input type="date" name="golivedate">

<label>ERP</label>
<select name="erp">
<option value="1">Netsuite</option>
<option value="2">SAP</option>
<option value="3">Oracle</option>
</select>

<label>Direct Project</label>
<select name="directproject">
<option value="">Select</option>
<option value="1">Yes</option>
<option value="2">No</option>
</select>

<label>Project Type</label>
<select name="projecttype">
<option value="">Select</option>
<option value="1">Internal</option>
<option value="2">Implementation</option>

</select>

<label>Status</label>
<select name="status">
<option value="">Select</option>
<option value="1">New</option>
<option value="2">Planning</option>
<option value="3">In Progress</option>
<option value="4">Completed</option>
</select>

</div>

<table class="product-table">

<tr>
<th>RW Product</th>
<th>Additional Comments</th>
<th>RW Project Manager</th>
<th>Functional Consultant</th>
<th>Technical Consultant</th>
<th>Expected UAT Date</th>
<th>Expected Go Live Date</th>
</tr>

<tr>
<td>
<select name="rwproduct">
<option value="">Select</option>
<option value="1">Reachware</option>
<option value="2">CRM</option>
<option value="3">Analytics</option>
</select>
</td>
<td><input type="text" name="comments">
</td>
<td>
<select name="rwpm">
${empOptions}
</select>
</td>
<td>
<select name="functional">
${empOptions}
</select>
</td>
<td>
<select name="technical">
${empOptions}
</select>
</td>
<td><input type="date" name="expuat"></td>
<td><input type="date" name="expgolive"></td>
</tr>

</table>

<button type="submit" class="savebtn">Save</button>

</div>

</form>
`;

context.response.writePage(form);

}

/* POST METHOD → SAVE RECORD */

else{

var req = context.request;

var customername = req.parameters.customername;
var invoice = req.parameters.invoice;
var accountmanager = req.parameters.accountmanager;
var uatdate = req.parameters.uatdate;
var projectmanager = req.parameters.projectmanager;
var golivedate = req.parameters.golivedate;
var erp = req.parameters.erp;
var directproject = req.parameters.directproject;
var projecttype = req.parameters.projecttype;
var status = req.parameters.status;

var rwproduct = req.parameters.rwproduct;
var comments = req.parameters.comments;
var rwpm = req.parameters.rwpm;
var functional = req.parameters.functional;
var technical = req.parameters.technical;
var expuat = req.parameters.expuat;
var expgolive = req.parameters.expgolive;

/* CREATE CUSTOM RECORD */

var rec = record.create({
type:'customrecord_rw_portal_access'
});

var rec1=record.create({
    type:'customrecord_rw_portal_access2'
})
rec.setValue({
fieldId:'custrecord_rw_portal_customername',
value:customername
});

rec.setValue({
fieldId:'custrecord_rw_portal_proformainvoice',
value:invoice
});

rec.setValue({
fieldId:'custrecord_rw_portal_accountmanager',
value:accountmanager
});

rec.setValue({
fieldId:'custrecord_rw_portal_projectmanager',
value:projectmanager
});

rec.setValue({
fieldId:'custrecord_rw_portal_status',
value:status
});

rec.setValue({
fieldId:'custrecord_rw_portal_erp',
value:erp
});
// rec.setValue({
// fieldId:'custrecord_rw_portal_scheduleduatdate',
// value:uatdate
// });
if(uatdate){
rec.setValue({
fieldId:'custrecord_rw_portal_scheduleduatdate',
value:new Date(uatdate)
});
}
// rec.setValue({
// fieldId:'custrecord_rw_portal_scheduledgolivedate',
// value:golivedate
// });

if(golivedate){
rec.setValue({
fieldId:'custrecord_rw_portal_scheduledgolivedate',
value:new Date(golivedate)
});
}
rec.setValue({
fieldId:'custrecord_rw_portal_directproject',
value:directproject
});
rec.setValue({
fieldId:'custrecord_rw_portal_projecttype',
value:projecttype
});
var parentId = rec.save();
/* PRODUCT DETAILS */
rec1.setValue({
fieldId:'customrecord_rw_portal_access',
value:parentId
});
rec1.setValue({
fieldId:'custrecord_rw_portal_rwproduct',
value:rwproduct
});

rec1.setValue({
fieldId:'custrecord_rw_portal_additionalcomments',
value:comments
});
rec1.setValue({
fieldId:'custrecord_rw_rwprojectmanager',
value:rwpm
});
rec1.setValue({
fieldId:'custrecord_rw_portal_funcconsultant',
value:functional
});

rec1.setValue({
fieldId:'custrecord_rw_portal_techconsultant',
value:technical
});

// rec1.setValue({
//     fieldId:'custrecord_rw_portal_lineexpecteduatdate',
//     value:expuat
// });
if(expuat){
rec1.setValue({
    fieldId:'custrecord_rw_portal_lineexpecteduatdate',
    value:new Date(expuat)
});
}
// rec1.setValue({
//     fieldId:'custrecord_rw_portal_lineexptgolivedate',
//     value:expgolive
// });
if(expgolive){
rec1.setValue({
    fieldId:'custrecord_rw_portal_lineexptgolivedate',
    value:new Date(expgolive)
});
}

rec1.save();
context.response.write("Project Record Saved Successfully");
alert("Project record saved succesffully");
}

};

return {onRequest};

});