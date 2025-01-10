import {
  Box,
  Button,
  Collapsible,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductStore } from "../stores/product";
import { toaster } from "../components/ui/toaster"

function createProducts() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const habdelSubmit = async () => {
    console.log(newProduct);
    const { success, message } = await createProduct(newProduct);
    console.log("Success:", success);
    console.log("Message:", message);
    if(!success){
      toaster.create({
        description: "Product creating failed",
        duration: 6000,
        Collapsible: true,
      })
    }else{
      toaster.create({
        description: "Product created successfully",
        duration: 6000,
        Collapsible: true,
      })
    }
    setNewProduct({ name: "", price: "", image: "" });
  };
  return (
    <Container maxW={"xl"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "grey.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="name"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="name"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button
              onClick={habdelSubmit}
              variant="solid"
              colorPalette={"blue"}
              w={"full"}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default createProducts;
