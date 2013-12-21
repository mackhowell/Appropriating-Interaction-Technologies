/////////////////////////////////////////
// Mack Howell
// 2014
/////////////////////////////////////////

var id = "dilnjceabgnibnmlfhmplfpefifolgjc";
function reloadExtension(id) {
    chrome.management.setEnabled(id, false, function() {
        chrome.management.setEnabled(id, true);
    });
}
// Global accessor that the popup uses.
var addresses = {};
var selectedAddress = null;
var selectedId = null;
// ------------- Start of IP finder script --------------- //
var tabToHost = {};
var hostToIP = {};

function processUrl(tabId, url) {
    // Get the host part of the URL. 
    var host = /^(?:ht|f)tps?:\/\/([^/]+)/.exec(url);
    // Map tabId to host
    tabToHost[tabId] = host ? host=host[1] : '';
    if (host && !hostToIP[host]) { // Known host, unknown IP
        hostToIP[host] = 'N/A';    // Set N/A, to prevent multiple requests
        // Get IP from a host-to-IP web service
        var x = new XMLHttpRequest();
        x.open('GET', 'http://www.fileformat.info/tool/rest/dns.json?q=' + host);
        x.onload = function() {
            var result = JSON.parse(x.responseText);
            if (result && result.answer && result.answer.values && result.answer.values[0]) {
                // Lookup successful, save address
                hostToIP[host] = result.answer.values[0].address;
                setPopupInfo(tabId);
                  // ------------- Start of Geoplugin script (turns IP into Lat/Long) ------------- //
                  var IPGeo = new XMLHttpRequest();
                  IPGeo.open('GET', 'http://www.geoplugin.net/json.gp?ip=' + hostToIP[host], true);
                  IPGeo.onload = function() {
                    if (IPGeo.readyState == 4) {
                      // var geopluginLat;
                      // var geopluginLong;
                      var resp = JSON.parse(IPGeo.responseText);
                      var tabLatBackground = resp.geoplugin_latitude;
                      var tabLongBackground = resp.geoplugin_longitude;
                      tabCoordinates = tabLatBackground + ',' + tabLongBackground;
                      //Replace hostToIP array with coordinates instead of IPs
                      hostToIP[host] = tabCoordinates;
                      // console.log('hostToIP = ' + hostToIP[host]);
                      console.log('Coords = ' + hostToIP[host]);
                    }
                  }
                  IPGeo.send();
                  // ------------- End of Geoplugin script -------------//
             }
         };
         x.send();
    }
    // Set popup info, with currently (un)known information
    setPopupInfo(tabId);
}
function setPopupInfo(tabId) { // Notify all popups
    chrome.extension.getViews({type:'popup'}).forEach(function(global) {
        global.notify(tabId);
    });
}
// Remove entry from tabToIp when the tab is closed.
chrome.tabs.onRemoved.addListener(function(tabId) {
    delete tabToHost[tabId];
});
// Init: Get all windows and tabs, to fetch info for current hosts
chrome.windows.getAll({populate: true}, function(windows) {
    windows.forEach(function(win) {
        if (win.type == 'normal' && win.tabs) {
            for (var i=0; i<win.tabs.length; i++) {
                processUrl(win.tabs[i].id, win.tabs[i].url);
                // console.log('win.tabs[i].url = ' + win.tabs[i].url);
            }
        }
    });
});
// ------------- End of IP finder script --------------- //
function updateAddress(tabId) {
  chrome.tabs.sendRequest(tabId, {}, function(address) {
    console.log('im inside updateAddress. here is the address that was passed: ' + address);
    addresses[tabId] = address;
    if (!address) {
      chrome.pageAction.show(tabId);
    } else {
      chrome.pageAction.show(tabId);
      if (selectedId == tabId) {
        updateSelected(tabId);
      }
    }
  });
}
function updateSelected(tabId) {
  selectedAddress = addresses[tabId];
  if (selectedAddress)
    chrome.pageAction.setTitle({tabId:tabId, title:selectedAddress});
}
chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status == "complete") {
    updateAddress(tabId);
    chrome.runtime.reload()
  }
  // From IP Finder script
  // if (changeInfo.status === 'loading' && changeInfo.url) {
  //   processUrl(tabId, tab.url); // or changeInfo.url, does not matter
  // }
});
chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  selectedId = tabId;
  updateSelected(tabId);
});
// Ensure the current selected tab is set up.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  updateAddress(tabs[0].id);
});
