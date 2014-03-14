//
// everypage_end.js
//
//

// BUG WORKAROUND:
//
// late is an exact duplicate of early.  We need it because current
// builds of Chromium don't load document_start scripts for images
// and pdf files, so for those, we do the work in document_end.
//
var late = everypage;

if(typeof(everyPageCode) == "undefined")
{
       everyPageCode = late;
    late.init();
}

// Process any sulitebarapi command elements.
if(everyPageCode.pageType == everyPageCode.PAGE_SITE)
{
    var cmds = document.getElementsByTagName("sulitebarapi");
    if(cmds)
    {
        for(var i=0; i<cmds.length; i++)
        {
            var cmd = cmds[i].getAttribute("cmd");
            switch(cmd)
            {
            case "reload":
                chrome.extension.sendMessage({ type:"RELOADTOOLBAR" });
                break;
            }
        }
    }
}
