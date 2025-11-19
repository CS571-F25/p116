import { useState } from "react";
import {
  Container,
  Card,
  Button,
  TextArea,
  Text,
  Heading,
  Flex,
  Grid,
  Badge,
} from "@radix-ui/themes";

// Common class utilities
const textBrown = "text-(--sand-11)";
const heroGradientBg = "bg-linear-to-br from-(--orange-a6) to-(--orange-a6)";
const heroGradientText =
  "bg-linear-to-br from-(--orange-9) to-(--orange-10) bg-clip-text text-transparent font-bold tracking-tight";
const cardHoverEffect =
  "bg-white rounded-2xl overflow-hidden relative transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_var(--orange-a7)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-linear-to-r before:from-(--orange-9) before:to-(--orange-10) before:opacity-0 before:transition-opacity hover:before:opacity-100";
const buttonGradient =
  "bg-linear-to-r from-(--orange-9) to-(--orange-10) border-none rounded-xl px-8 py-3 font-semibold tracking-wide shadow-[0_4px_12px_var(--orange-a4)] transition-all hover:bg-linear-to-r hover:from-(--orange-8) hover:to-(--orange-10) hover:-translate-y-0.5 hover:shadow-[0_6px_20px_var(--orange-a3)] active:translate-y-0 disabled:opacity-60 disabled:transform-none";
const errorAlert =
  "rounded-xl border-none bg-(--red-1) text-(--red-9) border-l-4 border-l-(--red-9) p-4";
const sectionHeading =
  "font-bold mb-6 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-15 after:h-1 after:bg-linear-to-r after:from-(--orange-9) after:to-(--orange-10) after:rounded";
const tagBadge =
  "bg-(--sand-2) text-(--sand-11) border border-(--orange-a6) rounded-lg px-3 py-1.5 text-xs font-medium";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient");
      return;
    }

    setLoading(true);
    setError("");

    // TODO: Implement API call to OpenAI for recipe generation
    // For now, we'll simulate with placeholder data
    setTimeout(() => {
      setRecipes([
        {
          id: 1,
          title: "Recipe title",
          description: "Recipe description...",
          prepTime: "30 min",
          difficulty: "Easy",
          calories: "350",
          tags: ["tag1", "tag2", "tag3"],
        },
        {
          id: 2,
          title: "Recipe title",
          description: "Recipe description...",
          prepTime: "30 min",
          difficulty: "Easy",
          calories: "350",
          tags: ["tag1"],
        },
        {
          id: 3,
          title: "Recipe title",
          description: "Recipe description...",
          prepTime: "30 min",
          difficulty: "Easy",
          calories: "350",
          tags: ["tag2"],
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <Container size="4" className="mt-12">
      {/* Hero Section */}
      <Flex direction="column" align="center" className="mb-12">
        <div
          className={`${heroGradientBg} rounded-3xl p-12 mb-12 w-full max-w-5xl text-center`}
        >
          <Heading size="9" className={`mb-6 ${heroGradientText}`}>
            🧑‍🍳 SmartRecipe
          </Heading>
          <Text size="5" className={`${textBrown} mb-3`}>
            Enter the ingredients you have, and we'll suggest delicious recipes
            for you to cook!
          </Text>
          <Text size="3" className="text-gray-600">
            Turn your kitchen into a culinary adventure 🍳✨
          </Text>
        </div>
      </Flex>

      {/* Ingredient Input Form */}
      <Flex direction="column" align="center" className="mb-12">
        <Card className="w-full max-w-4xl bg-white rounded-[20px] shadow-[0_4px_20px_rgba(92,64,51,0.1)] border border-(--orange-a6)">
          <form onSubmit={handleSubmit} className="p-8">
            <Flex direction="column" gap="4" className="mb-6">
              <Heading size="5" className={`${textBrown} font-semibold`}>
                What ingredients do you have?
              </Heading>
              <TextArea
                rows={4}
                placeholder="e.g., tomato, beef, potato, onion, garlic..."
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                disabled={loading}
                className="text-base resize-none rounded-xl border-2 border-(--sand-6) px-4 py-3 transition-all focus:border-(--orange-9) focus:outline-none focus:ring-4 focus:ring-(--orange-a7)"
              />
              <Text size="2" className="text-gray-600">
                💡 Separate multiple ingredients with commas
              </Text>
            </Flex>

            {error && (
              <div className={`mb-6 ${errorAlert}`}>
                <Text size="3" className="text-(--red-9)">
                  {error}
                </Text>
              </div>
            )}

            <Button
              type="submit"
              size="4"
              disabled={loading}
              className={`w-full ${buttonGradient} ${
                loading ? "animate-pulse" : ""
              }`}
            >
              {loading ? (
                <Flex align="center" gap="2">
                  <span className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin"></span>
                  Generating Recipes...
                </Flex>
              ) : (
                "🍽️ Generate Recipes"
              )}
            </Button>
          </form>
        </Card>
      </Flex>

      {/* Recipe Cards */}
      {recipes.length > 0 && (
        <Flex direction="column" className="mb-12">
          <Heading size="6" className={`${textBrown} ${sectionHeading}`}>
            ✨ Suggested Recipes
          </Heading>
          <Grid columns={{ initial: "1", md: "3" }} gap="4">
            {recipes.map((recipe) => (
              <Card key={recipe.id} className={`h-full ${cardHoverEffect}`}>
                <Flex direction="column" gap="3" className="p-6">
                  <Heading size="5" className={`${textBrown} mb-1`}>
                    {recipe.title}
                  </Heading>
                  <Text size="3" className="text-gray-600 min-h-[48px]">
                    {recipe.description}
                  </Text>
                  <Flex gap="2" wrap="wrap" className="mb-3">
                    <Badge className="bg-linear-to-br from-[#6B8E23] to-[#8B9A46] text-white rounded-lg px-3 py-1.5 text-xs font-medium">
                      ⏱️ {recipe.prepTime}
                    </Badge>
                    <Badge className="bg-linear-to-br from-[#4A90E2] to-[#5BA3F5] text-white rounded-lg px-3 py-1.5 text-xs font-medium">
                      {recipe.difficulty}
                    </Badge>
                    <Badge className="bg-linear-to-br from-[#FFB627] to-[#FFC857] text-[#5c4033] rounded-lg px-3 py-1.5 text-xs font-medium">
                      🔥 {recipe.calories} cal
                    </Badge>
                  </Flex>
                  <Flex gap="1" wrap="wrap">
                    {recipe.tags.map((tag, idx) => (
                      <Badge key={idx} className={tagBadge}>
                        {tag}
                      </Badge>
                    ))}
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Flex>
      )}

      {/* Empty State */}
      {/* {recipes.length === 0 && !loading && (
        <Flex direction="column" align="center" className="max-w-2xl mx-auto text-center">
          <Text size="3" className="text-gray-600">
            👆 Enter your ingredients above to get started!
          </Text>
        </Flex>
      )} */}
    </Container>
  );
}
