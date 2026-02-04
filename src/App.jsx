import { useState } from 'react'
import { Quiz } from './Components/Quiz'
import { Slider } from './Components/Slider'
import { Sparkles } from './Components/Sparkles'
import CryptoJS from 'crypto-js'

const SECRET_KEY = "mon-secret-ultra-love-💖";

function encryptData(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}
function decryptData(cipherText) {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

// 1. Cœurs sur toute la largeur (Modifié : répartition dynamique)
const HeartsBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <span
        key={i}
        className="absolute animate-float text-pink-400/40 select-none"
        style={{
          left: `${(i / 30) * 100}%`,
          top: `-10%`,
          fontSize: `${Math.random() * 20 + 15}px`,
          animationDuration: `${Math.random() * 5 + 5}s`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      >
        ❤️
      </span>
    ))}
  </div>
)

function App() {
  const [step, setStep] = useState('start')
  // MODIFICATION : Ajout du state pour les réponses
  const [quizAnswers, setQuizAnswers] = useState([])

  const restart = () => {
    alert("Erreur ! Tu dois me connaître par cœur 😈 Recommence tout !")
    setQuizAnswers([])
    setStep('start')
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-pink-100 to-red-100 px-6">
      <HeartsBackground />
      <Sparkles/>

      <div className="relative z-10 w-full flex justify-center">

        {/* ÉTAPE 1 : ACCUEIL */}
        {step === 'start' && (
          <div className="text-center animate-fadeIn max-w-sm w-full bg-white/60 backdrop-blur-2xl p-12 rounded-[4rem] shadow-[0_20px_50px_rgba(236,72,153,0.3)] border border-white/80">
            <div className="relative mb-8 inline-block">
              <div className="p-6 bg-pink-100 rounded-full animate-pulse">
                <span className="text-5xl">❤️</span>
              </div>
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-br from-pink-600 via-red-500 to-purple-600 bg-clip-text text-transparent mb-6 tracking-tighter">
              Coucou !
            </h1>
            <p className="mb-10 text-xl text-gray-600 font-medium italic">
              Est-ce que tu m'aimes vraiment ? 🥹
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setStep('quiz')}
                className="btn-love group relative bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-5 rounded-3xl shadow-xl font-black text-xl overflow-hidden active:scale-95"
              >
                <span className="relative z-10">OUI, À LA FOLIE ! 🌹</span>
              </button>
              <button
                onClick={() => setStep('force')}
                className="text-pink-400 text-sm font-bold uppercase tracking-widest hover:text-red-500 transition-colors"
              >
                Non... (test pour voir)
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 2 : LE "NON" FORCÉ */}
        {step === 'force' && (
          <div className="text-center animate-bounceIn max-w-md bg-white/90 backdrop-blur-md p-10 rounded-[3rem] shadow-2xl border-4 border-red-100">
            <span className="text-7xl mb-6 block animate-bounce">🤨</span>
            <p className="text-2xl mb-8 font-black text-red-500 uppercase tracking-tight">
              Oups ! Ton doigt a glissé ? <br />Impossible de dire non... 😉
            </p>
            <button
              onClick={() => setStep('quiz')}
              className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-rose-600 text-white px-8 py-5 rounded-3xl font-black text-xl shadow-xl active:scale-95 animate-pulse"
            >
              CLIQUER SUR OUI ! 😒
            </button>
          </div>
        )}

        {/* ÉTAPE 3 : LE QUIZ */}
        {step === 'quiz' && (
          <div className="w-full flex justify-center animate-fadeIn">
            <Quiz
              onWin={(answers) => {
                const encryptedAnswers = encryptData(answers); // ✅ chiffrer les réponses
                setQuizAnswers(encryptedAnswers); // stocker encrypté
                setStep('final');
              }}
              onLose={restart}
            />
          </div>
        )}

        {/* ÉTAPE 4 : FINAL */}
        {step === 'final' && (
          <div className="text-center animate-fadeIn w-full max-w-lg">
            <div className="mb-8">
              <div className="flex justify-center gap-3 text-4xl animate-bounce">
                <span>🌹</span><span>✨</span><span>🌹</span>
              </div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent uppercase tracking-tighter">
                INCROYABLE ! 🏆
              </h1>
            </div>

            <div className="bg-white/30 backdrop-blur-md p-6 rounded-[3.5rem] shadow-inner">
              {/* MODIFICATION : On transmet les réponses au Slider */}
              <Slider userAnswers={quizAnswers} />
            </div>
          </div>
        )}
      </div>
      
    </main>
  )
}

export default App