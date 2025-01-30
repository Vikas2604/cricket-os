import React, { useCallback } from 'react';
import { Pressable, Text, View, StyleSheet, Animated } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

export default function StartGameButton() {
  const translateX = new Animated.Value(0);

  const handlePressIn = useCallback(() => {
    Animated.spring(translateX, {
      toValue: 2,
      useNativeDriver: true,
      friction: 5,
    }).start();
  }, [translateX]);

  const handlePressOut = useCallback(() => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      friction: 5,
    }).start();
  }, [translateX]);

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.gradient}>
        <Animated.View
          style={[
            styles.iconContainer,
            { transform: [{ translateX }] }
          ]}
        >
          <ChevronRight
            size={24}
            color="#FFFFFF"
            strokeWidth={2.5}
          />
        </Animated.View>
        <Text style={styles.text}>Start Game</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 9999,
    width: 396,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignItems: 'center',
    backgroundColor: '#00A2B4',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pressed: {
    elevation: 4,
    shadowOpacity: 0.35,
    shadowRadius: 4.84,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 24,
    backgroundColor: '#00A2B4',
  },
  iconContainer: {
    marginRight: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '500',
  },
});