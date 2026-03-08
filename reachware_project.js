/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget'], (serverWidget) => {

const onRequest = (context) => {

var form = serverWidget.createForm({ title:' ' });

var htmlField = form.addField({
    id:'custpage_html',
    type:serverWidget.FieldType.INLINEHTML,
    label:'HTML'
});

htmlField.defaultValue = `

<style>
#custpage_html_fs {
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
}

#custpage_html_fs legend {
    display: none !important;
}
    
#custpage_html_fs,
#custpage_html_fs_lbl,
#custpage_html_fs_val,
#custpage_html,
.uir-field-wrapper,
.uir-field,
.uir-page-body-content,
#main_form {
    border: none !important;
    box-shadow: none !important;
    background: transparent !important;
    padding: 0 !important;
    margin: 0 !important;
}
#main_form,
.uir-page-body-content,
.uir-field-wrapper,
.uir-field {
    border: none !important;
    box-shadow: none !important;
}
    table {
    border-collapse: collapse;
    width: 100%;
}
body{
    font-family:Arial;
    margin:0;
}

.content{
    padding:20px;
}

table{
    width:100%;
    border-collapse:collapse;
}

th{
    background:#6f2da8;
    color:white;
    padding:10px;
    border:1px solid #ccc;
}

td{
    padding:10px;
    border:1px solid #ccc;
    text-align:center;
}

.addBtn{
    font-size:35px;
    cursor:pointer;
    color:#3c5c8a;
    margin-bottom:10px;
}
.content{
    border:none;
}

.container{
    border:none;
}
    table{
    border-collapse:collapse;
    width:100%;
    border:none;
}

th{
    background:#6b3fa0;
    color:white;
    padding:10px;
    border:1px solid #ddd;
}

td{
    padding:10px;
    border:1px solid #ddd;
    text-align:center;
}
body{
font-family:Arial;
margin:0;
}

.content{
padding:20px;
}

table{
border-collapse:collapse;
width:100%;
}

th{
background:#6f2da8;
color:white;
padding:10px;
border:1px solid #ccc;
}

td{
padding:10px;
border:1px solid #ccc;
text-align:center;
}

.addBtn{
font-size:35px;
cursor:pointer;
color:#3c5c8a;
margin-bottom:10px;
display:flex;
align-item:left;
}

</style>


<div class="content">

<div class="addBtn">+</div>

<table>

<tr>
<th>Project ID</th>
<th>Customer</th>
<th>RW Product</th>
<th>Status</th>
<th>Total Tickets</th>
<th>Open</th>
<th>Closed</th>
</tr>

<tr>
<td>RWP0001</td>
<td>SETRA</td>
<td>PC ON AP</td>
<td>COMPLETED</td>
<td>5</td>
<td>0</td>
<td>5</td>
</tr>

<tr>
<td>RWP0002</td>
<td>TEDCO</td>
<td>PC ON AP</td>
<td>IN PROGRESS</td>
<td>2</td>
<td>1</td>
<td>1</td>
</tr>

<tr>
<td>RWP0003</td>
<td>TEDCO</td>
<td>PC ON AR</td>
<td>IN PROGRESS</td>
<td>2</td>
<td>1</td>
<td>1</td>
</tr>

<tr>
<td>RWP0004</td>
<td>TEDCO</td>
<td>ADV BUDGETING</td>
<td>IN PROGRESS</td>
<td>2</td>
<td>1</td>
<td>1</td>
</tr>

<tr>
<td>RWP0005</td>
<td>TEDCO</td>
<td>MATERIAL REQUEST</td>
<td>IN PROGRESS</td>
<td>2</td>
<td>1</td>
<td>1</td>
</tr>

</table>

</div>

`;

context.response.writePage(form);

};

return { onRequest };

});