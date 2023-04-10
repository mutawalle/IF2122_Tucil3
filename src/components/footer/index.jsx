import React from "react";
import { Flex,Text,Box } from "@chakra-ui/react";

const Footer = () => (
    <>
      <Flex
        bg="#D9D9DB"
        alignItems="center"
        justifyContent={{ base: 'flex-start', md: 'space-between' }}
        py={5}
        px={{ base: 5, md: 16 }}
        flexDirection={{ base: 'column', md: 'row' }}
        overflowX="hidden"
      >
        <Box display="flex" flexDirection="column" alignSelf="center">
          <Text mt={1} fontSize="xl" fontFamily="Caption" textAlign="center">
            &copy; Fajar Maulana H - Mutawally Nawwar
          </Text>
        </Box>
      </Flex>
    </>
  );
  
  export default Footer;
  