var map = L.map('map').setView([34.1123495573206, -117.31944347283586], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

this.regIcon = new L.Icon({
  iconUrl: 'https://abortion.ca.gov/images/marker-icon-2x.png',
  shadowUrl: 'https://abortion.ca.gov/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
let marker = L.marker([34.1123495573206, -117.31944347283586],{icon:this.regIcon, keyboard:false,riseOnHover:true,highlight: 'temporary'}).addTo(map);
