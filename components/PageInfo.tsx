import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const PageInfo = () => {
  return (
    <View style={styles.vectorContainer}>
      <Text style={styles.text}>1</Text>
      <Text style={styles.text}>PLAYER INFO</Text>
    </View>
  );
}

export default PageInfo;

const styles = StyleSheet.create({
  vectorContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#0091A1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    marginHorizontal: 5, // Add some space between the number and text
  }
});
