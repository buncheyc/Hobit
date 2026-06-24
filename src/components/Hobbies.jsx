import React from 'react';

function Hobbies() {
  return (
    <div className="w-full animate-fadeIn pb-12">
      
      {/* כותרת עמוד יומן מסע */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-text-main mb-1">יומן מסע</h2>
        <p className="text-text-main/60 text-sm">תיעוד ההתקדמות וההישגים האישיים שלך</p>
      </section>

      {/* פיד רשומות יומן */}
      <div className="flex flex-col gap-6">
        
        {/* רשומה 1 - אימון כוח (עם תמונה) */}
        <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant hover:border-primary/30 transition-all flex flex-col group">
          <div className="relative h-56 w-full overflow-hidden">
            <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop" alt="High-contrast gym shot" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-outline-variant shadow-sm">
              <span className="caption-font text-xs font-medium text-text-main">14 במאי, 2024</span>
            </div>
          </div>
          <div className="p-5 flex-grow">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-accent text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>fitness_center</span>
              <span className="caption-font text-xs font-bold text-accent uppercase tracking-wider">אימון כוח</span>
            </div>
            <h3 className="text-xl font-bold text-text-main mb-3">שברתי שיא אישי בסקוואט!</h3>
            <p className="text-text-main/70 text-sm leading-relaxed">הרגשתי אנרגיה מטורפת היום. הצלחתי להגיע ל-120 ק״ג בסט האחרון. התזונה המוקפדת של השבוע האחרון בהחלט מוכיחה את עצמה.</p>
          </div>
          <div className="px-5 py-4 border-t border-outline-variant flex justify-between items-center bg-background/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-sm">mood</span>
              </div>
              <span className="text-xs font-medium text-text-main/60">מרגיש מעולה</span>
            </div>
            <button className="text-text-main/40 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
        </article>

        {/* רשומה 2 - מחשבות על תזונה (טקסט בלבד) */}
        <article className="bg-white rounded-xl p-6 shadow-sm border border-outline-variant relative flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-1.5 h-full bg-secondary"></div>
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="caption-font text-xs font-medium text-text-main/50">12 במאי, 2024</span>
              <span className="material-symbols-outlined text-secondary">restaurant</span>
            </div>
            <h3 className="text-xl font-bold text-text-main mb-4">מחשבות על תזונה</h3>
            <p className="text-text-main/70 text-sm leading-relaxed italic">"המשמעת העצמית במטבח היא הניצחון הגדול ביותר של היום. החלפתי את הקינוח בפרי ומרגיש הרבה פחות כבד לפני השינה."</p>
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-secondary">עמידה ביעדים</span>
              <span className="text-xs font-bold text-secondary">85%</span>
            </div>
            <div className="h-2 w-full bg-background rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-[85%] rounded-full"></div>
            </div>
          </div>
        </article>

        {/* רשומה 3 - התאוששות / יוגה (עם תמונה) */}
        <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant hover:border-primary/30 transition-all flex flex-col group">
          <div className="relative h-56 w-full overflow-hidden">
            <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop" alt="Yoga stretching session" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-outline-variant shadow-sm">
              <span className="caption-font text-xs font-medium text-text-main">10 במאי, 2024</span>
            </div>
          </div>
          <div className="p-5 flex-grow">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>self_improvement</span>
              <span className="caption-font text-xs font-bold text-primary uppercase tracking-wider">התאוששות</span>
            </div>
            <h3 className="text-xl font-bold text-text-main mb-3">זמן לשחרר</h3>
            <p className="text-text-main/70 text-sm leading-relaxed">יוגה ומתיחות אחרי שבוע אינטנסיבי. הגוף הרגיש תפוס אבל עכשיו הכל הרבה יותר רפוי. מוכן לשבוע הבא.</p>
          </div>
          <div className="px-5 py-4 border-t border-outline-variant flex justify-between items-center bg-background/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-sm">spa</span>
              </div>
              <span className="text-xs font-medium text-text-main/60">רגוע</span>
            </div>
            <button className="text-text-main/40 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
        </article>

      </div>
    </div>
  );
}

export default Hobbies;