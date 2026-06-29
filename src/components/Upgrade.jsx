import React from 'react';
import { supabase } from '../supabaseClient';

export default function Upgrade({ onClose }) {
  const handleUpgrade = async () => {
    // מנסה למשוך את הסשן הקיים
    const { data: { session } } = await supabase.auth.getSession();
    
    // מזהה המשתמש מה-App.jsx במקרה שאין סשן (מצב דמו)
    const fallbackUserId = '680a0e11-a00d-4325-92ca-a76ff0e5c7ff';

    const response = await fetch(
      'https://oflewxmijybjboyqpbgj.supabase.co/functions/v1/bright-handler',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token ?? ''}`,
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          priceId: import.meta.env.VITE_STRIPE_PRICE_ID,
          userId: session?.user?.id ?? fallbackUserId,
        }),
      }
    );

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Error: ' + (data.error ?? 'Please try again'));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 bg-white rounded-[24px] shadow-md shadow-slate-100 max-w-md mx-auto relative dir-rtl">
      
      {/* כפתור X לסגירה וחזרה למסך הבית ללא ניתוק */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
        aria-label="סגור"
      >
        <span className="material-symbols-outlined text-xl">close</span>
      </button>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-4 text-center">
        שדרגי ל-HOBIT Premium 🚀
      </h1>
      <p className="text-gray-500 mb-8 text-center">גישה בלתי מוגבלת לכל הפיצ'רים</p>
      
      <ul className="mb-8 space-y-3 text-right w-full max-w-[240px] mx-auto text-slate-800">
        <li className="flex items-center gap-2"><span>✅</span> אימונים ללא הגבלה</li>
        <li className="flex items-center gap-2"><span>✅</span> מעקב תזונה מלא</li>
        <li className="flex items-center gap-2"><span>✅</span> סטטיסטיקות מתקדמות</li>
        <li className="flex items-center gap-2"><span>✅</span> המלצות AI</li>
      </ul>
      
      <div className="flex flex-col gap-3 w-full px-4">
        <button
          onClick={handleUpgrade}
          className="bg-purple-600 text-white w-full py-3 rounded-xl text-lg font-semibold hover:bg-purple-700 shadow-lg transition-colors"
        >
          שדרגי עכשיו – $9.99/חודש
        </button>
        
        {/* כפתור ביטול תחתון שגם מחזיר למסך הבית */}
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 text-sm py-2 font-medium transition-colors"
        >
          ביטול וחזרה למסך הבית
        </button>
      </div>
    </div>
  );
}