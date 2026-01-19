"use client";

import { motion } from "motion/react";
import TiltedCard from "@/components/TiltedCard";
import { Recipe } from "@/app/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
  isSelected?: boolean;
  layoutId?: string;
}

export function RecipeCard({ recipe, onClick, isSelected, layoutId }: RecipeCardProps) {
  const effortLabel = ["Easy", "Medium", "Hard"][recipe.effort - 1];

  return (
    <motion.div
      style={{
        perspective: "1000px",
      }}
      animate={{
        rotateY: isSelected ? 90 : 0,
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 200,
      }}
    >
      <TiltedCard
        imageSrc={recipe.imageSrc}
        altText={recipe.imageAlt}
        captionText={recipe.title}
        containerHeight="384px"
        containerWidth="320px"
        imageHeight="384px"
        imageWidth="320px"
        showMobileWarning={false}
        displayOverlayContent={true}
        onClick={onClick}
        overlayContent={
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-[15px]" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-white text-2xl font-bold">{recipe.title}</h2>
              <div className="flex gap-3 mt-2 text-white/80 text-sm">
                <span>{recipe.timeMinutes} min</span>
                <span>·</span>
                <span>{effortLabel}</span>
              </div>
            </div>
          </>
        }
      />
    </motion.div>
  );
}
