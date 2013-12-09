ENDPOINTS

A Chrome Extension that connects me and where those packets come from.

How to:
Background script gets Lat / Long of the tab you're on using:
1. http://www.fileformat.info/tool/rest/dns.json?q={IP ADDRESS}
2. http://www.geoplugin.com/ then turns that IP into Lat/Long

Then in popup.js:
navigator.geolocation.getCurrentPosition() is used to get your ip address.

Screenshots!


![Al Jazeera](https://raw.github.com/mackhowell/Appropriating-Interaction-Technologies/master/images/hot-to-find-a-website-aljazeera.png)

![Brasil.gov](https://raw.github.com/mackhowell/Appropriating-Interaction-Technologies/master/images/hot-to-find-a-website-brazil.png)

![niconico](https://raw.github.com/mackhowell/Appropriating-Interaction-Technologies/master/images/hot-to-find-a-website-niconico.png)

![nytimes](https://raw.github.com/mackhowell/Appropriating-Interaction-Technologies/master/images/hot-to-find-a-website-nytimes.png)