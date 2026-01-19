"use client";

import { useState, useTransition, useCallback } from "react";
import { RecipeCard } from "./RecipeCard";
import { RecipeCardSkeleton } from "./RecipeCardSkeleton";
import { RecipeDetailOverlay } from "./RecipeDetailOverlay";
import { generateRecipes } from "@/app/actions/generateRecipes";
import type { Recipe } from "@/app/types/recipe";

const RECIPES_PER_PAGE = 3;

interface RecipeListProps {
  recipes: Recipe[];
  onRecipesChange: (recipes: Recipe[] | ((prev: Recipe[]) => Recipe[])) => void;
}

export function RecipeList({
  recipes,
  onRecipesChange,
}: RecipeListProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  const selectedRecipe = recipes.find((r) => r.id === selectedRecipeId) ?? null;

  const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE);
  const currentRecipes = recipes.slice(
    currentPage * RECIPES_PER_PAGE,
    (currentPage + 1) * RECIPES_PER_PAGE,
  );

  const handleGenerate = useCallback(() => {
    setError(null);

    startTransition(async () => {
      const result = await generateRecipes();

      if (result.success) {
        onRecipesChange((prev: Recipe[]) => {
          const newRecipes = [...prev, ...result.recipes];
          const newTotalPages = Math.ceil(newRecipes.length / RECIPES_PER_PAGE);
          setCurrentPage(newTotalPages - 1);
          return newRecipes;
        });
      } else {
        setError(result.error);
      }
    });
  }, [onRecipesChange]);

  const handleClear = useCallback(() => {
    onRecipesChange([]);
    setCurrentPage(0);
    setError(null);
  }, [onRecipesChange]);

  const handlePrevious = useCallback(() => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  }, [totalPages]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-4">
        <button
          onClick={handleGenerate}
          disabled={isPending}
          className="px-6 py-3 bg-violet-600 text-white rounded-lg font-semibold
                     hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors cursor-auto"
        >
          {isPending ? "Generating..." : "Generate Recipes"}
        </button>

        {recipes.length > 0 && (
          <button
            onClick={handleClear}
            disabled={isPending}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold
                       hover:bg-gray-300 disabled:opacity-50 transition-colors cursor-auto"
          >
            Clear All
          </button>
        )}
      </div>

      {error && (
        <div className="px-4 py-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row flex-wrap gap-6 justify-center">
        {currentRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            layoutId={`recipe-card-${recipe.id}`}
            isSelected={selectedRecipeId === recipe.id}
            onClick={() => setSelectedRecipeId(recipe.id)}
          />
        ))}

        {isPending && (
          <>
            <RecipeCardSkeleton />
            <RecipeCardSkeleton />
            <RecipeCardSkeleton />
          </>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0 || isPending}
            className="px-4 py-2 bg-white/80 text-gray-800 rounded-lg font-medium
                       hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors cursor-auto"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1 || isPending}
            className="px-4 py-2 bg-white/80 text-gray-800 rounded-lg font-medium
                       hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors cursor-auto"
          >
            Next
          </button>
        </div>
      )}

      {recipes.length === 0 && !isPending && (
        <p className="text-gray-600 text-lg">
          Click &quot;Generate Recipes&quot; to create AI-powered recipe
          suggestions!
        </p>
      )}

      <RecipeDetailOverlay
        recipe={selectedRecipe}
        layoutId={
          selectedRecipe ? `recipe-card-${selectedRecipe.id}` : undefined
        }
        onClose={() => setSelectedRecipeId(null)}
      />
    </div>
  );
}
