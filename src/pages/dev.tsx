import { Heading, Link, Text } from "@chakra-ui/react";

import info from "../../package.json";

const Dev: React.FC = () => {
  return (
    <>
      <Heading mt="5">For dev use only</Heading>
      <Link href="https://oneclickdapp.com/service-actor">TokenLock</Link>
      <Link href="https://oneclickdapp.com/prism-ammonia">Cheemscoin</Link>
      <Text>Trying to use this will not work</Text>

      <Text>Version {info.version}</Text>
    </>
  );
};

export default Dev;
