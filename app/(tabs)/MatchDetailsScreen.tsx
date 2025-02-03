import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import HeaderComponent from '../../components/HeaderComponent'; // Importing HeaderComponent
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'; // Importing PanGestureHandler

interface MatchDetailsScreenProps {
  players: Array<{ id: number; name: string; battingStyle: string }>;
  target: number; // Added target prop
}

export default function MatchDetailsScreen({ players, target }: MatchDetailsScreenProps) {
  const [iconPosition, setIconPosition] = useState(0); // State for icon position
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [score, setScore] = useState(0); // State for current score
  const [balls, setBalls] = useState<string[]>(["", "", "", "", "", ""]); // State for ball values

  const renderBall = (value: string | number, active = false) => (
    <View style={[styles.ball, active && styles.activeBall]}>
      <Text style={[styles.ballText, active && styles.activeBallText]}>{value}</Text>
    </View>
  );

  const renderScoreButton = (value: string, rowIndex: number) => (
    <TouchableOpacity
      style={[styles.scoreButton,
      rowIndex === 0 ? styles.scoreButtonRed : rowIndex === 1 ? styles.scoreButtonGreen : styles.scoreButtonBlue,
      ]}
      onPress={() => {
        setScore(prevScore => prevScore + parseInt(value)); // Update score based on button clicked
        setBalls(prevBalls => {
          const newBalls = [...prevBalls];
          const nextIndex = prevBalls.findIndex(ball => ball === ""); // Find the next empty ball
          if (nextIndex !== -1) {
            newBalls[nextIndex] = value; // Update the next empty ball with the score
          }
          return newBalls;
        });
      }}
    >
      <Text style={styles.scoreButtonText}>{value}</Text>
    </TouchableOpacity>
  );

  const handleDispute = () => {
    console.log("Dispute raised");
  };

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    setIconPosition(event.nativeEvent.translationX);
    // Log message when the right circle reaches the end
    if (event.nativeEvent.translationX >= 100) { // Assuming 100 is the end position
      console.log("game stopped");
    }
  };

  return (
    <View style={styles.MatchDetailsScreenContainer}>
      <HeaderComponent title="Match Details" />

      <View style={styles.content}>
        <ScrollView style={styles.scrollContent}>
          {players.map((player) => (
            <View key={player.id} style={[styles.playerRow, styles.inactiveRow]}>
              <Text style={styles.playerName}>{player.name}'s</Text>
              <View style={styles.overContainer}>
                <Text style={styles.overText}>1st{"\n"}Over</Text>
                {balls.map((ball, index) => renderBall(ball, ball !== ""))}
              </View>
              <View style={styles.disputeBox}>
                <TouchableOpacity onPress={handleDispute}>
                  <Text style={styles.disputeText}>Dispute: 3</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Score Entry Section */}
          <View style={styles.scoreEntrySection}>
            <View style={styles.autoManualSwitch}>
              <Text>Score Entry</Text>
              <View style={styles.switchContainer}>
                <Text>Auto</Text>
                <Switch
                  value={isAutoMode}
                  onValueChange={setIsAutoMode}
                  trackColor={{ false: "#767577", true: "#00A3B4" }}
                />
                <Text>Manual</Text>
              </View>
            </View>
            <View style={styles.scoreEntryContent}>
              {/* Score Buttons */}
              <View style={styles.scoreButtonsContainer}>
                <View style={styles.scoreButtonRow}>
                  {renderScoreButton("2", 0)}
                  {renderScoreButton("2", 0)}
                  {renderScoreButton("2", 0)}
                </View>
                <View style={styles.scoreButtonRow}>
                  {renderScoreButton("4", 1)}
                  {renderScoreButton("4", 1)}
                  {renderScoreButton("4", 1)}
                </View>
                <View style={styles.scoreButtonRow}>
                  {renderScoreButton("6", 2)}
                  {renderScoreButton("6", 2)}
                  {renderScoreButton("6", 2)}
                </View>
              </View>
              {/* Action Buttons */}
              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>No Ball</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>No Runs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Wide</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Right Side Score Panel */}
        <View style={styles.scorePanel}>
          <View style={styles.scoreSection}>
            <Text style={styles.nextTarget}>Next Target : {target}</Text>
            <Text style={styles.mainScore}>
              <Text style={styles.scoreNumber}>{score}</Text>
              <Text style={styles.scoreSlash}> / </Text>
              <Text style={styles.maxScore}>{target}</Text> {/* Updated to use target */}
            </Text>

            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Extras</Text>
                <Text style={styles.statValue}>0</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Balls Left</Text>
                <Text style={styles.statValue}>1</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Req. Rate</Text>
                <Text style={styles.statValue}>8.0/over</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Strike Rate</Text>
                <Text style={styles.statValue}>183.33</Text>
              </View>
            </View>
          </View>

          <View style={styles.controlsSection}>
            <View style={styles.cameraControls}>
              <Text style={styles.controlLabel}>Tilt</Text>
              <Text style={styles.controlValue}>Short</Text>
              <Text style={styles.controlLabel}>Pan</Text>
              <Text style={styles.controlValue}>Line 1</Text>
              <Text style={styles.controlLabel}>Speed</Text>
              <Text style={styles.controlValue}>80 (km/h)</Text>
            </View>

            <TouchableOpacity style={styles.pauseButton}>
              <Icon name="pausecircleo" size={24} color="#fff" />
              <Text style={styles.pauseButtonText}>Pause</Text>
            </TouchableOpacity>

            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <TouchableOpacity style={styles.stopGameButton}>
                <Icon style={[styles.stopGameButtonSlider, { transform: [{ translateX: iconPosition }] }]} name="rightcircle" color="#FFFFFF" size={45} />
                <Text style={styles.buttonText}>Slide to Stop</Text>
              </TouchableOpacity>
            </PanGestureHandler>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MatchDetailsScreenContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  scrollContent: {
    flex: 1,
  },
  playerRow: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeRow: {
    borderColor: "#00A3B4",
    borderWidth: 1,
  },
  inactiveRow: {
    opacity: 0.7,
  },
  playerName: {
    fontSize: 18,
    marginBottom: 10,
  },
  overContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  overText: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 4,
    borderRadius: 4,
    marginRight: 10,
    textAlign: "center",
  },
  ball: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  activeBall: {
    borderColor: "#00A3B4",
  },
  ballText: {
    fontSize: 16,
    color: "#666",
  },
  activeBallText: {
    color: "#00A3B4",
  },
  disputeBox: {
    alignSelf: "flex-end",
  },
  disputeText: {
    color: "#666",
    borderWidth: 1,
    padding: 5,
    borderColor: "#F67676",
  },
  scoreEntrySection: {
    paddingHorizontal: 15,
    gap: 10,
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
  actionButtonsContainer: {
    justifyContent: "space-between",
    gap: 10,
    flex: 1,
    marginRight: 10,
  },
  actionButton: {
    backgroundColor: "#E0F7FA",
    padding: 10,
    borderRadius: 5,
  },
  actionButtonText: {
    color: "#00A3B4",
    textAlign: "center",
    fontSize: 16,
  },
  scoreButtonsContainer: {
    flex: 2,
  },
  scoreEntryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  scorePanel: {
    width: "40%",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  scoreSection: {
    marginBottom: 30,
  },
  nextTarget: {
    fontSize: 16,
    color: "#00A3B4",
    marginBottom: 10,
  },
  mainScore: {
    marginBottom: 20,
  },
  scoreNumber: {
    fontSize: 40,
    color: "#00A3B4",
    fontWeight: "600",
  },
  scoreSlash: {
    fontSize: 40,
    color: "#333",
  },
  maxScore: {
    fontSize: 40,
    color: "#333",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    marginBottom: 15,
  },
  statLabel: {
    color: "#666",
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    color: "#00A3B4",
    fontWeight: "500",
  },
  controlsSection: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 20,
  },
  cameraControls: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#00A2B4",
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  controlLabel: {
    width: "30%",
    color: "#666",
    marginBottom: 10,
  },
  controlValue: {
    width: "70%",
    color: "#333",
    marginBottom: 10,
  },
  pauseButton: {
    backgroundColor: "#00A3B4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 50,
    marginBottom: 10,
  },
  pauseButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 29,
    fontWeight: "500",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },

  stopGameButton: {
    backgroundColor: '#00A3B4',
    padding: 16,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  stopGameButtonSlider: {
    position: 'absolute',
    left: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
});
