/////////////////////////////////////////
// Mack Howell
// 2014
/////////////////////////////////////////

//New Geolocation function
navigator.geolocation.getCurrentPosition(function(position) {
  var myLatitude = (position.coords.latitude);
  var myLongitude = (position.coords.longitude);
  window.myLongitude = myLongitude;
  window.myLatitude = myLatitude;
  drawMap();
    // console.log("Latitude : " + position.coords.latitude + " " + "Longitude : " + position.coords.longitude);
});

var maps_key = "ABQIAAAATfHumDbW3OmRByfquHd3SRTRERdeAiwZ9EeJWta3L_JZVS0bOBRQeZgr4K0xyVKzUdnnuFl8X9PX0w";

function drawMap(address) {
        var src = "https://maps.google.com/maps/api/staticmap?size=512x512&path=color:0xFF33CC|weight:7|" + window.myLatitude + "," + window.myLongitude + "|" + window.tabCoords + "&sensor=false";
        var map = document.getElementById("map");
        map.src = src;
        map.addEventListener('click', function () {
          window.close();
        });
  request.send(null);
}
// console.log('Im right before the stuff I pasted');
// ---- Start popup.js from IP script ----
// Get initial tab and window ID
var tabId, windowId;
chrome.tabs.query({active:true, currentWindow:true, windowType:'normal'},
  function(tabs) {
    if (tabs[0]) {
        // Found current tab
        window.tabId = tabs[0].id;
        windowId = tabs[0].windowId;
        requestUpdate();
        // console.log('Im inside the stuff I pasted');
    }
});
// Receive tab ID updates
chrome.tabs.onActivated.addListener(function(activeInfo) {
    if (activeInfo.windowId === windowId) {
        requestUpdate();
    }
});

// Communication with background:
var background = chrome.extension.getBackgroundPage();
    // var host = background.tabToHost[tabId] || '';
    // var ip = host && background.hostToIP[host] || 'N/A';
    // console.log('Here is the IP = ' + ip);

// Backgrounds calls notify()
function notify(tabId, url, ip) {
    if (tabId === window.tabId) { // Tab == current active tab
        requestUpdate();
    }
}
// Get fresh information from background
function requestUpdate() {
    // tabId is the current active tab in this window
    var host = background.tabToHost[tabId] || '';
    var ip = host && background.hostToIP[host] || 'N/A';
    var tabCoords = ip;
    window.tabCoords = tabCoords;
    // Now, do something. For example:
    // document.getElementById('host').textContent = host;
    // document.getElementById('ip').textContent = ip;
    // console.log('IP of tab = ' + ip);
    console.log('Lat/Long of tab = ' + tabCoords);
}
// ---- End of popup.js from IP script ----

function map() {
  var address = chrome.extension.getBackgroundPage().selectedAddress;
  //  var myAddress = chrome.extension.getBackgroundPage().myAddres;
  console.log("selectedAddress = " + selectedAddress);
  if (address)
    drawMap(address);
}

window.onload = map;


