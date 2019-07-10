console.log('initMap.js', {
	document : document
});
function AppInitMap() {
	console.log('initMap.js/AppInitMap');
	let map = new google.maps.Map(document.getElementById('map'),{
		center: {
			// Кривой Рог
			lat: 47.905802, lng: 33.282721
		},
		zoom: 10
	});
}
