import { useState } from 'react';
import { Container, Heading, Box, Button, Input, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Head from 'next/head';
import useUploadImageHandler from '../hooks/useUploadImageHandler';

const UploadImage: React.FC = () => {
  const { isUploading, previewImage, selectedImage, handleUpload, handleImageSelect } = useUploadImageHandler()

  return (
    <>
      <Head>
        <title>
          Upload Image Page
        </title>
      </Head>
      <Container>
        <Box maxW="md" borderWidth="1px" borderRadius="lg" p={6} mt={3}>
          <Heading as="h2" size="lg" mb={4}>
            Upload Image
          </Heading>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            style={{ marginBottom: '16px' }}
          />
          {previewImage && <Image src={previewImage} alt="Preview" maxH="300px" mb={4} />}
          {selectedImage && (
            <Button
              isLoading={isUploading}
              onClick={handleUpload} colorScheme="blue" size="md">
              Upload
            </Button>
          )}
        </Box>
      </Container>
    </>
  );
};

export default UploadImage;
