/**
 * Copyright (c) 2011 Wind Li
 */

AutoPagerNS.browser = AutoPagerNS.extend (AutoPagerNS.namespace("browser"),
{
    open_alert : function (title,message,link,callback,options)
    {
        var doc = AutoPagerNS.getContentDocument()
        if(doc)
        {
            this.add_alert(doc,title,message,link,callback,options)
        }        
    }
    ,
    add_alert :function(doc,title,message,link,callback,options){
        if (!doc) return;

        // Make sure we have only one notification per document
        var id = "AutoPager-NotificationBanner-" + doc.URL.length;
        autopagerAlert.clearState();
        if (doc.getElementById(id)) return;

        var div = doc.createElement("div");
        var overEvent = "onmouseover='document.documentElement.setAttribute(\"over\",true);' onmouseout='document.documentElement.setAttribute(\"over\",false);'";
        var str = "<div style='cursor:move;height:18px;background-color: gray;margin:0px;width:100%;' class='autoPagerS' "
        + overEvent + " >"
        +"<table valign='top' cellpadding='0' cellspacing='0' id='autoPagerBorderOptionsTitle' class='autoPagerS' style='margin:0px;width:100%' "+ overEvent + ">"
        +"<tbody class='autoPagerS'><tr class='autoPagerS' ><td class='autoPagerS'  width='80%'><a alt='" + autopagerUtils.autopagerGetString("alertexplain") +"' target='_blank' href='http://autopager.teesoft.info/alert'><b class='autoPagerS'>"
        +autopagerUtils.autopagerGetString("autopageralert")  + "</b></a></td><td class='autoPagerS'  width='10%' align='right'>"
        + "<a target='_blank' title='Help' href='http://autopager.teesoft.info/help.html'><img  class='autoPagerS'  style='border: 0px solid ; width: 9px; height: 7px;' alt='Help'  src='" + autopagerUtils.getContentImage("question.png") +  "'></a>"
        + "</td><td class='autoPagerS'  width='10%' align='right'>"
        + "<a name='close' title='Close'  href='javascript:void(0)'><img name='close' class='autoPagerS'  style='border: 0px solid ; width: 9px; height: 7px;' alt='Close'  src='" + autopagerUtils.getContentImage("vx.png") +  "'></a></td></tr></tbody></table></div> "
        + "<table><tr><td><a target='_blank' href='" + link + "'><img src='" + autopagerUtils.getContentImage("autopager48.png") +  "' alt='AutoPager'></a></td>"
        + "<td><span style='color:black;'>" + title + ": </span>"
        + "<a name='callback' href='javascript:void(0)'>" + message + "</a></td></tr></table>";
        var style = autopagerMain.getOptionStyle();
        div.className="autoPagerS";


        if (style.length>0)
            div.style.cssText = style;
        div.innerHTML = str;
        
        div.style.background =
        div.style.backgroundColor= "rgb(239, 235, 231)";
        
        // Container spacing and border
        div.style.margin = "0px";
        div.style.padding = "6px";
        div.style.border = "1px solid";
        div.style.borderColor =
        "ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight";
        div.style.position="fixed";
        div.style.zIndex= 2147483647;
        //div.style.width = "100%";
        div.style.width = "200px";
        div.style.top= AutoPagerNS.getContentWindow().innerHeight + "px";
        div.style.right =  "10px";
        div.style.height = "70px";
        div.style.display="block"

        div.id = id;
        doc.body.parentNode.insertBefore(div, doc.body);
        div.addEventListener("click",function(e){
            if (e.target.name)
            {
                switch(e.target.name)
                {
                    case "close":
                        autopagerAlert.onAlertClose();
                        break;
                    case "callback":
                        autopagerAlert.clearState();
                        if (callback)
                            callback();
                        break;
                }
            }
        },true)
        //AutoPagerNS.getContentWindow().scroll(0,0);
        try{
            autopagerAlert.onLoad(div);            
        }catch(e)
        {
            alert(e)
        }
    }    
    ,open_notification : function (id,message,buttons,callback,options){
        var doc = AutoPagerNS.getContentDocument()
        if(doc)
            this.add_notification(doc,id,message,buttons,callback,options)

    }
    ,
    add_notification : function (doc,id,message,buttons,callback,options){
    
            if (!doc) return;

            // Make sure we have only one notification per document
            id = "AutoPager-Notification-" + id;
            if (doc.getElementById(id)) return;
            var node = doc.body.previousSibling;
            while(node){
                if (node.id == id)
                    return;
                node= node.previousSibling;
            }

            var div = doc.createElement("div");
            
            var width = message.length * 1.1;
            var table = doc.createElement("table");
            table.style.width="99%";
            div.appendChild(table);
            var tr = doc.createElement("tr");
            table.appendChild(tr);
            var td = doc.createElement("td");
            tr.appendChild(td);
            td.style.width= width + "%";
            var container = doc.createElement("div");
            td.appendChild(container);
            tr.appendChild(td);
            
            var img = doc.createElement('img');
            img.setAttribute('src',autopagerUtils.getContentImage("autopager48.png"));
            img.style.cssText="width:32px;height:32px";
            container.appendChild(img);
            var msgbox = doc.createElement('b');
            msgbox.style.cssText="vertical-align:top;";
            msgbox.textContent = message;
            container.appendChild(msgbox);
            //div.appendChild(doc.createElement('br'));
            
            td = doc.createElement("td");
            tr.appendChild(td);
            td.style.width= (99-width) + "%";
            td.align="right"
            container = doc.createElement("div");
            td.appendChild(container);
            
            td = doc.createElement("td");
            td.width="1%";
            td.align="right"
            tr.appendChild(td);
            td.innerHTML = "<a name='close' title='Close'  href='javascript:void(0)'><img name='close' class='autoPagerS'  style='border: 0px solid ; width: 9px; height: 7px;' alt='Close'  src='" + autopagerUtils.getContentImage("vx.png") +  "'></a>";
            
            div.addEventListener("click",function(e){
                if (e.target.name)
                {
                    switch(e.target.name)
                    {
                        case "close":
                            div.parentNode.removeChild(div);
                            break;
                        case "callback":
                            if (callback)
                                callback();
                            break;
                    }
                }
            },true)
        
            var btb = doc.createElement("table");
            container.appendChild(btb);
            var btr = doc.createElement("tr");
            btb.appendChild(btr);
            
            for(var i=0;i<buttons.length;i++)
            {
                //not support popup yet
                if (buttons[i].popup)
                    continue;
                var button = doc.createElement('input');
                button.setAttribute('type','button');
                button.setAttribute('value',buttons[i].label);
                button.setAttribute('id',i);
                var btd = doc.createElement("td");
                btr.appendChild(btd);
                button.style.padding = "6px";
                button = btd.appendChild(button)
                button.addEventListener('click',function(event){
                    callback({
                        "notification_id":id,
                        "button":event.target.id
                    });
                    div.parentNode.removeChild(div);
                },false)
            }
            div.style.position="fixed";
            div.style.zIndex= 2147483647;
            div.style.width="100%";
            div.style.background =
            div.style.backgroundColor= "rgb(239, 235, 231)";
        
            div.style.borderColor =
            "ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight";
            div.style.top= "0px";
            div.style.display="block"            
            
            doc.body.parentNode.insertBefore(div, doc.body);

        }
    
});

