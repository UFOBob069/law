'use client';

import { useState, useRef } from 'react';
import { CookingMethod, DietaryPreference, MealPlanFormData, MealPlanResponse } from '../types';
import IngredientRain from './IngredientRain';
import { RAIN_DURATION } from '../constants';
import SaveToPdfButton from './SaveToPdfButton';

// Add Tailwind custom colors in your tailwind.config.ts
// colors: {
//   'dinstein': {
//     orange: '#FF6B00',
//     'orange-light': '#FF8533',
//     'orange-dark': '#CC5500',
//   }
// }

const COOKING_METHODS: { value: CookingMethod; label: string }[] = [
  { value: 'slow_cooker', label: 'Slow Cooker' },
  { value: 'instant_pot', label: 'Instant Pot' },
  { value: 'one_pan', label: 'One-Pan Meals' },
  { value: 'oven', label: 'Oven Baked' },
  { value: 'stovetop', label: 'Stovetop Only' },
  { value: 'no_cook', label: 'No-Cook Meals' },
];

const DIETARY_PREFERENCES: { value: DietaryPreference; label: string }[] = [
  { value: 'chicken', label: 'Chicken' },
  { value: 'beef', label: 'Beef' },
  { value: 'pork', label: 'Pork' },
  { value: 'fish', label: 'Fish/Seafood' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'dairy_free', label: 'Dairy-Free' },
  { value: 'gluten_free', label: 'Gluten-Free' },
];

