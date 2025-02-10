import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderComponentProps {
  title: string;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#00A3B4',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 34,
    fontWeight: 700,
    textAlign: 'center',
    color: '#fff',
    marginRight: 150,
  },
});

export default HeaderComponent;
