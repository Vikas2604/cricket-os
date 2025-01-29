import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PageInfro = () => {
  return (
    <View style={styles.infoPageBanner}>
      <Text style={styles.infoPageText}>Player Info</Text>
    </View>
  )
}

export default PageInfro

const styles = StyleSheet.create({
  infoPageBanner: {
    height: 64,
    alignItems: 'center',
    backgroundColor: '#00A2B4',
    justifyContent: 'center',
    textAlign: 'center'

  },
  infoPageText: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: 24,

  },
})