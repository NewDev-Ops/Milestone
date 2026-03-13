import React from 'react';
import { Trophy, Plus, Clock, Target, Trash2 } from 'lucide-react';
import { Goal } from '../store';
import { motion } from 'motion/react';

interface GoalCardProps {
  goal: Goal;
  onLogSession: (goalId: string) => void;
  onViewTimeline: (goalId: string) => void;
  onDelete: (goalId: string) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onLogSession, onViewTimeline, onDelete }) => {
  const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100));
  const milestones = [25, 50, 75, 100];

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-zinc-100">{goal.title}</h3>
          <div className="flex items-center text-zinc-400 text-sm mt-1">
            <Target size={14} className="mr-1" />
            <span>{goal.current} / {goal.target} {goal.unit}</span>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(goal.id)}
          className="text-zinc-600 hover:text-red-400 transition-colors p-2"
        >
          <Trash2 size={18} />
        </motion.button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xs font-medium text-zinc-500 mb-2">
          <span>Progress</span>
          <span className="text-amber-500">{percentage}%</span>
        </div>
        <motion.div layout className="h-3 bg-zinc-800 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, type: "spring", bounce: 0.2 }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"
          />
        </motion.div>
      </div>

      <div className="flex justify-between mb-6 px-2">
        {milestones.map(m => {
          const achieved = percentage >= m;
          return (
            <div key={m} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                achieved 
                  ? 'border-amber-500 bg-amber-500/20 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]' 
                  : 'border-zinc-800 bg-zinc-900 text-zinc-700'
              }`}>
                <Trophy size={18} className={achieved ? 'drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]' : ''} />
              </div>
              <span className={`text-[10px] font-bold mt-2 ${achieved ? 'text-amber-500' : 'text-zinc-600'}`}>
                {m}%
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onLogSession(goal.id)}
          className="flex-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(245,158,11,0.2)]"
        >
          <Plus size={18} className="mr-2" />
          Log Session
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onViewTimeline(goal.id)}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium py-3 px-4 rounded-xl flex items-center justify-center transition-colors"
        >
          <Clock size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
}
