var addClickberryCheck    =   function () {
    
    try {
    
        var d = document.getElementsByTagName('head')[0];

        if (!d) {
//            console.log("No head");
            window.onload   =   function () {
                addCheck();
            };
            return false;
        } else {

            var meta    =   document.createElement('meta');
            meta.setAttribute("content",'clickberry-extension-here');

            document.getElementsByTagName('head')[0].appendChild(meta);

            document.getElementsByTagName('html')[0].className      =  document.getElementsByTagName('html')[0].className   + " clickberry-extension";
            document.getElementsByTagName('html')[0].className      =  document.getElementsByTagName('html')[0].className   + " clickberry-extension-standalone";
 
        }
    
    } catch (e) {
//        console.log("Can't append");
    }
    
    
};

addClickberryCheck();
