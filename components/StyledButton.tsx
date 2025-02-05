import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface StyledButtonProps {
  text: string;
  icon: string;
  onPress: () => void;
  style?: object;
  textColor: string;
  iconColor: string;
  disabled?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  text,
  icon,
  onPress,
  style = {},
  textColor,
  iconColor,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Icon name={icon} color={iconColor} size={43} />
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 74,
    width: 300,
    borderRadius: 96,
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.2,
  },
});

export default StyledButton;