var autopagerAlert=
{
    gFinalHeight : 70,
    gSlideIncrement : 4,
    gSlideTime : 100,
    gOpenTime : 5000,
    gOpenTimeAfterLinkClick : 3000, // Close 3 second after clicking on the link
    gPermanent : false, // should the window stay open permanently (until manually closed)

    g_MAX_HEIGHT : 134,
    title : null,
    message : null,
    link : null,
    div : null,
    onLoad : function(div)
    {
        var me = autopagerAlert;
        me.div = div;
        if(typeof sizeToContent == "function")
            sizeToContent();        
        me.gFinalHeight = div.scrollHeight;  //134  5 lines - 152 6 lines
        if ( me.gFinalHeight > me.g_MAX_HEIGHT ) {
            me.gFinalHeight = me.g_MAX_HEIGHT;
        }

        me.outerHeight = 1;
        // be sure to offset the alert by 10 pixels from the far right edge of the screen
        //AutoPagerNS.getContentWindow().moveTo( (screen.availLeft + screen.availWidth - AutoPagerNS.getContentWindow().outerWidth) - 10, screen.availTop + screen.availHeight); //- AutoPagerNS.getContentWindow().outerHeight
        AutoPagerNS.getContentWindow().setTimeout(me._animateAlert, me.gSlideTime);
    }
    ,
    prefillAlertInfo : function()
    {
        var me = autopagerAlert;
        var args
        if (typeof AutoPagerNS.getContentWindow().arguments != "undefined")
        {
            args = AutoPagerNS.getContentWindow().arguments
        }else
        {
            args = opener.arguments
        }
        me.title = args[0];
        me.message = args[1];
        me.link = args[2];
        me.callback = args[3];
        if (typeof args[4] != "undefined")
            me.gOpenTime = args[4];

        var msgLabel = document.getElementById("message");
        msgLabel.value=me.message;
        msgLabel.textContent = me.message;
        var titleLabel = document.getElementById("title");
        titleLabel.value=me.title;
        titleLabel.textContent = me.title;
    },
    onAlertClick : function()
    {
        if (autopagerAlert.callback)
            autopagerAlert.callback({})
        else
            AutoPagerNS.add_tab({url:autopagerAlert.link});
    },
    onLinkClick : function(aEvent)
    {
        if (autopagerAlert.callback)
            autopagerAlert.callback({})
        else
            AutoPagerNS.add_tab({url:autopagerAlert.link});
        // Close the alert soon
        autopagerAlert.onAlertClose(autopagerAlert.gOpenTimeAfterLinkClick);
        
        // Don't open the sidebar
        aEvent.stopPropagation();
    },

    onAlertClose: function(timeout)
    {
        var me = autopagerAlert;
        me._closing=true
        if (!timeout)
            timeout=10;
        AutoPagerNS.getContentWindow().setTimeout(autopagerAlert._closeAlert, timeout);
    },
    _animateAlert : function()
    {
        var me = autopagerAlert;
        if (me._closing)
            return;
        if (me.outerHeight < me.gFinalHeight) {
            //            me.div.screenY -= me.gSlideIncrement;
            me.outerHeight += me.gSlideIncrement;
            me.div.style.top = (AutoPagerNS.getContentWindow().innerHeight-me.outerHeight) + "px";
        
            AutoPagerNS.getContentWindow().setTimeout(me._animateAlert, me.gSlideTime);
        } else {
            if (!me.gPermanent) {
                autopagerAlert.onAlertClose(me.gOpenTime);
            }
        }
    },

    _closeAlert : function()
    {
        var me = autopagerAlert;
        if (!me._closing)
            return;
        if (me.outerHeight > 1)
        {
            //            me.div.screenY += me.gSlideIncrement;
            me.outerHeight -= me.gSlideIncrement;
            me.div.style.top = (AutoPagerNS.getContentWindow().innerHeight-me.outerHeight) + "px";
            AutoPagerNS.getContentWindow().setTimeout(me._closeAlert, me.gSlideTime);
        }
        else
        {
            me.clearState();
        }
    }
    ,
    clearState : function (){
        var me = autopagerAlert;
        me._closing=false;
        if (me.div)
            me.div.parentNode.removeChild(me.div);
        me.div = null;        
    }
}
