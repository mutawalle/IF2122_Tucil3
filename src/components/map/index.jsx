import { useEffect, useRef } from "react"

import "ol/ol.css"
import { map } from "../../map/MapContainer"
import { layerPetaDasar } from "../../map/Layers"

const MainMap = () => {

  const petaRef = useRef(null)

  useEffect(() => {
    map.setTarget(petaRef.current)
    map.setLayers([
        layerPetaDasar
    ])
  }, [petaRef])

  return (
    <div
      ref={petaRef}
      className="w-full h-full fixed bg-[#fafafa] z-10"
    >
    </div>
  )
}

export default MainMap
