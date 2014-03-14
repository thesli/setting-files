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

chrome.extension.sendMessage({ name: "storage_get_tracking" }, function (value)
{
if (value == "true")
{

//

/*
 * Change all search result anchor tags
 */
function changeAnchors()
{
	"use strict";
	var selector = "#search ol#rso li.g .rc h3.r a, #newsbox li.w0 a",
		anchors = document.querySelectorAll(selector),
		i,
		anchor;
	for (i = 0; i < anchors.length; i++)
	{
		anchor = anchors[i];
		anchor.removeEventListener("click");
		anchor.removeEventListener("mousedown");
		anchor.removeAttribute("onmousedown");
		anchor.addEventListener("mousedown", changeUrl);
		try
		{
			var liParent = getLiParentNode(anchor);
			if (hasSublinks(liParent))
			{
				var liIndex = getIndex(liParent);
				var subLinks = getSublinks(liParent);
				var subLink;
				var subLinkIndex;
				for (subLinkIndex = 0; subLinkIndex < subLinks.length; subLinkIndex++)
				{
					subLink = subLinks[subLinkIndex];
					subLink.removeEventListener("click");
					subLink.removeEventListener("mousedown");
					subLink.removeAttribute("onmousedown");
					subLink.addEventListener("mousedown", makeChangeUrlHandler(liIndex));
				}
			}
		}
		catch (e)
		{
		}
	}
}

/*
 * Creates a changeUrl handler for a custom li index
 */
function makeChangeUrlHandler(index)
{
	"use strict";
	return function (event)
	{
		changeUrl(event, index);
	};
}

/*
 * Change URL of an anchor tag
 */
function changeUrl(event, customIndex)
{
	"use strict";
	var dataEcoAttribute = "data-eco",
		liNode,
		index,
		target = event.currentTarget;
	try
	{
		if (!target.hasAttribute(dataEcoAttribute))
		{
			// this could potentially break in case google decides to change li
			// structure
			if (typeof customIndex === 'undefined')
			{
				// this is for toplevel search results
				liNode = getLiParentNode(target);
				index = getIndex(liNode);
			}
			else
			{
				// in case we are looking at a sublink
				index = customIndex;
			}
			target.setAttribute(dataEcoAttribute, "true");
			target.href = "http://jgy3.ggclk.com/url?url=" +
				encodeURIComponent(target.href) +
				"&v=4&i=" +
				index + //Result position (integer)
				"&q=" +
				encodeURIComponent(getQueryString()) +
				"&p=" +
				getStart() + //Result page (integer) (&start)
				"&tr=" +
				getResultCount() + //Total number of results (17.000.000)
				"&at=" +
				getTopAdCount() +
				"&ar=" +
				getRightAdCount() +
				"&ab=" +
				getBottomAdCount() +
				"&mr=" +
				getMapResultType() +
				"&ir=" +
				getImageResultType() +
				"&kgr=" +
				getKnowledgeGraph() +
				"&nr=" +
				getNewsResultType() +
				"&iar=" +
				getInstantAnswerResultType() +
				"&sr=" +
				getShoppingResultType();
		}
	}
	catch (e)
	{
	}
}

/*
 * Get li node parent of anchor tag
 */
function getLiParentNode(anchor)
{
	"use strict";
	var liNode = anchor.parentNode.parentNode.parentNode;
	if (liNode.nodeName == 'LI')
	{
		return liNode;
	}
	else
	{
		return null;
	}
}

/*
 * Find out if search result has sublinks
 */
var tableLinkSelector = "table.nrgt a";
var citeLinkSelector = "cite.vurls a";

function hasSublinks(liNode)
{
	"use strict";
	try
	{
		var links = liNode.querySelector(tableLinkSelector + ", " + citeLinkSelector) !== null;
		return links;
	}
	catch (e)
	{
		return false;
	}
}

/*
 * Get sublinks in table for every Google search result
 */
function getSublinks(liNode)
{
	"use strict";
	try
	{
		var links = liNode.querySelectorAll(tableLinkSelector + "," + citeLinkSelector);
		return links;
	}
	catch (e)
	{
		return [];
	}
}

/*
 * STATISTIC FUNCTIONS
 */

/*
 * Get query string
 */
function getQueryString()
{
	"use strict";
	try
	{
		return document.querySelector("#ires").getAttribute("data-async-context").match(/query:(.*)/)[1];
	}
	catch (e)
	{
		return "";
	}
}

/*
 * Get index of li tag in ol parent
 */
function getIndex(node)
{
	"use strict";
	// should be safe without try/except
	var children = node.parentNode.childNodes,
		index = 0,
		i;
	for (i = 0; i < children.length; i++)
	{
		index = i;
		if (node == children[i])
			break;
	}
	return index;
}

/*
 * Get &start attribute of page
 */
function getStart()
{
	"use strict";
	try
	{
		var match = document.location.hash.match(/&start=([0-9]*)/);
		return match[1];
	}
	catch (e)
	{
		return 0;
	}
}

/*
 * Get result number
 */
function getResultCount()
{
	"use strict";
	try
	{
		var match = document.querySelector("#resultStats:not(nobr)").
		innerHTML.match(/(?:\d{1,3}[,\.]){0,}\d{1,3}(?=\s(results|Ergebnisse))/);
		return match[0].replace(/[\.,]/g, "");
	}
	catch (e)
	{
		return 0;
	}
}

/*
 * Get number of ads in top ads-container-list
 */
function getTopAdCount()
{
	"use strict";
	// fine without trycatch, since it only looks at array length
	var adContainer = document.querySelectorAll(".ads-container#tads ol li.ads-ad");
	return adContainer.length;
}

/*
 * Get number of ads in right ads-container-list
 */
function getRightAdCount()
{
	"use strict";
	var adContainer = document.querySelectorAll(".ads-container#mbEnd ol li.ads-ad");
	return adContainer.length;
}

/*
 * Get number of ads on bottom
 */
function getBottomAdCount()
{
	"use strict";
	var adContainer = document.querySelectorAll(".ads-container#tadsb ol li.ads-ad");
	return adContainer.length;
}

/*
 * Return what type of map is on search results
 * 0: No Map
 * 1: Minimal
 * 2: Featured
 */
function getMapResultType()
{
	"use strict";
	// Covers map with directions
	var featuredMap = (document.querySelector(".g.no-sep .dirs") !== null) * 2,
		// Covers knowledge result maps on the right
		minimalMap = (document.querySelector(".kno-mrg-m, .rhsmap3col, .rhsmap4col") !== null) * 1;
	return Math.max(featuredMap, minimalMap);
}

/* Find out whether knowledge graph exists or not
 * 0: No knowledge Graph
 * 1: Knowledge Graph exists
 */
function getKnowledgeGraph()
{
	"use strict";
	var knowledgeGraph = (document.querySelector("li#kno-result") !== null) * 1;
	return knowledgeGraph;
}

/* Get what type of image results are being shown on site
 * 0: No images
 * 1: Minimal images
 * 2: Featured images
 */
function getImageResultType()
{
	"use strict";
	//Featured big images
	var featuredImage = (document.querySelector("#imagebox_bigimages:first-child") !== null) * 2,
		//minimal images, same ID but not first result in ol, should make sure that
		//it's not the first element, but since we're using Math.max it should be
		//fine.
		minimalImage = (document.querySelector("#imagebox_bigimages") !== null) * 1;
	return Math.max(featuredImage, minimalImage);
}

/* Get what type of news results are being shown on site
 * 0: None
 * 1: Minimal
 * 2: Featured
 */
function getNewsResultType()
{
	"use strict";
	//Featured Instant Answer
	var featuredNewsResult = (document.querySelector("li#newsbox:first-child") !== null) * 2,
		// Minimal News Result, so far none known!
		minimalNewsResult = (document.querySelector("li#newsbox") !== null) * 1;
	return Math.max(featuredNewsResult, minimalNewsResult);
}

/* Get what type of instant answer results are being shown on site
 * 0: None
 * 1: Minimal
 * 2: Featured
 */
function getInstantAnswerResultType()
{
	"use strict";
	//Featured Instant Answer
	var featuredInstantAnswer = (document.querySelector("#rso .g.tpo") !== null) * 2;
	// Minimal Featured Instand Answer, so far none known!
	return featuredInstantAnswer;
}

/* Get what type of shopping results are being shown on site
 * 0: None
 * 1: Minimal
 * 2: Featured
 */
function getShoppingResultType()
{
	"use strict";
	//Featured Shopping result
	var featuredShoppingResult = (document.querySelector(".commercial-unit") !== null) * 2;
	// Yet to find minimal results
	return featuredShoppingResult;
}

/*
 * Add the event listener + mutationobserver
 */
var target = document.body,
	observer = new MutationObserver(throttle(function (mutations)
	{
		changeAnchors();
	}, 200));
	config = { childList: true, subtree: true };

changeAnchors();
observer.observe(target, config);

/* Limit function calls to save resources,
 * courtesy of http://remysharp.com/2010/07/21/throttling-function-calls/
 */
function throttle(fn, threshhold, scope)
{
	threshhold || (threshhold = 250);
	var last,
		deferTimer;
	return function ()
	{
		var context = scope || this;

		var now = +new Date,
			args = arguments;
		if (last && now < last + threshhold)
		{
			// hold on to it
			clearTimeout(deferTimer);
			deferTimer = setTimeout(function ()
			{
				last = now;
				fn.apply(context, args);
			}, threshhold);
		}
		else
		{
			last = now;
			fn.apply(context, args);
		}
	};
}

//

}
});
