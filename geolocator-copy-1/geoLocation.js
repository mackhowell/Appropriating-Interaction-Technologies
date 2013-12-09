// Getting Geo Location 
function getGeoLocation() {
		
	if(navigator.geolocation) {
		
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	}
	else {
		
		document.getElementById("errorMsg").innerText = "ERROR: browser does not support geo location";
	}
}

// Getting Geo Location success callback
function successCallback(position) {

	// Output the coordinates
	document.getElementById("latitude").innerHTML = "Latitude: " + (+position.coords.latitude).toFixed(6);
	document.getElementById("longitude").innerHTML = "Longitude: " + (+position.coords.longitude).toFixed(6);
	document.getElementById("accuracy").innerHTML = "Accuracy: " + position.coords.accuracy + " m";
	
	// Show location on Google Map
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	var myOptions = {
		zoom: getZoomLevel(position.coords.accuracy),
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	
	var marker = new google.maps.Marker({
		position: latlng,
		map: map,
		title:"Your Location"
	});
	
	var circle = new google.maps.Circle({
		map: map,
		radius: position.coords.accuracy,
		fillOpacity: 0.0,
		strokeColor: '#0000FF',
		strokeOpacity: 0.5
	});
	
	circle.bindTo('center', marker, 'position');
}

// Getting Geo Location error callback
function errorCallback(error) {
	
	switch(error.code) {
		
		case error.TIMEOUT:
			document.getElementById("errorMsg").innerHTML = "ERROR: " + error.message;
			break;
			
		default:
			document.getElementById("errorMsg").innerHTML = "ERROR: " + error.message;
	};
}

// Get map zoom level corresponding to the locaiton's accuracy
function getZoomLevel(accuracy) {
	
	if(2000 >= accuracy) {
		return 13;
	}
	else if(4000 >= accuracy) {
		return 12;
	}
	else if(8000 >= accuracy) {
		return 11;
	}
	else if(16000 >= accuracy) {
		return 10;
	}
	else {
		return 9;
	}
}
