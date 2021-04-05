import { Heading, Text } from "@chakra-ui/layout";

const Locks: React.FC = () => {
  return (
    <>
      <Heading>Token Locks</Heading>
      <Text>
        These tokens are locked in {/* TODO: address here */} and can not be withdrawn until the
        date shown
      </Text>
    </>
  );
};

export default Locks;
