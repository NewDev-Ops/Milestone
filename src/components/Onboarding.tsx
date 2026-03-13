import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Clock, Trophy, ArrowRight, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    id: 'welcome',
    icon: <Target size={64} className="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" />,
    title: 'Welcome to Milestone',
    description: 'Your personal progress journal for long-term goals. Break down massive ambitions into trackable targets.',
  },
  {
    id: 'log',
    icon: <Clock size={64} className="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" />,
    title: 'Log Every Step',
    description: 'Add time, pages, or steps to your goals. Build a streak by logging progress every day.',
  },
  {
    id: 'celebrate',
    icon: <Trophy size={64} className="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" />,
    title: 'Celebrate Progress',
    description: 'Earn glowing milestone badges at 25%, 50%, 75%, and 100%. Every step forward is an achievement.',
  }
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] max-w-[800px] max-h-[800px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center text-center max-w-sm relative z-10"
          >
            <div className="mb-8 p-6 bg-zinc-900/50 border border-zinc-800/50 rounded-full shadow-2xl backdrop-blur-sm">
              {steps[currentStep].icon}
            </div>
            
            <h1 className="text-3xl font-black text-zinc-100 mb-4 tracking-tight">
              {steps[currentStep].title}
            </h1>
            
            <p className="text-zinc-400 text-lg leading-relaxed">
              {steps[currentStep].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-6 pb-10 flex flex-col items-center gap-8 relative z-10">
        <div className="flex gap-3">
          {steps.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 rounded-full transition-all duration-500 ${
                idx === currentStep 
                  ? 'w-8 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' 
                  : 'w-2 bg-zinc-800'
              }`} 
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="w-full max-w-sm bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(245,158,11,0.3)] text-lg"
        >
          {currentStep === steps.length - 1 ? (
            <>
              Get Started <Check size={20} />
            </>
          ) : (
            <>
              Continue <ArrowRight size={20} />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};
