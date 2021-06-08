import { Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <Text
        fontSize="3xl"
        fontWeight="bold"
        letterSpacing="tight"
        w="64"
      >
        dashingo
        <Text as="span" ml="0.75" color="pink.500">.</Text>
      </Text>
  );
}