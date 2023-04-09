import { Box } from '@chakra-ui/react'
import React from 'react'
import Footer from '../../components/footer'
import Navbar from '../../components/navbar'

function Home() {
  return (
    <>
      <Navbar />
      <Box bg="#ffffff" minH="100vh">
      </Box>
      <Footer/>
    </>
  )
}

export default Home