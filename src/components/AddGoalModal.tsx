import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'motion/react';

interface AddGoalModalProps {
  onClose: () => void;
  onAdd: (title: string, target: number, unit: string) => void;
}

export function AddGoalModal({ onClose, onAdd }: AddGoalModalProps) {
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [unit, setUnit] = useState('hours');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !target) return;
    onAdd(title, Number(target), unit);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))] pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-md shadow-2xl relative"
      >
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 p-2"
        >
          <X size={20} />
        </motion.button>

        <h2 className="text-2xl font-bold text-zinc-100 mb-6">New Milestone</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Goal Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Complete 60-hour course"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-zinc-400 mb-1">Target</label>
              <input 
                type="number" 
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g. 60"
                min="1"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-zinc-400 mb-1">Unit</label>
              <select 
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors appearance-none"
              >
                <option value="hours">Hours</option>
                <option value="steps">Steps</option>
                <option value="days">Days</option>
                <option value="pages">Pages</option>
                <option value="sessions">Sessions</option>
              </select>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-4 rounded-xl mt-6 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.2)]"
          >
            Create Goal
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
