import { Flex, Button } from '@chakra-ui/react';
import Link from 'next/link';

const Header: React.FC = () => {
  // Header Component
  return (
    <Flex as="header" p={4} align="center" justify="space-between" boxShadow="md">
      <Link href="/images">
        <>
          <Button colorScheme="blue">View Images</Button>
        </>
      </Link>
      <Link href="/uploadImage">
        <>
          <Button colorScheme="green">Upload Image</Button>
        </>
      </Link>
    </Flex>
  );
};

export default Header;
