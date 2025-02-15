'use client';

import { useState } from 'react';
import { MealPlanResponse } from '../types';

interface SaveToPdfButtonProps {
  mealPlan: MealPlanResponse;
}

export default function SaveToPdfButton({ mealPlan }: SaveToPdfButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF('p', 'mm', 'a4');
      let yOffset = 10;

      // Title
      pdf.setFontSize(24);
      pdf.text('Your Meal Plan', 105, yOffset, { align: 'center' });
      yOffset += 20;

      // Meals
      pdf.setFontSize(18);
      mealPlan.meals.forEach((meal, index) => {
        // Check if we need a new page
        if (yOffset > 250) {
          pdf.addPage();
          yOffset = 10;
        }

        pdf.setFontSize(16);
        pdf.text(`${index + 1}. ${meal.name}`, 10, yOffset);
        yOffset += 10;

        // Ingredients
        pdf.setFontSize(12);
        pdf.text('Ingredients:', 15, yOffset);
        yOffset += 5;
        meal.ingredients.forEach(ing => {
          pdf.text(`• ${ing.amount} ${ing.unit} ${ing.item}`, 20, yOffset);
          yOffset += 5;
        });
        yOffset += 5;

        // Instructions
        pdf.text('Instructions:', 15, yOffset);
        yOffset += 5;
        meal.instructions.forEach((step: string, i: number) => {
          const lines: string[] = pdf.splitTextToSize(`${i + 1}. ${step}`, 170);
          lines.forEach((line: string) => {
            if (yOffset > 280) {
              pdf.addPage();
              yOffset = 10;
            }
            pdf.text(line, 20, yOffset);
            yOffset += 5;
          });
        });
        yOffset += 10;

        // Cooking info
        pdf.text(`Cooking Method: ${meal.cookingMethod}`, 15, yOffset);
        yOffset += 5;
        pdf.text(`Prep Time: ${meal.prepTime} min | Cook Time: ${meal.cookTime} min`, 15, yOffset);
        yOffset += 15;
      });

      // Shopping List
      pdf.addPage();
      yOffset = 10;
      pdf.setFontSize(18);
      pdf.text('Shopping List', 105, yOffset, { align: 'center' });
      yOffset += 15;

      pdf.setFontSize(12);
      mealPlan.shoppingList.forEach(category => {
        if (yOffset > 250) {
          pdf.addPage();
          yOffset = 10;
        }

        pdf.setFontSize(14);
        pdf.text(category.category.toUpperCase(), 10, yOffset);
        yOffset += 8;

        pdf.setFontSize(12);
        category.items.forEach(item => {
          pdf.text(`• ${item.amount} ${item.unit} ${item.item}`, 15, yOffset);
          yOffset += 5;
        });
        yOffset += 8;
      });

      pdf.save('meal-plan.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all
        ${isGenerating 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-dinstein-orange hover:bg-dinstein-orange-dark'
        }`}
    >
      {isGenerating ? (
        <>
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
          Generating PDF...
        </>
      ) : (
        <>
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Save as PDF
        </>
      )}
    </button>
  );
} 