import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function Profile({ userProfile, setUserProfile, handleLogout, setActiveTab }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userProfile.full_name);
  const [editGoal, setEditGoal] = useState(userProfile.daily_calorie_goal);
  const [editWeight, setEditWeight] = useState(userProfile.weight);
  const [editHeight, setEditHeight] = useState(userProfile.height);
  const [editSteps, setEditSteps] = useState(userProfile.daily_step_goal);
  const [editWorkouts, setEditWorkouts] = useState(userProfile.weekly_workout_goal ?? 3);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const targetUserId = '680a0e11-a00d-4325-92ca-a76ff0e5c7ff';

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: editName,
        daily_calorie_goal: parseInt(editGoal),
        weight: parseFloat(editWeight),
        height: parseInt(editHeight),
        daily_step_goal: parseInt(editSteps),
        weekly_workout_goal: parseInt(editWorkouts),
      })
      .eq('user_id', targetUserId);

    if (error) {
      console.error(error);
      alert('שגיאה בעדכון הפרופיל');
    } else {
      setUserProfile({
        ...userProfile,
        full_name: editName,
        daily_calorie_goal: parseInt(editGoal),
        weight: parseFloat(editWeight),
        height: parseInt(editHeight),
        daily_step_goal: parseInt(editSteps),
        weekly_workout_goal: parseInt(editWorkouts),
      });
      setIsEditing(false);
    }
    setIsSaving(false);
  };

  const bmi = userProfile.weight && userProfile.height
    ? (userProfile.weight / ((userProfile.height / 100) ** 2)).toFixed(1)
    : null;

  return (
    <div className="w-full animate-fadeIn space-y-6">
      {/* Header */}
      <section className="text-center">
        <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary mx-auto flex items-center justify-center text-primary mb-3 shadow-inner">
          <span className="material-symbols-outlined text-5xl">person</span>
        </div>
        <h2 className="text-2xl font-bold text-text-main">
          {userProfile.full_name || 'פרופיל משתמש'}
        </h2>
        <p className="text-sm text-text-main/50">ניהול נתונים אישיים ויעדים</p>
      </section>

      {/* BMI Card */}
      {bmi && (
        <section className="bg-purple-50 rounded-xl border border-purple-100 p-4 text-center">
          <p className="text-xs font-bold text-purple-400 uppercase mb-1">מדד BMI שלך</p>
          <p className="text-4xl font-extrabold text-purple-600">{bmi}</p>
          <p className="text-xs text-purple-400 mt-1">
            {bmi < 18.5 ? 'תת משקל' : bmi < 25 ? 'משקל תקין ✅' : bmi < 30 ? 'עודף משקל' : 'השמנה'}
          </p>
        </section>
      )}

      {/* Stats Row */}
      <section className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-3 text-center shadow-sm">
          <p className="text-xs text-slate-400 mb-1">משקל</p>
          <p className="text-xl font-bold text-text-main">{userProfile.weight ?? '—'}</p>
          <p className="text-xs text-slate-400">ק"ג</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-3 text-center shadow-sm">
          <p className="text-xs text-slate-400 mb-1">גובה</p>
          <p className="text-xl font-bold text-text-main">{userProfile.height ?? '—'}</p>
          <p className="text-xs text-slate-400">ס"מ</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-3 text-center shadow-sm">
          <p className="text-xs text-slate-400 mb-1">אימונים</p>
          <p className="text-xl font-bold text-text-main">{userProfile.weekly_workout_goal ?? 3}</p>
          <p className="text-xs text-slate-400">בשבוע</p>
        </div>
      </section>

      {/* Goals */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase">יעדים יומיים</h3>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-main">🔥 קלוריות</span>
          <span className="font-bold text-text-main">{userProfile.daily_calorie_goal?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-main">👟 צעדים</span>
          <span className="font-bold text-text-main">{userProfile.daily_step_goal?.toLocaleString()}</span>
        </div>
      </section>

      {/* Edit Form */}
      {isEditing && (
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase">עריכת פרופיל</h3>

          {[
            { label: 'שם מלא', value: editName, setValue: setEditName, type: 'text' },
            { label: 'משקל (ק"ג)', value: editWeight, setValue: setEditWeight, type: 'number' },
            { label: 'גובה (ס"מ)', value: editHeight, setValue: setEditHeight, type: 'number' },
            { label: 'יעד קלוריות יומי', value: editGoal, setValue: setEditGoal, type: 'number' },
            { label: 'יעד צעדים יומי', value: editSteps, setValue: setEditSteps, type: 'number' },
            { label: 'אימונים בשבוע', value: editWorkouts, setValue: setEditWorkouts, type: 'number' },
          ].map(({ label, value, setValue, type }) => (
            <div key={label}>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{label}</label>
              <input
                type={type}
                value={value ?? ''}
                onChange={(e) => setValue(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          ))}
        </section>
      )}

      {/* Buttons */}
      <div className="space-y-3 pt-2">
        {isEditing ? (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 bg-primary text-white p-3 rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20"
            >
              {isSaving ? 'שומר...' : 'שמור שינויים'}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-slate-100 text-slate-600 p-3 rounded-xl font-bold text-sm hover:bg-slate-200 active:scale-95 transition-all"
            >
              ביטול
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setActiveTab('upgrade')}
              className="w-full bg-purple-600 text-white p-3 rounded-xl font-bold text-sm hover:bg-purple-700 active:scale-95 transition-all shadow-md shadow-purple-200 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">bolt</span>
              <span>שדרוג ל-HOBIT Premium</span>
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-slate-900 text-white p-3 rounded-xl font-bold text-sm hover:bg-slate-800 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              <span>ערוך פרופיל</span>
            </button>

            <button
              onClick={() => {
                if (confirm('האם את בטוחה שברצונך להתנתק?')) {
                  handleLogout();
                }
              }}
              className="w-full bg-rose-50 text-rose-600 border border-rose-100 p-3 rounded-xl font-bold text-sm hover:bg-rose-100 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span>התנתק מהחשבון</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;