import { Container, Heading } from "@radix-ui/themes";

// Common class utilities
const textBrown = "text-(--sand-11)";

export default function Saved() {
  return (
    <Container size="4" className="mt-12">
      <Heading size="8" className={textBrown}>
        My Saved Recipes
      </Heading>
    </Container>
  );
}
