import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MoodOptionType } from '../types';

const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

type MoodPickerProps = {
  onSelect: (mood: MoodOptionType) => void;
};

export const MoodPicker = ({ onSelect }: MoodPickerProps) => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();

  const handleSelect = React.useCallback(() => {
    if (selectedMood) {
      onSelect(selectedMood);
      setSelectedMood(undefined);
    }
  }, [onSelect, selectedMood]);

  return (
    <View style={styles.moodContainer}>
      <Text style={styles.moodTitle}>How are you right now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map(option => (
          <View key={option.emoji}>
            <Pressable
              onPress={() => setSelectedMood(option)}
              style={[
                styles.moodItem,
                option.emoji === selectedMood?.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}>
              <Text style={styles.moodText}>{option.emoji}</Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {selectedMood?.emoji === option.emoji ? option.description : ' '}
            </Text>
          </View>
        ))}
      </View>
      <Pressable style={styles.button} onPress={handleSelect}>
        <Text style={styles.buttonText}>Choose</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  moodContainer: {
    margin: 20,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  moodTitle: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 15,
  },
  moodText: {
    fontSize: 24,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: '#454C73',
    borderColor: '#fff',
  },
  descriptionText: {
    color: '#454C73',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#454C73',
    alignSelf: 'center',
    borderRadius: 25,
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    paddingHorizontal: 40,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
});
