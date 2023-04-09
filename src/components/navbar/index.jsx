import React, { useRef } from 'react';
import { 
    Flex,
    Text,
    useDisclosure,
    Show,
    IconButton,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerBody
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, matchPath } from 'react-router-dom';

const Navbar = () => {
    const links = [{name : 'Home', link : '/'}, {name : 'File', link : '/file'}, {name : 'Api', link : '/api'}];
    const { isOpen, onOpen, onClose } = useDisclosure();
    const drawerRef = useRef<HTMLButtonElement>(null);
    return (
        <Flex
            w="100%"
            px={{ base: 6, md: 16 }}
            py={2}
            bg="#D9D9DB"
            flexDirection="row"
            justifyContent={{ base: 'space-between', lg: 'center' }}
            alignItems="center"
            flexWrap="wrap"
            position="sticky"
            top="0"
            zIndex="999"
        >
        <Flex
        gap={20}
        fontSize="xl"
        alignItems="center"
        fontWeight={400}
        fontFamily="Subheading"
        display={{ base: 'none', lg: 'flex' }}
        >
            {links.map((item) => {
            const match = matchPath(
                { path: item.link },
                window.location.pathname
            );
            return (
                <Link key={item.name} to={item.link}>
                <Text
                    textUnderlineOffset={5}
                    color={match ? '#000000' : '#474747'}
                    textDecoration={match ? 'underline' : 'none'}
                    textDecorationColor="#000000"
                    _hover={{
                    color: '#000000',
                    textDecoration: 'underline',
                    textDecorationColor: '#000000'
                    }}
                >
                    {item.name}
                </Text>
                </Link>
            );
            })}
        </Flex>
        <Show below="lg">
        <IconButton
        bg="transparent"
        aria-label="Open Menu"
        size="lg"
        icon={<HamburgerIcon w={6} h={6} color="black" />}
        onClick={onOpen}
        display={isOpen ? 'none' : 'block'}
        />
        <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={drawerRef}
        >
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody bg="##D9D9DB">
            <Flex
                alignItems="flex-start"
                justifyContent="center"
                minH="90vh"
                flexDirection="column"
                gap={4}
            >
                {links.map((item) => {
                const match = matchPath(
                    { path: item.link },
                    window.location.pathname
                );
                return (
                    <Link key={item.name} to={item.link}>
                    <Text
                        textUnderlineOffset={5}
                        color={match ? '#000000' : '#474747'}
                        textDecoration={match ? 'underline' : 'none'}
                        textDecorationColor="#000000"
                        _hover={{
                        color: '#000000',
                        textDecoration: 'underline',
                        textDecorationColor: '#000000'
                        }}
                    >
                        {item.name}
                    </Text>
                    </Link>
                );
                })}
            </Flex>
            </DrawerBody>
        </DrawerContent>
        </Drawer>
        </Show>
        </Flex>
    )
}

export default Navbar