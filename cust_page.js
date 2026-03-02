/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'],function(serverWidget){
    function onRequest(context){
          if(context.request.method === 'GET'){
            var form=serverWidget.createForm({
                title:'Customer information'
            })
            var usergroup=form.addFieldGroup({
                id:'usergroup',
                label:'user information'
            })
            usergroup.isSingleColumn=true;
             var companygroup=form.addFieldGroup({
                id:'companygroup',
                label:'company information'
            })
            
            var select=form.addField({
                id:'usertitle',
                type:serverWidget.FieldType.SELECT,
                label:'title',
                container:'usergroup'
            })
                        select.addSelectOption({
                value: 'Mr.',
                text: 'Mr.'
            });

            select.addSelectOption({
                value: 'MS.',
                text: 'Ms.'
            });

            select.addSelectOption({
                value: 'Dr.',
                text: 'Dr.'
            });
            var fname=form.addField({
                id:'fnamefield',
                type:serverWidget.FieldType.TEXT,
                label:'First name',
                container:'usergroup'
            })
            fname.isMandatory=true;
            var lname=form.addField({
                id:'lnamefield',
                type:serverWidget.FieldType.TEXT,
                label:'Last name',
                container:'usergroup'
            })
            lname.isMandatory=true;
            var email=form.addField({
                id:'emailfield',
                type:serverWidget.FieldType.EMAIL,
                label:'Email',
                container:'usergroup'
            })
            email.isMandatory=true
            var companyname = form.addField({
                id: 'companyfield',
                type: serverWidget.FieldType.TEXT,
                label: 'Company',
                container: 'companygroup'
            });
            companyname.defaultValue = 'Company Name';
                    form.addField({
            id: 'phonefield',
            type: serverWidget.FieldType.PHONE,
            label: 'Phone Number',
            container: 'companygroup'
        });

        form.addField({
            id: 'urlfield',
            type: serverWidget.FieldType.URL,
            label: 'Website',
            container: 'companygroup'
        })
            form.addSubmitButton({
                label:'submit'
            })
            context.response.write(form)
          }
          else{
                    var delimiter = /\u0001/;
        var titleField = context.request.parameters.titlefield;
        var fnameField = context.request.parameters.fnamefield;
        var lnameField = context.request.parameters.lnamefield;
        var emailField = context.request.parameters.emailfield
        var companyField = context.request.parameters.companyfield;
        var phoneField = context.request.parameters.phonefield;
        var urlField = context.request.parameters.urlfield;
                context.response.write('You have entered:'
        + '<br/>  Name: '+ titleField + ' ' + fnameField + ' ' + lnameField
        + '<br/>  Email: ' + emailField
        + '<br/>  Company: ' + companyField
        + '<br/>  Phone: ' + phoneField + ' Website: ' + urlField);
          }
    }
    return{
        onRequest:onRequest
    }
})