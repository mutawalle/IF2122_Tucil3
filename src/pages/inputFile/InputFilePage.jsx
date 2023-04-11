import {React,useRef,useState} from 'react'
import Navbar from '../../components/navbar'
import { Box, Flex, Text, Input, Button, Heading } from '@chakra-ui/react'
import Footer from '../../components/footer'

function InputFilePage() {
  const [file, setFile] = useState('no file')
  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Navbar />
      <Box bg="#ffffff" minH="100vh">
        <Flex flexDir="column" alignItems="center" gap={10} mt={10} mb={0}>
          <Heading fontSize={{ base: '4xl', lg: '6xl' }} mb={{ base: 4, md: 10, lg: 10 }} text-align="center">
            Input File
          </Heading>
          <Input type="file" />
          <Input type="text" placeholder="Start Node" />
          <Input type="text" placeholder="End Node" />
          <Text>{file}</Text>
          <Button colorScheme="blackAlpha" size="lg" onClick={submitHandler}>Submit</Button>
        </Flex>
      </Box>
      <Footer/>
    </>
  )
}

export default InputFilePage