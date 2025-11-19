import { Container, Card, Heading, Text, Flex, Grid } from "@radix-ui/themes";

// Common class utilities
const cardHoverEffect =
  "bg-white rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_var(--orange-a7)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-linear-to-r before:from-(--orange-9) before:to-(--orange-10) before:opacity-0 before:transition-opacity hover:before:opacity-100";

const textBrown = "text-(--sand-11)";
const textOrange = "text-(--orange-9)";
const headingOrange = `${textOrange} mb-2`;
const textBody = `${textBrown} leading-relaxed`;

export default function About() {
  return (
    <Container size="4" className="mt-12">
      <Flex direction="column" align="center" className="mb-12">
        <div className="text-center mb-12 max-w-4xl">
          <Heading
            size="9"
            className="mb-6 bg-linear-to-br from-(--orange-9) to-(--orange-10) bg-clip-text text-transparent font-bold tracking-tight"
          >
            About SmartRecipe
          </Heading>
          <Text size="5" className={textBrown}>
            Your AI-powered cooking companion 🍳
          </Text>
        </div>

        <Card className={`mb-12 w-full max-w-4xl ${cardHoverEffect}`}>
          <Flex direction="column" gap="4" className="p-8">
            <Heading size="5" className={headingOrange}>
              What is SmartRecipe?
            </Heading>
            <Text size="4" className={textBody}>
              Tired of staring at your fridge wondering what to make?
              SmartRecipe is your AI-powered cooking companion that turns those
              random ingredients in your kitchen into delicious meal ideas! Just
              tell us what you have, and we'll instantly whip up personalized
              recipe suggestions tailored to your taste buds.
            </Text>
            <Text size="4" className={textBody}>
              Got a tomato, some beef, and a potato? We might suggest a cozy
              Beef Stew with Tomatoes or a flavorful Spiced Beef and Potato
              Hash! Whether you're a busy student trying to make the most of
              your groceries or a professional short on time, SmartRecipe helps
              you answer that age-old question: "What should I cook today?" 🎉
            </Text>
          </Flex>
        </Card>

        <Grid
          columns={{ initial: "1", md: "2" }}
          gap="4"
          className="w-full max-w-4xl"
        >
          <Card className={`h-full ${cardHoverEffect}`}>
            <Flex direction="column" gap="3" className="p-6">
              <Heading size="5" className={headingOrange}>
                ✨ Features
              </Heading>
              <ul className="list-disc pl-5 mb-0 space-y-3">
                <li className="leading-relaxed">
                  <Text size="3" className={textBrown}>
                    <strong>Recipe Generation:</strong> AI-powered recipe
                    suggestions based on your ingredients
                  </Text>
                </li>
                <li className="leading-relaxed">
                  <Text size="3" className={textBrown}>
                    <strong>Recipe Details:</strong> View ingredient lists,
                    step-by-step instructions, and nutrition facts
                  </Text>
                </li>
                <li className="leading-relaxed">
                  <Text size="3" className={textBrown}>
                    <strong>Save/Favorite:</strong> Save your favorite recipes
                    for later
                  </Text>
                </li>
                <li className="leading-relaxed">
                  <Text size="3" className={textBrown}>
                    <strong>Preference Modes:</strong> Filter by dietary
                    restrictions, cuisine style, and more
                  </Text>
                </li>
              </ul>
            </Flex>
          </Card>

          <Card className={`h-full ${cardHoverEffect}`}>
            <Flex direction="column" gap="3" className="p-6">
              <Heading size="5" className={headingOrange}>
                🛠️ Tech Stack
              </Heading>
              <ul className="list-disc pl-5 mb-0 space-y-3">
                <li className="leading-relaxed">
                  <Text size="3" className={textBrown}>
                    <strong>Frontend:</strong> React, React Router, Vite
                  </Text>
                </li>
                <li className="leading-relaxed">
                  <Text size="3" className={textBrown}>
                    <strong>UI library:</strong> Radix UI, Tailwind CSS
                  </Text>
                </li>
                <li className="leading-relaxed">
                  <Text size="3" className={textBrown}>
                    <strong>AI:</strong> OpenAI API for recipe generation
                  </Text>
                </li>
              </ul>
            </Flex>
          </Card>
        </Grid>
      </Flex>
    </Container>
  );
}
