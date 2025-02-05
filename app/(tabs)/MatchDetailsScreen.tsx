import { useState, useEffect } from "react"
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

interface CompletedOver {
  player: string;
  score: number;
  balls: string[];
  overNumber: number; // Added to track the over number
}

const getOrdinalSuffix = (number: number) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = number % 100;
  return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
};

const PlayerRow = ({ playerName, balls, overNumber, isOut }: { playerName: string; balls: string[]; overNumber: number; isOut: boolean }) => (
  <View style={[styles.playerRow, isOut && styles.disabledRow]}>
    <Text style={styles.playerName}>{playerName}'s {overNumber}{getOrdinalSuffix(overNumber)} Over:</Text>
    <View style={styles.overContainer}>
      {balls.map((ball, index) => (
        <View key={index} style={styles.ball}>
          <Text style={styles.ballText}>{ball}</Text>
        </View>
      ))}
    </View>
  </View>
);

export default function MatchDetailsScreen({ players, target, overs }: MatchDetailsScreenProps) {
  const [iconPosition, setIconPosition] = useState(0)
  const [isAutoMode, setIsAutoMode] = useState(true)
  const [score, setScore] = useState(0)
  const [extras, setExtras] = useState(0); // New state variable for extras
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [playerOvers, setPlayerOvers] = useState(Array(players.length).fill(0)); // Track overs for each player
  const [ballsFaced, setBallsFaced] = useState(Array(players.length).fill(0)); // Track balls faced by each player
  const [completedOvers, setCompletedOvers] = useState<CompletedOver[]>([]); // Track completed overs
  const [balls, setBalls] = useState<string[]>(["", "", "", "", "", ""])
  const [playerOnStrike, setPlayerOnStrike] = useState<number | null>(null)
  const [disputes, setDisputes] = useState(Array(players.length).fill(3))
  const [isCameraControlVisible, setIsCameraControlVisible] = useState(false)
  const [outPlayers, setOutPlayers] = useState<Array<number>>([]); // Track players who are out

  useEffect(() => {
    setPlayerOnStrike(players[0].id);
  }, [players]);

  const renderBall = (value: string | number, active = false) => (
    <View style={[styles.ball, active && styles.activeBall]}>
      <Text style={[styles.ballText, active && styles.activeBallText]}>{value}</Text>
    </View>
  )

  const renderScoreButton = (value: string, rowIndex: number) => (
    <TouchableOpacity
      style={[styles.scoreButton, rowIndex === 0 ? styles.scoreButtonRed : rowIndex === 1 ? styles.scoreButtonGreen : styles.scoreButtonBlue]}
      onPress={() => {
        if (outPlayers.includes(players[currentPlayerIndex].id)) {
          return; // Prevent scoring if the player is out
        }
        setScore((prevScore) => {
          const newScore = prevScore + Number.parseInt(value);
          if (newScore > target) {
            console.log(`${players[currentPlayerIndex].name} won!`);
          }
          return newScore;
        });
        setBalls((prevBalls) => {
          const newBalls = [...prevBalls]
          const nextIndex = prevBalls.findIndex((ball) => ball === "")
          if (nextIndex !== -1) {
            newBalls[nextIndex] = value
          }
          return newBalls
        })
        setBallsFaced((prevBallsFaced) => {
          const newBallsFaced = [...prevBallsFaced];
          newBallsFaced[currentPlayerIndex] += 1; // Increment balls faced for the current player
          return newBallsFaced;
        });

        // Reset after every over
        if (ballsFaced[currentPlayerIndex] + 1 > 6) {
          setCompletedOvers((prevCompleted) => [
            ...prevCompleted,
            { player: players[currentPlayerIndex].name, score: score, balls: [...balls], overNumber: playerOvers[currentPlayerIndex] + 1 }
          ]);
          setBalls(["", "", "", "", "", ""]); // Reset balls for the next player
          setBallsFaced((prevBallsFaced) => {
            const newBallsFaced = [...prevBallsFaced];
            newBallsFaced[currentPlayerIndex] = 0; // Reset balls faced for the current player
            setPlayerOvers((prevOvers) => {
              const newOvers = [...prevOvers];
              newOvers[currentPlayerIndex] += 1; // Increment the overs for the current player
              return newOvers;
            });
            // Switch to the next player after completing their overs
            if (playerOvers[currentPlayerIndex] + 1 >= overs) {
              setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length); // Switch to the next player
              setPlayerOnStrike(players[(currentPlayerIndex + 1) % players.length].id); // Set the next player on strike
            }
            return newBallsFaced;
          });
        }

        // Debugging logs
        const totalBalls = overs * 6;
        const ballsPlayed = balls.filter((ball) => ball !== "" && ball !== "NB" && ball !== "+1").length;
        console.log(`Total Balls: ${totalBalls}, Balls Played: ${ballsPlayed}, Balls Left: ${Math.max(0, totalBalls - ballsPlayed)}`);
      }}
    >
      <Text style={styles.scoreButtonText}>{value}</Text>
    </TouchableOpacity>
  )

  const handleDispute = (index: number) => {
    if (disputes[index] > 0) {
      const newDisputes = [...disputes]
      newDisputes[index] -= 1
      console.log("Current Disputes: ", disputes);

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
  const oversRemaining = overs * 6 - ballsPlayed;
  const requiredRunRate = oversRemaining > 0
    ? ((target - score) / oversRemaining).toFixed(2)
    : score >= target
      ? "Target Achieved"
      : "N/A";

  const handleActionButtonPress = (action: string) => {
    switch (action) {
      case "Out":
        console.log(`${players[currentPlayerIndex].name} got out`); // Print player out message
        setOutPlayers((prevOutPlayers) => [...prevOutPlayers, players[currentPlayerIndex].id]); // Add player to out list
        setPlayerOnStrike(players[(currentPlayerIndex + 1) % players.length].id); // Set the next player on strike
        setScore(0); // Reset score for the next player
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length); // Switch to the next player
        setPlayerOvers((prevOvers) => {
          const newOvers = [...prevOvers];
          newOvers[currentPlayerIndex] += 1; // Increment the overs for the current player
          return newOvers;
        });
        break;
      case "No Ball":
      case "Wide":
        setScore((prevScore) => prevScore + 1); // Increment score by 1
        setExtras((prevExtras) => prevExtras + 1); // Increment extras
        setBalls((prevBalls) => {
          const newBalls = [...prevBalls]
          const nextIndex = prevBalls.findIndex((ball) => ball === "")
          if (nextIndex !== -1) {
            newBalls[nextIndex] = action === "No Ball" ? "NB" : "+1"
          }
          return newBalls
        });
        // Add a new render ball for extras
        setBalls((prevBalls) => {
          const newBalls = [...prevBalls, ""];
          return newBalls;
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
              <View key={player.id} style={[styles.playerRow, outPlayers.includes(player.id) ? styles.disabledRow : playerOnStrike === player.id ? styles.activeRow : styles.inactiveRow]}>
                <Text style={styles.playerName}>{player.name}'s</Text>
                <View style={styles.overContainer}>
                  <Text style={styles.overText}>{playerOvers[index] + 1}{getOrdinalSuffix(playerOvers[index] + 1)} Over</Text>
                  {playerOnStrike === player.id && balls.map((ball, index) => renderBall(ball, ball !== "" && playerOnStrike === player.id))}
                </View>
                <View style={styles.disputeBox}>
                  <TouchableOpacity onPress={() => handleDispute(index)}>
                    <Text style={styles.disputeText}>Dispute: {disputes[index]}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {completedOvers.map((over, index) => (
              <PlayerRow key={index} playerName={over.player} balls={over.balls} overNumber={over.overNumber} isOut={false} />
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
                <Text style={styles.statValue}>{extras}</Text>
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
    padding: 5,
  },
  playerRow: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 3,
  },
  glowingEffect: {
    borderColor: "#00A3B4",
    borderWidth: 2,
    elevation: 5,
  },
  activeRow: {
    borderColor: "#00A3B4",
    borderWidth: 1,
  },
  inactiveRow: {
    opacity: 0.7,
  },
  disabledRow: {
    backgroundColor: "#f0f0f0",
    opacity: 0.5,
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
    fontWeight: "500",
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
