import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppContext } from '../App.provider';
import { MoodItemRow } from '../components/MoodItemRow';

export const History: React.FC = () => {
  const appContext = useAppContext();

  return (
    <View style={styles.container}>
      {appContext?.mood?.map(item => (
        <MoodItemRow item={item} key={item.timestamp} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
