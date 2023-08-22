import { Flex, Spinner } from '@chakra-ui/react';

const Loader: React.FC = () => {
  return (
    <Flex align="center" justify="center" minHeight="100vh">
      <Spinner size="xl" />
    </Flex>
  );
};

export default Loader;
