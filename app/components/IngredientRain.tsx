'use client';

import { useEffect, useState } from 'react';
import { RAIN_DURATION } from '../constants';

const INGREDIENTS = ['🌿', '🍅', '🥕', '🥩', '🧄', '🥬', '🥦', '🍗', '🧅', '🥔', '🥚', '🧀'];

interface Ingredient {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  rotation: number;
}

export default function IngredientRain() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Create 30 ingredients with random properties
    const newIngredients = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: INGREDIENTS[Math.floor(Math.random() * INGREDIENTS.length)],
      x: Math.random() * 100,
      delay: Math.random() * 500,
      duration: 1000 + Math.random() * 1000,
      rotation: Math.random() * 360,
    }));

    setIngredients(newIngredients);

    const timer = setTimeout(() => {
      setIngredients([]);
    }, RAIN_DURATION);

    return () => clearTimeout(timer);
  }, [isClient]);

  // Don't render anything during SSR
  if (!isClient) return null;
  if (ingredients.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {ingredients.map((ingredient) => (
        <div
          key={ingredient.id}
          className="absolute animate-fall"
          style={{
            left: `${ingredient.x}%`,
            animation: `fall ${ingredient.duration}ms linear ${ingredient.delay}ms forwards`,
            transform: `rotate(${ingredient.rotation}deg)`,
            fontSize: '1.5rem',
          }}
        >
          {ingredient.emoji}
        </div>
      ))}
    </div>
  );
} 