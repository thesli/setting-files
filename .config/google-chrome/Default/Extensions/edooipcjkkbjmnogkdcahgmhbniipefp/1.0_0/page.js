function addlink(){
var link       =document.createElement("a");
link.setAttribute("class",'hiddenlink');
link.href = '#';
link.onclick = function() {
	chrome.extension.sendRequest({'show': true});
	return false;
	};
	
link.setAttribute( "accesskey", 't' );
document.getElementsByTagName("body")[0].appendChild(link);

}

addlink();

var text;
function getText(){

//var re= /<\S[^><]*>/g;
//text = document.body.innerText.replace(re,"").toLowerCase();
text = document.body.innerText.toLowerCase();
}

getText();

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {

   console.log(document.location+':'+text.match(request.query));

    if (text.match(request.query))
      sendResponse({found: true, tabid: request.tabid});
    else
      sendResponse({found: false, tabid: request.tabid}); // snub them.
  });



