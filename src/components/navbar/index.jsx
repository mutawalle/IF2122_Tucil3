import React, { useRef } from 'react';
import { LineString } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Stroke } from 'ol/style';
import Feature from 'ol/Feature';
import { useForm } from 'react-hook-form';
import { map } from '../../map/MapContainer';

const Navbar = () => {
    const { register, handleSubmit, watch } = useForm()
    const selectedFile = watch('myFile')

    const onSubmit = (data) => {
        const file = data.myFile[0]
        const fileReader = new FileReader()
        fileReader.readAsText(file, "UTF-8");
        fileReader.onload = (e) => {
            try {
                const jsonObject = JSON.parse(e.target.result);
                displayRoad(jsonObject)
            } catch (err) {
                console.error(err);
            }
        }
    }

    const displayRoad = (data) => {
        const layerGraph = new VectorLayer({
            source: new VectorSource(),
            style: new Style({
                stroke: new Stroke({
                    color: 'blue',
                    width: 2
                })
            })
        })

        const len = data.node.length
        for(let i=0;i<len;i++){
            for(let j=i+1;j<len;j++){
                if(data.matrix[i][j]){
                    const lineString = new LineString([[data.node[i].x, data.node[i].y], [data.node[j].x, data.node[j].y]])
                    const feature = new Feature(lineString)
                    layerGraph.getSource().addFeature(feature)
                }
            }
        }

        map.addLayer(layerGraph)
    }

    return (
        <div className='bg-white w-full max-w-md m-2 p-3 rounded-lg absolute z-20'>
            <form className='h-40 flex flex-col items-center justify-evenly' onSubmit={handleSubmit(onSubmit)}>
                <input type="file" {...register('myFile', { required: true })} class="block w-56 text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                    hover:cursor-pointer
                "/>
                <button type="submit" className='w-20 p-2 font-bold rounded-md bg-green-700 text-white disabled:opacity-75' disabled={!selectedFile}>Search</button>
            </form>
        </div>
    )
    // const links = [{name : 'Home', link : '/'}, {name : 'File', link : '/file'}, {name : 'Api', link : '/api'}];
    // const { isOpen, onOpen, onClose } = useDisclosure();
    // const drawerRef = useRef<HTMLButtonElement>(null);
    // return (
    //     <Flex
    //         w="100%"
    //         px={{ base: 6, md: 16 }}
    //         py={2}
    //         bg="#D9D9DB"
    //         flexDirection="row"
    //         justifyContent={{ base: 'space-between', lg: 'center' }}
    //         alignItems="center"
    //         flexWrap="wrap"
    //         position="sticky"
    //         top="0"
    //         zIndex="999"
    //     >
    //     <Flex
    //     gap={20}
    //     fontSize="xl"
    //     alignItems="center"
    //     fontWeight={400}
    //     fontFamily="Subheading"
    //     display={{ base: 'none', lg: 'flex' }}
    //     >
    //         {links.map((item) => {
    //         const match = matchPath(
    //             { path: item.link },
    //             window.location.pathname
    //         );
    //         return (
    //             <Link key={item.name} to={item.link}>
    //             <Text
    //                 textUnderlineOffset={5}
    //                 color={match ? '#000000' : '#474747'}
    //                 textDecoration={match ? 'underline' : 'none'}
    //                 textDecorationColor="#000000"
    //                 _hover={{
    //                 color: '#000000',
    //                 textDecoration: 'underline',
    //                 textDecorationColor: '#000000'
    //                 }}
    //             >
    //                 {item.name}
    //             </Text>
    //             </Link>
    //         );
    //         })}
    //     </Flex>
    //     <Show below="lg">
    //         <IconButton
    //         bg="transparent"
    //         aria-label="Open Menu"
    //         size="lg"
    //         icon={<HamburgerIcon w={6} h={6} color="black" />}
    //         onClick={onOpen}
    //         display={isOpen ? 'none' : 'block'}
    //         />
    //         <Drawer
    //         isOpen={isOpen}
    //         placement="right"
    //         onClose={onClose}
    //         finalFocusRef={drawerRef}
    //         >
    //             <DrawerOverlay />
    //             <DrawerContent>
    //                 <DrawerCloseButton />
    //                 <DrawerBody bg="##D9D9DB">
    //                     <Flex
    //                         alignItems="flex-start"
    //                         justifyContent="center"
    //                         minH="90vh"
    //                         flexDirection="column"
    //                         gap={4}
    //                     >
    //                         {links.map((item) => {
    //                         const match = matchPath(
    //                             { path: item.link },
    //                             window.location.pathname
    //                         );
    //                         return (
    //                             <Link key={item.name} to={item.link}>
    //                             <Text
    //                                 textUnderlineOffset={5}
    //                                 color={match ? '#000000' : '#474747'}
    //                                 textDecoration={match ? 'underline' : 'none'}
    //                                 textDecorationColor="#000000"
    //                                 _hover={{
    //                                 color: '#000000',
    //                                 textDecoration: 'underline',
    //                                 textDecorationColor: '#000000'
    //                                 }}
    //                             >
    //                                 {item.name}
    //                             </Text>
    //                             </Link>
    //                         );
    //                         })}
    //                     </Flex>
    //                 </DrawerBody>
    //             </DrawerContent>
    //         </Drawer>
    //     </Show>
    //     </Flex>
    // )
}

export default Navbar