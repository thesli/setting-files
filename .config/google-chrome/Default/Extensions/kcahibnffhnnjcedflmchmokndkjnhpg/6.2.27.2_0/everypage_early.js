//
// everypage_early.js
//
// This content script gets injected into every page, enabling us to inject the StumbleUpon lite toolbar
// into the DOM of the page.
//

var early = everypage;

// We only do early for the top-level frame.  The litebar and site functionality is loaded late, just
// as images and pdf files are loaded late.
//
everyPageCode = early;
early.init();
