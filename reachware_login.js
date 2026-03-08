/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget','N/url','N/search','N/redirect','N/email','N/runtime'], 
(serverWidget,url,search,redirect,email,runtime) => {

const onRequest = (context) => {

    if(context.request.method === 'GET'){

        const form = serverWidget.createForm({
            title: ' ',
            hideNavBar:true
        });

        const forgotUrl = url.resolveScript({
            scriptId: 'customscript2873',
            deploymentId: 'customdeploy2',
            returnExternalUrl: true
        });

        // const homeUrl = url.resolveScript({
        //     scriptId:'customscript2874',
        //     deploymentId:'customdeploy3',
        //     //returnExternalUrl:true
        // });

        const htmlField = form.addField({
            id: 'custpage_login_html',
            type: serverWidget.FieldType.INLINEHTML,
            label: 'Login'
        });

        let html = `
        <style>
        body{font-family: Arial;}

        .header{
            display:flex;
            align-items:center;
            border:1px solid #2d6fa3;
        }

        .portal{
            flex:1;
            background:#6b3fa0;
            color:white;
            display:flex;
            justify-content:center;
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
.error{
    border:2px solid red !important;
}
        .row label{
            width:120px;
        }

        .row input{
            width:200px;
            padding:6px;
        }

        .btn{
            background:#1c6ea4;
            color:white;
            padding:8px 20px;
            border:none;
            cursor:pointer;
            margin-right:10px;
        }
        label{
        font-size:14px;
        
        }
        </style>

        <div class="header">

            <div class="logo">
                <img width="250" height="20" src="https://2771600.app.netsuite.com/core/media/media.nl?id=5690&c=2771600&h=kIUCEpH0C_eyrUBVYGJn7nEHV_vSoKDhpdzpaPF7vFesdytX">
            </div>

            <div class="portal">
                Reachware Login Portal
            </div>

        </div>

        <div class="login-box">

            <form method="POST" onsubmit="return validateLogin()">

            <div class="row">
                <label>Email</label>
                <input type="text" name="email" id="email">
            </div>

            <div class="row">
                <label>Password</label>
                <input type="password" name="password" id="password">
            </div>

            <button type="submit" class="btn" >Login</button>

            </form>

            <button type="button" class="btn" onclick="forgot()">Forgot Password</button>

        </div>

        <script>
        function validateLogin(){

    var emailField = document.getElementById("email");
    var email = emailField.value.trim();

    // remove previous highlight
    emailField.classList.remove("error");

    if(email === ""){
        emailField.classList.add("error");
        emailField.focus();
        return false;
    }

    return true;
}
        function forgot(){
            window.location.replace("${forgotUrl}");
        }
        </script>
        `;

        htmlField.defaultValue = html;

        context.response.writePage(form);
    }

    // LOGIN VALIDATION
    else{

       var emailValue = context.request.parameters.email || '';
var password = context.request.parameters.password || '';

emailValue = emailValue.trim();
password = password.trim();
if(!emailValue){
    context.response.write('<h3 style="color:red">Email is required</h3>');
    return;
}
        var employeeSearch = search.create({
            type: search.Type.EMPLOYEE,
            filters:[
                ['email','is',emailValue]
            ],
            columns:[
                'internalid',
                'entityid',
                'custentity_rw_dms_portalpassword'
            ]
        });

        var result = employeeSearch.run().getRange({
            start:0,
            end:1
        });

        if(result.length > 0){

          var storedPassword = result[0].getValue({
    name: 'custentity_rw_dms_portalpassword'
});

if(storedPassword){
    storedPassword = storedPassword.trim();
}else{
    storedPassword = "Reachware123";
}

log.debug("Stored Password", storedPassword);
log.debug("Entered Password", password);
log.debug("email",emailValue);
// CASE 1: user entered password
if(password && password === storedPassword){

    log.debug("LOGIN SUCCESS","Password matched");

    // var homeUrl = url.resolveScript({
    //     scriptId: 'customscript2874',
    //     deploymentId: 'customdeploy3',
    //     returnExternalUrl: true
    // });

    // context.response.write(
    //     "<html><script>window.location.href='" + homeUrl + "';</script></html>"
    // );
    var empId = result[0].getValue('internalid');

var resetUrl = url.resolveScript({
    scriptId:'customscript2873', // your reset password script
deploymentId:'customdeploy2',
    params:{
        empid: empId,
        email: emailValue
    },
    returnExternalUrl: true
});
log.debug("Sending Email To", emailValue);
email.send({
author:102,
recipients:emailValue,
subject:'Reachware Portal Password Reset',
body:
'<p>Hello,</p>'+
'<p>Click the link below to reset your password:</p>'+
'<a href="'+resetUrl+'">Reset Password</a>'
});
log.debug("email send to",emailValue);
context.response.write(`
<html>
<body style="font-family:Arial;text-align:center;margin-top:100px">

<h2>Password Reset Email Sent</h2>

<p>Please check your email to reset your password.</p>

</body>
</html>
`);

}

// CASE 2: password not entered → use employee default password
else if(!password){

    log.debug("LOGIN SUCCESS","Using employee default password");

    // var homeUrl = url.resolveScript({
    //     scriptId: 'customscript2874',
    //     deploymentId: 'customdeploy3',
    //     returnExternalUrl: true
    // });

    // context.response.write(
    //     "<html><script>window.location.href='" + homeUrl + "';</script></html>"
    // );
     var empId = result[0].getValue('internalid');

var resetUrl = url.resolveScript({
    scriptId:'customscript2873',
deploymentId:'customdeploy2',
    params:{
        empid: empId,
        email: emailValue
    },
    returnExternalUrl: true
});

email.send({
author:102,
recipients:emailValue,
subject:'Reachware Portal Password Reset',
body:
'<p>Hello,</p>'+
'<p>Click the link below to reset your password:</p>'+
'<a href="'+resetUrl+'">Reset Password</a>'
});
context.response.write(`
<html>
<body style="font-family:Arial;text-align:center;margin-top:100px">

<h2>Password Reset Email Sent</h2>

<p>Please check your email to reset your password.</p>

</body>
</html>
`);

}

// CASE 3: wrong password
else{

    context.response.write('<h3 style="color:red">Invalid Password</h3>');
}

        }else{
            context.response.write('<h3 style="color:red">Invalid Email or Password</h3>');
        }
    }

};

return {onRequest};

});