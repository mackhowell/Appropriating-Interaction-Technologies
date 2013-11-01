console.log('THIS IS THE CONTENT SCRIPT');

// The background page is asking us to find an address on the page.
// if (window == top) {
  chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
    console.log('IM IN THE MESSAGE REQUEST');
    sendResponse(findAddress());
  });
// }

// Search the text nodes for a US-style mailing address.
// Return null if none is found.
var findAddress = function() {
console.log('IM IN FINDADDRESS');
}

