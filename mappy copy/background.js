// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Global accessor that the popup uses.
var addresses = {};
var selectedAddress = null;
var selectedId = null;

function updateAddress(tabId) {
  chrome.runtime.sendMessage({message: 'hi'}, function(address) {
    // console.log("i'm inside the UpdateAddress function in Background.js");
    console.log("here is the address:" + address.Address);
    addresses[tabId] = address;
    if (!address) {
      //changed from .hide to make always visible
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
  console.log("I'm inside the updateSelected function");
  selectedAddress = addresses[tabId];
  if (selectedAddress)
    chrome.pageAction.setTitle({tabId:tabId, title:selectedAddress});
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  console.log("just added a listener to chrome tabs");
  if (change.status == "complete") {
    updateAddress(tabId);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  selectedId = tabId;
  updateSelected(tabId);
});

// Ensure the current selected tab is set up.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  updateAddress(tabs[0].id);
});
