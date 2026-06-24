import React from 'react';

function HabitBattery({ level = 78, streak = 7 }) {
  const safeLevel = Math.min(100, Math.max(0, Number(level) || 0));
  const fillColor =
    safeLevel >= 80
      ? 'from-emerald-500 to-green-400'
      : safeLevel >= 50
        ? 'from-amber-400 to-orange-400'
        : 'from-rose-500 to-pink-500';

  return (
    <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-4 text-white shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-slate-300">Habit Battery</p>
          <h3 className="mt-1 text-lg font-bold">You’re charging up</h3>
        </div>
        <div className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-amber-300">
          🔥 {streak} day streak
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="relative h-6 w-full max-w-[220px] rounded-full border border-white/20 bg-white/10 p-1">
          <div className={`h-full rounded-full bg-gradient-to-r ${fillColor}`} style={{ width: `${safeLevel}%` }} />
        </div>
        <span className="text-sm font-semibold">{safeLevel}%</span>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
        <span>Daily consistency</span>
        <span>{safeLevel >= 80 ? 'Excellent momentum' : safeLevel >= 50 ? 'Keep going' : 'A fresh start'}</span>
      </div>
    </section>
  );
}

export default HabitBattery;
