import { useState, useEffect } from 'react';

export type Goal = {
  id: string;
  title: string;
  target: number;
  unit: string;
  current: number;
  createdAt: number;
};

export type Session = {
  id: string;
  goalId: string;
  amount: number;
  note: string;
  timestamp: number;
};

export type AppState = {
  goals: Goal[];
  sessions: Session[];
  streak: number;
  lastLogDate: string | null;
  hasSeenOnboarding: boolean;
};

const defaultState: AppState = {
  goals: [],
  sessions: [],
  streak: 0,
  lastLogDate: null,
  hasSeenOnboarding: false,
};

export function useMilestoneStore() {
  const [state, setState] = useState<AppState>(() => {
    try {
      const stored = localStorage.getItem('milestone_state');
      return stored ? JSON.parse(stored) : defaultState;
    } catch (e) {
      return defaultState;
    }
  });

  useEffect(() => {
    localStorage.setItem('milestone_state', JSON.stringify(state));
  }, [state]);

  const addGoal = (title: string, target: number, unit: string) => {
    const newGoal: Goal = {
      id: crypto.randomUUID(),
      title,
      target,
      unit,
      current: 0,
      createdAt: Date.now(),
    };
    setState((s) => ({ ...s, goals: [...s.goals, newGoal] }));
  };

  const addSession = (goalId: string, amount: number, note: string): number[] => {
    let crossedMilestones: number[] = [];
    const goal = state.goals.find(g => g.id === goalId);
    if (goal) {
      const oldPercentage = (goal.current / goal.target) * 100;
      const newPercentage = ((goal.current + amount) / goal.target) * 100;
      
      [25, 50, 75, 100].forEach(m => {
        if (oldPercentage < m && newPercentage >= m) {
          crossedMilestones.push(m);
        }
      });
    }

    const newSession: Session = {
      id: crypto.randomUUID(),
      goalId,
      amount,
      note,
      timestamp: Date.now(),
    };

    setState((s) => {
      const updatedGoals = s.goals.map((g) =>
        g.id === goalId ? { ...g, current: g.current + amount } : g
      );

      const today = new Date().toISOString().split('T')[0];
      let newStreak = s.streak;
      let newLastLogDate = s.lastLogDate;

      if (s.lastLogDate !== today) {
        if (s.lastLogDate) {
          const lastDate = new Date(s.lastLogDate);
          const currentDate = new Date(today);
          const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1;
          }
        } else {
          newStreak = 1;
        }
        newLastLogDate = today;
      }

      return {
        ...s,
        goals: updatedGoals,
        sessions: [...s.sessions, newSession],
        streak: newStreak,
        lastLogDate: newLastLogDate,
      };
    });

    return crossedMilestones;
  };

  const deleteGoal = (goalId: string) => {
    setState((s) => ({
      ...s,
      goals: s.goals.filter((g) => g.id !== goalId),
      sessions: s.sessions.filter((sess) => sess.goalId !== goalId),
    }));
  };

  const getActiveStreak = () => {
    if (!state.lastLogDate) return 0;
    const today = new Date().toISOString().split('T')[0];
    if (state.lastLogDate === today) return state.streak;
    
    const lastDate = new Date(state.lastLogDate);
    const currentDate = new Date(today);
    const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) return 0;
    return state.streak;
  };

  const completeOnboarding = () => {
    setState((s) => ({ ...s, hasSeenOnboarding: true }));
  };

  return { state, addGoal, addSession, deleteGoal, completeOnboarding, activeStreak: getActiveStreak() };
}
