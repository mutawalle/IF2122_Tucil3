import { useEffect, useRef } from "react"

import "ol/ol.css"
import { map } from "../../map/MapContainer"
import { layerPetaDasar } from "../../map/Layers"
import { useAppStore } from "../../store"

const MainMap = () => {
  const matrix = useAppStore((state) => state.matrix)
  const nodes = useAppStore((state) => state.nodes)
  const petaRef = useRef(null)

  useEffect(() => {
    map.setTarget(petaRef.current)
    map.setLayers([
        layerPetaDasar
    ])
    console.log(matrix);
  }, [petaRef, matrix])

  return (
    <div
      ref={petaRef}
      className="w-full h-full fixed bg-[#fafafa] z-10"
    >
    </div>
  )
}

export default MainMap
