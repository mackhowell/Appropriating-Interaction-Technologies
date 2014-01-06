~~ENDPOINTS~~
<br>
<br>
A Chrome Extension that connects you to where those litte packets come from.
<br>
<br>
How to:<br>
1. Background script gets Lat / Long of the tab you're on using:<br>
	a. http://www.fileformat.info/tool/rest/dns.json?q= {IP ADDRESS}<br>
	b. http://freegeoip.net/ then turns that IP into Lat/Long<br>
<br>
2. Then in popup.js:<br>
navigator.geolocation.getCurrentPosition() is used to get your Lat/Long.<br>
<br>
3.Combine it all together. 
<br>
Screenshots!
<br>

![Al Jazeera](https://raw.github.com/mackhowell/Appropriating-Interaction-Technologies/master/images/hot-to-find-a-website-aljazeera.png)

![Brasil.gov](https://raw.github.com/mackhowell/Appropriating-Interaction-Technologies/master/images/hot-to-find-a-website-brazil.png)

![niconico](https://raw.github.com/mackhowell/Appropriating-Interaction-Technologies/master/images/hot-to-find-a-website-niconico.png)

![nytimes](https://raw.github.com/mackhowell/Appropriating-Interaction-Technologies/master/images/hot-to-find-a-website-nytimes.png)