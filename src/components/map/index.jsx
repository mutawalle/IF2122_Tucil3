import { useEffect, useRef, useState } from "react"
import "ol/ol.css"
import { map } from "../../map/MapContainer"
import { layerPetaDasar } from "../../map/Layers"
import { render } from "@testing-library/react";
import ContextMenuElement from "../contextmenu";
import { useAppStore } from "../../store";
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import { LineString } from 'ol/geom';
import { Stroke } from 'ol/style';

const MainMap = () => {
  const petaRef = useRef(null)
  const nodes = useAppStore((state) => state.nodes)
  const matrix = useAppStore((state) => state.matrix)

  useEffect(() => {
    if(matrix.length != 1){
      const vectorSourceRoad = new VectorSource();
      for(let i=0;i<matrix.length;i++){
        for(let j=i+1;j<matrix.length;j++){
          if(matrix[i][j] == 1){
            const line = new LineString([[nodes[i].x, nodes[i].y], [nodes[j].x, nodes[j].y]]);
            const feature = new Feature({ geometry: line });
            vectorSourceRoad.addFeature(feature)
          }
        }
      }
      const vectorSourcePath = new VectorSource();
      for(let i=0;i<matrix.length;i++){
        for(let j=i+1;j<matrix.length;j++){
          if(matrix[i][j] == 2){
            const line = new LineString([[nodes[i].x, nodes[i].y], [nodes[j].x, nodes[j].y]]);
            const feature = new Feature({ geometry: line });
            vectorSourcePath.addFeature(feature)
          }
        }
      }

      const vectorRoad = new VectorLayer({
        source: vectorSourceRoad,
        style: new Style({
          stroke: new Stroke({
            color: 'blue',
            width: 2
          })
        })
      });

      const vectorPath = new VectorLayer({
        source: vectorSourcePath,
        style: new Style({
          stroke: new Stroke({
            color: 'red',
            width: 2
          })
        })
      });

      const vectorSourceNode = new VectorSource({
        features: nodes.map(node => {
          const point = new Point([node.x, node.y]);
          const feature = new Feature(point);
          feature.setStyle(new Style({
            image: new Icon({
              src: 'https://openlayers.org/en/latest/examples/data/icon.png',
              anchor: [0.5, 1],
              size: [32, 32]
            })
          }));
          return feature;
        })
      });
  
      // create vector layer
      const vectorNode = new VectorLayer({
        source: vectorSourceNode
      });

      map.setLayers([layerPetaDasar, vectorRoad, vectorNode, vectorPath])
    }
  }, [matrix])

  useEffect(() => {
    // create vector source
    const vectorSource = new VectorSource({
      features: nodes.map(node => {
        const point = new Point([node.x, node.y]);
        const feature = new Feature(point);
        feature.setStyle(new Style({
          image: new Icon({
            src: 'https://openlayers.org/en/latest/examples/data/icon.png',
            anchor: [0.5, 1],
            size: [32, 32]
          })
        }));
        return feature;
      })
    });

    // create vector layer
    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    // add vector layer to map
    map.setLayers([
      layerPetaDasar,
      vectorLayer
    ])
  }, [nodes])

  useEffect(() => {
    map.setTarget(petaRef.current)
    map.setLayers([
      layerPetaDasar
    ])
    map.on("contextmenu", (e) => {
      e.preventDefault()
      render(<ContextMenuElement event={e} />)
    })
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
