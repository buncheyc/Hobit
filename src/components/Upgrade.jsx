import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Upgrade() {
  const handleUpgrade = async () => {
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({
      lineItems: [{ price: import.meta.env.VITE_STRIPE_PRICE_ID, quantity: 1 }],
      mode: 'subscription',
      successUrl: window.location.origin + '/profile?upgraded=true',
      cancelUrl: window.location.origin + '/upgrade',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      {/* 🛠️ שינינו את ה-Class ל-text-slate-900 כדי שהכותרת תהיה שחורה וברורה לחלוטין */}
      <h1 className="text-3xl font-extrabold text-slate-900 mb-4 block" style={{ color: '#0f172a' }}>
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