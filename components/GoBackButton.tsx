import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

const GoBackButton = () => {
  return (
    <View style={styles.backBtn}>
      <Icon
        name="arrowleft"
        color="#FFFFFF"
        size={43}
      />
      <Text style={styles.backBtnText}>Go Back</Text>
    </View>
  )
}

export default GoBackButton

const styles = StyleSheet.create({
  backBtn: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#0000001A',
    alignItems: 'center',
    height: 84,
    width: 398,
    borderRadius: 96,
    justifyContent: 'center',
    gap: 10
  },
  backBtnText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 500,

  }
})