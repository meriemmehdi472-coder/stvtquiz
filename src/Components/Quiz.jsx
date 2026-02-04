import { useState } from 'react';

const QUESTIONS = [
  // ... (tes questions restent identiques)
  { 
    id: 1, 
    text: "Quel est notre lieu de rencontre ?", 
    options: ["159 Rte de Saint-Leu, 93800 Épinay-sur-Seine", "31 Rue Lord Louis Mountbatten, 76280 Saint-Jouin-Bruneval", "jardin du luxembourg"], 
    correct: "159 Rte de Saint-Leu, 93800 Épinay-sur-Seine" 
  },
  { 
    id: 2, 
    text: "Où avons-nous pris notre première photo ?", 
    options: ["Étretat", "Luxembourg", "autre"], 
    correct: "Étretat" 
  },
  {
    id: 3,
    text: "Quel mois a marqué un tournant pour nous ?",
    options: ["Janvier", "Mai", "Septembre"],
    correct: "Septembre" 
  },
  {
    id: 4,
    text: "Qu'est-ce que je préfère Boire quand on est ensemble ?",
    options: ["Café", "Chocolat chaud", "Jus"],
    correct: "Café" 
  },
  {
    id: 5,
    text: "Si je devais choisir une destination de rêve là maintenant ?",
    options: ["Le Japon", "L'Italie", "L'Inde"],
    correct: "L'Italie"
  },
  {
    id: 6,
    text: "Quel est ton surnom ?",
    options: ["Mon lapinou", "Lapinouuu", "Chatonnn"],
    correct: "Lapinouuu" 
  },
  {
    id: 7,
    text: "Quelle est ma saison préférée de l'année ?",
    options: ["Le printemps et ses fleurs", "L'été pour la plage", "L'hiver pour les plaids"],
    correct: "L'été pour la plage"
  },
  {
    id: 8,
    text: "Quel est mon péché mignon niveau nourriture ?",
    options: ["Le chocolat noir", "Les frites croustillantes", "Les kebabs"],
    correct: "Les kebabs"
  },
  {
    id: 9,
    text: "Quelle est la couleur que je porte le plus souvent ?",
    options: ["Le bleu marine", "Le noir classique", "Le vert sapin"],
    correct: "Le noir classique"
  },
  {
    id: 10,
    text: "Dernière chance : Me connais-tu vraiment à 100% ?",
    options: ["Je pense que oui !", "Peut-être...", "On va voir ça !"],
    correct: "Je pense que oui !"
  },
  {
    id: 11,
    text: "Dernière question : Est-ce que tu es prêt à voir ton cadeau ?",
    options: ["Non, tu me suffit, mais Oui", "Bof , OUi ", "OUI !"],
    correct: "OUI !"
  },
];

export const Quiz = ({ onWin, onLose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [attempts, setAttempts] = useState(0);

  const handleAnswer = (option) => {
    const isCorrect = option === QUESTIONS[currentQuestion].correct;
    
    if (isCorrect) {
      // Correction ici : QUESTIONS avec un seul N
      const status = attempts === 0 ? "Parfait !" : `⚠️ (Réussi après ${attempts} erreur(s))`;
      const answerEntry = `${QUESTIONS[currentQuestion].text} - Ta réponse : "${option}" ${status}`;
      
      const newAnswers = [...userAnswers, answerEntry];

      if (currentQuestion + 1 < QUESTIONS.length) {
        setUserAnswers(newAnswers);
        setCurrentQuestion(currentQuestion + 1);
        setAttempts(0);
      } else {
        // On envoie le tableau complet à App.jsx
        onWin(newAnswers);
      }
    } else {
      setAttempts(prev => prev + 1);
      alert("Oups ! Ce n'est pas ça... Réessaie ! 😉"); 
    }
  };

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  return (
    <div className="relative bg-white/90 backdrop-blur-lg p-8 rounded-[2.5rem] shadow-2xl text-center max-w-md w-full mx-4 border border-white/50 animate-fadeIn">
      
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-black py-2 px-6 rounded-full shadow-lg uppercase tracking-tighter">
        Question {currentQuestion + 1} sur {QUESTIONS.length}
      </div>

      <div className="mt-4 w-full bg-pink-100/50 h-2.5 rounded-full mb-10 overflow-hidden p-0.5 border border-pink-50">
        <div 
          className="bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 h-full rounded-full transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(236,72,153,0.4)]"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="min-h-[100px] flex items-center justify-center mb-8 px-2">
        <p className="text-2xl text-gray-800 font-black leading-tight tracking-tight">
          {QUESTIONS[currentQuestion].text}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {QUESTIONS[currentQuestion].options.map((opt, index) => (
          <button 
            key={opt}
            onClick={() => handleAnswer(opt)}
            style={{ animationDelay: `${index * 100}ms` }}
            className="group relative bg-white border-2 border-pink-50 hover:border-pink-500 py-4 px-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-pink-100 hover:shadow-xl active:scale-[0.97] animate-fadeIn"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-bold group-hover:text-pink-600 transition-colors">
                {opt}
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-pink-500 font-black">
                →
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 opacity-20 flex justify-center gap-2">
        <span>💖</span>
        <span>✨</span>
        <span>💖</span>
      </div>
    </div>
  );
};