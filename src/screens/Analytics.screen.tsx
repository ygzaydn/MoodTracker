import React from 'react';

import { View, StyleSheet, Text } from 'react-native';

export const Analytics: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Analytics</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
