import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react'

const SideBarComponent = () => {
  const renderSideTab = (number: string, text: string, isActive: boolean = false) => (
    <TouchableOpacity style={[styles.sideTab, isActive && styles.sideTabActive]}>
      <Text style={[styles.sideTabNumber, isActive && styles.sideTabTextActive]}>{number}</Text>
      <Text style={[styles.sideTabText, isActive && styles.sideTabTextActive]}>{text}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.sidebar}>
      {renderSideTab("1", "PLAYER INFO")}
      {renderSideTab("2", "MATCH INFO")}
      {renderSideTab("3", "MATCH DETAILS", true)}
    </View>
  )
}

export default SideBarComponent;

const styles = StyleSheet.create({
  sidebar: {
    width: 80,
    backgroundColor: '#00A3B4',
  },
  sideTab: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#008c9e',
  },
  sideTabActive: {
    backgroundColor: '#fff',
  },
  sideTabNumber: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 8,
  },
  sideTabText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    width: 60,
  },
  sideTabTextActive: {
    color: '#00A3B4',
  },
})