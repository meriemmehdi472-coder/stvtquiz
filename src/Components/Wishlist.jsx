import { useState } from 'react';

export const Wishlist = ({ onComplete }) => {
  const [wish, setWish] = useState("");
  const [error, setError] = useState("");

  const forbiddenWords = ["rien", "pas besoin", "nécessaire", "tu me suffit", "suffis", "pas besoin de rien"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const isForbidden = forbiddenWords.some(word => wish.toLowerCase().includes(word));

    if (wish.length < 3) {
      setError("C'est un peu court, non ? 😉");
    } else if (isForbidden) {
      setError("Hé ho ! 'Rien' n'est pas une option. Choisis un vrai cadeau ! 🎁");
      setWish(""); 
    } else {
      onComplete(wish); 
    }
  };

  return (
    <div className="mt-8 p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-pink-100 max-w-md mx-auto transform transition-all hover:scale-[1.01]">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Le Coffre aux Souhaits 🌸
        </h3>
        <p className="text-gray-500 text-sm mt-2 font-medium">
          Écris ici quelque chose qui te ferait vraiment plaisir...
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="relative">
          <textarea
            value={wish}
            onChange={(e) => { setWish(e.target.value); setError(""); }}
            className={`w-full p-4 min-h-[120px] bg-pink-50/50 border-2 rounded-2xl outline-none transition-all duration-300 resize-none
              ${error ? 'border-red-300 focus:border-red-500 animate-shake' : 'border-pink-100 focus:border-pink-400 focus:ring-4 focus:ring-pink-100'}
              text-gray-700 placeholder-pink-300 font-medium`}
          />
          <div className="absolute bottom-3 right-3 opacity-20 pointer-events-none text-2xl">✨</div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm font-bold bg-red-50 p-3 rounded-xl border border-red-100 animate-bounceIn">
            <span>⚠️</span>
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="group relative bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white font-black py-4 rounded-2xl shadow-[0_10px_20px_-10px_rgba(236,72,153,0.5)] hover:shadow-[0_20px_30px_-10px_rgba(236,72,153,0.6)] hover:-translate-y-1 active:scale-95 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
            Valider mon vœu précieux ✨
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </form>

      <p className="text-[10px] text-center text-pink-300 uppercase tracking-tighter mt-6 font-bold">
        Interdit de dire rien • Tu me suffis • Pas besoin
      </p>
    </div>
  );
};