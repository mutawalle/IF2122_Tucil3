import { Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAppStore } from '../../store';

function ContextMenuElement({event}) {
    const [show, setShow] = useState(true)
    const setNodes = useAppStore((state) => state.setNodes)
    const nodes = useAppStore((state) => state.nodes)
    const canAddNode = useAppStore((state) => state.canAddNode)

    const handleClick = () => {
        if(nodes.length > 0 && nodes[nodes.length-1].x != event.coordinate[0] || nodes.length == 0){
            setNodes([...nodes, {
                id: nodes.length, nama: nodes.length + 1, x: event.coordinate[0], y: event.coordinate[1]
            }])
        }
        setShow(false)
    }

    return (
        show  && 
        <div className='p-2 text-lg font-bold bg-white rounded-lg absolute z-50 left-[50%] top-[200px] shadow-xl'>
            <Button onClick={() => handleClick()}>Add Node</Button>
        </div>
    )
}

export default ContextMenuElement