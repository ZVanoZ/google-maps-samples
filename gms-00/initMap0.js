'use strict';

function AppInitMap(){
	console.log('initMap0.js/AppInitMap');
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
		title : "Дамба, центр"
	}, {
		position: {
			lat: 47.906082,
			lng: 33.284214
		},
		title : "Дамба, справа"
	}];
	markers.forEach((item) => {
		let marker = new google.maps.Marker({
			position: item.position,
			map: map,
			title : item.title
		});
	});
}