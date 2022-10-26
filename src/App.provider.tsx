import React, { useState, useCallback, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { PropsWithChildren } from 'react';
import { MoodOptionWithTimestamp, MoodOptionType } from './types';

const defaultValue = {
  mood: [],
};

type AppData = {
  moods: MoodOptionWithTimestamp[];
};

type AppContextType = {
  mood?: MoodOptionWithTimestamp[];
  addMood?: (mood: MoodOptionType) => void;
  deleteMood?: (mood: MoodOptionWithTimestamp) => void;
};

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const getAppData = async (storageKey: string): Promise<AppData | null> => {
    try {
      const data = await AsyncStorage.getItem(storageKey);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch {
      return null;
    }
  };

  const setAppData = async (storageKey: string, newData: AppData) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
    } catch {
      return null;
    }
  };

  const handleSelectMood = useCallback((mood: MoodOptionType) => {
    setMoodList(current => {
      const newValue = [...current, { mood, timestamp: Date.now() }];
      setAppData('my-app-data', { moods: newValue });
      return newValue;
    });
  }, []);

  const handleDeleteMood = useCallback((mood: MoodOptionWithTimestamp) => {
    setMoodList(current => {
      const newValue = current.filter(el => el.timestamp !== mood.timestamp);
      setAppData('my-app-data', { moods: newValue });
      return newValue;
    });
  }, []);

  useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData('my-app-data');

      if (data) {
        setMoodList(data.moods);
      }
    };

    getDataFromStorage();
  }, []);

  return (
    <AppContext.Provider
      value={{
        mood: moodList,
        addMood: handleSelectMood,
        deleteMood: handleDeleteMood,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
