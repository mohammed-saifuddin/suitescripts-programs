/**

* @NApiVersion 2.1

* @NScriptType ClientScript

*/

define(['N/currentRecord'], function (currentRecord) {

  function pageInit() {

    hideButtons();

    hideRowToolbar(); 

    toggleQuantityByVendor();

    setInterval(toggleButtons,400);

  }
 
  function fieldChanged(context) {

    toggleQuantityByVendor();

     if(context.fieldId === 'custpage_vendor'){

        loadItemsByVendor();

    }
 
    if (context.sublistId === 'custpage_items' &&

        context.fieldId === 'custpage_qty') {
 
        calculateAmount();

        toggleButtons();

    }

}

function loadItemsByVendor(){
 
    var rec = currentRecord.get();

    var vendor = rec.getValue({ fieldId:'custpage_vendor' });
 
    if(!vendor) return;
 
    var url = new URL(window.location.href);

    url.searchParams.set('action','getitems');

    url.searchParams.set('vendor', vendor);
 
    fetch(url.toString())

        .then(function(res){ return res.json(); })

        .then(function(data){
 
            // clear existing lines

            var count = rec.getLineCount({ sublistId:'custpage_items' });

            for(var i=count-1;i>=0;i--){

                rec.removeLine({

                    sublistId:'custpage_items',

                    line:i,

                    ignoreRecalc:true

                });

            }
 
            // insert new lines

            data.forEach(function(item){
 
                rec.selectNewLine({ sublistId:'custpage_items' });
 
                rec.setCurrentSublistValue({

                    sublistId:'custpage_items',

                    fieldId:'custpage_itemid',

                    value:item.id

                });
 
                rec.setCurrentSublistValue({

                    sublistId:'custpage_items',

                    fieldId:'custpage_item',

                    value:item.name

                });
 
                rec.setCurrentSublistValue({

                    sublistId:'custpage_items',

                    fieldId:'custpage_rate',

                    value:item.rate

                });
 
                rec.commitLine({ sublistId:'custpage_items' });

            });

        });

}

function postSourcing(context){

    if(context.sublistId === 'custpage_items' &&

       context.fieldId === 'custpage_qty'){

        toggleButtons();

    }

}

function calculateAmount() {
 
    var rec = currentRecord.get();
 
    var qty = rec.getCurrentSublistValue({

        sublistId: 'custpage_items',

        fieldId: 'custpage_qty'

    }) || 0;
 
    var rate = rec.getCurrentSublistValue({

        sublistId: 'custpage_items',

        fieldId: 'custpage_rate'

    }) || 0;
 
    rec.setCurrentSublistValue({

        sublistId: 'custpage_items',

        fieldId: 'custpage_amount',

        value: (qty * rate).toFixed(2),

        ignoreFieldChange: true

    });

}
 
function toggleButtons(){
 
    var rec = currentRecord.get();

    var count = rec.getLineCount({ sublistId:'custpage_items' });

    var show = false;
 
    for(var i = 0; i < count; i++){
 
        var qty = rec.getSublistValue({

            sublistId:'custpage_items',

            fieldId:'custpage_qty',

            line:i

        });
 
        if(qty !== '' && qty !== null && Number(qty) > 0){

            show = true;   

            break;

        }

    }
 
    var submitBtn = document.getElementById('submitter');

    var previewBtn = document.getElementById('custpage_preview');
 
    if(submitBtn){

        submitBtn.style.display = show ? '' : 'none';

    }
 
    if(previewBtn){

        previewBtn.style.display = show ? '' : 'none';

    }

}

  function toggleQuantityByVendor(){

    var rec = currentRecord.get();
    var vendor = rec.getValue({ fieldId:'custpage_vendor' });

    var count = rec.getLineCount({ sublistId:'custpage_items' });

    for(var i = 0; i < count; i++){

        if(!vendor){
            // No vendor → clear all qty
            rec.setSublistValue({
                sublistId:'custpage_items',
                fieldId:'custpage_qty',
                line:i,
                value:''
            });
        }
    }
}

 
function hideButtons() {

    var submitBtn = document.getElementById('submitter');

    var previewBtn = document.getElementById('custpage_preview');
 
    if (submitBtn) submitBtn.style.display = 'none';

    if (previewBtn) previewBtn.style.display = 'none';

}
 
function hideRowToolbar(){
 
    if(document.getElementById('hideToolbarCSS')) return;
 
    var style = document.createElement('style');

    style.id = 'hideToolbarCSS';

    style.innerHTML = `

        .machineButtonRow,

        #custpage_items_buttons,

        tr.uir-machine-button-row{

            display:none !important;

        }
 
        a[id$="_addrow"]{

            display:none !important;

        }

    `;

    document.head.appendChild(style);

}

function saveRecord(){
 
    var rec = currentRecord.get();

    var count = rec.getLineCount({ sublistId:'custpage_items' });
 
    for(var i=0;i<count;i++){

        var qty = rec.getSublistValue({

            sublistId:'custpage_items',

            fieldId:'custpage_qty',

            line:i

        });
 
        if(qty && Number(qty) > 0){

            return true;  

        }

    }
 
    alert('Please enter quantity for at least one item.');

    return false;  

}

function previewPO() {

   if(!saveRecord()){

     return;

   }

    var rec = currentRecord.get();
 
    rec.setValue({

        fieldId: 'custpage_action',

        value: 'preview'

    });
 
    document.getElementById('submitter').click();

}

return {

    pageInit: pageInit,

    fieldChanged: fieldChanged,

    postSourcing:postSourcing,

    previewPO: previewPO,

};
 
});
 