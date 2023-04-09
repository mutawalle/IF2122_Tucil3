import { Box, Heading,Flex } from '@chakra-ui/react'
import React from 'react'
import Footer from '../../components/footer'
import Navbar from '../../components/navbar'

function Home() {
  return (
    <>
      <Navbar />
      <Box bg="#ffffff" minH="100vh">
        <Flex flexDir="column" alignItems="center" gap={10} mt={7}>
          <Heading
            fontSize={{ base: '4xl', lg: '6xl' }}
            mb={{ base: 4, md: 10, lg: 16 }}
            text-align="center"
          >
          Shortest Path Finding
          </Heading>
          
        </Flex>
      </Box>
      <Footer/>
    </>
  )
}

export default Home