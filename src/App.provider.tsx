import React, { useState, useCallback } from 'react';

import { PropsWithChildren } from 'react';
import { MoodOptionWithTimestamp, MoodOptionType } from './types';

const defaultValue = {
  mood: [],
};

type AppContextType = {
  mood?: MoodOptionWithTimestamp[];
  addMood?: Function;
};

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback((mood: MoodOptionType) => {
    setMoodList(current => [...current, { mood, timestamp: Date.now() }]);
  }, []);

  return (
    <AppContext.Provider value={{ mood: moodList, addMood: handleSelectMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
