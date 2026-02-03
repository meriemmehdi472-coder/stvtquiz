import { useState } from 'react'

export default function App() {
  const [step, setStep] = useState('welcome'); // welcome, forceYes, quiz, result

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4">
      {step === 'welcome' && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Bienvenue sur ma page !</h1>
          <p className="mb-6">Est-ce que tu m'aimes bien ?</p>
          <button 
            onClick={() => setStep('quiz')}
            className="bg-green-500 text-white px-6 py-2 rounded-full mr-4 hover:scale-110 transition"
          >
            Oui
          </button>
          <button 
            onClick={() => setStep('forceYes')}
            className="bg-red-500 text-white px-6 py-2 rounded-full"
          >
            Non
          </button>
        </div>
      )}

      {step === 'forceYes' && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">T'as pas trop le choix...</h2>
          <button 
            onClick={() => setStep('quiz')}
            className="bg-green-500 text-white px-8 py-4 rounded-full animate-bounce"
          >
            Pas trop le choix c'est Oui !
          </button>
        </div>
      )}
      
      {}
    </div>
  )
}