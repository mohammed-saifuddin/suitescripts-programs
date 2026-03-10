/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget','N/record','N/url','N/search'], 
(serverWidget,record,url,search) => {

const onRequest = (context) => {

if(context.request.method === 'GET'){

let empId = context.request.parameters.empid;
let email = context.request.parameters.email;

log.debug("All Params", context.request.parameters);
log.debug("Emp ID received", empId);
log.debug("Email received", email);

/* If empId not passed, find using email */
if(!empId && email){

var empSearch = search.create({
    type: search.Type.EMPLOYEE,
    filters:[
        ['email','is',email]
    ],
    columns:['internalid']
});

var result = empSearch.run().getRange({
    start:0,
    end:1
});

if(result.length > 0){
    empId = result[0].getValue('internalid');
}
}

log.debug("Final empId in GET", empId);

const form = serverWidget.createForm({
title:' ',
hideNavBar:true
});

const htmlField = form.addField({
id:'custpage_html',
type:serverWidget.FieldType.INLINEHTML,
label:' '
});

let html = `

<style>
body{
font-family:Arial;
}

.header{
display:flex;
border:1px solid #2d6fa3;
}

.portal{
flex:1;
background:#6b3fa0;
color:white;
text-align:center;
padding:12px;
font-size:18px;
}

.login-box{
width:350px;
margin:80px auto;
}

.row{
display:flex;
margin-bottom:15px;
}

.row label{
width:120px;
font-size:14px;
}

.row input{
width:200px;
padding:6px;
border:1px solid black;
}

.btn{
background:#1c6ea4;
color:white;
padding:8px 20px;
border:none;
cursor:pointer;
}
</style>

<div class="header">
<div class="portal">
Reachware Portal Password Setup
</div>
</div>

<div class="login-box">

<form method="POST" onsubmit="return validate()">

<input type="hidden" name="empid" value="${empId || ''}">
<input type="hidden" name="email" value="${email || ''}">

<div class="row">
<label>Email</label>
<input type="text" id="email" name="email" value="${email || ''}">
</div>

<div class="row">
<label>Password</label>
<input type="password" name="password" id="password">
</div>

<div class="row">
<label>Confirm Password</label>
<input type="password" name="confirmpassword" id="confirmpassword">
</div>
<button class="btn" type="submit" onclick="return validate()">Confirm</button>

</form>

</div>

<script>

function validate(){

var email = document.getElementById("email").value.trim();
var p1 = document.getElementById("password").value.trim();
var p2 = document.getElementById("confirmpassword").value.trim();

if(email === ""){
    alert("Email is mandatory");
    return false;
}

if(p1 === "" || p2 === ""){
    alert("Password and Confirm Password are required");
    return false;
}

if(p1.length < 8){
    alert("Password must be at least 8 characters");
    return false;
}

var regex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&]).+$/;

if(!regex.test(p1)){
    alert("Password must contain letters, numbers and special characters");
    return false;
}

if(p1 !== p2){
    alert("Passwords do not match");
    return false;
}

return true;

}

</script>
`;

htmlField.defaultValue = html;

context.response.writePage(form);

}

/* POST METHOD */

else{

let email = context.request.parameters.email || '';
let empId = context.request.parameters.empid || '';
let password = context.request.parameters.password || '';
let confirmPassword = context.request.parameters.confirmpassword || '';

log.debug("Email parameter", email);
log.debug("empId parameter", empId);
log.debug("Password value", password);

/* If empId missing, search by email */
if(!empId && email){

var empSearch = search.create({
type: search.Type.EMPLOYEE,
filters:[
['email','is',email]
],
columns:['internalid']
});

var result = empSearch.run().getRange({
start:0,
end:1
});

if(result.length > 0){
empId = result[0].getValue('internalid');
}

}

log.debug("Final empId", empId);

if(!empId){
var loginUrl = url.resolveScript({
    scriptId:'customscript2872',
    deploymentId:'customdeploy1',
    returnExternalUrl:true
});

context.response.write(
"<html><script>alert('Employee not found');window.location.href='" + loginUrl + "';</script></html>"
);
return;
}

if(password !== confirmPassword){
context.response.write("<h3>Passwords do not match</h3>");
return;
}

/* Update Password */

record.submitFields({
type: record.Type.EMPLOYEE,
id: empId,
values:{
custentity_rw_dms_portalpassword: password
},
options:{
ignoreMandatoryFields:true
}
});

log.debug("Password Updated", empId);

/* Redirect to Home */

var homeUrl = url.resolveScript({
scriptId:'customscript2874',
deploymentId:'customdeploy3',
returnExternalUrl:true
});

context.response.write(
"<html><script>window.location.href='"+homeUrl+"'</script></html>"
);

}

};

return {onRequest};

});