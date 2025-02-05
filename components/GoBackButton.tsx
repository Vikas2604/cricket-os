import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

const GoBackButton = () => {
  return (
    <View>
      <TouchableOpacity style={styles.goBackButton} onPress={() => setActiveTab("1")}>
        <Icon style={styles.startGameButtonSlider} name="arrowleft" color="#FFFFFF" size={45} />
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default GoBackButton

const styles = StyleSheet.create({
  goBackButton: {
    backgroundColor: '#00A3B4',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
  },
  startGameButtonSlider: {
    position: 'absolute',
    left: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
})