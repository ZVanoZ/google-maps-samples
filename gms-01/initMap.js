'use strict';

var map;
let markersMap = new Map();
const initialMarkersInfo = new Map([
	['marker1id', {
		//myId: 'marker1id',
		position: {
			lat: 47.905802,
			lng: 33.282721
		},
		title: "Дамба, центр"
	}],
	['marker2id', {
		//myId: 'marker2id',
		position: {
			lat: 47.906082,
			lng: 33.284214
		},
		title: "Дамба, справа",
		icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
	}]
]);

const AppInitMap = () => {
	console.log('initMap.js/AppInitMap');
	let options = {
		center: {
			// Сидней
			//lat: -34.397, lng: 150.644
			// Кривой Рог
			lat: 47.905802, lng: 33.282721
		},
		zoom: 15
	};
	map = new google.maps.Map(document.getElementById('map'), options);
	map.addListener('rightclick', function (event) {
		let id = 'rightclick-' + Date.now();
		addMarker(id, event.latLng, id+'-title', '../img/marker.png')
	});
	map.addListener('click', function (event) {
		console.log('map/click', arguments);
		add2log('map/click/lat:' + event.latLng.lat() + '; lng:' + event.latLng.lng())
		document.getElementById('lat').value = event.latLng.lat();
		document.getElementById('lng').value = event.latLng.lng();
	});

	let markerCnr = 0;
	initialMarkersInfo.forEach((item, id) => {
		addMarker(id, item.position, item.title, item.icon)
	});

	let marker = new google.maps.Marker({
		//position: map.getCenter(),
		position: {
			lat: 47.907768,
			lng: 33.281946
		},
		icon: {
			size: new google.maps.Size(220, 220),
			scaledSize: new google.maps.Size(16, 16),
			origin: new google.maps.Point(0, 0),
			url: document.AppData.dataUrl.url_0,
			anchor: new google.maps.Point(16, 16)
		},
		map: map
	});
};

document.getElementById('buttonMarkerAdd').addEventListener('click', (event) => {
	const id = Date.now().toString();
	let position = {
		lat: parseFloat(document.getElementById('lat').value),
		lng: parseFloat(document.getElementById('lng').value)
	};
	addMarker(id, position, id + '-title', '../img/marker.png')
});

function addMarker(id, position, title, icon) {
	let marker = new google.maps.Marker({
		myId: id,
		map: map,
		position: position,
		title: title,
		icon: icon,
		clickable: true,
		animation: google.maps.Animation.DROP
		//label: '#'
	});
	marker.set('myId', id);
	marker.addListener('click', function (event) {
		add2log('marker/click/' + marker.get('myId'));
		console.log('marker/click', {
			arguments: arguments,
			myId: marker.get('myId'),
			target: event.target,
			marker: markersMap.get(marker.get('myId'))
		});
	});
	markersMap.set(id, marker);
	add2log('addMarker/Добавлена метка/' + id + '/' + position.lat + ';' + position.lng);
}

const add2log = (data) => {
	const logEl = document.getElementById('log');
	let elRow = document.createElement('div');
	elRow.innerHTML = '[' + Date.now() + ']' + data;
	if (logEl.firstChild) {
		logEl.insertBefore(elRow, logEl.firstChild);
	} else {
		logEl.appendChild(elRow);
	}
};