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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(supabase.auth.user());
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (email === "" || loading) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signIn({ email });
      if (error) {
        alert("Email sent failed!");
      } else {
        alert("Email sent successfully!");
        onClose();
      }
    } catch (error) {
      alert("Some errors occured!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    setTimeout(() => {
      setUser(supabase.auth.user());
    }, 1000);
  }, [setUser]);

  if (!user) {
    return (
      <>
        <Button onClick={onOpen}>Login</Button>
        <Modal onClose={onClose} size={"xs"} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Flex
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                my={4}
              >
                <Flex flexDir={"column"} alignItems={"center"}>
                  <Input
                    type={"email"}
                    placeholder={"hoge@example.com"}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button mt={4} onClick={handleLogin}>
                    {loading ? <Spinner /> : "Send magic link"}
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
