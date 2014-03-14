document.onkeyup = KeyCheck;   
//window.alert(document.onkeyup);

//Initialize();
function Initialize()
{
	var HTML = document.getElementsByTagName('body')[0];
	var OldHTML = HTML.innerHTML;
	var NewHTML = "<div id='AddBar' style='display: none'><textarea id='TxtAddress' rows='1' cols='45' style='position: absolute; left: 7px; top: " + 
		(window.pageYOffset + 7) + "px; font-size: 24px; z-index: 1000;'></textarea></div>";
	//var NewHTML = "<input type='text' id='TxtAddress' style='position: absolute; top: 1%; left: 1%; z-index: 1000' />";
	var GenHTML = NewHTML + OldHTML;
	HTML.innerHTML = GenHTML;
	//setTimeout("window.onload()", 1000);
	//window.onload();
}

var BlnAlt = false;
var IntCount = 0;
var BlnPrepareReset = false;

function Reset()
{
	//window.alert("Reset" + IntCount);
	IntCount = 0;	
	BlnPrepareReset = false;
}

function KeyCheck()
{
	//window.alert("ldkjfdkjf");
   var KeyID = event.keyCode;
   switch(KeyID)
   {
    	case 18:
			// Alt key pressed.
			//window.alert(window.pageYOffset);
			if (IntCount >= 1)
			{
				IntCount = 0;
				Initialize();
				document.getElementById("AddBar").style.display = "block";
				var TxtBox = document.getElementById("TxtAddress");
				TxtBox.focus();
			}
			else
			{
				IntCount++;
				if (BlnPrepareReset == false)
				{
					BlnPrepareReset = true;
					window.setTimeout("Reset()", 3000);
				}
			}
			break;
		case 27:
			// Escape key pressed.
			document.getElementById("AddBar").style.display = "none";
			break;
		case 13:
			// Enter key pressed.
			if (document.getElementById("AddBar").style.display == "block")
			{
				var StrURL = document.getElementById("TxtAddress").value;
				StrURL = StrURL.toLowerCase();
				var StrHTTP = StrURL.substring(0, 6);
				if (StrHTTP != "http://")
					StrURL = "http://" + StrURL;
				window.location = StrURL;
			}
			break;
   }
}