import { useState } from 'react';
import { Quiz } from './Components/Quiz';
import { Slider } from './Components/Slider';

function App() {
  const [step, setStep] = useState('start');

  const restart = () => {
    alert("Erreur ! Tu dois me connaître par cœur... Recommence tout !");
    setStep('start');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 flex items-center justify-center p-6 font-sans">
      
      {/* ÉTAPE 1 : ACCUEIL */}
      {step === 'start' && (
        <div className="text-center animate-fadeIn max-w-sm w-full bg-white/40 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-white/60">
          <div className="mb-6 inline-block p-4 bg-pink-100 rounded-full animate-bounce">
            <span className="text-4xl">✨</span>
          </div>
          
          <h1 className="text-5xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Coucou !
          </h1>
          
          <p className="mb-10 text-xl text-gray-600 font-medium">
            Est-ce que tu m'aimes vraiment ? 🥹
          </p>
          
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => setStep('quiz')} 
              className="group relative bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-[0_10px_20px_-5px_rgba(16,185,129,0.4)] font-black text-lg overflow-hidden active:scale-95"
            >
              <span className="relative z-10">OUI, BIEN SÛR ! ❤️</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            
            <button 
              onClick={() => setStep('force')} 
              className="text-gray-400 text-sm font-bold uppercase tracking-widest hover:text-red-400 transition-colors duration-300"
            >
              Non... (test pour voir)
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 2 : LE "NON" FORCÉ */}
      {step === 'force' && (
        <div className="text-center animate-bounceIn max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl border-4 border-red-50">
          <span className="text-6xl mb-6 block">🤨</span>
          <p className="text-2xl mb-8 font-black text-red-500 uppercase tracking-tight">
            Mauvais bouton... <br/>Quelle maladresse ! 😉
          </p>
          <button 
            onClick={() => setStep('quiz')} 
            className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 text-white px-8 py-5 rounded-2xl font-black text-xl shadow-xl hover:shadow-2xl transition-all active:scale-95 animate-pulse"
          >
            CLIQUER ICI (Pas le choix ! 😒)
          </button>
        </div>
      )}

      {/* ÉTAPE 3 : LE QUIZ */}
      {step === 'quiz' && (
        <div className="w-full flex justify-center animate-fadeIn">
          <Quiz 
            onWin={() => setStep('final')} 
            onLose={restart} 
          />
        </div>
      )}

      {/* ÉTAPE FINALE */}
      {step === 'final' && (
        <div className="text-center animate-fadeIn w-full max-w-lg">
          <div className="mb-8 space-y-2">
            <div className="flex justify-center gap-2 text-3xl animate-bounce">
              <span>🏆</span><span>🎉</span><span>🏆</span>
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent uppercase tracking-tighter">
              INCROYABLE ! 100%
            </h1>
            <p className="text-gray-500 font-bold">Tu as passé le test avec succès.</p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-[3rem]">
            <Slider />
          </div>
        </div>
      )}
    </main>
  );
}

export default App;