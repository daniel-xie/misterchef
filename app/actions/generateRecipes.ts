"use server";

import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";
import { getOpenAIClient } from "@/app/lib/openai";
import type { Recipe } from "@/app/types/recipe";

const RecipeSchema = z.object({
  title: z.string().describe("The name of the recipe"),
  imageAlt: z.string().describe("Alt text describing what the dish looks like"),
  proteins: z.array(z.string()).describe("List of protein sources used"),
  equipment: z.array(z.string()).describe("Kitchen equipment needed"),
  ingredients: z
    .array(z.string())
    .describe("List of ingredients with quantities"),
  steps: z.array(z.string()).describe("Step-by-step cooking instructions"),
  timeMinutes: z
    .number()
    .int()
    .positive()
    .describe("Total cooking time in minutes"),
  effort: z
    .number()
    .int()
    .min(1)
    .max(3)
    .describe("Difficulty: 1=Easy, 2=Medium, 3=Hard"),
});

const RecipesResponseSchema = z.object({
  recipes: z.array(RecipeSchema).length(3),
});

type GenerateRecipesResult =
  | { success: true; recipes: Recipe[] }
  | { success: false; error: string };

export async function generateRecipes(
  prompt?: string,
): Promise<GenerateRecipesResult> {
  try {
    const openai = getOpenAIClient();

    const systemPrompt = `You are a professional chef creating diverse, delicious recipes.
Generate exactly 3 unique recipes that are practical for home cooking.
Each recipe should have clear steps, reasonable time estimates, and accurate effort levels.
Effort levels: 1 = Easy (beginner-friendly), 2 = Medium (some skill required), 3 = Hard (advanced techniques).`;

    const userPrompt =
      prompt || "Generate 3 diverse, interesting recipes for a home cook.";

    const response = await openai.responses.parse({
      model: "gpt-5-nano",
      instructions: systemPrompt,
      input: userPrompt,
      text: {
        format: zodTextFormat(RecipesResponseSchema, "recipes_response"),
      },
      reasoning: { effort: "minimal" },
    });

    const parsed = response.output_parsed;

    if (!parsed) {
      return { success: false, error: "Failed to parse OpenAI response" };
    }

    const recipes: Recipe[] = parsed.recipes.map((recipe, index) => ({
      id: `ai-${Date.now()}-${index}`,
      title: recipe.title,
      imageSrc: getPlaceholderImage(index),
      imageAlt: recipe.imageAlt,
      proteins: recipe.proteins,
      equipment: recipe.equipment,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      timeMinutes: recipe.timeMinutes,
      effort: recipe.effort as 1 | 2 | 3,
    }));

    return { success: true, recipes };
  } catch (error) {
    console.error("Error generating recipes:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

function getPlaceholderImage(index: number): string {
  const foodImages = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",
  ];

  return foodImages[index % foodImages.length];
}
