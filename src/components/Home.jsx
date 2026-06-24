import React from 'react';

function Home({ userProfile, totalCaloriesEaten, workouts, setActiveTab }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ברכת בוקר טוב דינמית */}
      <section className="space-y-1">
        <p className="text-[13px] font-montserrat text-text-main/60 uppercase tracking-wide">בוקר טוב, {userProfile.full_name}</p>
        <h2 className="text-2xl font-bold text-text-main">בוא נשבור שיאים היום</h2>
      </section>

      {/* עיגול קלוריות מרכזי */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle className="text-slate-100" cx="50" cy="50" fill="none" r="42" stroke="currentColor" strokeWidth="8"></circle>
              <circle className="text-primary" cx="50" cy="50" fill="none" r="42" stroke="currentColor" strokeDasharray="263.8" strokeDashoffset="105" strokeLinecap="round" strokeWidth="8"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-text-main">{totalCaloriesEaten.toLocaleString()}</span>
              <span className="text-xs text-text-main/60">קלוריות</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="text-center p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="block text-xs text-slate-400">צעדים</span>
              <span className="font-bold text-slate-700">8,432</span>
            </div>
            <div className="text-center p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="block text-xs text-slate-400">מים</span>
              <span className="font-bold text-slate-700">1.8L</span>
            </div>
          </div>
        </div>
      </div>

      {/* אימונים להיום - תצוגה מקוצרת */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="font-bold text-text-main">אימונים להיום</h3>
          <span onClick={() => setActiveTab('workouts')} className="text-xs text-primary font-semibold cursor-pointer hover:underline">צפה בהכל</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm">
          <div className="relative h-40">
            <img alt="אימון" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop" />
            <div className="absolute top-3 left-3 bg-success text-white px-3 py-1 rounded-full text-xs font-bold">בוצע ✓</div>
          </div>
          <div className="p-4 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-text-main">
                {workouts[0] ? workouts[0].workout_type : 'אימון כוח פלג גוף עליון'}
              </h4>
              <p className="text-xs text-text-main/50">
                {workouts[0] ? `${workouts[0].duration} דקות • ${workouts[0].calories} קל׳` : '45 דקות • עצימות גבוהה'}
              </p>
            </div>
            <span className="material-symbols-outlined text-success">check_circle</span>
          </div>
        </div>
      </section>

      {/* פעולות מהירות */}
      <section className="space-y-4">
        <h3 className="font-bold text-text-main">פעולות מהירות</h3>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setActiveTab('nutrition')} className="flex items-center justify-center gap-2 bg-slate-900 text-white h-12 rounded-xl font-bold active:scale-95 transition-all shadow-sm text-sm">
            <span className="material-symbols-outlined text-base">restaurant</span>הוסף ארוחה
          </button>
          <button onClick={() => setActiveTab('hobbies')} className="flex items-center justify-center gap-2 bg-white text-slate-800 h-12 rounded-xl font-bold border border-slate-300 active:scale-95 transition-all shadow-sm text-sm">
            <span className="material-symbols-outlined text-base">sports_tennis</span>יומן מסע
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;