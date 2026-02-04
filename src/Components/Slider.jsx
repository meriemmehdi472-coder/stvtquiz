import { useState, useMemo } from 'react';
import CryptoJS from "crypto-js";

const SECRET_KEY = "mon-secret-ultra-love-💖";

function decryptData(cipherText) {
  try {
    // Si ce n'est pas une chaîne (ex: au premier rendu), on retourne un tableau vide
    if (typeof cipherText !== 'string') return cipherText; 
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    console.error("Erreur décryptage", err);
    return [];
  }
}

export const Slider = ({ userAnswers = [] }) => {
  const [loveLevel, setLoveLevel] = useState(50);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [chosenGift, setChosenGift] = useState(null);
  const [wish, setWish] = useState("");
  const [error, setError] = useState("");

  const myPhoneNumber = "33783746423"; 
  const forbiddenWords = ["rien", "pas besoin", "tu me suffit", "pas nécessaire", "suffit"];

  // 1. DÉCRYPTAGE ET MISE EN FORME
  const formattedAnswers = useMemo(() => {
    // On décode les réponses reçues de App.jsx
    const realAnswers = decryptData(userAnswers);
    
    if (!realAnswers || realAnswers.length === 0) return "_Données protégées par l'amour_";
    
    return realAnswers
      .map((entry, index) => `📍 *Q${index + 1}* : ${entry}`)
      .join('%0A'); 
  }, [userAnswers]);

  const escapeButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setBtnPos({ x, y });
  };

  const handleSendWhatsApp = (finalWish) => {
    const line = "==========================";
    const title = "🌹 *RAPPORT D'AMOUR DÉTAILLÉ* 🌹";
    
    const quizSection = `*📊 ANALYSE DU QUIZ :*%0A${formattedAnswers}`;
    
    // On ajoute le loveLevel dynamique choisi par l'utilisateur
    const recapSection = `*❤️ TAUX D'AMOUR :* ${loveLevel}% (Confirmé)%0A` +
                        `*🎁 CADEAU CHOISI :* ${chosenGift}`;
    
    const wishSection = `*💌 SOUHAIT SPÉCIAL :*%0A"${finalWish}"`;
    
    const footer = `_Signé avec tout mon cœur_ ✨`;

    const message = 
      `${title}%0A${line}%0A%0A` +
      `${quizSection}%0A%0A${line}%0A%0A` +
      `${recapSection}%0A%0A` +
      `${wishSection}%0A%0A${line}%0A%0A` +
      `${footer}`;

    window.open(`https://wa.me/${myPhoneNumber}?text=${message}`, '_blank');
  };

  const validateWish = (e) => {
    e.preventDefault();
    const isForbidden = forbiddenWords.some(word => wish.toLowerCase().includes(word.toLowerCase()));

    if (wish.length < 3) {
      setError("C'est un peu court... dis-moi tout ! ✨");
    } else if (isForbidden) {
      setError("Hé ho ! 'Rien' n'est pas une option. Choisis un vrai cadeau ! 🎁");
      setWish(""); 
    } else {
      handleSendWhatsApp(wish);
    }
  };

  return (
    <div className="flex flex-col items-center animate-fadeIn w-full max-w-md mx-auto p-4 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent uppercase tracking-tight">
          L'étape ultime...
        </h2>
        <p className="text-gray-500 font-medium italic text-sm">Prépare ton message pour moi ! ✨</p>
      </div>
      
      {/* SLIDER */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl border border-white w-full">
        <label className="block text-[10px] font-black mb-6 text-pink-400 uppercase tracking-[0.2em] text-center">
           Quel est ton taux d'amour 
        </label>
        
        <div className="relative flex flex-col items-center">
          <input 
            type="range" min="0" max="100" 
            value={loveLevel}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val < 100) setLoveLevel(val);
            }}
            className="w-full h-3 bg-rose-100 rounded-full appearance-none cursor-pointer accent-rose-500"
          />
          <span className="mt-6 text-6xl font-black text-rose-500 tabular-nums">
            {loveLevel}%
          </span>
        </div>
      </div>

      {!chosenGift ? (
        <div className="text-center w-full space-y-6">
          <p className="font-bold text-gray-700">Alors, quel cadeau je t'offre ?</p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center relative min-h-[120px]">
            <button 
              onClick={() => setChosenGift("De gros bisous 💋")}
              className="bg-white border-2 border-rose-200 hover:border-rose-500 px-8 py-4 rounded-2xl shadow-lg font-black text-rose-600 transition-all hover:scale-105 active:scale-95"
            >
              De gros bisous 💋
            </button>
            <button 
              onMouseEnter={escapeButton}
              style={{ transform: `translate(${btnPos.x}px, ${btnPos.y}px)` }}
              className="bg-gray-500 text-gray-700 px-6 py-2 rounded-xl absolute opacity-50 text-xs font-bold pointer-events-auto transition-transform duration-200"
            >
              Un vieux caillou 🪨
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-[3rem] shadow-2xl animate-bounceIn w-full border border-rose-100">
          <div className="relative z-10 space-y-6">
            <h3 className="font-black text-gray-800 text-center text-xl">
              Excellent choix ! <br/>
              <span className="text-rose-500 underline decoration-rose-200 uppercase">{chosenGift}</span>
            </h3>

            <form onSubmit={validateWish} className="flex flex-col gap-4">
              <textarea
                value={wish}
                onChange={(e) => { setWish(e.target.value); setError(""); }}
                placeholder="Pour de vrai tu veux quoiiiiiiiii ....."
                className={`w-full p-5 border-2 rounded-3xl outline-none h-32 resize-none transition-all font-medium
                  ${error ? 'border-red-200 bg-red-50' : 'border-rose-50 bg-rose-50/20 focus:border-rose-300'}`}
              />
              
              {error && <p className="text-red-500 text-[11px] font-black text-center animate-shake">⚠️ {error}</p>}
              
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black py-5 rounded-2xl shadow-rose-200 shadow-lg hover:shadow-rose-300 hover:-translate-y-1 transition-all uppercase tracking-widest text-sm"
              >
                Valider et m'envoyer 💌
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="mt-8 flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity duration-500">
        <div className="flex items-center gap-2 text-rose-500">
          <span className="animate-pulse">✨</span>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
            Fait avec tout mon amour
          </p>
          <span className="animate-pulse">✨</span>
        </div>
        <p className="text-[9px] text-gray-700 font-medium italic">
          Rien que pour mon Lapinouuu 🌹
        </p>
      </div>
    </div>
  ); 
};