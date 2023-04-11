import React, { useRef } from 'react';
import { LineString } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Stroke } from 'ol/style';
import Feature from 'ol/Feature';
import { map } from '../../map/MapContainer';
import { Checkbox } from '@chakra-ui/react';
import { useAppStore } from '../../store';
import FileSidebar from './fileSidebar';
import MapSidebar from './mapSidebar';

const Sidebar = () => {
    const setUseMap = useAppStore((state) => state.setUseMap)
    const useMap = useAppStore((state) => state.useMap)

    // const displayRoad = (data) => {
    //     const layerGraph = new VectorLayer({
    //         source: new VectorSource(),
    //         style: new Style({
    //             stroke: new Stroke({
    //                 color: 'blue',
    //                 width: 2
    //             })
    //         })
    //     })

    //     const len = data.node.length
    //     for(let i=0;i<len;i++){
    //         for(let j=i+1;j<len;j++){
    //             if(data.matrix[i][j]){
    //                 const lineString = new LineString([[data.node[i].x, data.node[i].y], [data.node[j].x, data.node[j].y]])
    //                 const feature = new Feature(lineString)
    //                 layerGraph.getSource().addFeature(feature)
    //             }
    //         }
    //     }

    //     map.addLayer(layerGraph)
    // }

    return (
        <div className='bg-white w-full max-w-md m-2 p-3 rounded-xl absolute z-20 shadow-2xl'>
            <Checkbox onChange={(e) => {
                setUseMap(e.target.checked)
            }}>use map</Checkbox>
            {
                useMap ? 
                <MapSidebar/> :
                <FileSidebar/>
            }
        </div>
    )
}

export default Sidebar