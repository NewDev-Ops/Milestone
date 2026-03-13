import { useState, useCallback } from 'react';
import { useMilestoneStore } from './store';
import { GoalCard } from './components/GoalCard';
import { AddGoalModal } from './components/AddGoalModal';
import { SessionModal } from './components/SessionModal';
import { Timeline } from './components/Timeline';
import { BadgeAnimation } from './components/BadgeAnimation';
import { Onboarding } from './components/Onboarding';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { Flame, Plus, Activity, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { state, addGoal, addSession, deleteGoal, completeOnboarding, activeStreak } = useMilestoneStore();
  
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [loggingGoalId, setLoggingGoalId] = useState<string | null>(null);
  const [timelineGoalId, setTimelineGoalId] = useState<string | null>(null);
  const [deleteGoalId, setDeleteGoalId] = useState<string | null>(null);
  const [milestoneQueue, setMilestoneQueue] = useState<number[]>([]);

  const handleLogSession = (amount: number, note: string) => {
    if (!loggingGoalId) return;
    const crossed = addSession(loggingGoalId, amount, note);
    if (crossed.length > 0) {
      setMilestoneQueue(prev => [...prev, ...crossed]);
    }
  };

  const handleMilestoneComplete = useCallback(() => {
    setMilestoneQueue(prev => prev.slice(1));
  }, []);

  const handleDeleteConfirm = () => {
    if (deleteGoalId) {
      deleteGoal(deleteGoalId);
      setDeleteGoalId(null);
    }
  };

  const loggingGoal = state.goals.find(g => g.id === loggingGoalId);
  const timelineGoal = state.goals.find(g => g.id === timelineGoalId);
  const deletingGoal = state.goals.find(g => g.id === deleteGoalId);
  const timelineSessions = state.sessions.filter(s => s.goalId === timelineGoalId);

  if (!state.hasSeenOnboarding) {
    return <Onboarding onComplete={completeOnboarding} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500/30 pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900 px-6 pb-4 pt-[calc(1rem+env(safe-area-inset-top))] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)]">
            <Activity size={20} className="text-zinc-950" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-100">Milestone</h1>
        </div>
        
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full shadow-inner"
        >
          <motion.div
            animate={activeStreak > 0 ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
          >
            <Flame size={18} className={activeStreak > 0 ? "text-amber-500 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" : "text-zinc-600"} />
          </motion.div>
          <motion.span 
            key={activeStreak}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`font-bold ${activeStreak > 0 ? "text-amber-500" : "text-zinc-500"}`}
          >
            {activeStreak}
          </motion.span>
        </motion.div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 pb-32">
        {state.goals.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center mt-20 text-center px-4"
          >
            <motion.div 
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 2, ease: "easeInOut" }}
              className="w-24 h-24 rounded-full bg-zinc-900 border-2 border-dashed border-zinc-800 flex items-center justify-center mb-6"
            >
              <Target size={40} className="text-zinc-700" />
            </motion.div>
            <h2 className="text-2xl font-bold text-zinc-300 mb-2">No goals yet</h2>
            <p className="text-zinc-500 max-w-sm">
              Start your journey by creating a long-term goal. Track hours, steps, or any metric you prefer.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {state.goals.map(goal => (
                <GoalCard 
                  key={goal.id} 
                  goal={goal} 
                  onLogSession={setLoggingGoalId}
                  onViewTimeline={setTimelineGoalId}
                  onDelete={setDeleteGoalId}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <div className="fixed bottom-[calc(2rem+env(safe-area-inset-bottom))] left-0 right-0 flex justify-center z-30 pointer-events-none">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.2 }}
          onClick={() => setIsAddGoalOpen(true)}
          className="pointer-events-auto bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-full p-4 shadow-[0_10px_30px_rgba(245,158,11,0.4)] flex items-center gap-2 font-bold px-6"
        >
          <Plus size={24} />
          <span>New Goal</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isAddGoalOpen && (
          <AddGoalModal 
            onClose={() => setIsAddGoalOpen(false)} 
            onAdd={addGoal} 
          />
        )}
        
        {loggingGoal && (
          <SessionModal 
            goal={loggingGoal} 
            onClose={() => setLoggingGoalId(null)} 
            onLog={handleLogSession} 
          />
        )}

        {deletingGoal && (
          <DeleteConfirmationModal
            goal={deletingGoal}
            onClose={() => setDeleteGoalId(null)}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {timelineGoal && (
          <Timeline 
            goal={timelineGoal} 
            sessions={timelineSessions} 
            onClose={() => setTimelineGoalId(null)} 
          />
        )}
      </AnimatePresence>

      {milestoneQueue.length > 0 && (
        <BadgeAnimation 
          milestone={milestoneQueue[0]} 
          onComplete={handleMilestoneComplete} 
        />
      )}
    </div>
  );
}
