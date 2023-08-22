import { Image, Box, Container } from '@chakra-ui/react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackText: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, fallbackText }) => {
  return (
    <Box position="relative" width="100%" p={10}>
        <Container>
      <Image
       src={src} alt={alt} objectFit="contain" width="50%" height="50%" 
       />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="start"
        width="50%"
        >
        {fallbackText}
      </Box>
          </Container>
    </Box>
  );
};

export default ImageWithFallback;
