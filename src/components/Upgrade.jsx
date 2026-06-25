import { supabase } from '../supabaseClient';

export default function Upgrade() {
  const handleUpgrade = async () => {
    const { data: { session } } = await supabase.auth.getSession();

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
          userId: session?.user?.id ?? 'guest',
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
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-4" style={{ color: '#0f172a' }}>
        שדרגי ל-HOBIT Premium 🚀
      </h1>
      <p className="text-gray-500 mb-8">גישה בלתי מוגבלת לכל הפיצ'רים</p>
      <ul className="mb-8 space-y-2 text-right text-slate-800">
        <li>✅ אימונים ללא הגבלה</li>
        <li>✅ מעקב תזונה מלא</li>
        <li>✅ סטטיסטיקות מתקדמות</li>
        <li>✅ המלצות AI</li>
      </ul>
      <button
        onClick={handleUpgrade}
        className="bg-purple-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-purple-700 shadow-lg"
      >
        שדרגי עכשיו – $9.99/חודש
      </button>
    </div>
  );
}