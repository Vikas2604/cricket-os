import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface HeaderComponentProps {
  title: string;
  textStyle?: TextStyle;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ title, textStyle }) => {
  return (
    <View style={[styles.header]}>
      <Text style={[styles.title, textStyle]}>{title}</Text>
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
    fontSize: 24,
    fontWeight: 700,
    textAlign: 'center',
    color: '#fff',
    alignItems:'center',
    textTransform: 'uppercase',
    marginLeft:100,
  },
});

export default HeaderComponent;
