// setup touch event handling
window.L.Map.mergeOptions({
  touchExtend: true,
});
window.L.Map.TouchExtend = window.L.Handler.extend({
  initialize: function (map) {
    this._map = map;
    this._container = map._container;
    this._pane = map._panes.overlayPane;
  },

  addHooks: function () {
    window.L.DomEvent.on(
      this._container,
      "touchstart",
      this._onTouchStart,
      this
    );
    window.L.DomEvent.on(this._container, "touchend", this._onTouchEnd, this);
    window.L.DomEvent.on(this._container, "touchmove", this._onTouchMove, this);
  },

  removeHooks: function () {
    window.L.DomEvent.off(this._container, "touchstart", this._onTouchStart);
    window.L.DomEvent.off(this._container, "touchend", this._onTouchEnd);
    window.L.DomEvent.off(this._container, "touchmove", this._onTouchMove);
  },

  _onTouchEvent: function (e, type) {
    if (!this._map._loaded) {
      return;
    }

    var touch = e.touches[0];
    var containerPoint = window.L.point(touch.clientX, touch.clientY);
    var layerPoint = this._map.containerPointToLayerPoint(containerPoint);
    var latlng = this._map.layerPointToLatLng(layerPoint);
    this._map.fire(type, {
      latlng: latlng,
      layerPoint: layerPoint,
      containerPoint: containerPoint,
      originalEvent: e,
    });
  },

  _onTouchStart: function (e) {
    this._onTouchEvent(e, "touchstart");
  },
  _onTouchMove: function (e) {
    this._onTouchEvent(e, "touchmove");
  },
  _onTouchEnd: function (e) {
    if (!this._map._loaded) {
      return;
    }
    this._map.fire("touchend", {
      originalEvent: e,
    });
  },
});
window.L.Map.addInitHook("addHandler", "touchExtend", window.L.Map.TouchExtend);

let centerLoc = [parseFloat(document.getElementById('map').dataset.lat), parseFloat(document.getElementById('map').dataset.lon)];

let map = window.L.map("map", {
  center: centerLoc,
  zoom: 14,
  dragging: !L.Browser.mobile,
  tap: !L.Browser.mobile,
  attributionControl: false,
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let regIcon = new L.Icon({
  iconUrl: "https://abortion.ca.gov/images/marker-icon-2x.png",
  shadowUrl: "https://abortion.ca.gov/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
let marker = L.marker(centerLoc, {
  icon: regIcon,
  keyboard: false,
  riseOnHover: true,
  highlight: "temporary",
}).addTo(map);

let note_popup = undefined;
map.on(
  "touchmove",
  function (e) {
    let nbrTouches = e.originalEvent.touches.length;
    // alert("got touch event " + nbrTouches);
    let singleTouchPromptContent = document.querySelector(
      "#single-touch-prompt-content"
    ).innerHTML;
    if (nbrTouches == 1 && note_popup == undefined) {
      note_popup = L.popup()
        .setLatLng(map.getCenter())
        .setContent(singleTouchPromptContent)
        .openOn(map);
    } else if (nbrTouches != 1 && note_popup) {
      note_popup.close();
      note_popup = undefined;
    }
  }.bind(this)
);

map.on(
  "touchend",
  function (e) {
    if (note_popup != undefined) {
      note_popup.close();
      note_popup = undefined;
    }
  }.bind(this)
);
