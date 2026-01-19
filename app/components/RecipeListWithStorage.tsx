"use client";

import { RecipeList } from "./RecipeList";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import type { Recipe } from "@/app/types/recipe";

export function RecipeListWithStorage() {
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>(
    "misterchef-recipes",
    [],
  );

  return <RecipeList recipes={recipes} onRecipesChange={setRecipes} />;
}
