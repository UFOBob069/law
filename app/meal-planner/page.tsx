export default function MealPlannerResults() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Your Meal Plan</h2>
        {/* Recipe results will be displayed here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Recipe cards will go here */}
        </div>
      </main>
    </div>
  );
} 