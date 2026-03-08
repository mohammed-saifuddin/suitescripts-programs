/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget'], (serverWidget) => {

    const onRequest = (context) => {

        const form = serverWidget.createForm({
            title: ' '
        });

        const htmlField = form.addField({
            id: 'custpage_login_html',
            type: serverWidget.FieldType.INLINEHTML,
            label: 'Login'
        });

        let html = `
        <style>

        body{
            font-family: Arial;
        }

        .header{
            display:flex;
            align-items:center;
            border:1px solid #2d6fa3;
        }

        .logo{
            
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

        .btns{
            margin-top:20px;
        }

        .btn{
            background:#1c6ea4;
            color:white;
            padding:8px 20px;
            border:none;
            cursor:pointer;
            margin-right:10px;
        }

        </style>

        <div class="header">

            

            <div class="portal">
                Reachware  Portal Password Setup
             </div>

        </div>


        <div class="login-box">

            <div class="row">
                <label>Email</label>
                <input type="text" id="email">
            </div>

            <div class="row">
                <label>Password</label>
                <input type="password" id="password">
            </div>
                
            <div class="row">
                <label>Confirm <br/> Password</label>
                <input type="password" id="password">
            </div>
            <div class="btns">
                <button class="btn" onclick="login()">Confirm</button>
                <button class="btn" onclick="forgot()">Reset</button>
            </div>

        </div>

        <script>

        function login(){
            alert("Login clicked");
        }

        function forgot(){
            alert("Forgot password clicked");
        }

        </script>
        `;

        htmlField.defaultValue = html;

        context.response.writePage(form);

    };

    return { onRequest };

});