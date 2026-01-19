export interface Recipe {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  proteins: string[];
  equipment: string[];
  ingredients: string[];
  steps: string[];
  timeMinutes: number;
  effort: 1 | 2 | 3;
}
