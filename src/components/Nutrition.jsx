import React, { useState } from 'react';

function Nutrition({ meals, remainingCalories, progressPercent, totalCaloriesEaten, dailyGoal, handleAddMealSubmit }) {
  // סטייט מקומי לקומפוננטה - האם המודל הקופץ פתוח
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  
  // סטייט מקומי לשדות של הטופס
  const [newMealName, setNewMealName] = useState('');
  const [newMealCalories, setNewMealCalories] = useState('');
  const [newMealProtein, setNewMealProtein] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!newMealName || !newMealCalories) {
      alert('נא למלא שם ארוחה וקלוריות!');
      return;
    }
    // קורא לפונקציה המרכזית ששומרת בסופאבייס (נעביר אותה מ-App.jsx)
    handleAddMealSubmit(newMealName, newMealCalories, newMealProtein);
    
    // איפוס שדות וסגירה
    setNewMealName('');
    setNewMealCalories('');
    setNewMealProtein('');
    setIsMealModalOpen(false);
  };

  return (
    <div className="w-full animate-fadeIn space-y-6">
      <section className="text-center">
        <h2 className="text-2xl font-bold text-text-main">מעקב תזונה</h2>
      </section>

      {/* כרטיס יעד יומי */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">יעד יומי</h2>
          <span className="text-primary font-bold">נותר: {remainingCalories}</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <div className="flex justify-between text-sm text-slate-500 mt-2">
          <span>{totalCaloriesEaten.toLocaleString()} / {dailyGoal.toLocaleString()} קל׳</span>
          <span>{progressPercent}%</span>
        </div>
      </section>

      {/* רשימת ארוחות מהדאטהבייס */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex justify-between">
          <span className="font-bold">הארוחות שלי היום</span>
          <span className="font-bold text-primary">{totalCaloriesEaten} קל׳</span>
        </div>
        <div className="divide-y divide-slate-100">
          {meals.map((food) => (
            <div key={food.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{food.meal_name}</p>
                <p className="text-xs text-slate-400">חלבון: {food.protein || 0}ג׳</p>
              </div>
              <span className="font-bold">{food.calories} קל׳</span>
            </div>
          ))}
          {meals.length === 0 && (
            <p className="text-center text-slate-400 text-sm p-4">אין ארוחות רשומות בדאטהבייס.</p>
          )}
        </div>
      </div>

      {/* כפתור פתיחת מודל */}
      <button 
        onClick={() => setIsMealModalOpen(true)}
        className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl font-bold text-slate-500 bg-white hover:border-primary hover:text-primary transition-all"
      >
        + הוסף ארוחה חדשה
      </button>

      {/* המודל הקופץ - מנוהל כעת פה באופן עצמאי */}
      {isMealModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">
            <h3 className="text-lg font-bold mb-4">הוספת ארוחה חדשה</h3>
            <form onSubmit={onSubmit} className="space-y-4">
              <input 
                type="text" placeholder="שם הארוחה" value={newMealName}
                onChange={(e) => setNewMealName(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 text-sm"
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" placeholder="קלוריות" value={newMealCalories}
                  onChange={(e) => setNewMealCalories(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm"
                />
                <input 
                  type="number" placeholder="חלבון (גרם)" value={newMealProtein}
                  onChange={(e) => setNewMealProtein(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm"
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-primary text-white p-3 rounded-xl font-bold text-sm">שמור ארוחה</button>
                <button type="button" onClick={() => setIsMealModalOpen(false)} className="flex-1 bg-slate-100 p-3 rounded-xl font-bold text-sm">ביטול</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nutrition;