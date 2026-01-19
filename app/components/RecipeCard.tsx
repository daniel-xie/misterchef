import { Card } from "@/components/ui/card";
import Image from "next/image";

interface RecipeCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
}

export function RecipeCard({ title, imageSrc, imageAlt }: RecipeCardProps) {
  return (
    <Card className="relative overflow-hidden w-80 h-96 p-0 border-0">
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="text-white text-2xl font-bold">{title}</h2>
      </div>
    </Card>
  );
}
