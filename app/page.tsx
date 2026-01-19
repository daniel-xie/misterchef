import { CursorFollower } from "./components/CursorFollower";
import { RecipeGenerator } from "./components/RecipeGenerator";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-r from-violet-200 to-pink-200 cursor-none flex flex-col items-center justify-center p-8">
      <CursorFollower />
      <RecipeGenerator initialRecipes={[]} />
    </main>
  );
}
