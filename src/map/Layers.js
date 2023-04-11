import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"

export const layerPetaDasar = new TileLayer({
  source: new OSM(),
})
