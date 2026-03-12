/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget'], (serverWidget) => {

const onRequest = (context) => {

var form = serverWidget.createForm({ title: ' ' });

/* Hide NetSuite Navigation */
form.hideNavBar = true;

var html = form.addField({
    id: 'custpage_html',
    type: serverWidget.FieldType.INLINEHTML,
    label: ' '
});

html.defaultValue = `

<style>

/* Remove NetSuite wrapper borders */

/* remove netsuite page padding */

body{
margin:0 !important;
}

#div__body{
padding:0 !important;
margin:0 !important;
}

/* make header full width */

.header{
width:calc(100% + 40px);
margin-left:-20px;
margin-top:-20px;
}

/* if header container exists */

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

/* Your Form UI */

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

</style>

<div class="main-container">

<div class="form-grid">

<label>Customer Name</label>
<input type="text">

<label>Proforma Invoice</label>
<input type="text">

<label>Account Manager</label>
<input type="text">

<label>Scheduled UAT Date</label>
<input type="date">

<label>Project Manager</label>
<input type="text">

<label>Scheduled Go Live Date</label>
<input type="date">

<label>ERP</label>
<input type="text">

<label>Direct Project</label>
<input type="text">

<label>Project Type</label>
<input type="text">

<label>Status</label>
<select>
<option>New</option>
<option>Planning</option>
<option>In Progress</option>
<option>Completed</option>
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
<td><input type="text"></td>
<td><input type="text"></td>
<td><input type="text"></td>
<td><input type="text"></td>
<td><input type="text"></td>
<td><input type="date"></td>
<td><input type="date"></td>
</tr>

</table>

</div>

`;

context.response.writePage(form);

};

return { onRequest };

});