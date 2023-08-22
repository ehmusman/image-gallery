import { Box, Button, Flex, Image } from '@chakra-ui/react';

interface ImageCardProps {
  imageUrl: string;
  buttonText: string;
  id: string;
  onButtonClick: (id: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, buttonText, id, onButtonClick }) => {
  return (
    <>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" p={4}>
        <Box height="200px" position="relative">
          <Image src={imageUrl} alt="Image" objectFit="cover" w="100%" h="100%" />
          <Flex
            align="center"
            justify="center"
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            p={3}
            bgColor="rgba(0, 0, 0, 0.7)"
          >
            <Button colorScheme="blue" onClick={onButtonClick.bind(this, id)}>
              {buttonText}
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default ImageCard;
