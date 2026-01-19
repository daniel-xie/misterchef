import { CursorFollower } from "./components/CursorFollower";
import { RecipeCard } from "./components/RecipeCard";
import { Recipe } from "./types/recipe";

const recipes: Recipe[] = [
  {
    id: "1",
    title: "Fresh Garden Salad",
    imageSrc: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    imageAlt: "Delicious salad bowl",
    proteins: [],
    equipment: ["bowl"],
    ingredients: ["lettuce", "tomatoes", "cucumber", "olive oil", "lemon"],
    steps: ["Wash vegetables", "Chop ingredients", "Toss with dressing"],
    timeMinutes: 15,
    effort: 1,
  },
  {
    id: "2",
    title: "Grilled Salmon",
    imageSrc: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    imageAlt: "Grilled salmon with vegetables",
    proteins: ["salmon"],
    equipment: ["grill", "tongs"],
    ingredients: ["salmon fillet", "olive oil", "lemon", "dill", "salt"],
    steps: ["Season salmon", "Preheat grill", "Grill 4-5 min per side"],
    timeMinutes: 25,
    effort: 2,
  },
  {
    id: "3",
    title: "Pasta Primavera",
    imageSrc: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80",
    imageAlt: "Colorful pasta dish",
    proteins: [],
    equipment: ["pot", "pan"],
    ingredients: ["pasta", "zucchini", "bell peppers", "garlic", "parmesan"],
    steps: ["Boil pasta", "Sauté vegetables", "Combine and season"],
    timeMinutes: 30,
    effort: 2,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-r from-violet-200 to-pink-200 cursor-none flex items-center justify-center p-8">
      <CursorFollower />
      <div className="flex flex-col lg:flex-row gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
