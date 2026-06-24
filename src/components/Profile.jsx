import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function Profile({ userProfile, setUserProfile }) {
  // סטייט כדי לדעת אם אנחנו במצב עריכה
  const [isEditing, setIsEditing] = useState(false);
  
  // סטייט מקומי לשדות הטופס בזמן עריכה
  const [editName, setEditName] = useState(userProfile.full_name);
  const [editGoal, setEditGoal] = useState(userProfile.daily_calorie_goal);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const targetUserId = '680a0e11-a00d-4325-92ca-a76ff0e5c7ff'; // ה-UID שלך

    // פקודת ה-UPDATE האמיתית לסופאבייס!
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: editName,
        daily_calorie_goal: parseInt(editGoal)
      })
      .eq('user_id', targetUserId);

    if (error) {
      console.error(error);
      alert('אופס, שגיאה בעדכון הפרופיל בסופאבייס');
    } else {
      // מעדכנים את הסטייט המרכזי כדי שגם עמוד הבית ישתנה מיד
      setUserProfile({
        ...userProfile,
        full_name: editName,
        daily_calorie_goal: parseInt(editGoal)
      });
      setIsEditing(false);
    }
    setIsSaving(false);
  };

  return (
    <div className="w-full animate-fadeIn space-y-6">
      <section className="text-center">
        <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary mx-auto flex items-center justify-center text-primary mb-3 shadow-inner">
          <span className="material-symbols-outlined text-5xl">person</span>
        </div>
        <h2 className="text-2xl font-bold text-text-main">פרופיל משתמש</h2>
        <p className="text-sm text-text-main/50">ניהול נתונים אישיים ויעדים</p>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
        {/* שדה שם מלא */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">שם מלא</label>
          {isEditing ? (
            <input 
              type="text" 
              value={editName} 
              onChange={(e) => setEditName(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          ) : (
            <p className="font-semibold text-text-main text-base bg-slate-50 p-3 rounded-xl border border-slate-100">{userProfile.full_name}</p>
          )}
        </div>

        {/* שדה יעד קלוריות יומי */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">יעד קלוריות יומי</label>
          {isEditing ? (
            <input 
              type="number" 
              value={editGoal} 
              onChange={(e) => setEditGoal(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          ) : (
            <p className="font-semibold text-text-main text-base bg-slate-50 p-3 rounded-xl border border-slate-100">{userProfile.daily_calorie_goal?.toLocaleString()} קלוריות</p>
          )}
        </div>
      </section>

      {/* כפתורי פעולה */}
      <div className="pt-2">
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
              onClick={() => {
                setEditName(userProfile.full_name);
                setEditGoal(userProfile.daily_calorie_goal);
                setIsEditing(false);
              }}
              className="flex-1 bg-slate-100 text-slate-600 p-3 rounded-xl font-bold text-sm hover:bg-slate-200 active:scale-95 transition-all"
            >
              ביטול
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="w-full bg-slate-900 text-white p-3 rounded-xl font-bold text-sm hover:bg-slate-800 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            <span>ערוך פרופיל</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;