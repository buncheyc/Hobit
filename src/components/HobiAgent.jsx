import React, { useState, useRef, useEffect } from 'react';

function HobiAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "היי! אני HOBI, הסוכן החכם שלך לאורח חיים בריא. ⚡ במה אוכל לעזור לך היום?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // גלילה אוטומטית לסוף הצ'אט בכל הודעה חדשה
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { id: Date.now(), text: userMessage, isBot: false }]);
    setInputValue('');
    setIsLoading(true);

    // סימולציה מתוחכמת של בינה מלאכותית (AI) מבוססת מילות מפתח - הכי בטוח למצגת!
    setTimeout(() => {
      let botResponse = "אני כאן כדי לעזור! את יכולה לשאול אותי על כושר, מים, קלוריות או איך לשבור שיאים היום. ⚡";
      
      const lowerMsg = userMessage.toLowerCase();
      if (lowerMsg.includes('מים') || lowerMsg.includes('לשתות')) {
        botResponse = "מומלץ לשתות לפחות 2-3 ליטר מים ביום, במיוחד בימי אימון! כרגע חסר לך עוד קצת כדי למלא את סוללת ההרגלים שלך. 💧";
      } else if (lowerMsg.includes('אימון') || lowerMsg.includes('ספורט') || lowerMsg.includes('כושר')) {
        botResponse = "כל הכבוד על המוטיבציה! אימון כוח של 45 דקות היום יעשה פלאים לחילוף החומרים שלך. אל תשכחי לסמן אותו ב-V! 🏋️‍♂️";
      } else if (lowerMsg.includes('קלוריות') || lowerMsg.includes('אוכל') || lowerMsg.includes('תזונה')) {
        botResponse = "כדי לשמור על אנרגיה גבוהה, כדאי לשלב חלבון רזה ופחמימות מורכבות אחרי האימון. בדקי את הטאב 'תזונה' כדי לעקוב במדויק. 🍏";
      } else if (lowerMsg.includes('שלום') || lowerMsg.includes('היי') || lowerMsg.includes('חבר')) {
        botResponse = "שלום! איזה כיף לדבר איתך. מוכנים לשבור שיאים חדשים ב-HOBIT היום? 🚀";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, isBot: true }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-24 left-6 z-50 font-sans" dir="rtl">
      {/* כפתור הבועה הצף */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
      >
        {isOpen ? (
          <span className="material-symbols-outlined text-2xl">close</span>
        ) : (
          <div className="relative">
            <span className="material-symbols-outlined text-2xl">smart_toy</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-purple-600 animate-ping"></span>
          </div>
        )}
      </button>

      {/* חלון הצ'אט */}
      {isOpen && (
        <div className="absolute bottom-18 left-0 w-80 sm:w-96 h-[450px] bg-white rounded-2xl border border-slate-100 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* כותרת הצ'אט */}
          <div className="bg-purple-600 text-white p-4 flex items-center gap-3 shadow-md">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white">smart_toy</span>
            </div>
            <div>
              <h4 className="font-black text-sm tracking-wide">HOBI</h4>
              <p className="text-[11px] opacity-80">הסוכן החכם שלך זמין</p>
            </div>
          </div>

          {/* אזור ההודעות */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 no-scrollbar">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] rounded-2xl p-3 text-xs font-medium leading-relaxed shadow-sm ${
                  msg.isBot 
                    ? 'bg-white text-slate-800 rounded-tr-none border border-slate-100' 
                    : 'bg-purple-600 text-white rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-400 rounded-2xl rounded-tr-none p-3 text-xs border border-slate-100 flex items-center gap-1">
                  <span className="animate-bounce">•</span>
                  <span className="animate-bounce delay-100">•</span>
                  <span className="animate-bounce delay-200">•</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* תיבת הקלט */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="שאלי את HOBI משהו..."
              className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-purple-500 font-medium"
            />
            <button 
              type="submit"
              className="bg-purple-600 text-white px-3 py-2 rounded-xl text-xs font-black hover:bg-purple-700 transition-colors"
            >
              שלח
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default HobiAgent;