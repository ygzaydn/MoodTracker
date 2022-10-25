import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import { MoodItemRow } from '../components/MoodItemRow';
import { useAppContext } from '../App.provider';
import { MoodOptionType } from '../types';

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
    <View style={styles.container}>
      <MoodPicker onSelect={add} />
      {appContext && appContext.mood && appContext.mood.length > 0 && (
        <MoodItemRow
          item={appContext.mood[appContext.mood.length - 1]}
          key={appContext.mood[appContext.mood.length - 1].timestamp}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
