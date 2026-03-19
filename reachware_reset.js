/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget','N/record','N/url','N/search','N/email','N/runtime','N/crypto'], 
(serverWidget,record,url,search,email,runtime,crypto) => {

const onRequest = (context) => {

if(context.request.method === 'GET'){

var empId = context.request.parameters.empid || '';
var emailId = context.request.parameters.email || '';
var showOtp = context.request.parameters.showotp || '';

log.debug("empId from URL", empId);
log.debug("email from URL", emailId);
const loginUrl = url.resolveScript({
scriptId: 'customscript2872',
deploymentId: 'customdeploy1',
returnExternalUrl: true,
 params: {
        empid: empId,
        email: email
    }
});
/* If empId not passed, find using email */

if(!empId && emailId){

var empSearch = search.create({
type: search.Type.EMPLOYEE,
filters:[
['email','is',emailId]
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

<form method="POST">

<input type="hidden" name="empid" value="${empId}">
<input type="hidden" name="email" value="${emailId}">
<input type="hidden" name="action" id="action">

<div class="row">
<label>Email</label>
<input type="text" value="${emailId}" readonly>
</div>

<div class="row">
<label>Password</label>
<input type="password" name="password" id="password">
</div>

<div class="row">
<label>Confirm Password</label>
<input type="password" name="confirmpassword" id="confirmpassword">
</div>

<div class="row" id="otpRow" style="display:${showOtp=='T'?'flex':'none'};">
<label>Enter OTP</label>
<input type="text" name="otp" id="otp">
</div>
<button class="btn" type="submit" onclick="return confirmReset()">
Confirm
</button>
<button class="btn" type="submit" onclick="setAction('generateotp')">
Generate OTP
</button>



</form>
<div style="border:0.5px solid grey;margin-top:36px;">
<p style="display:flex;justify-content:center;align-item:center;font-size:12px;font-weight:bold;color:green;">Password should have</p>
<p style="display:flex;margin-left:12px;color:red;">1.It should contains atleast 8 character </p>
<p style="display:flex;margin-left:12px;color:red;">2.It should contains special characters @ # $ % & !</p>
<p style="display:flex;margin-left:12px;color:red;">3.It should contains character and numbers Abc 1234</p>
</div>
</div>

<script>

function setAction(val){
document.getElementById("action").value = val;
}

function confirmReset(){

var otpInput = document.getElementById("otp").value;

var storedOtp = sessionStorage.getItem("rw_otp");
var storedEmail = sessionStorage.getItem("rw_email");

var email = document.querySelector("input[name='email']").value;

if(!storedOtp){
alert("Please generate OTP first");
return false;
}

if(email !== storedEmail){
alert("Email session mismatch");
return false;
}


if(otpInput !== storedOtp){
alert("Invalid OTP");
return false;
}

document.getElementById("action").value = "resetpassword";
return true;

}

</script>

`;

htmlField.defaultValue = html;

context.response.writePage(form);

}

/* POST */

else{

let action = context.request.parameters.action || '';
let emailId = context.request.parameters.email || '';
let empId = context.request.parameters.empid || '';
let password = context.request.parameters.password || '';
let confirmPassword = context.request.parameters.confirmpassword || '';
let otp = context.request.parameters.otp || '';

log.debug("Action",action);
log.debug("Email",emailId);
log.debug("EmpId",empId);
log.debug("otp is ",otp);




if(!empId && emailId){

var empSearch = search.create({
type: search.Type.EMPLOYEE,
filters:[
['email','is',emailId]
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



if(action == 'generateotp'){

var generatedOtp = Math.floor(100000 + Math.random() * 900000);

log.debug("Generated OTP",generatedOtp);



record.submitFields({
type:record.Type.EMPLOYEE,
id:empId,
values:{
custentityrw_password_:generatedOtp
},
options:{
ignoreMandatoryFields:true
}
});




email.send({
    author: runtime.getCurrentUser().id,   
    recipients: [emailId],             
    subject: "Reachware Portal OTP",
    body: "Your OTP for password reset is : " + generatedOtp
});


var resetUrl = url.resolveScript({
scriptId:'customscript2873',
deploymentId:'customdeploy2',
returnExternalUrl:true,
params:{
empid:empId,
email:emailId,
showotp:'T'
}
});

context.response.write(`
<html>
<script>

sessionStorage.setItem("rw_otp","${generatedOtp}");
sessionStorage.setItem("rw_email","${emailId}");

window.location.href="${resetUrl}";

</script>
</html>
`);
return;

}



if(action == 'resetpassword'){

if(password !== confirmPassword){
context.response.write("<h3>Password mismatch</h3>");
return;
}



//log.debug("seession email",sessionEmail)
// log.debug(emailId)
// if(emailId != sessionEmail){
// context.response.write("<html><script>alert('email session mismatch'); window.history.back();</script></html>");
// return;
// }



// if(otp != sessionOtp){
// context.response.write("<h3>Invalid OTP</h3>");
// return;
// }



// var empRec = record.load({
// type:record.Type.EMPLOYEE,
// id:empId
// });

// var savedOtp = empRec.getValue('custentityrw_password_');

// if(otp != savedOtp){
// context.response.write("<h3>Invalid OTP</h3>");
// return;
// }

function hashPassword(password){

    var hashObj = crypto.createHash({
        algorithm: crypto.HashAlg.SHA256
    });

    hashObj.update({
        input: password
    });

    return hashObj.digest({
        outputEncoding: crypto.Encoding.HEX
    });
}
var hashedPassword = hashPassword(password);
record.submitFields({
type:record.Type.EMPLOYEE,
id:empId,
values:{
custentity_rw_dms_portal_password :hashedPassword
},
options:{
ignoreMandatoryFields:true
}
});



var homeUrl = url.resolveScript({
scriptId:'customscript2874',
deploymentId:'customdeploy3',
returnExternalUrl:true,
params:{
empid:empId,
email:emailId
}
});

context.response.write("<html><script>window.location='"+homeUrl+"'</script></html>");

}

}

};

return {onRequest};

});