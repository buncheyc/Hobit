import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Nutrition from './components/Nutrition';
import Workouts from './components/Workouts';
import Home from './components/Home';
import Hobbies from './components/Hobbies';
import Profile from './components/Profile';
import Login from './components/Login';
import Upgrade from './components/Upgrade';

function App() {
  const [activeTab, setActiveTab] = useState('home'); 
  const [activeFilter, setActiveFilter] = useState('הכל');
const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return localStorage.getItem('hobit_is_logged_in') === 'true';
});
  const [userProfile, setUserProfile] = useState({
    full_name: 'משתמש HOBIT',
    daily_calorie_goal: 2000
  });

  const [workouts, setWorkouts] = useState([
    { id: 1, workout_type: 'אימון משקולות פלג גוף עליון', duration: 45, calories: 320, category: 'כוח', done: true },
    { id: 2, workout_type: 'אימון רגליים וישבן (Squat Day)', duration: 50, calories: 400, category: 'כוח', done: false },
    { id: 3, workout_type: 'אימון פונקציונלי קרוספיט', duration: 40, calories: 380, category: 'כוח', done: false },
    { id: 4, workout_type: 'רכיבת אופניים אירובית', duration: 30, calories: 240, category: 'קרדיו', done: false },
    { id: 5, workout_type: 'ריצת נפח קצב בינוני', duration: 50, calories: 450, category: 'קרדיו', done: false },
    { id: 6, workout_type: 'אימון קיקבוקסינג בעצימות גבוהה', duration: 45, calories: 420, category: 'קרדיו', done: true },
    { id: 7, workout_type: 'אימון יוגה דינמית (Vinyasa)', duration: 60, calories: 180, category: 'גמישות', done: false },
    { id: 8, workout_type: 'פילאטיס מזרן לחיזוק הליבה', duration: 45, calories: 210, category: 'גמישות', done: false },
    { id: 9, workout_type: 'מתיחות עמוקות ושחרור שרירים', duration: 25, calories: 90, category: 'גמישות', done: true }
  ]);
  const [meals, setMeals] = useState([]);

  const totalCaloriesEaten = meals.reduce((sum, m) => sum + (parseInt(m.calories) || 0), 0);
  const dailyGoal = userProfile.daily_calorie_goal || 2000;
  const remainingCalories = dailyGoal - totalCaloriesEaten;
  const progressPercent = Math.min(Math.round((totalCaloriesEaten / dailyGoal) * 100), 100);

  useEffect(() => {
    async function fetchData() {
      const targetUserId = '680a0e11-a00d-4325-92ca-a76ff0e5c7ff';

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', targetUserId)
        .single();
      
      if (profileData) setUserProfile(profileData);

      const { data: mealsData } = await supabase
        .from('meals')
        .select('*')
        .eq('user_id', targetUserId);
      
      if (mealsData) setMeals(mealsData);
    }

    fetchData();
  }, []);

  const toggleWorkout = (id) => {
    setWorkouts(workouts.map(w => w.id === id ? { ...w, done: !w.done } : w));
  };

  const handleDeleteMeal = async (mealId) => {
    const { error } = await supabase
      .from('meals')
      .delete()
      .eq('id', mealId);

    if (error) {
      alert('לא ניתן היה למחוק את הארוחה. נסי שוב.');
    } else {
      setMeals(meals.filter(m => m.id !== mealId));
    }
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between pb-24 relative bg-slate-50">
      
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-black tracking-wider text-primary">HOBIT</h1>
        <button 
          onClick={() => setActiveTab('profile')}
          className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"
        >
          <span className="material-symbols-outlined text-xl">person</span>
        </button>
      </header>

      <main className="px-4 max-w-2xl mx-auto pt-6 flex-1 w-full">
        {activeTab === 'home' && (
          <Home userProfile={userProfile} totalCaloriesEaten={totalCaloriesEaten} workouts={workouts} setActiveTab={setActiveTab} />
        )}
        {activeTab === 'workouts' && (
          <Workouts workouts={workouts} toggleWorkout={toggleWorkout} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        )}
        {activeTab === 'nutrition' && (
          <Nutrition 
            meals={meals} 
            remainingCalories={remainingCalories} 
            progressPercent={progressPercent} 
            totalCaloriesEaten={totalCaloriesEaten} 
            dailyGoal={dailyGoal} 
            handleAddMealSubmit={async (name, calories, protein) => {
              const targetUserId = '680a0e11-a00d-4325-92ca-a76ff0e5c7ff';
              const { data } = await supabase.from('meals').insert([{ user_id: targetUserId, meal_name: name, calories: parseInt(calories), protein: parseInt(protein) || 0 }]).select();
              if (data) setMeals([...meals, data[0]]);
            }}
            handleDeleteMeal={handleDeleteMeal}
          />
        )}
        {activeTab === 'hobbies' && <Hobbies />}
        {activeTab === 'profile' && (
          <Profile 
            userProfile={userProfile} 
            setUserProfile={setUserProfile} 
            setActiveTab={setActiveTab}
            handleLogout={() => {
              setIsLoggedIn(false);     
              setActiveTab('home');     
            }} 
          />
        )}
{activeTab === 'upgrade' && <Upgrade onClose={() => setActiveTab('home')} />}      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-100 px-6 py-2 z-40 flex justify-between items-center max-w-2xl mx-auto">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'home' ? 'text-primary font-bold' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px]">בית</span>
        </button>
        <button onClick={() => setActiveTab('workouts')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'workouts' ? 'text-primary font-bold' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined">fitness_center</span>
          <span className="text-[10px]">אימונים</span>
        </button>
        <button onClick={() => setActiveTab('nutrition')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'nutrition' ? 'text-primary font-bold' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined">restaurant</span>
          <span className="text-[10px]">תזונה</span>
        </button>
        <button onClick={() => setActiveTab('hobbies')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'hobbies' ? 'text-primary font-bold' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined">sports_tennis</span>
          <span className="text-[10px]">יומן</span>
        </button>
      </nav>
    </div>
  );
}

export default App;