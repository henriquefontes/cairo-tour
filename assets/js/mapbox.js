mapboxgl.accessToken =
  "pk.eyJ1IjoiaGVucmlxdWUwMDciLCJhIjoiY2xwczltZmRoMDFlaTJqbWx5eW53ZjVkZSJ9.gmY4F9A7gqbJTLsQdhgWBQ";

const map = new mapboxgl.Map({
  container: "mapa-container",
  style: "mapbox://styles/mapbox/streets-v12",
  center: [31.19, 30.7],
  zoom: 7,
});
