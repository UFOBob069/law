import Header from './components/Header';
import MealPlannerForm from './components/MealPlannerForm';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <MealPlannerForm />
      </main>
    </div>
  );
}
