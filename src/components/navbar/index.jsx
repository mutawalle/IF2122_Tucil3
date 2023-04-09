import { Flex,Text } from "@chakra-ui/react";
import { Link, matchPath } from 'react-router-dom';

const Navbar = () => {
    const links = [{name : 'Home', link : '/'}, {name : 'File', link : '/file'}, {name : 'Api', link : '/api'}];
    return (
        <Flex
            w="100%"
            px={{ base: 6, md: 16 }}
            py={2}
            bg="#D9D9DB"
            flexDirection="row"
            justifyContent="center"
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
        </Flex>
    )
}

export default Navbar