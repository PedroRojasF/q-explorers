import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

type Role = 'student' | 'teacher' | 'guest' | null;

export type ExperimentResult = {
  zeros: number;
  ones: number;
  prediction: string;
  conceptualAnswer: string;
  completedAt: string;
};

type JourneyState = {
  role: Role;
  guide: string;
  completed: string[];
  experiment: ExperimentResult | null;
  hydrated: boolean;
  stars: number;
  xp: number;
  setRole: (role: Role) => void;
  setGuide: (guide: string) => void;
  completeMission: (id: string) => void;
  recordExperiment: (result: ExperimentResult) => void;
  resetJourney: () => void;
};

type StoredJourney = Pick<JourneyState, 'role' | 'guide' | 'completed' | 'experiment'>;

const STORAGE_KEY = '@qubitpacha/journey-v1';
const JourneyContext = createContext<JourneyState | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [guide, setGuide] = useState('kusi');
  const [completed, setCompleted] = useState<string[]>([]);
  const [experiment, setExperiment] = useState<ExperimentResult | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (!stored) return;
        const state = JSON.parse(stored) as Partial<StoredJourney>;
        if (state.role !== undefined) setRole(state.role);
        if (typeof state.guide === 'string') setGuide(state.guide);
        if (Array.isArray(state.completed)) setCompleted(state.completed);
        if (state.experiment) setExperiment(state.experiment);
      })
      .catch(() => undefined)
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const state: StoredJourney = { role, guide, completed, experiment };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => undefined);
  }, [role, guide, completed, experiment, hydrated]);

  const completeMission = (id: string) => {
    setCompleted((current) => (current.includes(id) ? current : [...current, id]));
  };

  const value = useMemo(() => ({
    role,
    guide,
    completed,
    experiment,
    hydrated,
    stars: 3 + completed.length,
    xp: completed.length * 10,
    setRole,
    setGuide,
    completeMission,
    recordExperiment: setExperiment,
    resetJourney: () => {
      setRole(null);
      setGuide('kusi');
      setCompleted([]);
      setExperiment(null);
    },
  }), [role, guide, completed, experiment, hydrated]);

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
}

export function useJourney() {
  const context = useContext(JourneyContext);
  if (!context) throw new Error('useJourney must be used within JourneyProvider');
  return context;
}
