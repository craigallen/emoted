import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { StorageKeys, readJSON, writeJSON, removeKey } from '@/utils/storage';
import { AgeBand, getAgeBand } from '@/utils/ageBand';

export type Profile = {
  name: string | null;
  age: number | null;
  companionId: string | null;
  onboardingComplete: boolean;
  prefs: {
    largeText: boolean;
    reduceMotion: boolean;
  };
};

const defaultProfile: Profile = {
  name: null,
  age: null,
  companionId: null,
  onboardingComplete: false,
  prefs: {
    largeText: false,
    reduceMotion: false,
  },
};

type UserContextValue = {
  profile: Profile;
  isLoading: boolean;
  ageBand: AgeBand;
  updateProfile: (patch: Partial<Profile>) => void;
  updatePrefs: (patch: Partial<Profile['prefs']>) => void;
  completeOnboarding: () => void;
  resetProfile: () => Promise<void>;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    readJSON<Profile>(StorageKeys.profile).then((stored) => {
      if (cancelled) return;
      if (stored) {
        setProfile({ ...defaultProfile, ...stored, prefs: { ...defaultProfile.prefs, ...stored.prefs } });
      }
      setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback((next: Profile) => {
    setProfile(next);
    writeJSON(StorageKeys.profile, next);
  }, []);

  const updateProfile = useCallback(
    (patch: Partial<Profile>) => {
      persist({ ...profile, ...patch });
    },
    [profile, persist]
  );

  const updatePrefs = useCallback(
    (patch: Partial<Profile['prefs']>) => {
      persist({ ...profile, prefs: { ...profile.prefs, ...patch } });
    },
    [profile, persist]
  );

  const completeOnboarding = useCallback(() => {
    persist({ ...profile, onboardingComplete: true });
  }, [profile, persist]);

  const resetProfile = useCallback(async () => {
    await removeKey(StorageKeys.profile);
    setProfile(defaultProfile);
  }, []);

  const ageBand = useMemo(() => getAgeBand(profile.age), [profile.age]);

  const value = useMemo(
    () => ({ profile, isLoading, ageBand, updateProfile, updatePrefs, completeOnboarding, resetProfile }),
    [profile, isLoading, ageBand, updateProfile, updatePrefs, completeOnboarding, resetProfile]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}
