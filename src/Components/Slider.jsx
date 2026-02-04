import { useState, useMemo } from 'react';

export const Slider = ({ userAnswers = [] }) => {
  const [loveLevel, setLoveLevel] = useState(50);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [chosenGift, setChosenGift] = useState(null);
  const [wish, setWish] = useState("");
  const [error, setError] = useState("");

  const myPhoneNumber = "33783746423"; 
  const forbiddenWords = ["rien", "pas besoin", "tu me suffit", "pas nécessaire", "suffit"];

  // 1. MISE EN FORME DES RÉPONSES (USEMEMO)
  const formattedAnswers = useMemo(() => {
    if (!userAnswers || userAnswers.length === 0) return "_Aucune donnée enregistrée_";
    
    // On ajoute une puce et on met les réponses en italique pour le style
    return userAnswers
      .map((ans, index) => `• Q${index + 1} : _${ans}_`)
      .join('%0A'); 
  }, [userAnswers]);

  const escapeButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setBtnPos({ x, y });
  };

  // 2. LOGIQUE D'ENVOI WHATSAPP AVEC MISE EN PAGE PROPRE
  const handleSendWhatsApp = (finalWish) => {
    const separator = "------------------------------------------";
    const title = `*💖 RAPPORT DE SAINT-VALENTIN 💖*`;
    
    const quizSection = `*📊 RÉPONSES AU QUIZ :*%0A${formattedAnswers}`;
    
    const recapSection = `*❤️ TAUX D'AMOUR :* 100% (Bloqué au max !)%0A` +
                        `*🎁 CADEAU CHOISI :* ${chosenGift}`;
    
    const wishSection = `*✨ SOUHAIT SPÉCIAL :*%0A"${finalWish}"`;
    
    const footer = `_Envoyé avec tout mon amour via ton site web_ ❤️`;

    // Construction du message avec double saut de ligne (%0A%0A) pour aérer
    const message = 
      `${title}%0A${separator}%0A%0A` +
      `${quizSection}%0A%0A` +
      `${recapSection}%0A%0A` +
      `${wishSection}%0A%0A` +
      `${separator}%0A${footer}`;

    window.open(`https://wa.me/${myPhoneNumber}?text=${message}`, '_blank');
  };

  const validateWish = (e) => {
    e.preventDefault();
    const isForbidden = forbiddenWords.some(word => wish.toLowerCase().includes(word.toLowerCase()));

    if (wish.length < 3) {
      setError("C'est un peu court... écris quelque chose de vrai ! ✨");
    } else if (isForbidden) {
      setError("Hé ho ! 'Rien' n'est pas une option. Choisis un vrai cadeau ! 🎁");
      setWish(""); 
    } else {
      handleSendWhatsApp(wish);
    }
  };

  return (
    <div className="flex flex-col items-center animate-fadeIn w-full max-w-md mx-auto p-4 space-y-8">
      
      {/* HEADER SECTION */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent uppercase tracking-tight">
          Dernière étape...
        </h2>
        <p className="text-gray-500 font-medium italic text-sm">Le rapport final est presque prêt ! ✨</p>
      </div>
      
      {/* 1. LE SLIDER STYLISÉ */}
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border border-white/50 w-full transform transition-all hover:shadow-2xl">
        <label className="block text-xs font-black mb-6 text-gray-400 uppercase tracking-widest text-center">
          Taux d'amour (clique sur 100% pour finir)
        </label>
        
        <div className="relative flex flex-col items-center">
          <input 
            type="range" min="0" max="100" 
            value={loveLevel}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val < 100) setLoveLevel(val);
            }}
            className="w-full h-4 bg-pink-100 rounded-full appearance-none cursor-pointer accent-pink-500 shadow-inner"
          />
          
          <div className="mt-6 relative">
            <span className="text-6xl font-black text-pink-500 tabular-nums">
              {loveLevel}%
            </span>
            {loveLevel === 99 && (
              <div className="absolute -right-12 -top-2 animate-bounce">
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">BLOQUÉ !</span>
              </div>
            )}
          </div>
        </div>
        
        {loveLevel === 99 && (
          <p className="text-[10px] text-red-400 font-bold text-center mt-4 uppercase tracking-tighter animate-pulse">
            Oups, le 100% est désactivé par sécurité ! 😉
          </p>
        )}
      </div>

      {/* 2. SÉLECTION DU CADEAU */}
      {!chosenGift ? (
        <div className="text-center w-full space-y-6">
          <p className="font-bold text-gray-700 text-lg">Choisis ton cadeau :</p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center relative min-h-[120px]">
            <button 
              onClick={() => setChosenGift("Un gros bisou 💋")}
              className="group relative bg-white border-2 border-pink-100 hover:border-pink-500 px-8 py-4 rounded-2xl shadow-lg hover:shadow-pink-200 transition-all active:scale-95 z-10 overflow-hidden"
            >
              <span className="relative z-10 font-black text-pink-600 group-hover:text-pink-700 flex items-center gap-2">
                Un gros bisou 💋
              </span>
            </button>
            
            <button 
              onMouseEnter={escapeButton}
              style={{ transform: `translate(${btnPos.x}px, ${btnPos.y}px)` }}
              className="bg-gray-100 text-gray-400 px-6 py-2 rounded-xl transition-all duration-300 absolute opacity-60 text-sm font-bold border border-gray-200 pointer-events-auto"
            >
              Un vieux caillou 🪨
            </button>
          </div>
        </div>
      ) : (
        /* 3. FORMULAIRE FINAL */
        <div className="bg-white p-8 rounded-[2.5rem] border border-pink-100 w-full shadow-2xl animate-bounceIn relative overflow-hidden">
          <div className="absolute -right-4 -top-4 text-6xl opacity-10 rotate-12">🎁</div>
          
          <div className="relative z-10 space-y-6">
            <div className="space-y-1 text-center">
              <span className="text-[10px] font-black text-pink-400 uppercase tracking-widest">Confirmation</span>
              <h3 className="font-black text-gray-800 text-xl leading-tight">
                Génial ! Tu as choisi : <br/>
                <span className="text-pink-500 italic">{chosenGift}</span>
              </h3>
            </div>

            <div className="space-y-4">
              <form onSubmit={validateWish} className="flex flex-col gap-4">
                <textarea
                  value={wish}
                  onChange={(e) => { setWish(e.target.value); setError(""); }}
                  placeholder="Écris ici ton souhait Stp..."
                  className={`w-full p-4 border-2 rounded-2xl outline-none h-28 resize-none bg-pink-50/30 transition-all font-medium
                    ${error ? 'border-red-200 focus:border-red-400' : 'border-pink-50 focus:border-pink-300'}`}
                />
                
                {error && (
                  <p className="text-red-500 text-[11px] font-black animate-shake text-center bg-red-50 py-2 rounded-lg">
                    ⚠️ {error}
                  </p>
                )}
                
                <button 
                  type="submit"
                  className="group relative w-full bg-gradient-to-br from-pink-500 to-purple-600 text-white font-black py-5 rounded-2xl shadow-lg hover:-translate-y-1 active:scale-[0.98] transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                    Envoyer mon rapport 💌
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      
      <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
        Fait avec tout mon amour ❤️
      </p>
    </div>
  ); 
};