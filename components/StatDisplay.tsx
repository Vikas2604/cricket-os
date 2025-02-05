import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define types for the props that the StatDisplay component will accept
type StatDisplayProps = {
  label: string;
  value: string | number;
  style?: object;  // Optional style to customize individual stat displays
};

const StatDisplay: React.FC<StatDisplayProps> = ({ label, value, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
});

export default StatDisplay;
