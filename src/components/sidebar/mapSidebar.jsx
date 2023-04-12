import React, { useEffect } from 'react'
import { useAppStore } from "../../store"
import { DeleteIcon } from '@chakra-ui/icons'
import { Button, Select } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

function MapSidebar() {
  const matrix = useAppStore((state) => state.matrix)
  const nodes = useAppStore((state) => state.nodes)
  const setNodes = useAppStore((state) => state.setNodes)
  const setMatrix = useAppStore((state) => state.setMatrix)
  const canAddNode = useAppStore((state) => state.canAddNode)
  const setCanAddNode = useAppStore((state) => state.setCanAddNode)

  const { register, handleSubmit, watch } = useForm()

  const handleDelete = (index) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 1);
    setNodes(newNodes);
  }

  useEffect(() => {
    console.log(matrix);
  }, [matrix])

  const onSubmit = (data) => {
    console.log(data);
    let tmpMatrix
    if(matrix.length == 1){
      tmpMatrix = []
      for(let i=0;i<nodes.length;i++){
        tmpMatrix[i] = new Array(nodes.length)
      }
      for(let i=0;i<nodes.length;i++){
        for(let j=0;j<nodes.length;j++){
          tmpMatrix[i][j] = 0
          if(i==j){
            tmpMatrix[i][j] = 1
          }
        }
      }
    }else{
      tmpMatrix = matrix
    }
    tmpMatrix[data.start][data.finish] = 1
    tmpMatrix[data.finish][data.start] = 1
    setMatrix(tmpMatrix)
  }

  return (
    <div>
      {canAddNode && (nodes.length > 0 ?
        nodes.map((node, i) =>
          <span className='block'>{(i + 1)} <button><DeleteIcon onClick={() => handleDelete(i)} /></button></span>
        ) :
        <span className='block'>Tambah node dengan klik kanan pada peta</span>)
      }
      {
        canAddNode &&
        <Button onClick={() => setCanAddNode(false)}>Done</Button>
      }
      {
        !canAddNode &&
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select placeholder='Select Start' {...register('start')}>
                {
                    nodes &&
                    nodes.map((node) =>
                        <option value={node.id}>{node.nama}</option>
                    )
                }
            </Select>
            <Select placeholder='Select Finish' {...register('finish')}>
                {
                    nodes &&
                    nodes.map((node) =>
                        <option value={node.id}>{node.nama}</option>
                    )
                }
            </Select>
            <Button type='submit'>Add Edge</Button>
        </form>
      }
    </div>
  )
}

export default MapSidebar