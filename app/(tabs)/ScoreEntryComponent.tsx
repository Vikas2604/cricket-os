import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";

interface ScoreEntryComponentProps {
  target: number;
  players: Array<{ id: number; name: string }>;
}

const ScoreEntryComponent: React.FC<ScoreEntryComponentProps> = ({ target, players }) => {
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [score, setScore] = useState(0);
  const [balls, setBalls] = useState<string[]>(["", "", "", "", "", ""]);

  const renderScoreButton = (value: string, rowIndex: number) => (
    <TouchableOpacity
      style={[styles.scoreButton, rowIndex === 0 ? styles.scoreButtonRed : rowIndex === 1 ? styles.scoreButtonGreen : styles.scoreButtonBlue]}
      onPress={() => {
        setScore((prevScore) => {
          const newScore = prevScore + Number.parseInt(value);
          if (newScore > target) {
            console.log(`${players[0].name} won!`);
          }
          return newScore;
        });
        setBalls((prevBalls) => {
          const newBalls = [...prevBalls];
          const nextIndex = prevBalls.findIndex((ball) => ball === "");
          if (nextIndex !== -1) {
            newBalls[nextIndex] = value;
          }
          return newBalls;
        });
      }}
    >
      <Text style={styles.scoreButtonText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.scoreEntrySection}>
      <View style={styles.autoManualSwitch}>
        <Text>Score Entry</Text>
        <View style={styles.switchContainer}>
          <Text>Auto</Text>
          <Switch value={isAutoMode} onValueChange={setIsAutoMode} trackColor={{ false: "#767577", true: "#00A3B4" }} />
          <Text>Manual</Text>
        </View>
      </View>
      <View style={styles.scoreEntryContent}>
        <View style={styles.scoreButtonsContainer}>
          <View style={styles.scoreButtonRow}>
            {renderScoreButton("2", 0)}
            {renderScoreButton("2", 1)}
            {renderScoreButton("2", 2)}
          </View>
          <View style={styles.scoreButtonRow}>
            {renderScoreButton("4", 0)}
            {renderScoreButton("4", 1)}
            {renderScoreButton("4", 2)}
          </View>
          <View style={styles.scoreButtonRow}>
            {renderScoreButton("6", 0)}
            {renderScoreButton("6", 1)}
            {renderScoreButton("6", 2)}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreEntrySection: {
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 20,
  },
  autoManualSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    gap: 10,
  },
  scoreEntryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  scoreButtonsContainer: {
    flex: 1,
  },
  scoreButtonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  scoreButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreButtonRed: {
    backgroundColor: "#ff7675",
  },
  scoreButtonGreen: {
    backgroundColor: "#00b894",
  },
  scoreButtonBlue: {
    backgroundColor: "#0984e3",
  },
  scoreButtonText: {
    color: "#fff",
    fontSize: 33,
    fontWeight: "500",
  },
});

export default ScoreEntryComponent;
