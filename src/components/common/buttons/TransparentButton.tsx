import { Box } from "@chakra-ui/react";
import { ButtonProps } from "./props";

const TransparentButton = ({ children, disabled, onClick }: ButtonProps) => {
  return (
    <Box w={"full"} fontWeight={"bold"} cursor={"pointer"} onClick={onClick}>
      {children}
    </Box>
  );
};

export default TransparentButton;
