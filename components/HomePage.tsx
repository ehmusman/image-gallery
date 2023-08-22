// pages/index.tsx
import { Box, Flex, Heading, Button, Image } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';

const HomePage: React.FC = () => {
  // Landing Page
  return (
    <>
      <Head>
        <title>
          Landing Page
        </title>
      </Head>
      <Flex direction="column" align="center" justify="center" minHeight="100vh">
        <Box textAlign="center" maxWidth="600px" px={4}>
          <Heading size="2xl" mb={4}>
            Welcome to My Image Gallery!
          </Heading>
          <Image
            src="/home.jpg"
            alt="Landing Image"
            borderRadius="md"
            boxShadow="lg"
            mb={6}
          />
          <Box mb={6}>
            Showcase your favorite images and share your thoughts with comments.
          </Box>
          <Link href="/uploadImage" passHref>
            <Button colorScheme="blue" size="lg">
              Get Started
            </Button>
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default HomePage;
