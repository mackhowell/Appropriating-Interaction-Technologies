ENDPOINTS
<br>
<br>
A Chrome Extension that connects me to where those litte packets come from.
<br>
How to:<br>
Background script gets Lat / Long of the tab you're on using:<br>
1. http://www.fileformat.info/tool/rest/dns.json?q= {IP ADDRESS}<br>
2. http://www.geoplugin.com/ then turns that IP into Lat/Long<br>
<br>
Then in popup.js:<br>
navigator.geolocation.getCurrentPosition() is used to get your ip address.<br>
<br>
<br>
Screenshots!
<br>

![Al Jazeera](https://raw.github.com/mackhowell/Appropriating-Interaction-Technologies/master/images/hot-to-find-a-website-aljazeera.png)

![Brasil.gov](https://raw.github.com/mackhowell/Appropriating-Interaction-Technologies/master/images/hot-to-find-a-website-brazil.png)

![niconico](https://raw.github.com/mackhowell/Appropriating-Interaction-Technologies/master/images/hot-to-find-a-website-niconico.png)

![nytimes](https://raw.github.com/mackhowell/Appropriating-Interaction-Technologies/master/images/hot-to-find-a-website-nytimes.png)