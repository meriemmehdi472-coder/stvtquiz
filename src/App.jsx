import { useState } from 'react'
import { Quiz } from './Components/Quiz'
import { Slider } from './Components/Slider'
import { Sparkles } from './Components/Sparkles'


const HeartsBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {[...Array(12)].map((_, i) => (
      <span
        key={i}
        className="absolute animate-float text-pink-300/30 select-none"
        style={{
          left: `${Math.random() * 100}%`,
          top: `-10%`,
          fontSize: `${Math.random() * 16 + 8}px`,
          animationDuration: `${Math.random() * 6 + 6}s`,
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

  const restart = () => {
    alert("Erreur ! Tu dois me connaître par cœur 😈 Recommence tout !")
    setStep('start')
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-rose-50 via-pink-100 to-red-100 px-6">
      <HeartsBackground />
      <Sparkles />

      <div className="relative z-10 w-full flex justify-center">
        {/* ACCUEIL */}
        {step === 'start' && (
          <div className="w-full max-w-sm text-center animate-fadeIn rounded-[3.5rem] bg-white/50 backdrop-blur-2xl px-10 py-14 border border-white/70 shadow-[0_30px_80px_rgba(236,72,153,0.25)]">

            <div className="mb-8 flex justify-center">
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-pink-100 animate-pulse shadow-inner">
                <span className="text-5xl">❤️</span>
                <span className="absolute -top-2 -right-2 text-xl animate-bounce">✨</span>
              </div>
            </div>

            <h1 className="text-5xl font-extrabold bg-linear-to-r from-pink-600 via-red-500 to-fuchsia-600 bg-clip-text text-transparent tracking-tight mb-4">
              Coucou toi 💕
            </h1>

            <p className="text-lg text-gray-600 italic mb-10">
              Dis-moi… est-ce que tu m’aimes vraiment ?
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => setStep('quiz')}
                className="btn-love btn-heart bg-linear-to-r from-pink-500 to-rose-500 text-white px-8 py-5 rounded-full text-xl font-black hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  OUI, À LA FOLIE 🌹
                </span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              <button
                onClick={() => setStep('force')}
                className="text-xs uppercase tracking-widest font-bold text-pink-400 hover:text-red-500 transition-colors"
              >
                Non… (juste pour voir)
              </button>
            </div>
          </div>
        )}

        {/* NON FORCÉ */}
        {step === 'force' && (
          <div className="animate-bounceIn max-w-md rounded-[3rem] bg-white/90 backdrop-blur-xl p-10 text-center shadow-2xl border border-red-100">
            <span className="block text-7xl mb-6 animate-bounce">🤨</span>
            <p className="text-2xl font-black uppercase text-red-500 leading-tight mb-8">
              Sérieux ? 😏 <br /> Impossible de dire non.
            </p>
            <button
              onClick={() => setStep('quiz')}
              className="w-full rounded-full px-8 py-5 text-xl font-black text-white bg-linear-to-r from-red-500 via-pink-500 to-rose-600 shadow-xl hover:shadow-2xl transition-all active:scale-95 animate-pulse"
            >
              CLIQUE SUR OUI 😤
            </button>
          </div>
        )}

        {/* QUIZ */}
        {step === 'quiz' && (
          <div className="w-full flex justify-center animate-fadeIn">
            <Quiz onWin={() => setStep('final')} onLose={restart} />
          </div>

        )}

        {/* FINAL */}
        {step === 'final' && (
          <div className="animate-fadeIn text-center max-w-lg">
            <div className="mb-8">
              <div className="flex justify-center gap-3 text-4xl animate-bounce mb-2">
                🌹 ✨ 🌹
              </div>
              <h1 className="text-5xl font-black bg-linear-to-r from-pink-600 to-red-600 bg-clip-text text-transparent tracking-tight">
                Félicitations 🏆
              </h1>
              <p className="text-gray-500 font-bold mt-2">
                Tu es officiellement le meilleure 💖
              </p>
            </div>
            <div className="relative mx-auto w-72 h-48 perspective">
              <div className="group relative w-full h-full">
                <div className="absolute inset-0 bg-pink-200 rounded-2xl shadow-xl transition-transform duration-700 group-hover:rotateX-180 origin-top" />
                <div className="absolute inset-0 bg-white rounded-2xl p-6 text-center flex items-center justify-center">
                  <p className="font-bold text-pink-600">
                    Je t’aime plus que Tout ❤️
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-[3rem] bg-white/30 backdrop-blur-xl p-5 shadow-inner">
              <Slider />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default App
