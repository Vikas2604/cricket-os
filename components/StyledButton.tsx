import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface StyledButtonProps {
  text: string;
  icon: string;
  onPress: () => void;
  style?: ViewStyle;
  textColor: string;
  iconColor: string;
  disabled?: boolean;
  iconStyle?: TextStyle;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  text,
  icon,
  onPress,
  style = {},
  textColor,
  iconColor,
  disabled = false,
  iconStyle = {},
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Icon name={icon} color={iconColor} size={43} style={iconStyle} />
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 84,
    width: 398,
    borderRadius: 96,
    justifyContent: 'center',
    textAlign: 'center',
    gap: 10,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: '500',
    paddingBottom: 5,
  },
  disabled: {
    opacity: 0.2,
  },
});

export default StyledButton;
