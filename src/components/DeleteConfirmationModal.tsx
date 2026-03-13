import React from 'react';
import { motion } from 'motion/react';
import { Target, Trash2 } from 'lucide-react';
import { Goal } from '../store';

interface DeleteConfirmationModalProps {
  goal: Goal;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmationModal({ goal, onClose, onConfirm }: DeleteConfirmationModalProps) {
  const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100));

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))] pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-md shadow-2xl relative"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <Trash2 size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">Delete Goal?</h2>
          <p className="text-zinc-400">
            Are you sure you want to delete <span className="text-zinc-100 font-semibold">"{goal.title}"</span>? This action cannot be undone.
          </p>
        </div>

        <div className="bg-zinc-950 rounded-2xl p-4 mb-6 border border-zinc-800/50">
          <div className="flex justify-between text-sm font-medium text-zinc-400 mb-2">
            <span>Progress Made</span>
            <span className="text-amber-500">{percentage}%</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-3">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
            />
          </div>
          <div className="flex items-center justify-center text-zinc-300 text-sm">
            <Target size={14} className="mr-1.5 text-zinc-500" />
            <span>{goal.current} / {goal.target} {goal.unit}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold py-3 px-4 rounded-xl transition-colors"
          >
            Cancel
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          >
            Delete
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
