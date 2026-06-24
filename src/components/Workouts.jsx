import React from 'react';

function Workouts({ workouts, toggleWorkout, activeFilter, setActiveFilter }) {
  
  // פילטר חכם: אם נבחר 'הכל' מציגים את כל האימונים, אחרת מסננים לפי הקטגוריה
  const filteredWorkouts = workouts.filter(workout => 
    activeFilter === 'הכל' || workout.category === activeFilter
  );

  return (
    <div className="w-full animate-fadeIn">
      <section className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-text-main">יומן אימונים</h2>
        <p className="text-xs text-slate-400 mt-1">בחרי קטגוריה וסמני אימונים שבוצעו</p>
      </section>

      {/* סינון קטגוריות עשיר */}
      <nav className="flex gap-2 overflow-x-auto pb-6 no-scrollbar" style={{ direction: 'rtl' }}>
        {['הכל', 'כוח', 'קרדיו', 'גמישות'].map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all text-sm ${
              activeFilter === cat 
                ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* רשימת אימונים דינמית ומסוננת */}
      <div className="space-y-4">
        {filteredWorkouts.map((workout) => (
          <div key={workout.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm hover:border-slate-300 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">
                  {workout.category === 'כוח' && 'fitness_center'}
                  {workout.category === 'קרדיו' && 'directions_run'}
                  {workout.category === 'גמישות' && 'self_improvement'}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-text-main text-sm md:text-base">{workout.workout_type}</h3>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">{workout.category}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{workout.duration} דקות • {workout.calories} קלוריות</p>
              </div>
            </div>
            
            {/* כפתור סימון אימון אינטראקטיבי */}
            <div 
              onClick={() => toggleWorkout(workout.id)} 
              className={`px-4 py-1.5 rounded-full font-bold text-xs flex items-center gap-1 cursor-pointer transition-all select-none ${
                workout.done 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                  : 'bg-white border-2 border-primary text-primary hover:bg-primary/5'
              }`}
            >
              <span className="material-symbols-outlined text-xs">{workout.done ? 'check' : 'add'}</span>
              <span>{workout.done ? 'בוצע' : 'סמן'}</span>
            </div>
          </div>
        ))}

        {filteredWorkouts.length === 0 && (
          <p className="text-center text-slate-400 text-sm py-8">אין אימונים זמינים בקטגוריה זו.</p>
        )}
      </div>
    </div>
  );
}

export default Workouts;