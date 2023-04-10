import { Box, Heading,Flex,Image,Text } from '@chakra-ui/react'
import React from 'react'
import Footer from '../../components/footer'
import Navbar from '../../components/navbar'

function Home() {
  return (
    <>
      <Navbar />
      <Box bg="#ffffff" minH="100vh">
        <Flex flexDir="column" alignItems="center" gap={10} mt={10} mb={0}>
          <Heading
            fontSize={{ base: '4xl', lg: '6xl' }}
            mb={{ base: 4, md: 10, lg: 10 }}
            text-align="center"
          >
          Shortest Path Finding
          </Heading>
        
          <Image
          src={`${process.env.PUBLIC_URL}/image.png`}
          alt="Deskripsi gambar"
          width={{ lg:'500px',base:'300px'}}
          height="auto"
          />
          <Text width={{ lg:'700px',base:'400px'}} >
          Algoritma UCS (Uniform cost search) dan A* (atau A star) dapat digunakan untuk menentukan lintasan terpendek dari suatu titik ke titik lain. Pada tugas kecil 3 ini, kami diminta menentukan lintasan terpendek berdasarkan peta Google Map jalan-jalan di kota Bandung. Dari ruas-ruas jalan di peta dibentuk graf. Simpul menyatakan persilangan jalan (simpang 3, 4 atau 5) atau ujung jalan. Asumsikan jalan dapat dilalui dari dua arah. Bobot graf menyatakan jarak (m atau km) antar simpul. Jarak antar dua simpul dapat dihitung dari koordinat kedua simpul menggunakan rumus jarak Euclidean (berdasarkan koordinat) atau dapat menggunakan ruler di Google Map, atau cara lainnya yang disediakan oleh Google Map.
          </Text>

        </Flex>
          
      </Box>
      <Footer/>
    </>
  )
}

export default Home