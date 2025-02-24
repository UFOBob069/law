import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { MealPlanFormData, MealPlanResponse } from '@/app/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 25000, // 25 second timeout
});

export const runtime = 'edge'; // Use edge runtime for better performance

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const formData: MealPlanFormData = await request.json();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a meal planning assistant that generates concise, practical recipes. Keep ingredients lists minimal and instructions clear and brief. Always respond with valid JSON matching the specified structure.`
          },
          {
            role: 'user',
            content: `Generate a meal plan with these parameters:
            - Number of meals: ${formData.numberOfMeals}
            - Servings per meal: ${formData.servingsPerMeal}
            - Cooking methods: ${formData.cookingMethods.join(', ')}
            - Dietary preferences: ${formData.dietaryPreferences.join(', ')}
            - Meal types: ${formData.mealTypes.join(', ')}
            - Excluded ingredients: ${formData.excludedIngredients.join(', ')}
            - Budget friendly: ${formData.budgetFriendly}
            - Max ingredients per meal: ${formData.maxIngredients}

            Keep recipes simple and practical. Instructions should be brief but clear.
            Reuse ingredients across meals when possible to minimize shopping list.

            Respond with ONLY a JSON object in this EXACT format:
            {
              "meals": [
                {
                  "name": "string",
                  "ingredients": [
                    {
                      "item": "string",
                      "amount": number,
                      "unit": "string"
                    }
                  ],
                  "instructions": ["string"],
                  "cookingMethod": "string",
                  "prepTime": number,
                  "cookTime": number
                }
              ],
              "shoppingList": [
                {
                  "category": "string",
                  "items": [
                    {
                      "item": "string",
                      "amount": number,
                      "unit": "string"
                    }
                  ]
                }
              ]
            }`
          }
        ],
        temperature: 0.7,
        max_tokens: 4096,
        response_format: { type: "json_object" }
      }, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.choices[0].message.content) {
        throw new Error('No response content received');
      }

      const content = response.choices[0].message.content.trim();
      const mealPlan = JSON.parse(content) as MealPlanResponse;
      
      if (!mealPlan.meals || !Array.isArray(mealPlan.meals) || mealPlan.meals.length !== formData.numberOfMeals) {
        throw new Error('Invalid meal plan structure');
      }

      return NextResponse.json(mealPlan);
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timed out. Please try again.' },
          { status: 504 }
        );
      }
      return NextResponse.json(
        { 
          error: error.message || 'Failed to generate meal plan',
          details: error.toString()
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 