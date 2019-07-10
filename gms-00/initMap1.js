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
		position: {
			lat: 47.905802,
			lng: 33.282721
		},
		title: "Дамба, центр"
	}, {
		position: {
			lat: 47.906082,
			lng: 33.284214
		},
		title: "Дамба, справа"
	}];
	markers.forEach((item) => {
		let marker = new google.maps.Marker({
			position: item.position,
			map: map,
			title: item.title,
			//icon : 'http://ostranah.ru/media/flags/ukraine_small_flag.gif'
		});
	});


	var marker = new google.maps.Marker({
		position: map.getCenter(),
		icon: {
			size: new google.maps.Size(220, 220),
			scaledSize: new google.maps.Size(32, 32),
			origin: new google.maps.Point(0, 0),
			url: document.AppData.dataUrl.url_0,
			anchor: new google.maps.Point(16, 16)
		},
		map: map
	});
	var winInfo = new google.maps.InfoWindow({
	  content : '<h3>Это мое место</h3><p>Простое описание места</p>'
	});
	marker.addListener('click', ()=>{
	   winInfo.open(map, marker);
	});
};