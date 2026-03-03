    /**
     * @NApiVersion 2.x
     * @NScriptType Suitelet
     */
    define(['N/ui/serverWidget','N/search'], function (ui,search) {

        function onRequest(context) {

            if (context.request.method === 'GET') {

                var form = ui.createForm({
                    title: 'Amenity Booking Calender'
                });
                

                var html = form.addField({
                    id: 'custpage_calendar',
                    type: ui.FieldType.INLINEHTML,
                    label: 'Calendar'
                });
//                 function getCustomers(){

//                     var customers = [];

//                     var customerSearch = search.create({
//                         type: search.Type.CUSTOMER,
//                         filters: [
//                             ['isinactive','is','F']
//                         ],
//                         columns: [
//                             'internalid',
//                             'altname'
//                         ]
//                     });

//                     customerSearch.run().each(function(result){

//                         customers.push({
//                             id: result.getValue('internalid'),
//                             name: result.getValue('altname')
//                         });

//                         return true;
//                     });

//                     return customers;
//                 }
//                 var customerData = getCustomers();

//                 var dropdownOptions = '<option value="all">All Customers</option>';
//                 var checkboxHtml = '';

//                 var colors = ["#2A3A76","#8e24aa","#1565c0","#d32f2f","#2e7d32","#ff6d00","#00897b"];

// customerData.forEach(function(cust, index){

//     dropdownOptions += 
//         '<option value="'+cust.id+'">'+cust.name+'</option>';

//     var initial = cust.name ? cust.name.charAt(0).toUpperCase() : "?";
//     var color = colors[index % colors.length];

//     checkboxHtml +=
//         '<div class="customer-item">' +

//             '<label class="customer-label">' +

//                 '<input type="checkbox" class="custCheck" value="'+cust.id+'" checked>' +

//                 '<span class="avatar-circle" style="background:'+color+'">' +
//                     initial +
//                 '</span>' +

//                 '<span class="customer-name">' +
//                     cust.name +
//                 '</span>' +

//             '</label>' +

//         '</div>';
// });
                html.defaultValue =

                    
                    '<script>' +
                    'if (typeof window.nlFieldHelp === "undefined") {' +
                    '  window.nlFieldHelp = function(){};' +
                    '}' +
                    '</script>' +
                    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">' +

                    '<link rel="stylesheet" href="https://tstdrv2702437.app.netsuite.com/core/media/media.nl?id=5913&c=TSTDRV2702437&h=3TIZ6Yj_3UtwLE-N-Bq56ED02fHIdxLKB66j_I5-aJ_e85nv">' +
                    '<script src="https://tstdrv2702437.app.netsuite.com/core/media/media.nl?id=5912&c=TSTDRV2702437&h=zRdW1Ost_LWRRrUMunslPWN3EdcXYJ24qDFEm2l29zHkJ38_"></script>' +

                    '<style>' +
                    '#calendar { height: auto; min-height: 450px; position: relative; font-size:13px; padding:10px; }'+
                     
                    '.fc-timegrid-slot { height:30px !important; }' +
                    '.fc-timegrid-slot-lane { border-bottom: 1px solid rgba(230, 19, 19, 0.7); }' +
                                '.completed-event {' +
                        'border:2px solid #ff6d00 !important;' +
                        'animation: orangeGlow 1.5s infinite;' +
                        '}' +

                            '.upcoming-event {' +
                            'border:2px solid #00c853 !important;' +
                            'animation: greenGlow 1.5s infinite;' +
                            '}' +

                        '@keyframes orangeGlow {' +
                        '0% { box-shadow:0 0 0 0 rgba(255,109,0,0.7); }' +
                        '70% { box-shadow:0 0 0 6px rgba(255,109,0,0); }' +
                        '100% { box-shadow:0 0 0 0 rgba(255,109,0,0); }' +
                        '}' +
                            '@keyframes blueGlow {' +
                        '0% { box-shadow:0 0 0 0 rgba(30, 83, 231, 0.7); }' +
                        '70% { box-shadow:0 0 0 6px rgba(255,109,0,0); }' +
                        '100% { box-shadow:0 0 0 0 rgba(255,109,0,0); }' +
                        '}' +
                        '@keyframes greenGlow {' +
                        '0% { box-shadow:0 0 0 0 rgba(0,200,83,0.7); }' +
                        '70% { box-shadow:0 0 0 6px rgba(0,200,83,0); }' +
                        '100% { box-shadow:0 0 0 0 rgba(0,200,83,0); }' +
                        '}' +

'.fc-hover-plus,' +
'.fc-hover-minus {' +
'   width:22px !important;' +
'   height:22px !important;' +
'   border-radius:50% !important;' +
'   display:flex;'+
'   align-items:center !important;' +
'   justify-content:center !important;' +
'   font-size:12px !important;' +
'   font-weight:600 !important;' +
'   cursor:pointer !important;' +
'   transition:all 0.18s ease-in-out !important;' +
'   box-shadow:0 4px 10px rgba(0,0,0,0.18) !important;' +
'}'+

'.fc-hover-plus {' +
'   background:#e8f5e9 !important;' +
'   border:1px solid #2e7d32 !important;' +
'}'+

'.fc-hover-plus i {' +
'   color:#2e7d32 !important;' +
'}'+

'.fc-hover-minus {' +
'   background:#ffebee !important;' +
'   border:1px solid #d32f2f !important;' +
'}'+
'.fc-hover-plus {'+
  ' display:none;'+
'}'+
'.fc-hover-minus i {' +
'   color:#d32f2f !important;' +
'}'+

'.fc-hover-plus:hover,' +
'.fc-hover-minus:hover {' +
'   transform:scale(1.15);' +
'   box-shadow:0 6px 16px rgba(0,0,0,0.25) !important;' +
'}'+
                    '.fc-timegrid-col.fc-day-today { background:none !important;position:relative; }' +
                    '.fc-col-header-cell.fc-day-today { position:relative; font-weight:600;height:36px; }' +
                    '.fc-col-header-cell.fc-day-today::after {' +
                    'content:""; position:absolute; top:0; left:0; width:100%; height:2px;' +
                    'background:#2A3A76; border-radius:3px; }' +
                      '.fc-col-header-cell.fc-day-today::before {' +
                    'content:""; position:absolute; bottom:0; left:0; width:100%; height:2px;' +
                    'background:#2A3A76; border-radius:3px; }' +
                    '.fc-timegrid-col.fc-day-past { background:rgba(200,200,200,0.15); }' +
                    '.fc-timegrid-col.fc-day-today .fc-slot-past { background:rgba(93, 8, 8, 0.3); }' +

                    '#amenityTabs { display:flex; gap:10px; margin-bottom:10px; }' +
                    '.amenity-tab { padding:10px 16px; cursor:pointer; border:1px solid #ccc; background:#f5f5f5; font-weight:600; }' +
                    '.amenity-tab.active { background:#2A3A76; color:#fff; }' +
                                        '.past-time-slot {' +
                        'background: rgba(255,109,0,0.18) !important;' +
                        '}' +
                        '.past-event {' +
                        'background-color:#d32f2f !important;' +   
                        'color:#fff !important;' +
                        'border:2px solid #d32f2f !important;' +
                        'animation: orangeGlow 1.5s infinite;' +
                        '}' +

                        '.present-event {' +
                        'background-color:#2e7d32 !important;' +   
                        'color:#fff !important;' +
                        'border:2px solid #2e7d32 !important;' +
                        'animation: greenGlow 1.5s infinite;' +
                        '}' +
                        '#miniCalendar .fc { font-size:12px; }' +
                        '#miniCalendar {  padding:10px; border-radius:8px; background:#fafafa; }' +
                                            ' #miniCalendar .fc-day-today {'+
                        ' background-color: rgba(48, 63, 116, 0.15) !important;'+
                        '}'+

                        '#miniCalendar .fc-day-today .fc-daygrid-day-number {'+
                        ' color: #bfc2ce !important;'+
                            'font-weight: 700;'+
                        '}'+
                        '#miniCalendar .fc-day-today {'+
                        ' background-color: #2A3A76 !important;  '+ 
                            'border-radius: 4px;  ' +                 
                        '}'+
                        

                        '#miniCalendar .fc-day-today .fc-daygrid-day-number {'+
                            'color: #ffffff !important;'+
                            'font-weight: 700;'+
                        '}'+


                        '#miniCalendar .fc-daygrid-day-frame {'+
                            'aspect-ratio: 1 / 1;'+
                        ' display: flex;'+
                            'align-items: center;'+
                            'justify-content: center;'+
                        '}'+
                        '.customer-item {' +
                        '   margin-bottom:10px;' +
                        '}' +

                        '.customer-label {' +
                        '   display:flex;' +
                        '   align-items:center;' +
                        '   gap:10px;' +
                        '   cursor:pointer;' +
                        '   font-size:13px;' +
                        '}' +

                        '.customer-label input {' +
                        '   cursor:pointer;' +
                        '}' +

                        '.avatar-circle {' +
                        '   width:30px;' +
                        '   height:30px;' +
                        '   border-radius:50%;' +
                        '   color:#fff;' +
                        '   display:flex;' +
                        '   align-items:center;' +
                        '   justify-content:center;' +
                        '   font-weight:600;' +
                        '   font-size:13px;' +
                        '}' +

                        '.customer-name {' +
                        '   font-weight:500;' +
                        '}' +
                        '#miniCalendar .fc-daygrid-day-frame {'+
                            'height: 40px !important;      '  + 
                        ' display: flex;'+
                        'background-color:#2A3A76'+
                        '  align-items: center;'+
                            'justify-content: center;'+
                        '}'+

                        '#miniCalendar .fc-daygrid-day-top {'+
                        ' justify-content: center !important;'+
                        '}'+
                        '.fc-view-fade {' +
                        '   opacity:0;' +
                        '   transform:translateY(10px);' +
                        '   transition:all 0.25s ease-in-out;' +
                        '}' +

                        '.fc-view-fade-active {' +
                        '   opacity:1;' +
                        '   transform:translateY(0);' +
                        '}' +

                        '#miniCalendar .fc-daygrid-day-number {'+
                            'float: none !important;'+
                        '}'+
                    '#miniCalendar .selected-week-row td {'+
                    ' background-color: rgba(42, 58, 118, 0.15) !important;'+
                    '}'+

                    '#miniCalendar .selected-week-row .fc-daygrid-day-number {'+
                    ' font-weight: 600;'+
                    '}'+



                '#miniCalendar .selected-week-row .fc-day-today {'+
                    'background-color: #2A3A76 !important;  ' +
                '}'+
'.amenity-card {' +
'   background:#ffffff;' +
'   padding:18px;' +
'   border-radius:14px;' +
'   box-shadow:0 6px 18px rgba(0,0,0,0.08);' +
'   font-size:13px;' +
'}' +

'.amenity-header {' +
'   display:flex;' +
'   gap:12px;' +
'   align-items:center;' +
'   margin-bottom:12px;' +
'}' +

'.amenity-icon {' +
'   width:45px;' +
'   height:45px;' +
'   background:#2A3A76;' +
'   color:#fff;' +
'   border-radius:10px;' +
'   display:flex;' +
'   align-items:center;' +
'   justify-content:center;' +
'   font-size:18px;' +
'}' +

'.amenity-title {' +
'   font-size:15px;' +
'   font-weight:600;' +


'}' +

'.amenity-section-title {' +
'   font-size:16px;' +
'   font-weight:700;' +   
'   color:#2A3A76;' +
'}' +

'.amenity-subtitle {' +
'   font-size:12px;' +
'   color:#777;' +
'}' +

'.amenity-section {' +
'   margin-bottom:12px;' +
'}' +

'.amenity-divider {' +
'   height:1px;' +
'   background:#eee;' +
'   margin:12px 0;' +
'}' +

'.section-title {' +
'   font-weight:600;' +
'   margin-bottom:8px;' +
'}' +

'.rule-row {' +
'   display:flex;' +
'   justify-content:space-between;' +
'   align-items:center;' +
'   padding:4px 0;' +
'}' +

'.rule-row i {' +
'   margin-right:6px;' +
'   color:#2A3A76;' +
'}' +

'.rule-value {' +
'   font-weight:600;' +
'   color:#444;' +
'}'+

                '#miniCalendar .fc-day-today .fc-daygrid-day-number {'+
                    'color: #ffffff !important;'+
                ' font-weight: 700;'+
                '}'+


                '#miniCalendar .selected-week-row td:not(.fc-day-today) {'+
                '    background-color: rgba(42, 58, 118, 0.15) !important;'+
                '}'+


                '#miniCalendar .fc-day-today {'+
                    'background-color: #2A3A76 !important;'+
                '}'+



                        '#miniCalendar .fc-daygrid-day {'+
                            'padding: 0 !important;'+
                        '}'+


                        '#miniCalendar .fc-scrollgrid {'+
                        ' border-collapse: collapse !important;'+
                        '}'+


                        '.future-event {' +
                        'background-color:#1565c0 !important;' +   
                        'color:#fff !important;' +
                        'border:2px solid #84b2e6 !important;' +
                        'animation: blueGlow 1.5s infinite;' +
                        '}' +
                        '.fc-col-header-cell-cushion {' +
                        '   text-align: left !important;' +
                        '   display: block;' +
                        '   padding-left: 6px;' +
                        '}' +
                        '.fc-col-header-cell {' +
                        '   text-align: left !important;' +
                        '}' +
' .fc-timegrid-slot-lane { position:relative; }'+

'.fc-hover-plus i { color:#2A3A76 !important; }'+
'.fc-timegrid-slot-lane {' +
'   position:relative;' +

'}' +



'.fc-timegrid-slot-lane:hover,' +
'.fc-timegrid-slot-lane:hover * {' +
'   cursor:pointer;' +
'}' +


     
                            '.event-icon { margin-right:6px; }' +

                        '.fc-event {' +
                        '  overflow: visible !important;' +
                        '}' +

                        '.fc-event-main {' +
                        '  display:flex !important;' +
                        '  justify-content:center !important;' +
                        '  align-items:center !important;' +
                        '  height:100% !important;' +
                        '}' +

                        '.fc-custom-event {' +
                        '  display:flex !important;' +
                        '  flex-direction:column;' +
                        '  justify-content:center;' +
                        '  align-items:center;' +
                        '  text-align:center !important;' +
                        '  width:100%;' +
                        '  padding:1px 2px 14px 4px;' +
                        '}' +

                        '.fc-custom-time {' +
                        '  font-size:8px;' +
                        '  font-weight:400;' +
                        '  line-height:1.0;' +
                        '}' +

                        '.fc-custom-title {' +
                        '  font-size:10px;' +
                        '  font-weight:500;' +
                        '  margin-top:1px;' +
                        '  line-height:1.0;' +
                        '}' +

                        '.fc-event-stats {' +
                        '  font-size:8px;' +
                        '  margin-top:3px;' +
                        '  font-weight:300;' +
                        '  line-height:1.0;' +
                        '}'+
                        '.legend-info-btn {' +
                        '   position:absolute;' +
                        '   top:10px;' +
                        '   right:10px;' +
                        '   background:#2A3A76;' +
                        '   color:#fff;' +
                        '   border:none;' +
                        '   border-radius:50%;' +
                        '   width:32px;' +
                        '   height:32px;' +
                        '   cursor:pointer;' +
                        '   z-index:20;' +
                        '}' +

                        '.legend-dialog {' +
                        '   display:none;' +
                        '   position:absolute;' +
                        '   top:50px;' +
                        '   right:10px;' +
                        '   z-index:1000;' +
                        '}' +

                        '.legend-dialog-content {' +
                        '   background:#ffffff;' +
                        '   border-radius:8px;' +
                        '   box-shadow:0 4px 12px rgba(0,0,0,0.2);' +
                        '   padding:15px;' +
                        '   width:220px;' +
                        '}' +

                        '.legend-dialog-header {' +
                        '   display:flex;' +
                        '   justify-content:space-between;' +
                        '   font-weight:600;' +
                        '   margin-bottom:10px;' +
                        '}' +

                        '.legend-close {' +
                        '   cursor:pointer;' +
                        '}' +
                        '.legend-dot {' +
                        '   width:16px;' +
                        '   height:16px;' +
                        '   border-radius:50%;' +
                        '   margin-right:10px;' +
                        '   display:inline-block;' +
                        '}' +

                        '.red-dot { background:#d32f2f; }' +
                        '.green-dot { background:#2e7d32; }' +
                        '.blue-dot { background:#1565c0; }' +

                        '.legend-text {' +
                        '   font-weight:500;' +
                        '}' +

                        '.red-text { color:#d32f2f; }' +
                        '.green-text { color:#2e7d32; }' +
                        '.blue-text { color:#1565c0; }' +
                        '.legend-item {' +
                        '   display:flex;' +
                        '   align-items:center;' +
                        '   margin-bottom:6px;' +
                        '}' +
                        '.floating-legend-btn {' +

                        '   background:#2A3A76;' +
                        '   color:#ffffff;' +
                        '   border:none;' +
                        '   padding:7px 16px;' +
                        '   border-radius:20px;' +
                        '   font-size:13px;' +
                        '   font-weight:600;' +

                        '   cursor:pointer;' +
                        '   box-shadow:0 3px 8px rgba(0,0,0,0.25);' +
                        '   z-index:50;' +
                        '}' +

                        '.floating-legend-btn:hover {' +
                        '   background:#1d2758;' +
                        '}' +
                        '.calendar-toolbar {' +
                        '   display:flex;' +
                        '   justify-content:space-between;' +
                        '   align-items:center;' +
                        '   padding:10px 0;' +
                        '   margin-bottom:10px;' +
                        '}' +

                        '.toolbar-left {' +
                        '   display:flex;' +
                        '   gap:10px;' +
                        '}' +

                        '.toolbar-select {' +
                        '   padding:6px 10px;' +
                        '   border:1px solid #ccc;' +
                        '   border-radius:6px;' +
                        '   font-size:13px;' +
                        '}' +

                        '.toolbar-search {' +
                        '   padding:6px 10px;' +
                        '   border:1px solid #ccc;' +
                        '   border-radius:6px;' +
                        '   font-size:13px;' +
                        '   width:180px;' +
                        'margin-right:50px;'+
                        '}' +
                        '.legend-color {' +
                        '   width:14px;' +
                        '   height:14px;' +
                        '   border-radius:3px;' +
                        '   margin-right:8px;' +
                        '}' +
                        '.view-tabs {' +
                        '   display:flex;' +
                        '   gap:6px;' +
                        '}' +





                        '.view-tab {' +
                        '   padding:6px 14px;' +
                        '   border:1px solid #ccc;' +
                        '   background:#f5f5f5;' +
                        '   border-radius:6px;' +
                        '   font-size:13px;' +
                        '   cursor:pointer;' +
                        '   font-weight:500;' +
                        '}' +
                        '.top-buttons {' +
                        '   position:absolute;' +
                        '   top:-35px;' +
                        '   right:20px;' +
                        '   display:flex;' +
                        '   gap:12px;' +   
                        '}' +
                        '.fc-modern-tooltip {' +
                        '   position:absolute;' +
                        '   background:#ffffff;' +
                        '   border-radius:12px;' +
                        '   padding:14px;' +
                        '   width:240px;' +
                        '   box-shadow:0 8px 24px rgba(0,0,0,0.15);' +
                        '   font-size:13px;' +
                        '   z-index:9999;' +
                        '   animation:fadeIn 0.15s ease-in-out;' +
                        '}' +

                        '.tooltip-header {' +
                        '   display:flex;' +
                        '   gap:12px;' +
                        '   align-items:center;' +
                        '   margin-bottom:10px;' +
                        '}' +

                        '.tooltip-icon {' +
                        '   width:38px;' +
                        '   height:38px;' +
                        '   border-radius:10px;' +
                        '   background:#6C5CE7;' +
                        '   display:flex;' +
                        '   align-items:center;' +
                        '   justify-content:center;' +
                        '   color:#fff;' +
                        '   font-size:16px;' +
                        '}' +

                        '.tooltip-title {' +
                        '   font-weight:600;' +
                        '   font-size:14px;' +
                        '}' +

                        '.tooltip-time {' +
                        '   font-size:12px;' +
                        '   color:#666;' +
                        '}' +

                        '.tooltip-body div {' +
                        '   margin-bottom:6px;' +
                        '}' +
                        '#newBtn{'+
                        '   background:#2A3A76;' +
                        '   color:#ffffff;' +
                        '   border:none;' +
                        '   padding:7px 16px;' +
                        '   border-radius:4px;' +
                        '   font-size:13px;' +
                        '   font-weight:600;' +

                        '   cursor:pointer;' +
                        '   box-shadow:0 3px 8px rgba(0,0,0,0.25);' +
                        '   z-index:50;' +
                        '}' +

                    '.label {' +
                    '   font-weight:600;' +
                    '   color:#444;' +
                    '}' +

                    '@keyframes fadeIn {' +
                    '   from { opacity:0; transform:translateY(5px); }' +
                    '   to   { opacity:1; transform:translateY(0); }' +
                    '}' +
                        '.floating-legend-btn {' +
                        '   background:#2A3A76;' +
                        '   color:#ffffff;' +
                        '   border:none;' +
                        '   padding:7px 16px;' +
                        '   border-radius:4px;' +
                        '   font-size:13px;' +
                        '   font-weight:600;' +
                        '   cursor:pointer;' +
                        '   box-shadow:0 3px 8px rgba(0,0,0,0.25);' +
                        '}' +
                        '.view-tab.active {' +
                        '   background:#2A3A76;' +
                        '   color:#fff;' +
                        '   border-color:#2A3A76;' +
                        '}' +
                        '.social-tab { padding:8px 14px; margin-right:6px; cursor:pointer; border:1px solid #ccc; background:#eee; }' +
                            '.social-tab.active { background:#8e24aa; color:#fff; }' +

                             '.culture-tab { padding:8px 14px; margin-right:6px; cursor:pointer; border:1px solid #ccc; background:#eee; }' +
                            '.culture-tab.active { background:#8e24aa; color:#fff; }' +
                        '.corporate-tab { padding:8px 14px; margin-right:6px; cursor:pointer; border:1px solid #ccc; background:#eee; }' +
                            '.corporate-tab.active { background:#8e24aa; color:#fff; }' +
                        '#sportSubTabs { display:none; margin-bottom:10px; }' +
                    '.sport-tab { padding:8px 14px; margin-right:6px; cursor:pointer; border:1px solid #ccc; background:#eee; }' +
                    '.sport-tab.active { background:#8e24aa; color:#fff; }' +

                    '.fc-cell-overlay {' +
                    'position:absolute; background:rgba(5,7,123,0.35); z-index:5; pointer-events:none;' +
                    '}' +
                    '.fc-event-main { text-align: center !important;margin-top:10px; }' +
                    '.fc-event-title { text-align: center !important; }' +
                        '.fc-event-time { text-align: center !important; }' +

                    '.ns-modal { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:none; z-index:10000; }' +
                    '.ns-modal-content { position:absolute; top:15%; left:15%; width:70%; height:70%; background:#fff; }' +
                    '.ns-modal-close { position:absolute; top:10px; right:15px; font-size:18px; cursor:pointer; }' +
                    '</style>' +

                    '<div id="amenityTabs">' +
                    '<button type="button" class="amenity-tab  active" data-type="all">All</button>' +
                    '<button type="button" class="amenity-tab"  data-type="sport">Sport events</button>' +
                    '<button type="button" class="amenity-tab"  data-type="culture">Cultural events</button>' +
                    '<button type="button" class="amenity-tab"  data-type="social">Social events</button>' +
                    '<button  type="button" class="amenity-tab"  data-type="corporate">Corporate events</button>' +
                    '</div>' +
                    // sports sub tabs
                    '<div id="sportSubTabs">' +
                    '<button type="button" class="sport-tab active" data-sub="all">All</button>' +
                    '<button type="button" class="sport-tab" data-sub="cricket">Cricket</button>' +
                    '<button type="button" class="sport-tab" data-sub="football">Football</button>' +
                    '<button type="button" class="sport-tab" data-sub="tennis">Tennis</button>' +
                    '<button type="button" class="sport-tab" data-sub="volleyball">Volleyball</button>' +
                    '</div>' +
                    //social sub tabs
                     '<div id="socialSubTabs" style="display:none; margin-bottom:10px;">' +
                '<button type="button" class="social-tab active" data-sub="all">All</button>' +
                '<button type="button" class="social-tab" data-sub="party">Party</button>' +
                '<button type="button" class="social-tab" data-sub="meetup">Meetup</button>' +
                '<button type="button" class="social-tab" data-sub="conference">Conference</button>' +
                '<button type="button" class="social-tab" data-sub="networking">Networking</button>' +
                '</div>' +
                //cultural sub tabs
                '<div id="cultureSubTabs" style="display:none; margin-bottom:10px;">' +
                '<button type="button" class="culture-tab active" data-sub="all">All</button>' +
                '<button type="button" class="culture-tab" data-sub="concerts">Concerts</button>' +
                '<button type="button" class="culture-tab" data-sub="fashions">Fashion</button>' +
                '<button type="button" class="culture-tab" data-sub="exhibitions">Exhibition</button>' +
                '<button type="button" class="culture-tab" data-sub="festivals">Festivals</button>' +
                '</div>' +
                //corporate sub tabs
                // Conferences, seminars, trade shows, product launches, team-building events,
                //  shareholder meetings, and networking events
                '<div id="corporateSubTabs" style="display:none; margin-bottom:10px;">' +
                '<button type="button" class="corporate-tab active" data-sub="all">All</button>' +
                '<button type="button" class="corporate-tab" data-sub="conference">Conference</button>' +
                '<button type="button" class="corporate-tab" data-sub="seminars">seminars</button>' +
                '<button type="button" class="corporate-tab" data-sub="trade show">trade shows</button>' +
                '<button type="button" class="corporate-tab" data-sub="product launch">product launch</button>' +
                '<button type="button" class="corporate-tab" data-sub="meeting">meetings</button>' +
                '</div>' +
                   '<div style="display:flex; gap:20px;">' +


'<div style="width:260px;">' +

   //left side calender
    '<div id="miniCalendar"></div>' +

   //amenities drop down
    '<div style="margin-top:15px;">' +

         
'<div id="amenityRulesBox" class="amenity-card">' +
'   <div class="amenity-section-title">Amenity Rules</div>' +
'</div>'+
        
        // '<select id="customerDropdown" style="width:100%; padding:6px; border:1px solid #ccc; border-radius:6px; margin-bottom:8px;">' +
        //    dropdownOptions +
        // '</select>' +

        
        // '<div id="customerList" style="max-height:200px; overflow-y:auto;">' +

        //     checkboxHtml +

        // '</div>' +

    '</div>' +

'</div>' +

//main right calender
'<div style="flex:1; position:relative;">' +


               '<div style="flex:1; position:relative;">' +
              '<div class="top-buttons">' +

//     '<button type="button" id="legendOpenBtn" class="floating-legend-btn">' +
//     '<i class="fa-solid fa-circle-info" style="margin-right:6px;"></i>' +
//     'Booking Indicator' +
// '</button>' +
'<button type="button" id="exportBtn" class="floating-legend-btn export-btn">' +
    '<i class="fa-solid fa-file-export" style="margin-right:6px;"></i>' +
    'Export' +
'</button>' +

'</div>' +
                '<div id="legendDialog" class="legend-dialog">' +
                '  <div class="legend-dialog-content">' +
                '    <div class="legend-dialog-header">' +
                '      <span>Booking Indicators</span>' +
                '      <span id="legendCloseBtn" class="legend-close">✖</span>' +
                '    </div>' +

                '    <div class="legend-item">' +
                '       <span class="legend-dot red-dot"></span>' +
                '       <span class="legend-text red-text">Past Event</span>' +
                '    </div>' +

                '    <div class="legend-item">' +
                '       <span class="legend-dot green-dot"></span>' +
                '       <span class="legend-text green-text">Ongoing Event</span>' +
                '    </div>' +

                '    <div class="legend-item">' +
                '       <span class="legend-dot blue-dot"></span>' +
                '       <span class="legend-text blue-text">Upcoming Event</span>' +
                '    </div>' +

                '  </div>' +
                '</div>' +
                '<div class="calendar-toolbar">' +

                '  <div class="toolbar-left">' +
                   '<button type="button" id="newBtn">' +
                   '<i class="fa-solid fa-plus" style="margin-right:6px;"></i>' +
        'New Booking' +
    '</button>' +
    '<select id="monthSelector" class="toolbar-select"></select>' +
                '    <select id="viewSelector" class="toolbar-select">' +
                    
                '       <option class="high" value="timeGridWeek">Week View</option>' +
                 '   <option class="high" value="timeGridDay">Day View</option>' +
                '       <option class="high" value="dayGridMonth">Month View</option>' +
                '    </select>' +
                // '<button class="view-tab active" data-view="timeGridWeek">Week</button>'+
                // '<button class="view-tab" data-view="dayGridMonth">Month</button>'+

                '    <select id="amenityFilter" class="toolbar-select">' +
                '       <option value="all">All Amenities</option>' +
                '       <option value="sport">Sport</option>' +
                '       <option value="social">Social</option>' +
                '       <option value="culture">Culture</option>' +
                '       <option value="corporate">Corporate</option>' +
                '    </select>' +

                '    <select id="statusFilter" class="toolbar-select">' +
                '       <option value="all">All Status</option>' +
                '       <option value="past">Past</option>' +
                '       <option value="present">Ongoing</option>' +
                '       <option value="future">Upcoming</option>' +
                '    </select>' +
             
                '  </div>' +
                 

                '  <div class="toolbar-right">' +
                '     <input type="text" id="searchInput" class="toolbar-search" placeholder="Search...">' +
                '  </div>' +

                '</div>' +


                '<div id="calendar"></div>' +
                '<div id="calendarLegend" style="margin-top:15px; padding:10px; border-top:1px solid #ddd; display:flex; gap:20px; justify-content:center;align-items:center; font-size:13px;">' +

'   <div style="display:flex; align-items:center; gap:6px;">' +
'       <span style="width:14px;height:14px;background:#d32f2f;border-radius:3px;display:inline-block;"></span>' +
'       <span>Past Event</span>' +
'   </div>' +

'   <div style="display:flex; align-items:center; gap:6px;">' +
'       <span style="width:14px;height:14px;background:#2e7d32;border-radius:3px;display:inline-block;"></span>' +
'       <span>Ongoing Event</span>' +
'   </div>' +

'   <div style="display:flex; align-items:center; gap:6px;">' +
'       <span style="width:14px;height:14px;background:#1565c0;border-radius:3px;display:inline-block;"></span>' +
'       <span>Upcoming Event</span>' +
'   </div>' +

'</div>' +

                '</div>' +

                    '<div id="nsModal" class="ns-modal">' +
                    '<div class="ns-modal-content">' +
                    '<span class="ns-modal-close" onclick="closeModal()">✖</span>' +
                    '<iframe id="nsFrame" style="width:100%;height:100%;border:none;"></iframe>' +
                    '</div></div>' +

                    '<script>' +
                    'var subtypeCounts = {};' +
                    'var lastClickTime = 0; '+
                    'var activeAmenityFilter = "all";'+
                    'var activeStatusFilter = "all";'+
                    'var activeAmenity = "all";'+
                    'var activeSubtype = "all";'+
                    'var activeStatus  = "all";'+
                    'var slotLimits = {' +
                    '  cricket: 20,' +
                    '  football: 15,' +
                    '  tennis: 10,' +
                    '  volleyball: 12,' +

                    '  party: 25,' +
                    '  meetup: 18,' +
                    '  conference: 30,' +
                    '  networking: 22,' +

                    '  concerts: 40,' +
                    '  fashions: 35,' +
                    '  exhibitions: 28,' +
                    '  festivals: 50,' +

                    '  seminars: 26,' +
                    '  "trade show": 32,' +
                    '  "product launch": 20,' +
                    '  meeting: 15' +
                    '};' +
                    'var amenityRules = {' +
                   '  all: {'+
      ' min:"1 Hour",'+
       'max:"6 Hours",'+
      ' advance:"2 Days",'+
      ' breakTime:"30 Min",'+
       'capacity:"Depends on Amenity",'+
      ' approval:"Depends on Type"'+
   '},'+
'   sport: {' +
'       min:"1 Hour",' +
'       max:"3 Hours",' +
'       advance:"2 Days",' +
'       breakTime:"30 Min",' +
'       capacity:"20 People",' +
'       approval:"No"' +
'   },' +
'   social: {' +
'       min:"2 Hours",' +
'       max:"5 Hours",' +
'       advance:"3 Days",' +
'       breakTime:"45 Min",' +
'       capacity:"50 People",' +
'       approval:"Yes"' +
'   },' +
'   culture: {' +
'       min:"3 Hours",' +
'       max:"8 Hours",' +
'       advance:"5 Days",' +
'       breakTime:"1 Hour",' +
'       capacity:"100 People",' +
'       approval:"Yes"' +
'   },' +
'   corporate: {' +
'       min:"1 Hour",' +
'       max:"6 Hours",' +
'       advance:"4 Days",' +
'       breakTime:"30 Min",' +
'       capacity:"40 People",' +
'       approval:"Yes"' +
'   }' +
'};' +
                    '  var categoryCounts = {'+
                        ' sport: { occupied:0, remaining:0 },'+
                        ' culture: { occupied:0, remaining:0 },'+
                        'social: { occupied:0, remaining:0 },'+
                        'corporate: { occupied:0, remaining:0 }'+
                        '};'+


                    'function applyFilters1(){' +
                    'calendar.getEvents().forEach(function(event){' +
                    'var eventAmenity = event.extendedProps.amenity;' +
                    'var eventSubtype = event.extendedProps.subtype;' +

                    'if(activeAmenity !== "all" && eventAmenity !== activeAmenity){' +
                    'event.setProp("display","none"); return; }' +

                    'if(activeSubtype !== "all" && eventSubtype !== activeSubtype){' +
                    'event.setProp("display","none"); return; }' +

                    'event.setProp("display","auto");' +
                    '});' +
                
                    '}' +
                    ' function applyFilters(){'+

                    ' var now = new Date();'+

                'calendar.getEvents().forEach(function(event){'+

            ' var eventAmenity = event.extendedProps.amenity;'+
            'var eventSubtype = event.extendedProps.subtype;'+

            ' var start = event.start;'+
            ' var end   = event.end ? event.end : new Date(start.getTime() + 60*60000);'+

            'var eventStatus = "";'+

       ' if(end < now){'+
            'eventStatus = "past";'+
       ' }'+
        'else if(start <= now && end >= now){'+
            'eventStatus = "present";'+
       ' }'+
       ' else{'+
          '  eventStatus = "future";'+
       ' }'+

        

        'if(activeAmenity !== "all" && eventAmenity !== activeAmenity){'+
            'event.setProp("display","none");'+
           ' return;'+
      '  }'+

        'if(activeSubtype !== "all" && eventSubtype !== activeSubtype){'+
           ' event.setProp("display","none");'+
           ' return;'+
       ' }'+

     '   if(activeStatus !== "all" && eventStatus !== activeStatus){'+
           ' event.setProp("display","none");'+
         '   return;'+
      '  }'+

        'event.setProp("display","auto");'+

  '  });'+
    
  '  updateEventStats();'+
'}'+
'if(monthSelector){' +

'monthSelector.addEventListener("change", function(){' +

'   var parts = this.value.split("-");' +
'   var year  = parseInt(parts[0]);' +
'   var month = parseInt(parts[1]);' +

'   var newDate = new Date(year, month, 1);' +

'   calendar.changeView("dayGridMonth", newDate);' +

'   var viewDropdown = document.getElementById("viewSelector");' +
'   if(viewDropdown){ viewDropdown.value = "dayGridMonth"; }' +

'});' +

'}' +
                    'function openModal(url){' +
                    'document.getElementById("nsFrame").src = url;' +
                    'document.getElementById("nsModal").style.display="block"; }' +

                    'function closeModal(){' +
                    'document.getElementById("nsModal").style.display="none";' +
                    'document.getElementById("nsFrame").src=""; }' +
                    
                    'document.addEventListener("DOMContentLoaded", function(){' +
                    'document.getElementById("nsModal").addEventListener("click", function(e){' +
                    'if(e.target.id === "nsModal"){ closeModal(); }' +
                    '});' +

                    'document.addEventListener("keydown", function(e){' +
                    'if(e.key === "Escape"){ closeModal(); }' +
                    '});' +

                    'calendar = new FullCalendar.Calendar(document.getElementById("calendar"), {' +
                    'initialView:"timeGridWeek",' +
                    // 'views:{' +
                    // '   timeGridWeek:{ buttonText:"Week" },' +
                    // '   dayGridMonth:{ buttonText:"Month" }' +
                    // '},' +

                    'firstDay:1,' +
                    'allDaySlot:false,' +
                    'expandRows:true,' +
                    'slotMinTime: "00:00:00",'+
                    'slotMaxTime: "24:00:00",' +  
                    'slotDuration: "00:30:00",' + 
                    'slotLabelInterval: "01:00:00",' +
                    'scrollTime: "00:00:00", ' +  
                    'slotLabelFormat: {' +
                'hour: "2-digit",' +
                'minute: "2-digit",' +
                'hour12: false' +
                '},' +

                'eventTimeFormat: {' +
                'hour: "2-digit",' +
                'minute: "2-digit",' +
                'hour12: false' +
                '},' +
                          'views:{' +
'   timeGridDay:{' +
'       buttonText:"Day",' +
'       dayHeaderFormat:{ weekday:"short", day:"numeric", month:"short", year:"numeric" }' +
'   },' +
'   timeGridWeek:{' +
'       buttonText:"Week",' +
'       dayHeaderFormat:{ weekday:"short", day:"numeric" }' +
'   },' +
'   dayGridMonth:{' +
'       buttonText:"Month",' +
'       dayHeaderFormat:{ weekday:"short" }' +
'   }' +
'},' +


                'timeZone: "local",' +       

                     
                    'headerToolbar:{ left:"today prev,next", center:"title", right:"" },' +
                   ' datesSet:function(){'+
                    'updateEventStats();'+
                '   var monthDropdown = document.getElementById("monthSelector");' +
'   if(monthDropdown){' +
'       var currentDate = calendar.getDate();' +
'       monthDropdown.value = currentDate.getFullYear() + "-" + currentDate.getMonth();' +
'   }' +

                '},'+
        
                    'events:[' +
                    //sports data
                    '{title:"Cricket Match",start:new Date(2026,1,22,14,0,0),amenity:"sport",subtype:"cricket"},' +
                    '{title:"Cricket Match",start:new Date(2026,1,23,14,0,0),amenity:"sport",subtype:"cricket"},' +
                    '{title:"Cricket ",start:new Date(2026,1,24,16,0,0),amenity:"sport",subtype:"cricket"},' +
                    '{title:"Football Game",start:new Date(2026,1,12,16,0,0),amenity:"sport",subtype:"football"},' +
                    '{title:"Cricket Match",start:new Date(2026,1,11,14,0,0),amenity:"sport",subtype:"cricket"},' +
                    '{title:"Cricket ",start:new Date(2026,1,20,14,0,0),amenity:"sport",subtype:"cricket"},' +
                    '{title:"Football Game",start:new Date(2026,1,25,16,0,0),amenity:"sport",subtype:"football"},' +
                    '{title:"Tennis Tournament",start:new Date(2026,1,24,10,0,0),amenity:"sport",subtype:"tennis"},' +
                    '{title:"Volleyball League",start:new Date(2026,1,21,18,0,0),amenity:"sport",subtype:"volleyball"},' +
                    // social tab data
                   '{title:"Parties",start:new Date(2026,1,20,15,30,30),amenity:"social",subtype:"party"},'+
                    '{title:"Business Meetup",start:new Date(2026,1,23,11,0,0),amenity:"social",subtype:"meetup"},'+
                    '{title:"Business Meetup",start:new Date(2026,1,22,11,0,0),amenity:"social",subtype:"meetup"},'+
                    '{title:"Tech Conference",start:new Date(Date.now()+360000),amenity:"social",subtype:"conference"},'+
                    '{title:"Social networking",start:new Date(Date.now()+360000),amenity:"social",subtype:"networking"},'+
                    '{title:"Social networking",start:new Date(2026,1,26,15,0,0),amenity:"social",subtype:"networking"},'+
                   //Concerts, festivals, fashion shows, and art exhibitions.
                    '{title:"Concerts",start:new Date(2026,1,23,14,0,0),amenity:"culture",subtype:"concerts"},' +
                    '{title:"festivals",start:new Date(2026,1,27,16,0,0),amenity:"culture",subtype:"festivals"},' +
                    '{title:"fashion shows",start:new Date(2026,1,28,10,0,0),amenity:"culture",subtype:"fashions"},' +
                    '{title:"Arts exhibition",start:new Date(2026,1,24,18,0,0),amenity:"culture",subtype:"exhibitions"},' +
                     //corporate events data

                     '{title:"conference",start:new Date(2026,1,20,15,30,30),amenity:"corporate",subtype:"conference"},'+
                     '{title:"conference",start:new Date(2026,1,20,12,30,30),amenity:"corporate",subtype:"conference"},'+
                     '{title:"business seminar",start:new Date(2026,1,29,14,30,0),amenity:"corporate",subtype:"seminars"},'+
                    '{title:"business seminar",start:new Date(2026,1,22,20,0,0),amenity:"corporate",subtype:"seminars"},'+
                    '{title:"Trade show",start:new Date(2026,1,21,22,30,30),amenity:"corporate",subtype:"trade show"},'+
                    '{title:"product launch",start:new Date(2026,1,17,21,30,30),amenity:"corporate",subtype:"product launch"},'+
                    '{title:" meeting",start:new Date(2026,1,18,22,30,30),amenity:"corporate",subtype:"meeting"},'+
                    '{title:"Product launch",start:new Date(2026,1,26,12,30,30),amenity:"corporate",subtype:"product launch"},'+

                    
                    //'{ title:"corporate Match", start:new Date(Date.now()+480000000), amenity:"corporate" }' +
                    '],' +
                    'eventDidMount:function(info){' +

' var now = new Date();' +
' var start = info.event.start;' +
' var end = info.event.end ? info.event.end : new Date(start.getTime() + 60*60000);' +

' if(end < now){' +
'     info.el.classList.add("past-event");' +
' }' +
' else if(start <= now && end >= now){' +
'     info.el.classList.add("present-event");' +
' }' +
' else {' +
'     info.el.classList.add("future-event");' +
' }' +

' info.el.addEventListener("mouseenter", function(e){' +

'   var tooltip = document.createElement("div");' +
'   tooltip.className = "fc-modern-tooltip";' +

'   var startTime = start.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});' +
'   var endTime   = end.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});' +

'   var statusText = "";' +
'   if(end < now){ statusText = "Past"; }' +
'   else if(start <= now && end >= now){ statusText = "Ongoing"; }' +
'   else { statusText = "Upcoming"; }' +

'   var subtype = info.event.extendedProps.subtype;' +
'   var slotInfo = "";' +

'   if(subtype && subtypeCounts[subtype]){' +
'       slotInfo =' +
'           "<div style=\\\'margin-top:8px;padding-top:6px;border-top:1px solid #eee;\\\'>" +' +
'           "<div><span class=\\\'label\\\'>Occupied:</span> <strong style=\\\'color:#d32f2f\\\'>" +' +
'           subtypeCounts[subtype].occupied +' +
'           "</strong></div>" +' +
'           "<div><span class=\\\'label\\\'>Remaining:</span> <strong style=\\\'color:#2e7d32\\\'>" +' +
'           subtypeCounts[subtype].remaining +' +
'           "</strong></div>" +' +
'           "</div>";' +
'   }' +

'   tooltip.innerHTML =' +
'       "<div class=\\\'tooltip-header\\\'>" +' +
'           "<div class=\\\'tooltip-icon\\\'><i class=\\\'fa-solid fa-calendar\\\'></i></div>" +' +
'           "<div>" +' +
'               "<div class=\\\'tooltip-title\\\'>" + info.event.title + "</div>" +' +
'               "<div class=\\\'tooltip-time\\\'>" + startTime + " - " + endTime + "</div>" +' +
'           "</div>" +' +
'       "</div>" +' +
'       "<div class=\\\'tooltip-body\\\'>" +' +
'           "<div><span class=\\\'label\\\'>Amenity:</span> " + (info.event.extendedProps.amenity || "-") + "</div>" +' +
'           "<div><span class=\\\'label\\\'>Subtype:</span> " + (info.event.extendedProps.subtype || "-") + "</div>" +' +
'           "<div><span class=\\\'label\\\'>Status:</span> " + statusText + "</div>" +' +
'           slotInfo +' +
'       "</div>";' +

'   document.body.appendChild(tooltip);' +
'   tooltip.style.left = (e.pageX + 15) + "px";' +
'   tooltip.style.top  = (e.pageY + 15) + "px";' +

'   info.el.addEventListener("mouseleave", function(){' +
'       tooltip.remove();' +
'   }, { once: true });' +

' });' +

' updateEventStats();' +

'info.el.addEventListener("mouseenter", function(){' +
'   if(info.el.querySelector(".fc-hover-minus")) return;' +

'   var icon = document.createElement("div");' +
'   icon.className = "fc-hover-minus";' +
'   icon.innerHTML = "<i class=\\\'fa-solid fa-minus\\\'></i>";' +

'   info.el.style.position = "relative";' +
'   icon.style.position = "absolute";' +
'   icon.style.top = "2px";' +
'   icon.style.right = "2px";' +
'   icon.style.zIndex = "30";' +

'   info.el.appendChild(icon);' +
'});' +

'info.el.addEventListener("mouseleave", function(){' +
'   var icon = info.el.querySelector(".fc-hover-minus");' +
'   if(icon) icon.remove();' +
'});' +
'},' +

                      'eventContent:function(arg){' +

                        ' var amenity = arg.event.extendedProps.amenity;' +
                        ' var subtype = arg.event.extendedProps.subtype;' +
                        ' var icon = "";' +

                        ' if(amenity === "sport"){' +
                        '   if(subtype === "cricket"){ icon = "<i class=\\\'fa-solid fa-baseball-bat-ball\\\'></i>"; }' +
                        '   else if(subtype === "football"){ icon = "<i class=\\\'fa-solid fa-futbol\\\'></i>"; }' +
                        '   else if(subtype === "tennis"){ icon = "<i class=\\\'fa-solid fa-table-tennis-paddle-ball\\\'></i>"; }' +
                        '   else if(subtype === "volleyball"){ icon = "<i class=\\\'fa-solid fa-volleyball\\\'></i>"; }' +
                        '   else{ icon = "<i class=\\\'fa-solid fa-trophy\\\'></i>"; }' +
                        '}' +

                        ' else if(amenity === "social"){' +
                        '   if(subtype === "party"){ icon = "<i class=\\\'fa-solid fa-champagne-glasses\\\'></i>"; }' +
                        '   else if(subtype === "meetup"){ icon = "<i class=\\\'fa-solid fa-handshake\\\'></i>"; }' +
                        '   else if(subtype === "conference"){ icon = "<i class=\\\'fa-solid fa-comments\\\'></i>"; }' +
                        '   else if(subtype === "networking"){ icon = "<i class=\\\'fa-solid fa-user-group\\\'></i>"; }' +
                        '   else{ icon = "<i class=\\\'fa-solid fa-users\\\'></i>"; }' +
                        '}' +

                        ' else if(amenity === "culture"){' +
                        '   if(subtype === "concerts"){ icon = "<i class=\\\'fa-solid fa-guitar\\\'></i>"; }' +
                        '   else if(subtype === "fashions"){ icon = "<i class=\\\'fa-solid fa-shirt\\\'></i>"; }' +
                        '   else if(subtype === "exhibitions"){ icon = "<i class=\\\'fa-solid fa-palette\\\'></i>"; }' +
                        '   else if(subtype === "festivals"){ icon = "<i class=\\\'fa-solid fa-masks-theater\\\'></i>"; }' +
                        '   else{ icon = "<i class=\\\'fa-solid fa-music\\\'></i>"; }' +
                        '}' +

                        ' else if(amenity === "corporate"){' +
                        '   if(subtype === "conference"){ icon = "<i class=\\\'fa-solid fa-people-roof\\\'></i>"; }' +
                        '   else if(subtype === "seminars"){ icon = "<i class=\\\'fa-solid fa-chalkboard-user\\\'></i>"; }' +
                        '   else if(subtype === "trade show"){ icon = "<i class=\\\'fa-solid fa-store\\\'></i>"; }' +
                        '   else if(subtype === "product launch"){ icon = "<i class=\\\'fa-solid fa-rocket\\\'></i>"; }' +
                        '   else if(subtype === "meeting"){ icon = "<i class=\\\'fa-solid fa-handshake-angle\\\'></i>"; }' +
                        '   else{ icon = "<i class=\\\'fa-solid fa-building-columns\\\'></i>"; }' +
                        '}' +

                        ' var statsText = "";' +

                        ' if(subtype && subtypeCounts[subtype]){' +
                        '   statsText =' +
                        '   "<div class=\\\'fc-event-stats\\\'>" +' +
                        '   " Occ: " +' +
                        '   subtypeCounts[subtype].occupied +' +
                        '   " | Rem: " +' +
                        '   subtypeCounts[subtype].remaining +' +
                        '   "</div>";' +
                        ' }' +

                        ' var timeText = arg.timeText ? arg.timeText : "";' +

                        ' var container = document.createElement("div");' +
                        ' container.innerHTML =' +
                        ' "<div class=\\\'fc-custom-event\\\'>" +' +
                        ' "<div class=\\\'fc-custom-time\\\'>" + timeText + "</div>" +' +
                        ' "<div class=\\\'fc-custom-title\\\'>" + icon + " " + arg.event.title + "</div>" +' +
                        ' statsText +' +
                        ' "</div>";' +

                        ' return { domNodes: [container] };' +

                        '},' +


                                'eventClick:function(info){' +
                        '   info.jsEvent.preventDefault();' +

                        '   var eventDate = info.event.start.getTime();' +
                        '   var eventTitle = encodeURIComponent(info.event.title);' +

                        '   var amenity = "";' +
                        '   if(info.event.extendedProps && info.event.extendedProps.amenity){' +
                        '       amenity = encodeURIComponent(info.event.extendedProps.amenity);' +
                        '   }' +

                        // '   openModal("/app/site/hosting/scriptlet.nl?script=customscript1000&deploy=customdeploy1&ifrmcntnr=T"' +
                        // '   + "&date=" + eventDate' +
                        // '   + "&title=" + eventTitle' +
                        // '   + "&amenity=" + amenity);' +
                        // '},'+
                        '   openModal("/app/site/hosting/scriptlet.nl?script=1014&deploy=1&ifrmcntnr=T"' +
'       + "&date=" + eventDate' +
'       + "&title=" + eventTitle' +
'       + "&amenity=" + amenity);' +
'},'+


                           'dateClick:function(info){' +
  
                    '   var now = new Date();' +
               
                    '   if(info.date.getTime() < now.getTime()){' +
                    '       alert("You cannot select past time.");' +
                    '       return;' +
                    '   }' +

                    '   var isBooked = calendar.getEvents().some(function(event){' +
                    '       return event.start.getTime() === info.date.getTime();' +
                    '   });' +

                    '   if(isBooked){' +
                    '       alert("Slot already booked!");' +
                    '       return;' +
                    '   }' +

                    '   var currentTime = Date.now();' +
                    '   var dbl = (currentTime - lastClickTime) < 300;' +
                    '   lastClickTime = currentTime;' +

                    '   if(dbl){' +
                    '       openModal("/app/site/hosting/scriptlet.nl?script=1014&deploy=1&ifrmcntnr=T&date=" + info.dateStr);' +
                    '   }' +

                    '},' +

                    '})'+
            ';'+
            
                            'function animateCalendarView(){' +
'   var calEl = document.getElementById("calendar");' +
'   calEl.classList.add("fc-view-fade");' +

'   setTimeout(function(){' +
'       calEl.classList.add("fc-view-fade-active");' +
'   },10);' +

'   setTimeout(function(){' +
'       calEl.classList.remove("fc-view-fade");' +
'       calEl.classList.remove("fc-view-fade-active");' +
'   },300);' +
'}'+
                'calendar.render();' +
                '   updateAmenityRules("all");' +
    'var calendarEl = document.getElementById("calendar");' +

'var hoverIcon = document.createElement("div");' +
'hoverIcon.className = "fc-hover-plus";' +
'hoverIcon.innerHTML = "<i class=\\\'fa-solid fa-plus\\\'></i>";' +
'hoverIcon.style.position = "absolute";' +
'hoverIcon.style.pointerEvents = "none";' +
'hoverIcon.style.zIndex = "100";' +
'hoverIcon.style.display = "none";' +

'calendarEl.appendChild(hoverIcon);' +

'calendarEl.addEventListener("mousemove", function(e){' +

'   var slot = e.target.closest(".fc-timegrid-slot-lane");' +

'   if(slot){' +

'       var calRect = calendarEl.getBoundingClientRect();' +

'       hoverIcon.style.left = (e.clientX - calRect.left - 11) + "px";' +
'       hoverIcon.style.top  = (e.clientY - calRect.top - 11) + "px";' +

'       hoverIcon.style.display = "flex";' +

'   } else {' +

'       hoverIcon.style.display = "none";' +

'   }' +

'});' +

'calendarEl.addEventListener("mouseleave", function(){' +
'   hoverIcon.style.display = "none";' +
'});'+
                    'var monthSelector = document.getElementById("monthSelector");' +

'if(monthSelector){' +

'   var today = new Date();' +
'   var currentYear = today.getFullYear();' +

'   for(var y = currentYear; y <= currentYear; y++){' +
'       for(var m = 0; m < 12; m++){' +

'           var date = new Date(y, m, 1);' +
'           var monthName = date.toLocaleString("default", { month: "long" });' +

'           var option = document.createElement("option");' +
'           option.value = y + "-" + m;' +
'           option.text  = monthName + " " + y;' +

'           monthSelector.appendChild(option);' +
'       }' +
'   }' +

'   monthSelector.value = today.getFullYear() + "-" + today.getMonth();' +
'}' +
                    'document.getElementById("statusFilter")'+
'.addEventListener("change", function(){'+
   ' activeStatus = this.value;'+
   'updateAmenityRules(activeAmenity);'+
    'applyFilters();'+
    
'});'+
                    'document.getElementById("amenityFilter")'+
'.addEventListener("change", function(){'+
    'activeAmenity = this.value;'+
    'activeSubtype = "all";'+
    'updateAmenityRules(activeAmenity);'+
    'applyFilters();'+
    
'});'+
'function updateAmenityRules(type){' +

'   var box = document.getElementById("amenityRulesBox");' +
'   if(!box) return;' +

'   var r = amenityRules[type] || amenityRules["all"];' +

'   var labelMap = {' +
'       all:"All Amenities",' +
'       sport:"Sport Amenity",' +
'       social:"Social Amenity",' +
'       culture:"Cultural Amenity",' +
'       corporate:"Corporate Amenity"' +
'   };' +

'   var selectedLabel = labelMap[type] || "All Amenities";' +

'   box.innerHTML =' +

'       "<div class=\\"amenity-section-title\\">Amenity Rules</div>" +' +

'       "<div style=\\"font-size:12px;color:#777;margin-top:4px;margin-bottom:8px;\\">" +' +
'           "Amenity Type: <strong style=\\"color:#2A3A76;\\">" + selectedLabel + "</strong>" +' +
'       "</div>" +' +

'       "<div class=\\"amenity-divider\\"></div>" +' +

'       "<div class=\\"rule-row\\">" +' +
'           "<div><i class=\\"fa-solid fa-hourglass-start\\"></i> Min Duration</div>" +' +
'           "<div class=\\"rule-value\\">" + r.min + "</div>" +' +
'       "</div>" +' +

'       "<div class=\\"rule-row\\">" +' +
'           "<div><i class=\\"fa-solid fa-hourglass-end\\"></i> Max Duration</div>" +' +
'           "<div class=\\"rule-value\\">" + r.max + "</div>" +' +
'       "</div>" +' +

'       "<div class=\\"rule-row\\">" +' +
'           "<div><i class=\\"fa-solid fa-calendar-check\\"></i> Advance Booking</div>" +' +
'           "<div class=\\"rule-value\\">" + r.advance + "</div>" +' +
'       "</div>" +' +

'       "<div class=\\"rule-row\\">" +' +
'           "<div><i class=\\"fa-solid fa-mug-hot\\"></i> Break Time</div>" +' +
'           "<div class=\\"rule-value\\">" + r.breakTime + "</div>" +' +
'       "</div>" +' +

'       "<div class=\\"rule-row\\">" +' +
'           "<div><i class=\\"fa-solid fa-users\\"></i> Capacity</div>" +' +
'           "<div class=\\"rule-value\\">" + r.capacity + "</div>" +' +
'       "</div>" +' +

'       "<div class=\\"rule-row\\">" +' +
'           "<div><i class=\\"fa-solid fa-circle-check\\"></i> Approval Required</div>" +' +
'           "<div class=\\"rule-value\\">" + r.approval + "</div>" +' +
'       "</div>";' +

'}' +
//                     'document.querySelectorAll(".view-tab").forEach(function(btn){' +

// '   btn.addEventListener("click", function(e){' +
// '       e.preventDefault();' +
// '       e.stopPropagation();' +


// '       document.querySelectorAll(".view-tab")' +
// '       .forEach(function(b){ b.classList.remove("active"); });' +

// '       btn.classList.add("active");' +

// '       var selectedView = btn.getAttribute("data-view");' +

// '       calendar.changeView(selectedView);' +

// '       if(selectedView === "dayGridMonth"){' +
// '           document.getElementById("calendar").style.height = "auto";' +
// '       } else {' +
// '           document.getElementById("calendar").style.height = "850px";' +
// '       }' +

// '       var currentDate = calendar.getDate();' +
// '       if(typeof miniCalendar !== "undefined"){ miniCalendar.gotoDate(currentDate); }' +
// '       return false;' +
// '   });' +

// '});' +
                    'document.getElementById("viewSelector").addEventListener("change", function(){' +
'   var selectedView = this.value;' +
'   calendar.changeView(selectedView);' +
'animateCalendarView();'+

'   if(selectedView === "dayGridMonth"){' +
'       document.getElementById("calendar").style.height = "auto";' +
'   } else {' +
'       document.getElementById("calendar").style.height = "600px";' +
'   }' +
'});' +
                    'var openBtn = document.getElementById("legendOpenBtn");' +
'var dialog = document.getElementById("legendDialog");' +
'var closeBtn = document.getElementById("legendCloseBtn");' +
'var newBtn = document.getElementById("newBtn");' +
'if(newBtn){' +
'   newBtn.addEventListener("click", function(){' +
'       openModal("/app/site/hosting/scriptlet.nl?script=customscript1000&deploy=customdeploy1&ifrmcntnr=T");' +
'   });' +
'}' +

'if(openBtn && dialog){' +
'   openBtn.onclick = function(){ dialog.style.display = "block"; };' +
'}' +

'if(closeBtn && dialog){' +
'   closeBtn.onclick = function(){ dialog.style.display = "none"; };' +
'}' +

              // updating the count of the remaining slots in the event
             'function updateEventStats(){' +

            'subtypeCounts = {};' +

            'calendar.getEvents().forEach(function(event){' +
            ' if(event.display === "none") return;' +

            ' var subtype = event.extendedProps.subtype;' +
            ' if(!subtype) return;' +

            ' if(!subtypeCounts[subtype]){' +
            '   subtypeCounts[subtype] = { occupied:0, remaining:0 };' +
            ' }' +

            ' subtypeCounts[subtype].occupied += 1;' +
            '});' +

            'Object.keys(subtypeCounts).forEach(function(key){' +
            ' var total = slotLimits[key] || 20;' +
            ' subtypeCounts[key].remaining = total - subtypeCounts[key].occupied;' +
            ' if(subtypeCounts[key].remaining < 0){' +
            '   subtypeCounts[key].remaining = 0;' +
            ' }' +
            '});' +

            // 'calendar.render();' +  

            '}' +





                    'updateEventStats();'+

                    'var miniCalendar = new FullCalendar.Calendar('+
                    ' document.getElementById("miniCalendar"),'+
                        '{'+
                        ' initialView: "dayGridMonth",'+
                        ' height: "auto",'+
                        ' headerToolbar: {'+
                                'left: "prev,next",'+
                            ' center: "title",'+
                                'right: ""'+
                        '  },'+
                        ' dateClick: function(info){'+
                            ' calendar.gotoDate(info.date);'+
                            'calendar.changeView("timeGridWeek", info.date);'+
                            'document.querySelectorAll("#miniCalendar tr")'+
                            '.forEach(function(row){'+
                            ' row.classList.remove("selected-week-row");'+
                        ' });'+

                       
                        'var clickedCell = info.dayEl;'+
                    ' var weekRow = clickedCell.closest("tr");'+

                    ' if(weekRow){'+
                            'weekRow.classList.add("selected-week-row");'+
                        '}'+
                                            '  }'+
                                        '    }'+
                                        ');'+

                    'miniCalendar.render();'+

                        'function highlightPastTime(){'+

                        'var now = new Date();'+

                        'var year  = now.getFullYear();'+
                        'var month = String(now.getMonth() + 1).padStart(2,"0");'+
                        'var day   = String(now.getDate()).padStart(2,"0");'+
                        'var todayStr = year + "-" + month + "-" + day;'+

                        'document.querySelectorAll(".past-time-slot").forEach(function(el){'+
                        '   el.classList.remove("past-time-slot");'+
                        '});'+

                        'var todayColumn = document.querySelector(".fc-timegrid-col[data-date=\'"+todayStr+"\']");'+

                        'if(!todayColumn) return;'+

                        'var lanes = todayColumn.querySelectorAll(".fc-timegrid-slot-lane");'+

                        'lanes.forEach(function(lane){'+

                        '   var timeAttr = lane.getAttribute("data-time");'+

                        '   if(timeAttr){'+
                        '       var slotDate = new Date(todayStr + "T" + timeAttr);'+

                        '       if(slotDate < now){'+
                        '           lane.classList.add("past-time-slot");'+
                        '       }'+
                        '   }'+

                        '});'+
                        '}'+

                        'highlightPastTime();'+
                        'setInterval(highlightPastTime, 60000);'+

                    //main tabs
                    'document.querySelectorAll(".amenity-tab").forEach(function(btn){' +
                    'btn.addEventListener("click", function(){' +

                    'document.querySelectorAll(".amenity-tab").forEach(function(b){ b.classList.remove("active"); });' +
                    'btn.classList.add("active");' +

                    'var selectedAmenity = btn.getAttribute("data-type");' +

                    'activeAmenity = selectedAmenity;' +
                    'activeSubtype = "all";' +
                      'updateAmenityRules(selectedAmenity);'+
                    'document.getElementById("sportSubTabs").style.display="none";' +
                    'document.getElementById("socialSubTabs").style.display="none";' +
                    'document.getElementById("cultureSubTabs").style.display="none";' +
                    'document.getElementById("corporateSubTabs").style.display="none";' +

                    'if(selectedAmenity !== "all"){' +
                    'var subDiv = document.getElementById(selectedAmenity + "SubTabs");' +
                    'if(subDiv){' +
                    'subDiv.style.display="block";' +
                    'subDiv.querySelectorAll("button").forEach(function(b){ b.classList.remove("active"); });' +
                    'var firstBtn = subDiv.querySelector("button");' +
                    'if(firstBtn){ firstBtn.classList.add("active"); }' +
                    '}' +
                    '}' +

                    'applyFilters1();' +
                    '});' +
                    '});' +


                    //sports sub tab
                    'document.querySelectorAll(".sport-tab").forEach(function(btn){' +
                    'btn.addEventListener("click", function(){' +
                    'document.querySelectorAll(".sport-tab").forEach(function(b){ b.classList.remove("active"); });' +
                    'btn.classList.add("active");' +
                    'activeAmenity="sport";' +
                    'activeSubtype=btn.getAttribute("data-sub");' +
                    'applyFilters1();' +
                    '});' +
                    '});' +


                    //social sub tab
                    'document.querySelectorAll(".social-tab").forEach(function(btn){' +
                    'btn.addEventListener("click", function(){' +
                    'document.querySelectorAll(".social-tab").forEach(function(b){ b.classList.remove("active"); });' +
                    'btn.classList.add("active");' +
                    'activeAmenity="social";' +
                    'activeSubtype=btn.getAttribute("data-sub");' +
                    'applyFilters1();' +
                    '});' +
                    '});' +


                    //culture sub tab
                    'document.querySelectorAll(".culture-tab").forEach(function(btn){' +
                    'btn.addEventListener("click", function(){' +
                    'document.querySelectorAll(".culture-tab").forEach(function(b){ b.classList.remove("active"); });' +
                    'btn.classList.add("active");' +
                    'activeAmenity="culture";' +
                    'activeSubtype=btn.getAttribute("data-sub");' +
                    'applyFilters1();' +
                    '});' +
                    '});' +


                    //corporate sub tab
                    'document.querySelectorAll(".corporate-tab").forEach(function(btn){' +
                    'btn.addEventListener("click", function(){' +
                    'document.querySelectorAll(".corporate-tab").forEach(function(b){ b.classList.remove("active"); });' +
                    'btn.classList.add("active");' +
                    'activeAmenity="corporate";' +
                    'activeSubtype=btn.getAttribute("data-sub");' +
                    'applyFilters1();' +
                    '});' +
                    '});' +
                    '});'+
                    '</script>';

                context.response.writePage(form);
            }
        }

        return { onRequest: onRequest };
    });
