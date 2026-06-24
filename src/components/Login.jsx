import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
  // הגדרת ערכים ראשוניים כדי שהכניסה תהיה מהירה במצגת, בלי כפתור מיותר
  const [email, setEmail] = useState('demo@hobit.com');
  const [password, setPassword] = useState('123456');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLoginSuccess();
    } else {
      alert('נא למלא אימייל וסיסמה!');
    }
  };

  return (  
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 animate-fadeIn">
      {/* כותרת עליונה מחוץ לכרטיסייה */}
      <div className="flex items-center gap-1.5 mb-6 text-purple-700">
        <h2 className="text-2xl font-black tracking-wider heading-font">HOBIT</h2>
        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
      </div>

      <div className="w-full max-w-sm bg-white rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/50 p-10 space-y-8">
        
        {/* כותרת פנימית קלילה */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">התחברות</h1>
          <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[240px] mx-auto">
            ברוכים השבים! אנא הזינו את פרטי ההתחברות.
          </p>
        </div>

        {/* טופס התחברות נקי לחלוטין */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 mr-1">אימייל</label>
            <input 
              type="email" 
              placeholder="הכנס אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-2xl p-4 text-sm outline-none transition-all focus:border-purple-500 bg-white placeholder-slate-400 font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 mr-1">סיסמה</label>
            <input 
              type="password" 
              placeholder="הכנס סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-2xl p-4 text-sm outline-none transition-all focus:border-purple-500 bg-white placeholder-slate-400 font-medium"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-purple-700 text-white p-4 rounded-2xl font-black text-base hover:bg-purple-800 active:scale-[0.98] transition-all shadow-lg shadow-purple-600/10 mt-2"
          >
            התחבר
          </button>
        </form>

        {/* קישור הרשמה תחתון בלבד - בדיוק כמו בעיצוב של חברה שלך */}
        <div className="text-center pt-2">
          <p className="text-xs font-bold text-purple-700 cursor-pointer hover:underline">
            עדיין אין לכם חשבון? הירשמו כאן
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;