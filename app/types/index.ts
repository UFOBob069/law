export type Recipe = {
  id: string;
  name: string;
  servings: number;
  cookingMethod: CookingMethod;
  ingredients: Ingredient[];
  instructions: string[];
  dietaryTags: DietaryPreference[];
  prepTime: number;
  cookTime: number;
};

export type Ingredient = {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: IngredientCategory;
};

export type IngredientCategory = 
  | 'produce'
  | 'dairy'
  | 'meat'
  | 'pantry'
  | 'spices'
  | 'other';

export type CookingMethod = 
  | 'slow_cooker'
  | 'instant_pot'
  | 'one_pan'
  | 'oven'
  | 'stovetop'
  | 'no_cook'
  | 'make_ahead';

export type DietaryPreference = 
  | 'chicken'
  | 'beef'
  | 'pork'
  | 'fish'
  | 'vegetarian'
  | 'vegan'
  | 'dairy_free'
  | 'gluten_free'
  | 'kid_friendly';

export type MealType =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'snack'
  | 'portable'
  | 'dessert'
  | 'side';

export type Allergen =
  | 'milk'
  | 'eggs'
  | 'fish'
  | 'shellfish'
  | 'tree_nuts'
  | 'peanuts'
  | 'wheat'
  | 'soy'
  | 'sesame'
  | 'coconut'
  | 'cilantro';

export interface MealPlanFormData {
  numberOfMeals: number | '';
  servingsPerMeal: number | '';
  cookingMethods: CookingMethod[];
  dietaryPreferences: DietaryPreference[];
  mealTypes: MealType[];
  excludedIngredients: Allergen[];
  budgetFriendly: boolean;
  maxIngredients: number;
}

export interface MealPlanResponse {
  meals: {
    name: string;
    ingredients: {
      item: string;
      amount: number;
      unit: string;
    }[];
    instructions: string[];
    cookingMethod: string;
    prepTime: number;
    cookTime: number;
  }[];
  shoppingList: {
    category: string;
    items: {
      item: string;
      amount: number;
      unit: string;
    }[];
  }[];
} 