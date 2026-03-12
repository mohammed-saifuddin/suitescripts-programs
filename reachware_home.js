/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget','N/url'], (serverWidget,url) => {

const onRequest = (context) => {
var logout = context.request.parameters.logout || '';
var empId = context.request.parameters.empid;
var email = context.request.parameters.email;
if(logout === 'T'){
    // user logged out
    // just show login page and stop any redirect
    const loginUrl = url.resolveScript({
scriptId: 'customscript2872',
deploymentId: 'customdeploy1',
returnExternalUrl: true,
 params: {
        empid: empId,
        email: email
    }
});
log.debug("Logout", "User returned to login page");
context.response.write(
"<html><script>alert('Employee not found');window.location.href='" + loginUrl + "';</script></html>"
);
return;
}
const form = serverWidget.createForm({ title: ' ' });

const htmlField = form.addField({
id: 'custpage_dashboard',
type: serverWidget.FieldType.INLINEHTML,
label: 'Dashboard'
});


const loginUrl = url.resolveScript({
scriptId: 'customscript2872',
deploymentId: 'customdeploy1',
returnExternalUrl: true,
 params: {
        empid: empId,
        email: email
    }
});





const projectUrl = url.resolveScript({
scriptId: 'customscript2876',
deploymentId: 'customdeploy5',
returnExternalUrl: true
});

let html = `

<style>

html, body {
margin:0 !important;
padding:0 !important;
}

#main_form {
padding:0 !important;
margin:0 !important;
}

.uir-page-body-content {
padding:0 !important;
}

.uir-page-body {
padding:0 !important;
}

body{
font-family: Arial;
margin:0;
}

.header{
background:#6b3fa0;
color:white;
padding:15px;
text-align:center;
font-size:18px;
position:relative;
}

.menu-icon{
position:absolute;
left:15px;
top:12px;
font-size:22px;
cursor:pointer;
}

.logout{
position:absolute;
right:20px;
top:12px;
background:#6b3fa0;
border:1px solid white;
padding:6px 15px;
color:white;
cursor:pointer;
}

.container{
display:flex;
}

.sidebar{
width:0;
overflow:hidden;
background:#1667a5;
color:white;
min-height:400px;
transition:0.3s;
}

.menu{
padding:12px;
border-bottom:1px solid #0c4f82;
cursor:pointer;
}

.menu:hover{
background:#0f4e80;
}

.content{
flex:1;
padding:20px;
}

.stats-header{
display:grid;
grid-template-columns: repeat(6,1fr);
background:#6b3fa0;
color:white;
}

.stats-header div{
padding:10px;
text-align:center;
border-right:1px solid white;
}

.stats-values{
display:grid;
grid-template-columns: repeat(6,1fr);
text-align:center;
}

.stats-values div{
padding:20px;
border:1px solid #ccc;
font-size:20px;
}

</style>

<div class="header">

<div class="menu-icon" onmouseover="openMenu()">☰</div>

Reachware Project Management Portal

<button class="logout" onclick="logout()">Logout</button>

</div>

<div class="container">

<div class="sidebar" id="sidebar" onmouseleave="closeMenu()">

<div class="menu" onclick="openHome()">Home</div>
<div class="menu" onclick="openProjects()">Projects</div>
<div class="menu">Tickets</div>

</div>

<div class="content">

<iframe id="mainFrame" style="width:100%;height:500px;border:none;display:none;"></iframe>

<div id="homeContent">

<div class="stats-header">
<div>Total Projects</div>
<div>Open Projects</div>
<div>Total Tickets</div>
<div>Open Tickets</div>
<div>In Progress</div>
<div>Assigned Tickets</div>
</div>

<div class="stats-values">
<div>6</div>
<div>2</div>
<div>24</div>
<div>6</div>
<div>3</div>
<div>1</div>
</div>

</div>

</div>

</div>

<script>

function openMenu(){
document.getElementById("sidebar").style.width="180px";
}

function closeMenu(){
document.getElementById("sidebar").style.width="0";
}

var projectUrl = '${projectUrl}';

function openProjects(){

document.getElementById("homeContent").style.display = "none";

document.getElementById("mainFrame").style.display = "block";

document.getElementById("mainFrame").src = projectUrl;

}

function openHome(){

document.getElementById("mainFrame").style.display = "none";

document.getElementById("mainFrame").src = "";

document.getElementById("homeContent").style.display = "block";

}

/* LOGOUT FUNCTION */

function logout(){

if(confirm("Are you sure you want to logout?")){

window.location.replace("${loginUrl}?logout=T");

}

}

</script>

`;

htmlField.defaultValue = html;

context.response.writePage(form);

};

return { onRequest };

});