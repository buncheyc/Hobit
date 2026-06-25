import React, { useState, useRef, useEffect } from 'react';

function HobiAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "היי! אני HOBI, יועץ ה-AI האישי שלך לכושר ותזונה. ⚡ שאלי אותי כל שאלה, למשל: 'איך לשפר את שריפת הקלוריות?' או 'מה לאכול אחרי אימון כוח?'", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { id: Date.now(), text: userMessage, isBot: false }]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      let botResponse = "שאלה מצוינת! כיועץ ה-AI של HOBIT, אני ממניץ לשמור על עקביות. האם השאלה מתייחסת לתפריט התזונה או לתוכנית האימונים הנוכחית?";
      const text = userMessage.toLowerCase();
      
      if (text.includes('מים') || text.includes('לשתות') || text.includes('צמא')) {
        botResponse = "ההמלצה המקצועית היא צריכה של 35 מ''ל מים לכל קילוגרם משקל גוף. הידרציה תקינה מגבירה את קצב חילוף החומרים ב-24% ומשפרת את רמות האנרגיה באימון. אל תשכחי לעדכן את מד המים בדאשבורד! 💧";
      } else if (text.includes('אימון') || text.includes('ספורט') || text.includes('כוח') || text.includes('ריצה')) {
        botResponse = "כדי למקסם בניית שריר ושריפת שומן, שלבי בין אימוני התנגדות (כמו אימון המשקולות שלך) ל-2 סבבי אירובי בשבוע. הקפידי על מנוחה של 48 שעות בין קבוצות שרירים זהות. שבירת שיאים דורשת התמדה! 🏋️‍♂️";
      } else if (text.includes('קלוריות') || text.includes('אוכל') || text.includes('תזונה') || text.includes('רעב')) {
        botResponse = "תזונה מנצחת מבוססת על מאזן קלורי מותאם. אחרי מאמץ, הגוף זקוק לחלבון מהיר (כמו טונה, עוף או ביצים) לשיקום השריר, בשילוב פחמימה מורכבת למילוי מאגרי האנרגיה. את יכולה לנהל את הארוחות בלייב בטאב 'תזונה'. 🍏";
      } else if (text.includes('שיא') || text.includes('מוטיבציה') || text.includes('עייף')) {
        botResponse = "הסוד של HOBIT הוא שהמשמעת מחליפה את המוטיבציה. גם אם אין כוח היום, בצעי רק 10 דקות של תנועה - סוללת ההרגלים שלך תעלה, והמוח יפריש דופמין שידרבן אותך להמשיך! 🚀";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, isBot: true }]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    // משתמשים ב-z-50 גבוה במיוחד כדי ששום אלמנט בעולם לא יסתיר את זה
    <div className="fixed bottom-6 left-6 z-50 font-sans" dir="rtl">
      
      {/* כפתור צף מעוגל ומקצועי */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
      >
        {isOpen ? (
          <span className="material-symbols-outlined text-2xl">close</span>
        ) : (
          <div className="relative">
            <span className="material-symbols-outlined text-2xl">smart_toy</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-purple-600 animate-ping"></span>
          </div>
        )}
      </button>

      {/* התיקון המוחלט: החלון הפך ל-fixed עצמאי לגמרי על המסך, ממוקם בול מעל הכפתור והתפריט! */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 w-[320px] sm:w-[360px] h-[430px] bg-white rounded-2xl border border-slate-100 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          
          {/* כותרת החלון */}
          <div className="bg-purple-600 text-white p-4 flex items-center gap-3 shadow-sm shrink-0">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">smart_toy</span>
            </div>
            <div>
              <h4 className="font-black text-sm tracking-wide">HOBI AI</h4>
              <p className="text-[10px] opacity-90">יועץ בריאות מבוסס תוכן</p>
            </div>
          </div>

          {/* אזור ההודעות */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-right no-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-xs font-medium leading-relaxed shadow-sm ${
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
                <div className="bg-white rounded-2xl rounded-tr-none p-3 text-xs border border-slate-100 text-slate-400 flex gap-1">
                  <span className="animate-bounce">•</span>
                  <span className="animate-bounce delay-100">•</span>
                  <span className="animate-bounce delay-200">•</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* תיבת קלט */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2 shrink-0">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="שאלי את HOBI מומחה ה-AI..."
              className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-purple-500 font-medium text-right bg-white text-slate-800"
            />
            <button 
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-purple-700 transition-colors shrink-0"
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