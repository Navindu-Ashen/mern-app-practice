import { useState, useEffect } from "react";
import { Button, Input, VStack } from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "./ui/dialog";
import { toaster } from "./ui/toaster";

function EditProductDialog({ open, onOpenChange, product, onUpdate }) {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product?.name || '',
    price: product?.price || '',
    image: product?.image || ''
  });

  useEffect(() => {
    if (product) {
      setUpdatedProduct({
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  }, [product]);

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={updatedProduct.name}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  name: e.target.value,
                })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  price: e.target.value,
                })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={updatedProduct.image}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  image: e.target.value,
                })
              }
            />
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogCloseTrigger>
          <Button
            onClick={async () => {
              const result = await onUpdate(product._id, updatedProduct);
              if (result.success) {
                toaster.create({
                  description: "Product updated successfully",
                  duration: 5000,
                  Collapsible: true,
                });
                onOpenChange({ open: false });
              } else {
                toaster.create({
                  description: "Failed to update product",
                  duration: 5000,
                  Collapsible: true,
                });
              }
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default EditProductDialog;
