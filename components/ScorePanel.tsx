import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScorePanelProps {
  target: number;
  score: number;
  extras: number;
  ballsLeft: number;
  requiredRunRate: string;
  strikeRate: string;
}

const ScorePanel: React.FC<ScorePanelProps> = ({ target, score, extras, ballsLeft, requiredRunRate, strikeRate }) => {
  return (
    <View style={styles.scorePanel}>
      <View style={styles.scoreSection}>
        <Text style={styles.nextTarget}>Next Target: {target}</Text>
        <Text style={styles.mainScore}>
          <Text style={styles.mainScoreText}>Score</Text>
          <View style={styles.mainScoreBoard}>
            <Text style={styles.scoreNumber}>{score}</Text>
            <Text style={styles.scoreSlash}> / </Text>
            <Text style={styles.maxScore}>{target}</Text>
          </View>
        </Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <View style={styles.statItemGroupExtras}>
              <Text style={styles.statLabel}>Extras</Text>
              <Text style={styles.statValue}>{extras}</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statItemGroupBalls}>
              <Text style={styles.statLabel}>Balls Left</Text>
              <Text style={styles.statValue}>{ballsLeft}</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statItemGroupReq}>
              <Text style={styles.statLabel}>Req. Rate</Text>
              <Text style={styles.statValue}>{requiredRunRate}/0</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statItemGroupStrRate}>
              <Text style={styles.statLabel}>Strike Rate</Text>
              <Text style={styles.statValue}>{strikeRate}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scorePanel: {
  },
  scoreSection: {
    width: 381,
    height: 458,
    marginBottom: 23,
    borderWidth: 3,
    borderRadius: 16,
    borderColor: '#00BDD2',
    marginTop: 40,
    marginLeft: 130,
    color: '#00000'
  },
  nextTarget: {
    fontSize: 22,
    fontWeight: 700,
    color: "#FFFFFF",
    width: 196,
    height: 58,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: 'center',
    backgroundColor: '#00A2B4',
    position: 'absolute',
    right: 0,
    borderTopRightRadius: 13,
    borderBottomLeftRadius: 13,
  },
  mainScore: {
    fontWeight: 700,
    fontSize: 35,
  },
  mainScoreText: {
    position: 'absolute',
    top: 17,
    left: 26,
  },
  mainScoreBoard: {
    flexDirection: 'row',
    position: 'absolute',
    top: 68,
    left: 26,
  },
  scoreNumber: {
    fontSize: 87,
    color: "#00A3B4",
    fontWeight: 700,
  },
  scoreSlash: {
    fontSize: 87,
    fontWeight: 700,
    color: "#333",
  },
  maxScore: {
    fontSize: 87,
    fontWeight: 700,
    color: "#333",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  statItem: {
    width: "100%",
  },
  statItemGroupExtras: {
    position: 'absolute',
    left: 21,
    top: 216,
  },
  statItemGroupBalls: {
    position: 'absolute',
    left: 185,
    top: 218,
  },
  statItemGroupReq: {
    position: 'absolute',
    top: 336,
    left: 21,
  },
  statItemGroupStrRate: {
    position: 'absolute',
    top: 336,
    left: 185,
  },
  statLabel: {
    color: "#00000",
    fontWeight: 500,
    fontSize: 27,
  },
  statValue: {
    fontWeight: 700,
    fontSize: 44,
    color: "#00A3B4",
  },
});

export default ScorePanel;
