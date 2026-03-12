/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget','N/url'], (serverWidget,url) => {

const onRequest = (context) => {

var form = serverWidget.createForm({ title:' ' });

var htmlField = form.addField({
    id:'custpage_html',
    type:serverWidget.FieldType.INLINEHTML,
    label:'HTML'
});

const projectUrl = url.resolveScript({
scriptId: 'customscript2877',
deploymentId: 'customdeploy1',
returnExternalUrl: true
});

htmlField.defaultValue = `

<style>
html, body{
margin:0 !important;
padding:0 !important;
width:100%;
height:100%;
}

/* remove netsuite borders */

#custpage_html_fs,
#custpage_html_fs_lbl,
#custpage_html_fs_val,
#custpage_html,
.uir-field-wrapper,
.uir-field,
.uir-page-body-content,
#main_form{
border:none !important;
box-shadow:none !important;
background:transparent !important;
padding:0 !important;
margin:0 !important;
}

#custpage_html_fs legend{
display:none !important;
}

/* layout */

body{
font-family:Arial;
margin:0;
}

.content{
padding:0px;
}

/* table */

table{
width:100%;
border-collapse:collapse;
}

th{
background:#6f2da8;
color:white;
padding:10px;
border:0px solid #ccc;
}

td{
padding:10px;
border:0px solid #ccc;
text-align:center;
}

/* plus button */

.addBtn{
font-size:35px;
cursor:pointer;
color:#3c5c8a;
margin-bottom:10px;
background:none;
border:none;
display:flex;
align-item:left;
padding:0;
}

</style>

<div class="content">

<iframe id="mainFrame" style="width:100%;height:500px;border:none;display:none;"></iframe>

<div id="homeContent">

<button class="addBtn" type="button" onclick="listProjects()">+</button>

<table>

<tr>
<th style="border:1px solid #ccc;">Project ID</th>
<th style="border:1px solid #ccc;">Customer</th>
<th style="border:1px solid #ccc;">RW Product</th>
<th style="border:1px solid #ccc;">Status</th>
<th style="border:1px solid #ccc;">Total Tickets</th>
<th style="border:1px solid #ccc;">Open</th>
<th style="border:1px solid #ccc;">Closed</th>
</tr>

<tr>
<td style="border:1px solid #ccc;">RWP0001</td>
<td style="border:1px solid #ccc;">SETRA</td>
<td style="border:1px solid #ccc;">PC ON AP</td>
<td style="border:1px solid #ccc;">COMPLETED</td>
<td style="border:1px solid #ccc;">5</td>
<td style="border:1px solid #ccc;">0</td>
<td style="border:1px solid #ccc;">5</td>
</tr>

<tr>
<td style="border:1px solid #ccc;">RWP0002</td>
<td style="border:1px solid #ccc;">TEDCO</td>
<td style="border:1px solid #ccc;">PC ON AP</td>
<td style="border:1px solid #ccc;">IN PROGRESS</td>
<td style="border:1px solid #ccc;">2</td>
<td style="border:1px solid #ccc;">1</td>
<td style="border:1px solid #ccc;">1</td>
</tr>

<tr>
<td style="border:1px solid #ccc;">RWP0003</td>
<td style="border:1px solid #ccc;">TEDCO</td>
<td style="border:1px solid #ccc;">PC ON AR</td>
<td style="border:1px solid #ccc;">IN PROGRESS</td>
<td style="border:1px solid #ccc;">2</td>
<td style="border:1px solid #ccc;">1</td>
<td style="border:1px solid #ccc;">1</td>
</tr>

<tr>
<td style="border:1px solid #ccc;">RWP0004</td>
<td style="border:1px solid #ccc;">TEDCO</td>
<td style="border:1px solid #ccc;">ADV BUDGETING</td>
<td style="border:1px solid #ccc;">IN PROGRESS</td>
<td style="border:1px solid #ccc;">2</td>
<td style="border:1px solid #ccc;">1</td>
<td style="border:1px solid #ccc;">1</td>
</tr>

<tr>
<td style="border:1px solid #ccc;">RWP0005</td>
<td style="border:1px solid #ccc;">TEDCO</td>
<td style="border:1px solid #ccc;">MATERIAL REQUEST</td>
<td style="border:1px solid #ccc;">IN PROGRESS</td>
<td style="border:1px solid #ccc;">2</td>
<td style="border:1px solid #ccc;">1</td>
<td style="border:1px solid #ccc;">1</td>
</tr>

</table>

</div>
</div>

<script>

var projectUrl = '${projectUrl}';

function listProjects(){
alert("list of projects");
document.getElementById("homeContent").style.display = "none";

document.getElementById("mainFrame").style.display = "block";

document.getElementById("mainFrame").src = projectUrl;

}

</script>
`;

context.response.writePage(form);

};

return { onRequest };

});