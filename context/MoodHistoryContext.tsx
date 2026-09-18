import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { StorageKeys, readJSON, writeJSON, removeKey } from '@/utils/storage';

export type MoodEntry = {
  id: string;
  emotionId: string;
  note: string | null;
  createdAt: string; // ISO timestamp
};

type MoodHistoryContextValue = {
  entries: MoodEntry[];
  isLoading: boolean;
  addEntry: (emotionId: string, note?: string | null) => void;
  clearHistory: () => Promise<void>;
};

const MoodHistoryContext = createContext<MoodHistoryContextValue | undefined>(undefined);

export function MoodHistoryProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    readJSON<MoodEntry[]>(StorageKeys.moodHistory).then((stored) => {
      if (cancelled) return;
      if (stored) setEntries(stored);
      setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const addEntry = useCallback(
    (emotionId: string, note?: string | null) => {
      const entry: MoodEntry = {
        id: `${Date.now()}-${Math.round(Math.random() * 1e6)}`,
        emotionId,
        note: note ?? null,
        createdAt: new Date().toISOString(),
      };
      const next = [entry, ...entries];
      setEntries(next);
      writeJSON(StorageKeys.moodHistory, next);
    },
    [entries]
  );

  const clearHistory = useCallback(async () => {
    await removeKey(StorageKeys.moodHistory);
    setEntries([]);
  }, []);

  const value = useMemo(
    () => ({ entries, isLoading, addEntry, clearHistory }),
    [entries, isLoading, addEntry, clearHistory]
  );

  return <MoodHistoryContext.Provider value={value}>{children}</MoodHistoryContext.Provider>;
}

export function useMoodHistory(): MoodHistoryContextValue {
  const ctx = useContext(MoodHistoryContext);
  if (!ctx) throw new Error('useMoodHistory must be used within a MoodHistoryProvider');
  return ctx;
}
