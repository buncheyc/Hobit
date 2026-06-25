import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function Login({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isRegister) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        // יצירת פרופיל אוטומטית למשתמש חדש
        await supabase.from('profiles').insert([{
          user_id: data.user.id,
          full_name: fullName,
          daily_calorie_goal: 2000,
          daily_step_goal: 10000,
          weekly_workout_goal: 3,
        }]);
        onLoginSuccess(data.user);
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError('אימייל או סיסמה שגויים');
      } else {
        onLoginSuccess(data.user);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 animate-fadeIn">
      <div className="w-full max-w-sm bg-white rounded-[28px] border border-slate-100 shadow-xl shadow-slate-200/50 p-10 space-y-6">
        
        <div className="flex flex-col items-center justify-center text-center space-y-1">
          <span className="material-symbols-outlined text-4xl text-primary animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
            bolt
          </span>
          <h2 className="text-4xl font-black tracking-wider text-primary heading-font">HOBIT</h2>
        </div>

        <div className="text-center space-y-2 pt-2 border-t border-slate-50">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            {isRegister ? 'הרשמה' : 'התחברות'}
          </h1>
          <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-[240px] mx-auto">
            {isRegister ? 'הצטרפו אלינו והתחילו את המסע שלכם.' : 'ברוכים השבים! אנא הזינו את פרטי ההתחברות.'}
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-600 text-sm p-3 rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 mr-1">שם מלא</label>
              <input
                type="text"
                placeholder="הכנס שם מלא"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl p-4 text-sm outline-none transition-all focus:border-purple-500 bg-white placeholder-slate-400 font-medium text-right"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 mr-1">אימייל</label>
            <input
              type="email"
              placeholder="הכנס אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-2xl p-4 text-sm outline-none transition-all focus:border-purple-500 bg-white placeholder-slate-400 font-medium text-right"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 mr-1">סיסמה</label>
            <input
              type="password"
              placeholder={isRegister ? 'בחר סיסמה' : 'הכנס סיסמה'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-2xl p-4 text-sm outline-none transition-all focus:border-purple-500 bg-white placeholder-slate-400 font-medium text-right"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white p-4 rounded-2xl font-black text-base hover:bg-purple-700 active:scale-[0.98] transition-all shadow-lg shadow-purple-600/10 mt-2"
          >
            {loading ? 'טוען...' : isRegister ? 'הירשם' : 'התחבר'}
          </button>
        </form>

        <div className="text-center pt-2">
          {isRegister ? (
            <p onClick={() => setIsRegister(false)} className="text-xs font-bold text-purple-600 cursor-pointer hover:underline">
              כבר יש לכם חשבון? התחברו כאן
            </p>
          ) : (
            <p onClick={() => setIsRegister(true)} className="text-xs font-bold text-purple-600 cursor-pointer hover:underline">
              עדיין אין לכם חשבון? הירשמו כאן
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;