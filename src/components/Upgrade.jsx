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
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">שדרגי ל-HOBIT Premium 🚀</h1>
      <p className="text-gray-500 mb-8">גישה בלתי מוגבלת לכל הפיצ'רים</p>
      <ul className="mb-8 space-y-2 text-right">
        <li>✅ אימונים ללא הגבלה</li>
        <li>✅ מעקב תזונה מלא</li>
        <li>✅ סטטיסטיקות מתקדמות</li>
        <li>✅ המלצות AI</li>
      </ul>
      <button
        onClick={handleUpgrade}
        className="bg-purple-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-purple-700"
      >
        שדרגי עכשיו – $9.99/חודש
      </button>
    </div>
  );
}