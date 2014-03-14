var Clickberry          =   {
    
    init        :   function (container) {
        Clickberry.API.init(container);
    }
    
};

Clickberry.API          =   {
    
    
    init                    :   function (container) {
        Clickberry.UI.Button.draw(container);
        Clickberry.API.checkClickberryState();
    },
    
    
    checkClickberryState    :   function () {
        
        Clickberry.API.getClickberryState();
        setInterval(function () {
            Clickberry.API.getClickberryState();
        }, 1000);
        
    },
    
    getClickberryState  :   function () {
      
        chrome.extension.sendMessage({type: "getClickberryState"}, function(response) {
            
            localStorage['ClickberryState']   =   response.state;
            
            if (response.state === "true") {
                Clickberry.UI.Button.setStatus(true);
            } else {
                Clickberry.UI.Button.setStatus(false);
            }
            
        });
        
    },
    

    setClickverryState  :   function (state) {
        
        console.log("set state: ",state);
        
        chrome.extension.sendMessage({type: "setClickberryState", state:state}, function(response) {
            console.log("set state response: ", response);
        });
        
    },
    
};


Clickberry.UI       =   {
  
    
    Button      :   {
        
        container   :   "",
        
        button      :   null,
        id          :   'clickberrySwitchAddon',
        
        checked     :   false,
        
        draw        :   function (container) {
        
            Clickberry.UI.Button.container  =   document.getElementById(container);
            
            Clickberry.UI.Button.button     =   document.createElement('span');
            Clickberry.UI.Button.button.id  =   Clickberry.UI.Button.id;
            
            Clickberry.UI.Button.container.appendChild(Clickberry.UI.Button.button);
            
            var onclick     =   function () {

                if (Clickberry.UI.Button.checked) {
                    Clickberry.UI.Button.setStatus(false);
                    Clickberry.API.setClickverryState("false");
                } else {
                    Clickberry.UI.Button.setStatus(true);
                    Clickberry.API.setClickverryState("true");
                }


            };
            
            Clickberry.UI.Button.button.addEventListener('click', onclick);
            Clickberry.UI.Button.button.addEventListener('onclick', onclick);
            
            
        
        },
        
        
        
        setStatus   :   function (status) {
            
            var classN   =   Clickberry.UI.Button.button.className;
            
            if (status) {

                Clickberry.UI.Button.checked    =   true;
                if (!(classN.indexOf("checked") > -1)) {
                    Clickberry.UI.Button.button.className   +=  " checked";
                }
                
            } else {
                
                Clickberry.UI.Button.checked    =   false;
                Clickberry.UI.Button.button.className   =   classN.replace("checked");
                
            }
        }
        
    }
    
    
};


window.onload   =   function () {
    Clickberry.init("clickberryContainer");
};