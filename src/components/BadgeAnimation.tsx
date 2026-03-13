import { motion, AnimatePresence } from 'motion/react';
import { Trophy } from 'lucide-react';
import { useEffect } from 'react';

interface BadgeAnimationProps {
  milestone: number;
  onComplete: () => void;
}

export function BadgeAnimation({ milestone, onComplete }: BadgeAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/90 backdrop-blur-md"
      >
        <motion.div 
          initial={{ scale: 0.5, y: 50, rotate: -10 }}
          animate={{ scale: 1, y: 0, rotate: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 100 }}
          className="flex flex-col items-center text-center p-8"
        >
          <div className="relative mb-8">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 opacity-20 blur-3xl"
            />
            <div className="w-40 h-40 rounded-full bg-gradient-to-b from-amber-500 to-amber-700 p-1 shadow-[0_0_50px_rgba(245,158,11,0.6)]">
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center border-4 border-amber-500/50">
                <Trophy size={64} className="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
              </div>
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute -bottom-4 -right-4 bg-zinc-950 border-2 border-amber-500 text-amber-500 font-bold px-4 py-2 rounded-full text-xl shadow-lg"
            >
              {milestone}%
            </motion.div>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-2"
          >
            Milestone Reached!
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-zinc-400 text-lg"
          >
            You've completed {milestone}% of your goal. Keep going!
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
