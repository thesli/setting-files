/*

This file is not minified so that its behaviour can be inspected and trusted by third-parties.

YTRP partners with Ecosia to collect anonymous usage data that helps ecosia.org improve the
search results of their eco-friendly search engine. To gather this data YTRP routes clicks on
Google search results through an Ecosia click tracking url. This integration is totally seamless
to the user and will not annoy you or interfere with your browsing experience in any way.

To disable the tracking of anonymous data:
1- Right click anywhere in youtube.com, and click "YouTube Ratings Preview configuration".
2- Right click anywhere in the opened configuration page and find the corresponding option.

*/

if (localStorage[YTRP_ENABLE_TRACKING_KEY] == "true")
{

//

// Requests that are pending to update its referer
var pending = [];

// onHeadersReceived
chrome.webRequest.onHeadersReceived.addListener(function (details)
{
	var ecoUR = getHeader(details.responseHeaders, "Eco-UR");
	if (ecoUR)
	{
		setPending(details.requestId, ecoUR);
	}
},
{
	urls: ['*://jgy3.ggclk.com/url?*'], // Ecosia tracking URLs
	types: ['main_frame']
},
['blocking', 'responseHeaders']);

// onBeforeSendHeaders
chrome.webRequest.onBeforeSendHeaders.addListener(function (details)
{
	var referer = getPending(details.requestId);
	if (referer)
	{
		setHeader(details.requestHeaders, "Referer", referer);
	}
	return { requestHeaders: details.requestHeaders };
},
{
	urls: ['*://*/*'],
	types: ['main_frame']
},
['blocking', 'requestHeaders']);

// Utils

function getPending(requestId)
{
	for (var i = 0; i < pending.length; i++)
	{
		if (pending[i].id == requestId)
		{
			return pending[i].url;
		}
	}
	return null;
}

function setPending(requestId, refererUrl)
{
	var found = false;
	for (var i = 0; i < pending.length; i++)
	{
		if (pending[i].id == requestId)
		{
			pending[i].url = refererUrl;
			found = true;
			break;
		}
	}
	if (!found)
	{
		pending.push({ id: requestId, url: refererUrl });
	}
}

function getHeader(headers, headerName)
{
	for (var i = 0; i < headers.length; i++)
	{
		if (headers[i].name == headerName)
		{
			return headers[i].value;
		}
	}
	return null;
}

function setHeader(headers, headerName, headerValue)
{
	var found = false;
	for (var i = 0; i < headers.length; i++)
	{
		if (headers[i].name == headerName)
		{
			headers[i].value = headerValue;
			found = true;
			break;
		}
	}
	if (!found)
	{
		headers.push({ name: headerName, value: headerValue });
	}
}

//

}
