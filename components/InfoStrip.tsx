import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InfoStripProps {
  number: string | number;
  text: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
}

export default function InfoStrip({
  number,
  text,
  backgroundColor = '#2DD4BF',
  width = 40,
  height = 300,
}: InfoStripProps) {
  return (
    <View style={[
      styles.container,
      { backgroundColor, width, height }
    ]}>
      <Text style={styles.number}>{number}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.verticalText}>
          {text.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  number: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  verticalText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    transform: [{ rotate: '270deg' }],
    width: 200,
    textAlign: 'center',
    position: 'absolute',
    letterSpacing: 1,
  },
});