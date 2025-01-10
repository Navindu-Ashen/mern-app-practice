import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import { IoSunnyOutline, IoMoonOutline, IoAddCircleOutline   } from "react-icons/io5";

function navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4} >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "xl", lg: "2xl" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack>
          <Link to={"/create"}>
            <Button variant="surface">
              <IoAddCircleOutline  />
            </Button>
          </Link>
          <Button variant="surface" onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoonOutline /> : <IoSunnyOutline />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default navbar;
