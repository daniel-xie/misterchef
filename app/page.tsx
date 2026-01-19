import { CursorFollower } from "./components/CursorFollower";
import { RecipeCard } from "./components/RecipeCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-r from-violet-200 to-pink-200 cursor-none flex items-center justify-center">
      <CursorFollower />
      <RecipeCard
        title="Fresh Garden Salad"
        imageSrc="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"
        imageAlt="Delicious salad bowl"
      />
    </main>
  );
}
