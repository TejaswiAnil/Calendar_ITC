(function() {

    // Localize jQuery variable
    var jQuery;
    /******** Load jQuery if not present *********/
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.8.1') {
        var jQ_script_tag = document.createElement('script');
        jQ_script_tag.setAttribute("type","text/javascript");
        jQ_script_tag.setAttribute("src",
            window.location.protocol +"//"+window.location.host+"/WidgetCalendar/js/jQuery/jquery-1.8.1.min.js");
        if (jQ_script_tag.readyState) {
          jQ_script_tag.onreadystatechange = function () { // For old versions of IE
              if (this.readyState == 'complete' || this.readyState == 'loaded') {
                  scriptLoadHandler();
              }
          };
        } 
        else {
          jQ_script_tag.onload = scriptLoadHandler;
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(jQ_script_tag);
        
    } 
    else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        main();
    }

    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(false);    
        main();
    }

    /******** Our main function ********/
    function main() { 
        jQuery(document).ready(function($wjq) { 
            /******* Load External Libraries *******/
            var css_link = $wjq("<link>", { 
                rel: "stylesheet", 
                type: "text/css", 
                href: window.location.protocol +"//"+window.location.host+"/WidgetCalendar/css/full-calendar/fullcalendar.css" 
            });
            css_link.appendTo('head');  

            var css_link = $wjq("<link>", { 
                rel: "stylesheet", 
                type: "text/css", 
                href: window.location.protocol +"//"+window.location.host+"/WidgetCalendar/css/jquery/jquery-ui-1.8.23.css" 
            });
            css_link.appendTo('head'); 

            css_link = $wjq("<link>", { 
                rel: "stylesheet", 
                type: "text/css", 
                href: window.location.protocol +"//"+window.location.host+"/WidgetCalendar/css/style.css" 
            });
            css_link.appendTo('head'); 

            css_link = jQuery("<script>", { 
                type: "text/javascript", 
                src: window.location.protocol +"//"+window.location.host+"/WidgetCalendar/js/moment/moment.min.js" 
            });     
            css_link.appendTo('head');    

            css_link = jQuery("<script>", { 
                type: "text/javascript", 
                //src: window.location.protocol +"//"+window.location.host+"/WidgetCalendar/js/jQuery/jquery-ui-1.8.23.custom.min.js"
                src: window.location.protocol +"//"+window.location.host+"/WidgetCalendar/js/jQuery/jquery-ui-1.8.23.min.js" 
            });     
            css_link.appendTo('head');   

            css_link = jQuery("<script>", { 
                type: "text/javascript", 
                src: window.location.protocol +"//"+window.location.host+"/WidgetCalendar/js/full-calendar/fullcalendar.js" 
            });     
            css_link.appendTo('head');    

            css_link = jQuery("<script>", { 
                type: "text/javascript", 
                src: window.location.protocol +"//"+window.location.host+"/WidgetCalendar/js/script.js" 
            });     
            css_link.appendTo('head');      

            $wjq('#widget-calendar').load(window.location.protocol +"//"+window.location.host+"/WidgetCalendar/index.html");
            setTimeout(function(){      
                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();
                
                var resourceList = [
                        {
                            name: 'Resource 1',
                            id: 'resource1'
                        },
                        {
                            name: 'Resource 2',
                            id: 'resource2'
                        },
                        {
                            name: 'Resource 3',
                            id: 'resource3'
                        },
                        {
                            name: 'Resource 4',
                            id: 'resource4'
                        }
                    ];
                var calendarOptions = {
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay,resourceDay'
                    },
                    titleFormat: 'ddd, MMM dd, yyyy',
                    defaultView: 'month',
                    minTime:9,
                    maxTime:18,
                    slotMinutes : 15,
                    selectable: true,
                    selectHelper: true,
                    select: function(start, end, allDay, event, resourceId) {
                        var title = prompt('Event Title:');
                        if (title) {
                            console.log("@@ adding event " + title + ", start " + start + ", end " + end + ", allDay " + allDay + ", resource " + resourceId);
                            calendar.fullCalendar('renderEvent',
                            {
                                title: title,
                                start: start,
                                end: end,
                                allDay: allDay,
                                resourceId: resourceId
                            },
                            true // make the event "stick"
                        );
                        }
                        calendar.fullCalendar('unselect');
                    },
                    eventResize: function(event, dayDelta, minuteDelta) {
                        console.log("@@ resize event " + event.title + ", start " + event.start + ", end " + event.end + ", resource " + event.resourceId);
                    },
                    eventDrop: function( event, dayDelta, minuteDelta, allDay) {
                        console.log("@@ drag/drop event " + event.title + ", start " + event.start + ", end " + event.end + ", resource " + event.resourceId);
                    },
                    editable: true,
                    resources: resourceList,
                    events: [
                        {
                            title: 'All Day Event 1',
                            start: new Date(y, m, d - 1),
                            end: new Date(y, m, d + 1),
                            resourceId: 'resource1',
                            backgroundColor: '#27A0C9'
                        },
                        {
                            title: 'Short Event 1',
                            start: new Date(y, m, d, 11, 30),
                            end: new Date(y, m, d, 13, 00),
                            allDay: false,
                            resourceId: 'resource1',
                            backgroundColor: '#27A0C9'
                        },
                        {
                            title: 'Short Event 2',
                            start: new Date(y, m, d + 1, 14, 00),
                            end: new Date(y, m, d + 1, 15, 00),
                            allDay: false,
                            resourceId: 'resource1',
                            backgroundColor: '#27A0C9'
                        },
                        {
                            title: 'All Day Event 2',
                            start: new Date(y, m, d - 2),
                            end: new Date(y, m, d - 1),
                            resourceId: 'resource2',
                            backgroundColor: '#3F51B5'
                        },
                        {
                            title: 'Lunch',
                            start: new Date(y, m, d, 12, 0),
                            end: new Date(y, m, d, 14, 0),
                            allDay: false,
                            resourceId: 'resource2',
                            backgroundColor: '#3F51B5' 
                        },
                        {
                            title: 'All Day Event 3',
                            start: new Date(y, m, d),
                            resourceId: 'resource4'
                        },
                        {
                            title: 'Click for Google',
                            start: new Date(y, m, d, 16, 0),
                            end: new Date(y, m, d, 16, 30),
                            allDay: false,
                            url: 'http://google.com/',
                            resourceId: 'resource3'
                        }
                    ]
                };    
               
                    $wjq('#datepicker').datepicker({
                        buttonImage: window.location.protocol +"//"+window.location.host+"/WidgetCalendar/images/calendar.png",
                        buttonImageOnly: true,
                        changeMonth: true,
                        changeYear: true,
                        showOn: 'button',
                     });
              
                var calendar = $wjq('#calendar').fullCalendar(calendarOptions);
                $wjq("#addResource").click(function(){
                    var newResource = {
                        name:"Resource "+ (resourceList.length+1),
                        id:"resource"+ (resourceList.length+1)
                    };
                    resourceList.push(newResource);
                    calendar.fullCalendar("addResource",[newResource]);
                }); 
            },100);

       });
    }
})();
