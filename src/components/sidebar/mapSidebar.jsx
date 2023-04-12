import React, { useEffect, useState } from 'react'
import { useAppStore } from "../../store"
import { DeleteIcon } from '@chakra-ui/icons'
import { Button, Radio, RadioGroup, Select, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { ucsHaversine } from '../../utils/ucs'
import { astarHaversine } from '../../utils/astar'

function MapSidebar() {
  const [start, setStart] = useState(null)
  const [finish, setFinish] = useState(null)
  const matrix = useAppStore((state) => state.matrix)
  const nodes = useAppStore((state) => state.nodes)
  const setNodes = useAppStore((state) => state.setNodes)
  const setMatrix = useAppStore((state) => state.setMatrix)
  const canAddNode = useAppStore((state) => state.canAddNode)
  const canAddEdge = useAppStore((state) => state.canAddEdge)
  const setCanAddNode = useAppStore((state) => state.setCanAddNode)
  const setCanAddEdge = useAppStore((state) => state.setCanAddEdge)

  const { register, handleSubmit } = useForm()


  const handleDelete = (index) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 1);
    setNodes(newNodes);
  }

  useEffect(() => {
    console.log(matrix);
  }, [matrix])

  useEffect(() => {
    let tmpMatrix = []
    for (let i = 0; i < nodes.length; i++) {
      tmpMatrix[i] = new Array(nodes.length)
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        tmpMatrix[i][j] = 0
        if (i == j) {
          tmpMatrix[i][j] = 1
        }
      }
    }
    setMatrix(tmpMatrix)
  }, [canAddNode])

  const handleClick = () => {
    let tMatrix = [...matrix]
    tMatrix[start][finish] = 1
    tMatrix[finish][start] = 1
    setMatrix(tMatrix)
  }

  const onSubmit = (data) => {
    let tmpMatrix = [...matrix]
    let graph = {node: nodes, matrix}
    let [a, b] = [0, 0]

    if (data.algo === 'ucs') {
      [a, b] = ucsHaversine(graph, Number(data.start), Number(data.finish))
    } else {
      [a, b] = astarHaversine(graph, Number(data.start), Number(data.finish))
    }

    for (let i = 0; i < b.length - 1; i++) {
      tmpMatrix[b[i]][b[i + 1]] = 2;
    }
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
        (!canAddNode && canAddEdge) &&
        <>
          <Select className='my-1' placeholder='Select First Point' onChange={(e) => setStart(e.target.value)}>
            {
              nodes &&
              nodes.map((node) =>
                <option value={node.id}>{node.nama}</option>
              )
            }
          </Select>
          <Select className='my-1' placeholder='Select Second Point' onChange={(e) => setFinish(e.target.value)}>
            {
              nodes &&
              nodes.map((node) =>
                <option value={node.id}>{node.nama}</option>
              )
            }
          </Select>
          <Button onClick={() => handleClick()}>Add Edge</Button>
          {
            (matrix.length != 1 && canAddEdge) &&
            <div className='block my-1'>
              {matrix.map((row, i) =>
                row.map((el, j) => {
                  if (i < j && matrix[i][j] == 1) {
                    return <span className='block my-2'>{(i + 1).toString() + " dan " + (j + 1).toString()} <DeleteIcon /></span>
                  } else {
                    return <></>
                  }
                }
                )
              )}
              <Button className='block' onClick={() => setCanAddEdge(false)}>Done</Button>
            </div>
          }
        </>
      }
      {
        (!canAddEdge && !canAddNode) &&
        <form className='h-64 flex flex-col items-center justify-evenly' onSubmit={handleSubmit(onSubmit)}>
          <RadioGroup {...register('algo')} defaultValue='ucs'>
            <Stack direction='row'>
              <Radio value='ucs'>UCS</Radio>
              <Radio value='astar'>A*</Radio>
            </Stack>
          </RadioGroup>
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
          <button type="submit" className='w-20 p-2 font-bold rounded-md bg-green-700 text-white disabled:opacity-75'>Search</button>
        </form>
      }
    </div>
  )
}

export default MapSidebar