import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ScorePanelProps {
  currentScore: number;
  targetScore: number;
  completedOvers: number;
  totalOvers: number;
}

const ScorePanel: React.FC<ScorePanelProps> = ({
  currentScore,
  targetScore,
  completedOvers,
  totalOvers,
}) => {
  return (
    <View style={styles.scorePanelContainer}>
      <Text style={styles.scoreText}>Score: {currentScore}/{targetScore}</Text>
      <Text style={styles.oversText}>
        Overs: {completedOvers}/{totalOvers}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scorePanelContainer: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  oversText: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
});

export default ScorePanel;
