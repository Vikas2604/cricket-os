import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PlayerRowProps {
  playerName: string;
  balls: string[];
  overNumber: number;
  isOut: boolean;
}

const getOrdinalSuffix = (number: number) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = number % 100;
  return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
};

const PlayerRow: React.FC<PlayerRowProps> = ({ playerName, balls, overNumber, isOut }) => (
  <View style={[styles.playerRow, isOut && styles.disabledRow]}>
    <Text style={styles.playerName}>
      {playerName}'s {overNumber}
      {getOrdinalSuffix(overNumber)} Over:
    </Text>
    <View style={styles.overContainer}>
      {balls.map((ball, index) => (
        <View key={index} style={styles.ball}>
          <Text style={styles.ballText}>{ball}</Text>
        </View>
      ))}
    </View>
  </View>
);

export default PlayerRow;

const styles = StyleSheet.create({
  playerRow: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 3,
  },
  disabledRow: {
    backgroundColor: "#f0f0f0",
    opacity: 0.5,
  },
  playerName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  overContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  ball: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
  },
  ballText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  /* Vector 251 */


});
