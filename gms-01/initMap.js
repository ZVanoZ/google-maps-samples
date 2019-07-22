'use strict';

var map;
let markersMap = new Map();
let activeMarker = undefined;
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

	// let marker = new google.maps.Marker({
	// 	//position: map.getCenter(),
	// 	position: {
	// 		lat: 47.907768,
	// 		lng: 33.281946
	// 	},
	// 	icon: {
	// 		size: new google.maps.Size(220, 220),
	// 		scaledSize: new google.maps.Size(16, 16),
	// 		origin: new google.maps.Point(0, 0),
	// 		url: document.AppData.dataUrl.url_0,
	// 		anchor: new google.maps.Point(16, 16)
	// 	},
	// 	map: map
	// });
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
		metadata : {
			id : id,
			icon : icon
		},
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
		if (activeMarker){
			activeMarker.setIcon(activeMarker.get('metadata').icon);
		}
		activeMarker = markersMap.get(marker.get('myId'));
		add2log('marker/click/id=' + activeMarker.get('myId'));
		console.log('marker/click', {
			arguments: arguments,
			myId: activeMarker.get('myId'),
			target: event.target,
			marker: activeMarker
		});
		marker.setIcon({
			url : '../img/marker-active.png',
			scaledSize: new google.maps.Size(32, 32),
		});
	});
	markersMap.set(id, marker);
	add2log('addMarker/Добавлена метка/' + id + '/'
		+ ('function' === typeof(position.lat) ? position.lat() : position.lat) + ';'
		+ ('function' === typeof(position.lng) ? position.lng() : position.lng) + ';'
	);
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