import { StyleSheet, Text, View } from 'react-native'
import React from 'react';

const VectorComponent = () => {
  return (
    <View style={styles.vectorComponentInfo}>
      <Text style={styles.vectorComponentInfoNumber}>1</Text>
      <Text style={styles.vectorComponentInfoText}>Player Info</Text>
    </View>
  )
}

export default VectorComponent

const styles = StyleSheet.create({
  vectorComponentInfo: {
    width: 151,
    height: 550,
    backgroundColor: '#0091A1',
  },
  vectorComponentInfoNumber: {
    fontSize: 85,
    fontWeight: 500,
    color: '#F7F7F7',
    paddingLeft: 90
  },
  vectorComponentInfoText: {
    fontSize: 24,
    fontWeight: 600,
    transform: [{ rotate: '-90deg' }],
    color: '#F7F7F7',
    position: 'absolute',
    bottom: 200,
    right: 0,
  }
})