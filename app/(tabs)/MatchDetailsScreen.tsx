import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert } from "react-native"
import Icon from "react-native-vector-icons/AntDesign"
import HeaderComponent from "../../components/HeaderComponent"
import { PanGestureHandler, type PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import CameraControlModal from "components/CameraControlModal"

interface MatchDetailsScreenProps {
  players: Array<{ id: number; name: string; battingStyle: string }>
  target: number
  overs: number
}

export default function MatchDetailsScreen({ players, target, overs }: MatchDetailsScreenProps) {
  const [iconPosition, setIconPosition] = useState(0)
  const [isAutoMode, setIsAutoMode] = useState(true)
  const [score, setScore] = useState(0)
  const [extras, setExtras] = useState(0); // New state variable for extras
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)

  const [balls, setBalls] = useState<string[]>(["", "", "", "", "", ""])
  const [playerOnStrike, setPlayerOnStrike] = useState<number | null>(null)
  const [disputes, setDisputes] = useState(Array(players.length).fill(3))
  const [isCameraControlVisible, setIsCameraControlVisible] = useState(false)

  const renderBall = (value: string | number, active = false) => (
    <View style={[styles.ball, active && styles.activeBall]}>
      <Text style={[styles.ballText, active && styles.activeBallText]}>{value}</Text>
    </View>
  )

  const renderScoreButton = (value: string, rowIndex: number) => (
    <TouchableOpacity
      style={[styles.scoreButton, rowIndex === 0 ? styles.scoreButtonRed : rowIndex === 1 ? styles.scoreButtonGreen : styles.scoreButtonBlue]}
      onPress={() => {
        setScore((prevScore) => prevScore + Number.parseInt(value))
        setBalls((prevBalls) => {
          const newBalls = [...prevBalls]
          const nextIndex = prevBalls.findIndex((ball) => ball === "")
          if (nextIndex !== -1) {
            newBalls[nextIndex] = value
          }
          return newBalls
        })
      }}
    >
      <Text style={styles.scoreButtonText}>{value}</Text>
    </TouchableOpacity>
  )

  const handleDispute = (index: number) => {
    if (disputes[index] > 0) {
      const newDisputes = [...disputes]
      newDisputes[index] -= 1
      console.log("Current Disputes: ", newDisputes);

      setDisputes(newDisputes)
      if (newDisputes[index] === 0) {
        console.log("You're out of disputes");
        Alert.alert("You're out of disputes")
      }
    }
  }

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    setIconPosition(event.nativeEvent.translationX)
    if (event.nativeEvent.translationX >= 100) {
      console.log("game stopped")
    }
  }

  const totalBalls = overs * 6
  const ballsPlayed = balls.filter((ball) => ball !== "" && ball !== "NB" && ball !== "+1").length
  const strikeRate = ballsPlayed > 0 ? ((score / ballsPlayed) * 100).toFixed(2) : "0.00"
  const oversRemaining = overs * 6 - ballsPlayed
  const requiredRunRate = oversRemaining > 0 ? ((target - score) / oversRemaining).toFixed(2) : "N/A"

  const handleActionButtonPress = (action: string) => {
    switch (action) {
      case "Out":
        setPlayerOnStrike(null); // End player's turn
        setScore(0); // Reset score for the next player
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length); // Switch to the next player

        break;
      case "No Ball":
      case "Wide":
        setScore((prevScore) => prevScore + 1); // Increment score by 1
        setExtras((prevExtras) => prevExtras + 1); // Increment extras
        // Do not increment ballsPlayed for No Ball and Wide
        setBalls((prevBalls) => {
          const newBalls = [...prevBalls]
          const nextIndex = prevBalls.findIndex((ball) => ball === "")
          if (nextIndex !== -1) {
            newBalls[nextIndex] = action === "No Ball" ? "NB" : "+1"
          }
          return newBalls
        });
        break;
      case "No Runs":
        setBalls((prevBalls) => {
          const newBalls = [...prevBalls]
          const nextIndex = prevBalls.findIndex((ball) => ball === "")
          if (nextIndex !== -1) {
            newBalls[nextIndex] = "•"
          }
          return newBalls
        });
        break;
    }
  }

  return (
    <View style={styles.MatchDetailsScreenContainer}>
      <HeaderComponent title="Match Details" />
      <View style={styles.content}>
        <View>
          <View style={styles.scrollContent}>
            {players.map((player, index) => (
              <View key={player.id} style={[styles.playerRow, playerOnStrike === player.id ? [styles.activeRow, styles.glowingEffect] : styles.inactiveRow]}>
                <Text style={styles.playerName}>{player.name}'s</Text>
                <View style={styles.overContainer}>
                  <Text style={styles.overText}>1st{"\n"}Over</Text>
                  {balls.map((ball, index) => renderBall(ball, ball !== "" && playerOnStrike === player.id))}
                </View>
                <View style={styles.disputeBox}>
                  <TouchableOpacity onPress={() => handleDispute(index)}>
                    <Text style={styles.disputeText}>Dispute: {disputes[index]}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
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
              <View style={styles.actionButtonsContainer}>
                <View style={styles.actionButtonRow}>
                  <TouchableOpacity style={styles.actionButton} onPress={() => handleActionButtonPress("Out")}>
                    <Text style={styles.actionButtonText}>Out</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} onPress={() => handleActionButtonPress("No Ball")}>
                    <Text style={styles.actionButtonText}>No Ball</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.actionButtonRow}>
                  <TouchableOpacity style={styles.actionButton} onPress={() => handleActionButtonPress("No Runs")}>
                    <Text style={styles.actionButtonText}>Dot</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} onPress={() => handleActionButtonPress("Wide")}>
                    <Text style={styles.actionButtonText}>Wide</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.scorePanel}>
          <View style={styles.scoreSection}>
            <Text style={styles.nextTarget}>Next Target : {target}</Text>
            <Text style={styles.mainScore}>
              <Text style={styles.scoreNumber}>{score}</Text>
              <Text style={styles.scoreSlash}> / </Text>
              <Text style={styles.maxScore}>{target}</Text>
            </Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Extras</Text>
                <Text style={styles.statValue}>{extras}</Text> {/* Updated to display extras */}
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Balls Left</Text>
                <Text style={styles.statValue}>{Math.max(0, totalBalls - ballsPlayed)}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Req. Rate</Text>
                <Text style={styles.statValue}>{requiredRunRate}/over</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Strike Rate</Text>
                <Text style={styles.statValue}>{strikeRate}</Text>
              </View>
            </View>
          </View>
          <View style={styles.controlsSection}>
            <View style={styles.cameraControls}>
              <TouchableOpacity style={styles.cameraButton} onPress={() => setIsCameraControlVisible(true)}>
                <Icon name="left" size={24} color="#fff" />
              </TouchableOpacity>
              <View style={styles.cameraControlValues}>
                <View style={styles.cameraControlValuesDisplay}>
                  <Text style={styles.controlLabel}>Tilt</Text>
                  <Text style={styles.controlValue}>Short</Text>
                </View>
                <View style={styles.cameraControlValuesDisplay}>
                  <Text style={styles.controlLabel}>Pan</Text>
                  <Text style={styles.controlValue}>Line 1</Text>
                </View>
                <View style={styles.cameraControlValuesDisplay}>
                  <Text style={styles.controlLabel}>Speed</Text>
                  <Text style={styles.controlValue}>80 (km/h)</Text>
                </View>
              </View>
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
        <CameraControlModal isVisible={isCameraControlVisible} onClose={() => setIsCameraControlVisible(false)} />
      </View>
    </View>
  )
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
    overflowY: "auto",
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
  glowingEffect: {
    borderColor: "#FFD700",
    borderWidth: 2,
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  activeRow: {
    borderColor: "#00A3B4",
    borderWidth: 1,
  },
  inactiveRow: {
    opacity: 0.7,
  },
  playerName: {
    fontSize: 24,
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
    fontSize: 24,
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
    fontWeight: 500,
  },
  actionButtonsContainer: {
    marginVertical: 20,
    justifyContent: "space-around",
  },
  actionButton: {
    backgroundColor: "#E0F7FA",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 100,
    width: 200,
    marginLeft: 10,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#00A3B4",
    textAlign: "center",
    fontSize: 23,
  },
  actionButtonRow: {
    flexDirection: "row",
  },
  scoreButtonsContainer: {
    flex: 1,
  },
  scoreEntryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  scorePanel: {
    width: "39%",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  scoreSection: {
    marginBottom: 30,
  },
  nextTarget: {
    fontSize: 21,
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
    marginBottom: 20,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#00A2B4",
  },
  cameraButton: {
    width: 30,
    height: 115,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    backgroundColor: "#00A3B4",
    justifyContent: "center",
  },
  controlLabel: {
    width: "50%",
    color: "#00A3B4",
    fontWeight: 500,
    paddingLeft: 10,
  },
  controlValue: {
    width: "70%",
    color: "#333",
    fontWeight: 600,
    fontSize: 15,
    paddingLeft: 10,
  },
  cameraControlValues: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  cameraControlValuesDisplay: {
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 1,
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
    fontWeight: 500,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  stopGameButton: {
    backgroundColor: "#00A3B4",
    padding: 16,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
  },
  stopGameButtonSlider: {
    position: "absolute",
    left: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },
})
