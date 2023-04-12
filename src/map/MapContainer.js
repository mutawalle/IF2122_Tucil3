import Map from "ol/Map"
import View from "ol/View"

export const map = new Map({
  target: undefined,
  view: new View({
    projection: "EPSG:4326",
    center: [107.61015427712877, -6.890970434684029],
    zoom: 16,
  }),
})
