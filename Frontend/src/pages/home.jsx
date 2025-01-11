import { Container, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ItemCard from "../components/itemCard";
import { useEffect, useState } from "react";
import { useProductStore } from "../stores/product";
import { toaster } from "../components/ui/toaster";
import EditProductDialog from "../components/EditProductDialog";

function home() {
  const { fetchProducts, products, deleteProduct, updateProduct } =
    useProductStore();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch_Products();
  }, [fetchProducts]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  console.log("Products", products);
  return (
    <Container>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "xl", lg: "2xl" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={"text"}
          mb={16}
        >
          <Link to={"/"}>Your Products 🚀</Link>
        </Text>

        {products.length > 0 ? (
          <SimpleGrid columns={[2, null, 3]} gap="40px">
            {products.map((product) => (
              <ItemCard
                key={product._id}
                imageUrl={product.image}
                title={product.name}
                price={product.price}
                onEdit={() => handleEdit(product)}
                onDelete={async () => {
                  const { success, message } = await deleteProduct(product._id);
                  console.log("Success:", success);
                  console.log("Message:", message);
                  if (!success) {
                    toaster.create({
                      description: "Product deleting failed",
                      duration: 5000,
                      Collapsible: true,
                    });
                  } else {
                    toaster.create({
                      description: "Product deleted successfully",
                      duration: 5000,
                      Collapsible: true,
                    });
                  }
                }}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
            mt={48}
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}

        <EditProductDialog
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
          product={selectedProduct}
          onUpdate={updateProduct}
        />
      </VStack>
    </Container>
  );
}

export default home;
