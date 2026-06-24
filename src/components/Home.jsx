import React, { useState } from 'react';
import HabitBattery from './HabitBattery';

function Home({ userProfile, totalCaloriesEaten, workouts, setActiveTab }) {
  // ניהול דינמי של ימי השבוע - מערך של אובייקטים עם מצב ביצוע
  const [weeklyDays, setWeeklyDays] = useState([
    { id: 1, name: "א'", short: "א", completed: true },
    { id: 2, name: "ב'", short: "ב", completed: true },
    { id: 3, name: "ג'", short: "ג", completed: false },
    { id: 4, name: "ד'", short: "ד", completed: true },
    { id: 5, name: "ה'", short: "ה", completed: false },
    { id: 6, name: "ו'", short: "ו", completed: false },
    { id: 7, name: "ש'", short: "ש", completed: false },
  ]);

  // סטייט דינמי למד הדלק שמושפע מההתמדה השבועית
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [streak, setStreak] = useState(7);

  // פונקציה לשינוי מצב יום בלחיצה ועדכון מד הדלק באופן דינמי
  const toggleDay = (id) => {
    const updatedDays = weeklyDays.map(day => {
      if (day.id === id) {
        const newStatus = !day.completed;
        // עדכון קל ומדומה של מד הדלק בהתאם ללחיצה בשביל הוואו במצגת!
        if (newStatus) {
          setBatteryLevel(prev => Math.min(prev + 12, 100));
        } else {
          setBatteryLevel(prev => Math.max(prev - 12, 0));
        }
        return { ...day, completed: newStatus };
      }
      return day;
    });
    setWeeklyDays(updatedDays);
    
    // חישוב מחדש של ה-Streak לפי ימים רצופים מסומנים
    const completedCount = updatedDays.filter(d => d.completed).length;
    setStreak(completedCount * 2 - 1 > 0 ? completedCount * 2 - 1 : 0);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-right" dir="rtl">
      
      {/* ברכת בוקר טוב דינמית */}
      <section className="space-y-1">
        <p className="text-[13px] font-bold text-purple-600 uppercase tracking-wide">
          בוקר טוב, {userProfile?.full_name || 'מתמיד/ה'} 👋
        </p>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          בוא נשבור שיאים היום!
        </h2>
      </section>

      {/* שדרוג: מעקב ימי שבוע אינטראקטיבי ודינמי */}
      <section className="bg-white rounded-2xl p-5 border border-slate-100 shadow-md shadow-slate-200/40 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-black text-slate-800 text-sm">ההתמדה השבועית שלי</h3>
          <span className="text-xs text-slate-400 font-medium">לחצי על יום לעדכון</span>
        </div>
        <div className="flex justify-between items-center gap-2 pt-1">
          {weeklyDays.map((day) => (
            <button
              key={day.id}
              onClick={() => toggleDay(day.id)}
              className={`w-10 h-10 rounded-full font-bold text-xs flex flex-col items-center justify-center transition-all duration-300 transform active:scale-90 ${
                day.completed
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105'
                  : 'bg-slate-50 text-slate-400 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="text-[10px] opacity-70 mb-0.5">{day.name}</span>
              {day.completed ? (
                <span className="text-[10px] font-bold">✓</span>
              ) : (
                <span className="text-[10px] font-bold">•</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* עיגול קלוריות מרכזי בעיצוב מלוטש */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md shadow-slate-200/40 relative overflow-hidden">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle className="text-slate-100" cx="50" cy="50" fill="none" r="42" stroke="currentColor" strokeWidth="7"></circle>
              <circle className="text-purple-600" cx="50" cy="50" fill="none" r="42" stroke="currentColor" strokeDasharray="263.8" strokeDashoffset="120" strokeLinecap="round" strokeWidth="7"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black text-slate-800">{(totalCaloriesEaten || 0).toLocaleString()}</span>
              <span className="text-xs font-bold text-slate-400 mt-0.5">קלוריות</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100/60 transition-all hover:bg-slate-100/50">
              <span className="block text-xs font-bold text-slate-400 mb-0.5">צעדים</span>
              <span className="font-black text-slate-700 text-base">8,432</span>
            </div>
            <div className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100/60 transition-all hover:bg-slate-100/50">
              <span className="block text-xs font-bold text-slate-400 mb-0.5">מים</span>
              <span className="font-black text-slate-700 text-base">1.8L</span>
            </div>
          </div>
        </div>
      </div>

      {/* רכיב מד הדלק הדינמי */}
      <HabitBattery level={batteryLevel} streak={streak} />

      {/* אימונים להיום - תצוגה מקוצרת */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="font-black text-slate-800 text-base">אימונים להיום</h3>
          <span onClick={() => setActiveTab('workouts')} className="text-xs text-purple-600 font-bold cursor-pointer hover:underline">צפה בהכל</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col shadow-md shadow-slate-200/40 transition-all hover:shadow-lg">
          <div className="relative h-40">
            <img alt="אימון" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop" />
            <div className="absolute top-3 left-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-black shadow-md shadow-emerald-500/20">בוצע ✓</div>
          </div>
          <div className="p-4 flex justify-between items-center bg-white">
            <div>
              <h4 className="font-black text-slate-800 text-base">
                {workouts && workouts[0] ? workouts[0].workout_type : 'אימון כוח פלג גוף עליון'}
              </h4>
              <p className="text-xs font-bold text-slate-400 mt-0.5">
                {workouts && workouts[0] ? `${workouts[0].duration} דקות • ${workouts[0].calories} קל׳` : '45 דקות • עצימות גבוהה'}
              </p>
            </div>
            <span className="material-symbols-outlined text-emerald-500 text-2xl">check_circle</span>
          </div>
        </div>
      </section>

      {/* פעולות מהירות */}
      <section className="space-y-4">
        <h3 className="font-black text-slate-800 text-base">פעולות מהירות</h3>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setActiveTab('nutrition')} className="flex items-center justify-center gap-2 bg-slate-900 text-white h-13 rounded-2xl font-black text-sm active:scale-95 transition-all shadow-md shadow-slate-900/10">
            <span className="material-symbols-outlined text-base">restaurant</span>הוסף ארוחה
          </button>
          <button onClick={() => setActiveTab('hobbies')} className="flex items-center justify-center gap-2 bg-white text-slate-800 h-13 rounded-2xl font-black border border-slate-200 active:scale-95 transition-all shadow-sm text-sm hover:bg-slate-50">
            <span className="material-symbols-outlined text-base">sports_tennis</span>יומן מסע
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;