import Map from "ol/Map"
import View from "ol/View"

export const map = new Map({
  target: undefined,
  view: new View({
    projection: "EPSG:4326",
    center: [107.610316,-6.890628],
    zoom: 16,
  }),
})
