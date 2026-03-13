import { Goal, Session } from '../store';
import { X, Calendar, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface TimelineProps {
  goal: Goal;
  sessions: Session[];
  onClose: () => void;
}

export function Timeline({ goal, sessions, onClose }: TimelineProps) {
  const sortedSessions = [...sessions].sort((a, b) => b.timestamp - a.timestamp);

  const formatDate = (ts: number) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date(ts));
  };

  return (
    <div className="fixed inset-0 bg-zinc-950 z-50 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex items-center sticky top-0 z-10">
        <button 
          onClick={onClose}
          className="mr-4 text-zinc-400 hover:text-zinc-100 transition-colors p-2"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-zinc-100">{goal.title}</h2>
          <p className="text-zinc-500 text-sm">Journey Timeline</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {sortedSessions.length === 0 ? (
          <div className="text-center text-zinc-500 mt-20">
            <Calendar size={48} className="mx-auto mb-4 opacity-20" />
            <p>No sessions logged yet.</p>
            <p className="text-sm mt-1">Start your journey today!</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-zinc-800 ml-4 space-y-8 pb-10">
            {sortedSessions.map((session, index) => (
              <motion.div 
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative pl-6"
              >
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-500 border-4 border-zinc-950 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-amber-500 font-bold text-lg">
                      +{session.amount} <span className="text-sm font-medium text-amber-500/70">{goal.unit}</span>
                    </span>
                    <span className="text-zinc-500 text-xs font-mono">
                      {formatDate(session.timestamp)}
                    </span>
                  </div>
                  
                  {session.note && (
                    <p className="text-zinc-300 text-sm mt-2 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                      "{session.note}"
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
