import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // כניסה מדומה בשביל המצגת - תומך בכל אימייל וסיסמה שתקלידי
    if (email && password) {
      onLoginSuccess();
    } else {
      alert('נא למלא אימייל וסיסמה!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 animate-fadeIn">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-xl p-8 space-y-6">
        
        {/* לוגו ואנימציה */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center text-primary shadow-inner animate-pulse">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <h1 className="text-4xl font-black tracking-wider text-primary heading-font">HOBIT</h1>
          <p className="text-sm text-slate-500 font-medium">ברוך הבא! אנא התחבר כדי להמשיך</p>
        </div>

        {/* טופס התחברות */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">כתובת אימייל</label>
            <input 
              type="email" 
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-primary bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">סיסמה</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-primary bg-slate-50"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20 pt-3.5 pb-3.5"
          >
            התחבר למערכת
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold">או</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* כפתור כניסה מהירה למצגת */}
        <button 
          onClick={onLoginSuccess}
          className="w-full bg-slate-900 text-white p-3 rounded-xl font-bold text-sm hover:bg-slate-800 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">bolt</span>
          <span>כניסה מהירה (מצב מצגת)</span>
        </button>

      </div>
    </div>
  );
}

export default Login;