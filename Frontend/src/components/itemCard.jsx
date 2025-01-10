import { Button, Card, Image, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

function ItemCard({
  imageUrl,
  title,
  price,
  onEdit,
  onDelete,
}) {
  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Image src={imageUrl} alt={title} />
      <Card.Body gap="2">
        <Card.Title>{title}</Card.Title>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          ${price}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="ghost" onClick={onDelete}>
          Delete
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

ItemCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ItemCard;
