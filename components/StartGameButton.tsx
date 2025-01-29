import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

const StartGameButton = () => {
  return (
    <View style={styles.strtGameBtn}>
      <Icon
        name="right"
        color="#FFFFFF"
        size={43}
      />
      <Text style={styles.strtGameBtnText}>Start Game</Text>
    </View>
  )
}

export default StartGameButton

const styles = StyleSheet.create({
  strtGameBtn: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#00A2B4',
    alignItems: 'center',
    height: 84,
    width: 398,
    borderRadius: 96,
    justifyContent: 'center',
    gap: 10
  },
  strtGameBtnText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 500,

  }
})