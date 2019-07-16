'use strict';

var map;
const AppInitMap = () => {
	console.log('initMap1.js/AppInitMap');
	let options = {
		center: {
			// Сидней
			//lat: -34.397, lng: 150.644
			// Кривой Рог
			lat: 47.905802, lng: 33.282721
		},
		zoom: 15
	};
	let map = new google.maps.Map(document.getElementById('map'), options);

	let markers = [{
		myId : 'marker1id',
		position: {
			lat: 47.905802,
			lng: 33.282721
		},
		title: "Дамба, центр"
	}, {
		myId : 'marker2id',
		position: {
			lat: 47.906082,
			lng: 33.284214
		},
		title: "Дамба, справа",
		icon : 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
	}];
	markers.forEach((item, index) => {
		//console.log('item', item);
		let marker = new google.maps.Marker({
			myId1 : item.myId,
			position: item.position,
			map: map,
			title: item.title,
			//icon : 'http://ostranah.ru/media/flags/ukraine_small_flag.gif'
			icon : item.icon,
			clickable : true,
			shape : {
				type : 'circle',
				coords :[10, 20, 30]
			},
			animation: google.maps.Animation.DROP,
			label : '$'.repeat(index+1)
		});
		marker.set('myId', item.myId);
		marker.addListener('click', function (event) {
			console.log('marker/click', {
				arguments: arguments,
				myId : marker.get('myId'),
				myId1 : marker.get('myId1'),
				target : event.target
			});
		});
	});


	var marker = new google.maps.Marker({
		//position: map.getCenter(),
		position : {lat : 47.907768, lng : 33.281946},
		icon: {
			size: new google.maps.Size(220, 220),
			scaledSize: new google.maps.Size(16, 16),
			origin: new google.maps.Point(0, 0),
			url: document.AppData.dataUrl.url_0,
			anchor: new google.maps.Point(16, 16)
		},
		map: map
	});
	var winInfo = new google.maps.InfoWindow({
		content: '<h3>Это мое место</h3><p>Простое описание места</p>'
	});
	marker.addListener('click', () => {
		winInfo.open(map, marker);
	});
};