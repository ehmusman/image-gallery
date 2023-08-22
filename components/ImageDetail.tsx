import { Box, Button, Image, Flex, Input, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from './Loader';
import Head from 'next/head';
import ImageWithFallback from './ImageWithFallback';
import useImageDetailHandler from '../hooks/useImageDetailHandler';

interface ImageDetailProps {
  id: any;
}
interface IComment {
  id: string;
  text: string
}
const ImageDetail: React.FC<ImageDetailProps> = ({ id }) => {
  const {image, isError,isUploading, handleAddComment} = useImageDetailHandler(id)

  // Loader
  if (!image && !isError) return <Loader />
  
  // Error Handler
  if (!image && isError) return <ImageWithFallback
    alt='Data Not Found'
    fallbackText='Data Not Found'
    src='/notfound.jpg'
  />
  
  return (
    <>
      <Head>
        <title>
          Image Detail Page
        </title>
      </Head>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" p={4}>
        <Image src={image?.image} alt="Image" objectFit="cover" w="30%" h="30%" />
        <form onSubmit={handleAddComment}>
          <Flex mt={4}>
            <Input
              type="text"
              name="comment"
              placeholder="Add a comment..."
              flex="1"
              mr={2}
              required
            />
            <Button
              isLoading={isUploading}
              type="submit" colorScheme="blue">
              Add Comment
            </Button>
          </Flex>
        </form>
        <Stack spacing={2} mt={4}>
          {image?.comments?.map((comment: IComment) => (
            <Box key={comment.id} p={2} bgColor="gray.100" borderRadius="md">
              {comment.text}
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default ImageDetail;
