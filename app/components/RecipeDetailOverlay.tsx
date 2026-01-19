"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Recipe } from "@/app/types/recipe";

interface RecipeDetailOverlayProps {
  recipe: Recipe | null;
  onClose: () => void;
  layoutId?: string;
}

export function RecipeDetailOverlay({
  recipe,
  onClose,
  layoutId,
}: RecipeDetailOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!recipe) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    overlayRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [recipe, onClose]);

  if (typeof window === "undefined") return null;

  const effortLabel = recipe
    ? ["Easy", "Medium", "Hard"][recipe.effort - 1]
    : "";

  return createPortal(
    <AnimatePresence>
      {recipe && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Content Card */}
          <motion.div
            ref={overlayRef}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-2xl z-50 overflow-auto shadow-2xl"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="recipe-title"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md"
              aria-label="Close recipe"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Recipe content */}
            <div className="p-6 md:p-8">
              {/* Header with image */}
              <div className="relative h-48 md:h-64 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6">
                <img
                  src={recipe.imageSrc}
                  alt={recipe.imageAlt}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl" />
                <h1
                  id="recipe-title"
                  className="absolute bottom-4 left-6 text-3xl font-bold text-white"
                >
                  {recipe.title}
                </h1>
              </div>

              {/* Meta info */}
              <div className="flex gap-4 mb-6 text-gray-600">
                <span>{recipe.timeMinutes} minutes</span>
                <span>·</span>
                <span>{effortLabel}</span>
              </div>

              {/* Two column layout for larger screens */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left column: Ingredients & Equipment */}
                <div className="space-y-6">
                  <section>
                    <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
                    <ul className="space-y-2">
                      {recipe.ingredients.map((ing, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + 0.05 * i }}
                          className="flex items-start gap-2"
                        >
                          <span className="text-violet-600 mt-1">•</span>
                          <span>{ing}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3">Equipment</h2>
                    <ul className="flex flex-wrap gap-2">
                      {recipe.equipment.map((eq, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + 0.05 * i }}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {eq}
                        </motion.li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3">Proteins</h2>
                    <ul className="flex flex-wrap gap-2">
                      {recipe.proteins.map((p, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + 0.05 * i }}
                          className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm"
                        >
                          {p}
                        </motion.li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Right column: Steps */}
                <section>
                  <h2 className="text-xl font-semibold mb-3">Instructions</h2>
                  <ol className="space-y-4">
                    {recipe.steps.map((step, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + 0.1 * i }}
                        className="flex gap-3"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-sm font-medium">
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </motion.li>
                    ))}
                  </ol>
                </section>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
