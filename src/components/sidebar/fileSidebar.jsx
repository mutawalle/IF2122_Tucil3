import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAppStore } from '../../store';
import { Radio, RadioGroup, Select, Stack } from '@chakra-ui/react';
import { ucsEuclidean } from '../../utils/ucs';
import { astarEuclidean } from '../../utils/astar';

function FileSidebar() {
    const { register, handleSubmit, watch } = useForm()
    const selectedFile = watch('myFile')
    const setMatrix = useAppStore((state) => state.setMatrix)
    const setNodes = useAppStore((state) => state.setNodes)
    const setMatrixPath = useAppStore((state) => state.setMatrixPath)
    const matrix = useAppStore((state) => state.matrix)
    const nodes = useAppStore((state) => state.nodes)

    useEffect(() => {
        if (selectedFile) {
            const file = selectedFile[0]
            const fileReader = new FileReader()
            fileReader.readAsText(file, "UTF-8");
            fileReader.onload = (e) => {
                try {
                    const jsonObject = JSON.parse(e.target.result)
                    setNodes(jsonObject.node)
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
                console.log(data);
                const jsonObject = JSON.parse(e.target.result)
                setNodes(jsonObject.node)
                setMatrix(jsonObject.matrix)
                let tmpMatrix = jsonObject.matrix
                let [a, b] = [0, 0]

                if(data.algo === 'ucs'){
                    [a, b] = ucsEuclidean(jsonObject, Number(data.start), Number(data.finish))
                }else{
                    [a, b] = astarEuclidean(jsonObject, Number(data.start), Number(data.finish))
                }
                
                for (let i = 0; i < b.length - 1; i++) {
                    tmpMatrix[b[i]][b[i + 1]] = 2;
                }
                setMatrix(tmpMatrix)
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <form className='h-64 flex flex-col items-center justify-evenly' onSubmit={handleSubmit(onSubmit)}>
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
        </form>
    )
}

export default FileSidebar