import { Button, Flex, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
  return (
    <Flex
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      w={"100vw"}
      h={16}
      bgColor={"white"}
      zIndex={1001}
      px={4}
    >
      <Flex alignItems="center" fontWeight={"bold"} cursor={"pointer"}>
        <Link href={`/`}>
          <Text>SERVICE NAME</Text>
        </Link>
      </Flex>
      <Spacer />
      <Flex alignItems="center">
        <Button onClick={() => {}}>Login</Button>
      </Flex>
    </Flex>
  );
};

export default Header;
