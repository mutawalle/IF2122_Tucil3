import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAppStore } from '../../store';
import { Radio, RadioGroup, Select, Stack } from '@chakra-ui/react';
import { ucsEuclidean, ucsGraphBerbobot } from '../../utils/ucs';
import { astarEuclidean } from '../../utils/astar';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
    CloseButton,
    useDisclosure
} from '@chakra-ui/react'

function FileSidebar() {
    const { register, handleSubmit, watch } = useForm()
    const selectedFile = watch('myFile')
    const setMatrix = useAppStore((state) => state.setMatrix)
    const setNodes = useAppStore((state) => state.setNodes)
    const nodes = useAppStore((state) => state.nodes)
    const matrixPath = useAppStore((state) => state.matrixPath)
    const setMatrixPath = useAppStore((state) => state.setMatrixPath)
    const [jarak, setJarak] = useState(0)
    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({ defaultIsOpen: false })

    useEffect(() => {
        if (selectedFile) {
            const file = selectedFile[0]
            const fileReader = new FileReader()
            fileReader.readAsText(file, "UTF-8")
            fileReader.onload = (e) => {
                try {
                    const jsonObject = JSON.parse(e.target.result)
                    console.log(jsonObject);
                    let tmpMatrix = []
                    for (let i = 0; i < jsonObject.node.length; i++) {
                        tmpMatrix[i] = new Array(jsonObject.node.length)
                    }
                    for (let i = 0; i < jsonObject.node.length; i++) {
                        for (let j = 0; j < jsonObject.node.length; j++) {
                            tmpMatrix[i][j] = 0
                        }
                    }
                    setNodes(jsonObject.node)
                    setMatrixPath(tmpMatrix)
                    setMatrix(jsonObject.matrix)
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }, [selectedFile])


    const onSubmit = (data) => {
        const file = selectedFile[0]
        const fileReader = new FileReader()
        fileReader.readAsText(file, "UTF-8");
        fileReader.onload = (e) => {
            try {
                const jsonObject = JSON.parse(e.target.result)
                setNodes(jsonObject.node)
                setMatrix(jsonObject.matrix)
                let tmpMatrix = jsonObject.matrix
                let [a, b] = [0, 0]
                
                if (data.algo === 'ucs') {
                    [a, b] = ucsGraphBerbobot(jsonObject, Number(data.start), Number(data.finish))
                } else {
                    [a, b] = astarEuclidean(jsonObject, Number(data.start), Number(data.finish))
                }
                for (let i = 0; i < b.length - 1; i++) {
                    tmpMatrix[b[i]][b[i + 1]] = 2;
                    tmpMatrix[b[i+1]][b[i]] = 2;
                }
                onOpen()
                setJarak(a)
                setMatrix(jsonObject.matrix)
                setMatrixPath(tmpMatrix)
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <form className='h-72 flex flex-col items-center justify-evenly' onSubmit={handleSubmit(onSubmit)}>
            <input type="file" {...register('myFile', { required: true })} class="block w-56 text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                    hover:cursor-pointer
            "/>
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
            <button type="submit" className='w-20 p-2 font-bold rounded-md bg-green-700 text-white disabled:opacity-75' disabled={!selectedFile}>Search</button>
            {
                isVisible &&
                <Alert status='success' className='rounded-lg mt-2 flex justify-between'>
                    <div className='flex'>
                        <AlertIcon />
                        <Box>
                            <AlertTitle>Berhasil!</AlertTitle>
                            <AlertDescription>
                                Jarak terdekat yang ditemukan {jarak}.
                            </AlertDescription>
                        </Box>
                    </div>
                    <CloseButton
                        alignSelf='flex-start'
                        position='relative'
                        right={-1}
                        top={-1}
                        onClick={onClose}
                    />
                </Alert>
            }
        </form>
    )
}

export default FileSidebar