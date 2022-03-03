import {
  Button,
  Flex,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Input,
  Text,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../../contexts/auth";
import TransparentButton from "./buttons/TransparentButton";

const Login = () => {
  const { user, login, logout } = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    if (email === "" || loading) return;
    setLoading(true);
    try {
      const { error } = await login(email);
      if (error) {
        toast({
          title: "Email sent failed",
          status: "error",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Sent successfully",
          status: "success",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "Some errors occured",
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (!user || user === null) {
    return (
      <>
        <TransparentButton onClick={onOpen}>Login</TransparentButton>
        <Modal onClose={onClose} size={"md"} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Flex
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                my={4}
              >
                <Flex
                  w={"full"}
                  h={"40vh"}
                  flexDir={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Text mb={8} fontSize={24} fontWeight={"bold"}>
                    Login with Email
                  </Text>
                  <Input
                    type={"email"}
                    placeholder={"hoge@example.com"}
                    onChange={(e) => setEmail(e.target.value)}
                    mb={4}
                  />
                  <Button w={"full"} onClick={handleLogin} isLoading={loading}>
                    Send login link
                  </Button>
                </Flex>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <Menu autoSelect={false}>
      <MenuButton>
        <Text>{user.email}</Text>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Login;
