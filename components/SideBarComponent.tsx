import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

interface SideBarComponentProps {
  activeTab: string;
  onTabSelect: (tab: string) => void;
}

const SideBarComponent: React.FC<SideBarComponentProps> = ({ activeTab, onTabSelect }) => {
  const renderSideTab = (number: string, text: string) => (
    <TouchableOpacity
      style={[styles.sideTab, activeTab === number && styles.sideTabActive]}
      onPress={() => onTabSelect(number)}
    >
      <Text style={[styles.sideTabNumber, activeTab === number && styles.sideTabTextActive]}>{number}</Text>
      <Text style={[styles.sideTabText, activeTab === number && styles.sideTabTextActive]}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.sidebar}>
      {renderSideTab("1", "PLAYER INFO")}
      {renderSideTab("2", "MATCH INFO")}
      {renderSideTab("3", "MATCH DETAILS")}
    </View>
  );
};

export default SideBarComponent;

const styles = StyleSheet.create({
  sidebar: {
    width: '10%',
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
});