export default function MealPlannerForm() {
  const [formData, setFormData] = useState<MealPlanFormData>({
    numberOfMeals: 1,
    servingsPerMeal: 1,
    cookingMethods: [] as CookingMethod[],
    dietaryPreferences: [] as DietaryPreference[],
    budgetFriendly: false,
    maxIngredients: 10,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlanResponse | null>(null);
  const [showRain, setShowRain] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate number inputs before submission
    if (formData.numberOfMeals === '' || formData.servingsPerMeal === '') {
      setError('Please enter values for number of meals and servings');
      return;
    }

    setLoading(true);
    setError(null);
    setMealPlan(null);

    try {
      const validatedFormData = {
        ...formData,
        numberOfMeals: Number(formData.numberOfMeals),
        servingsPerMeal: Number(formData.servingsPerMeal),
      };

      const response = await fetch('/api/generateMealPlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedFormData),
      });

      const data = await response.json();
      console.log('API response:', data);

      if (!response.ok) {
        throw new Error(
          data.error || data.details || 'Failed to generate meal plan'
        );
      }

      setMealPlan(data);
      setShowRain(true);
      
      // Scroll to results after a short delay to ensure rendering is complete
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);

      // Reset rain after animation
      setTimeout(() => {
        setShowRain(false);
      }, RAIN_DURATION);

    } catch (err) {
      console.error('Form submission error:', err);
      setError(
        err instanceof Error 
          ? `Error: ${err.message}` 
          : 'Failed to generate meal plan'
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleCookingMethod = (method: CookingMethod) => {
    setFormData(prev => ({
      ...prev,
      cookingMethods: prev.cookingMethods.includes(method)
        ? prev.cookingMethods.filter(m => m !== method)
        : [...prev.cookingMethods, method]
    }));
  };

  const toggleDietaryPreference = (preference: DietaryPreference) => {
    setFormData(prev => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(preference)
        ? prev.dietaryPreferences.filter(p => p !== preference)
        : [...prev.dietaryPreferences, preference]
    }));
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'numberOfMeals' | 'servingsPerMeal' | 'maxIngredients'
  ) => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      {showRain && <IngredientRain />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl max-w-2xl mx-auto p-8">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="numberOfMeals" className="block text-sm font-medium text-gray-700">
                  Number of Meals: <span className="text-dinstein-orange">{formData.numberOfMeals}</span>
                </label>
                <div className="mt-2">
                  <input
                    type="range"
                    id="numberOfMeals"
                    min="1"
                    max="5"
                    step="1"
                    value={formData.numberOfMeals}
                    onChange={(e) => handleNumberChange(e, 'numberOfMeals')}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-dinstein-orange"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="servingsPerMeal" className="block text-sm font-medium text-gray-700">
                  Servings per Meal: <span className="text-dinstein-orange">{formData.servingsPerMeal}</span>
                </label>
                <div className="mt-2">
                  <input
                    type="range"
                    id="servingsPerMeal"
                    min="1"
                    max="8"
                    step="1"
                    value={formData.servingsPerMeal}
                    onChange={(e) => handleNumberChange(e, 'servingsPerMeal')}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-dinstein-orange"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="maxIngredients" className="block text-sm font-medium text-gray-700">
                  Max Ingredients
                </label>
                <input
                  type="number"
                  id="maxIngredients"
                  min="5"
                  max="20"
                  value={formData.maxIngredients}
                  onChange={(e) => handleNumberChange(e, 'maxIngredients')}
                  className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-dinstein-orange focus:ring-dinstein-orange"
                />
              </div>
            </div>

            {/* Cooking Methods */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Cooking Methods (Optional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {COOKING_METHODS.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleCookingMethod(value)}
                    className={`p-3 text-sm rounded-lg border transition-all ${
                      formData.cookingMethods.includes(value)
                        ? 'bg-orange-100 border-orange-500 text-orange-700'
                        : 'border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Preferences */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Dietary Preferences (Optional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {DIETARY_PREFERENCES.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleDietaryPreference(value)}
                    className={`p-3 text-sm rounded-lg border transition-all ${
                      formData.dietaryPreferences.includes(value)
                        ? 'bg-orange-100 border-orange-500 text-orange-700'
                        : 'border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Checkbox */}
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="budgetFriendly"
                  checked={formData.budgetFriendly}
                  onChange={(e) => setFormData(prev => ({ ...prev, budgetFriendly: e.target.checked }))}
                  className="h-4 w-4 text-dinstein-orange rounded border-gray-300 focus:ring-dinstein-orange"
                />
                <label htmlFor="budgetFriendly" className="ml-2 text-sm text-gray-700">
                  Budget-Friendly Meals
                </label>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-8 w-full py-4 px-6 rounded-lg text-white text-lg font-medium transition-all
              ${loading 
                ? 'bg-orange-300 cursor-not-allowed' 
                : 'bg-dinstein-orange hover:bg-dinstein-orange-dark'
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                    fill="none"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Cooking up your recipes...
              </span>
            ) : 'Generate Meal Plan'}
          </button>
        </form>

        {/* Results Section */}
        {mealPlan && (
          <div ref={resultsRef} className="max-w-4xl mx-auto mt-12 space-y-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Your Meal Plan
              </h2>
              <SaveToPdfButton mealPlan={mealPlan} />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Meals Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800">Meals</h3>
                {mealPlan.meals.map((meal, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                    <h4 className="text-xl font-medium text-dinstein-orange">
                      {meal.name}
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Ingredients:</h5>
                        <ul className="list-disc pl-5 text-gray-600">
                          {meal.ingredients.map((ing, i) => (
                            <li key={i}>
                              {ing.amount} {ing.unit} {ing.item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Instructions:</h5>
                        <ol className="list-decimal pl-5 text-gray-600">
                          {meal.instructions.map((step, i) => (
                            <li key={i} className="mb-2">{step}</li>
                          ))}
                        </ol>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm bg-orange-50 rounded-lg p-4">
                        <div>
                          <p className="font-medium text-gray-700">Method</p>
                          <p className="text-gray-600">{meal.cookingMethod}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Prep Time</p>
                          <p className="text-gray-600">{meal.prepTime} min</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Cook Time</p>
                          <p className="text-gray-600">{meal.cookTime} min</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shopping List Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800">Shopping List</h3>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  {mealPlan.shoppingList.map((category, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <h4 className="font-medium text-lg text-dinstein-orange capitalize mb-3">
                        {category.category}
                      </h4>
                      <ul className="list-disc pl-5 text-gray-600">
                        {category.items.map((item, i) => (
                          <li key={i} className="mb-2">
                            {item.amount} {item.unit} {item.item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 