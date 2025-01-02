// /* eslint-disable */
// console.log('hello from client side');
// const locations = JSON.parse(document.getElementById('map').dataset.locations);
// console.log(locations);

// export const displayMap = (locations) => {
//   mapboxgl.accessToken = 'accessToken';

//   var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: [-74.006, 40.7128],
//     zoom: 10,
//   });

//   const bounds = new mapboxgl.LngLatBounds();

//   locations.forEach((loc) => {
//     const el = document.createElement('div');
//     el.className = 'marker';
//     new mapboxgl.Marker({
//       element: el,
//       anchor: 'bottom',
//     })
//       .setLngLat(loc.coordinates)
//       .addTo(map);

//     new mapboxgl.popup({
//       offset: 30,
//     })
//       .setLngLat(loc.coordinates)
//       .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`);

//     bounds.extend(loc.coordinates);
//   });

//   map.fitBounds(bounds, {
//     padding: {
//       top: 50,
//       bottom: 150,
//       left: 50,
//       right: 50,
//     },
//   });
// };
