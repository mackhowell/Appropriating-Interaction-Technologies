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
  gclient_geocode();
    // console.log("Latitude : " + position.coords.latitude + " " + "Longitude : " + position.coords.longitude);
});

var maps_key = "ABQIAAAATfHumDbW3OmRByfquHd3SRTRERdeAiwZ9EeJWta3L_JZVS0bOBRQeZgr4K0xyVKzUdnnuFl8X9PX0w";

function gclient_geocode(address) {
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            encodeURIComponent(address) + '&sensor=false';
  var request = new XMLHttpRequest();

  request.open('GET', url, true);
  // console.log(url);
  request.onreadystatechange = function (e) {
    // console.log(request, e);
    if (request.readyState == 4) {
      if (request.status == 200) {
        var json = JSON.parse(request.responseText);
        var latlng = json.results[0].geometry.location;
        latlng = latlng.lat + ',' + latlng.lng;
        // console.log("latlng = " + latlng);

        // var src = "https://maps.google.com/staticmap?center=" + latlng +
        //           "&markers=" + latlng + "&zoom=14" +
        //           "&size=512x512&maptype=hybrid&sensor=false&key=" + maps_key;

        var src = "https://maps.google.com/maps/api/staticmap?size=512x512&path=color:0xFF33CC|weight:7|" + window.myLatitude + "," + window.myLongitude + "|" + window.tabCoords + "&sensor=false";
        // console.log('Here is the source: ' + src);
        // console.log('My Lat/Long = ' + window.myLatitude + ', ' + window.myLongitude);
        var map = document.getElementById("map");

        map.src = src;
        map.addEventListener('click', function () {
          window.close();
        });
      } else {
        console.log('Unable to resolve address into lat/lng');
      }
    }
  };
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
  // console.log('address = ' + address);
  if (address)
    gclient_geocode(address);
}

// chrome.pageAction.onClicked.addListener(function(tab) {
//     // reloadExtension(dilnjceabgnibnmlfhmplfpefifolgjc);
//     console.log("IM ABOUT TO RELOAD EXTENSION");
//     chrome.runtime.reload();
// });

window.onload = map;


