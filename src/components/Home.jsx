import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import IngredientForm from "./IngredientForm";
import SuggestedRecipes from "./SuggestedRecipes";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState("ingredients"); // 'ingredients' or 'recipes'

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
          title: "Classic Beef Stir-Fry",
          description:
            "A quick and flavorful stir-fry that brings together tender beef, crisp vegetables, and a savory sauce. Perfect for a weeknight dinner that's ready in under 30 minutes.",
          prepTime: "30 min",
          difficulty: "Easy",
          calories: "420",
          tags: ["Beef", "Asian", "Quick"],
          ingredients: [
            "1 lb beef, sliced into thin strips",
            "2 large tomatoes, diced",
            "2 medium potatoes, cubed",
            "1 large onion, sliced",
            "3 cloves garlic, minced",
            "2 tablespoons vegetable oil",
            "2 tablespoons soy sauce",
            "1 tablespoon oyster sauce",
            "Salt and pepper to taste",
          ],
          instructions: [
            "Heat oil in a large wok or skillet over high heat.",
            "Add beef strips and cook for 2-3 minutes until browned. Remove and set aside.",
            "In the same pan, add garlic and stir for 30 seconds until fragrant.",
            "Add onion and cook for 2 minutes until softened.",
            "Add potatoes and cook for 5-6 minutes until starting to brown.",
            "Add tomatoes and cook for 2 minutes until they release their juices.",
            "Return beef to the pan and add soy sauce and oyster sauce.",
            "Toss everything together and cook for another 2 minutes.",
            "Season with salt and pepper. Serve hot over rice.",
          ],
          tips: [
            "Slice the beef while it's slightly frozen for easier cutting.",
            "Don't overcook the vegetables - they should remain crisp.",
            "Have all ingredients prepped before you start cooking (mise en place).",
          ],
        },
        {
          id: 2,
          title: "Hearty Beef and Potato Stew",
          description:
            "A comforting stew that combines tender beef chunks with potatoes and tomatoes in a rich, savory broth. Perfect for a cozy dinner on a chilly evening.",
          prepTime: "45 min",
          difficulty: "Medium",
          calories: "380",
          tags: ["Beef", "Comfort Food", "Stew"],
          ingredients: [
            "1 lb beef, cut into chunks",
            "3 large tomatoes, diced",
            "3 medium potatoes, cubed",
            "1 large onion, chopped",
            "4 cloves garlic, minced",
            "2 tablespoons olive oil",
            "2 cups beef broth",
            "1 bay leaf",
            "Salt and pepper to taste",
            "Fresh herbs (thyme or rosemary)",
          ],
          instructions: [
            "Heat olive oil in a large pot over medium-high heat.",
            "Season beef chunks with salt and pepper, then brown on all sides. Remove and set aside.",
            "Add onion and garlic to the pot and cook until softened, about 3 minutes.",
            "Add tomatoes and cook until they break down, about 5 minutes.",
            "Return beef to the pot and add beef broth and bay leaf.",
            "Bring to a boil, then reduce heat and simmer for 20 minutes.",
            "Add potatoes and continue simmering for 15-20 minutes until potatoes are tender.",
            "Season with salt and pepper. Garnish with fresh herbs and serve hot.",
          ],
          tips: [
            "Brown the beef well for deeper flavor in the stew.",
            "Cut potatoes into uniform pieces for even cooking.",
            "Let the stew rest for 10 minutes before serving to allow flavors to meld.",
          ],
        },
        {
          id: 3,
          title: "Mediterranean Beef and Potato Bake",
          description:
            "A delicious one-pan dish featuring beef, potatoes, and tomatoes roasted together with garlic and herbs. Simple, flavorful, and perfect for family dinners.",
          prepTime: "35 min",
          difficulty: "Easy",
          calories: "350",
          tags: ["Beef", "Mediterranean", "Baked"],
          ingredients: [
            "1 lb beef, cut into bite-sized pieces",
            "4 large tomatoes, quartered",
            "4 medium potatoes, cut into wedges",
            "1 large onion, cut into wedges",
            "5 cloves garlic, whole",
            "3 tablespoons olive oil",
            "1 teaspoon dried oregano",
            "1 teaspoon dried thyme",
            "Salt and pepper to taste",
            "Fresh parsley for garnish",
          ],
          instructions: [
            "Preheat oven to 400°F (200°C).",
            "In a large bowl, toss beef, potatoes, tomatoes, onion, and garlic with olive oil.",
            "Season with oregano, thyme, salt, and pepper.",
            "Spread everything in a single layer on a large baking sheet.",
            "Roast for 25-30 minutes, stirring halfway through, until beef is cooked and potatoes are tender.",
            "Remove from oven and let rest for 5 minutes.",
            "Garnish with fresh parsley and serve hot.",
          ],
          tips: [
            "Cut all ingredients into similar sizes for even cooking.",
            "Don't overcrowd the baking sheet - use two if needed.",
            "The garlic will become sweet and mellow when roasted whole.",
          ],
        },
      ]);
      setLoading(false);
      setCurrentStep("recipes");
    }, 1000);
  };

  const handleBackToIngredients = () => {
    setCurrentStep("ingredients");
    setRecipes([]);
    // setIngredients("");
  };

  return (
    <Container className="p-4">
      <Row className="my-4 text-center">
        <p
          className="lead"
          style={{ color: "var(--color-warm-brown)", fontSize: "1.25rem" }}
        >
          Turn your ingredients into delicious recipes ✨
        </p>
      </Row>
      {currentStep === "ingredients" ? (
        <IngredientForm
          ingredients={ingredients}
          setIngredients={setIngredients}
          loading={loading}
          error={error}
          onSubmit={handleSubmit}
        />
      ) : (
        <SuggestedRecipes recipes={recipes} onBack={handleBackToIngredients} />
      )}
    </Container>
  );
}
