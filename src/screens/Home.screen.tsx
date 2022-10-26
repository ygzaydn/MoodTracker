import React, { useCallback } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import { MoodItemRow } from '../components/MoodItemRow';
import { useAppContext } from '../App.provider';
import { MoodOptionType } from '../types';

const imageUrl =
  'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1766&q=80';

export const Home: React.FC = () => {
  const appContext = useAppContext();

  const add = useCallback(
    (mood: MoodOptionType) => {
      if (appContext.addMood) {
        appContext.addMood(mood);
      }
    },
    [appContext],
  );

  return (
    <ImageBackground source={{ uri: imageUrl }} style={styles.container}>
      <MoodPicker onSelect={add} />
      {appContext && appContext.mood && appContext.mood.length > 0 && (
        <MoodItemRow
          item={appContext.mood[appContext.mood.length - 1]}
          key={appContext.mood[appContext.mood.length - 1].timestamp}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
