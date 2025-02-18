import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert } from "react-native"
import Icon from "react-native-vector-icons/AntDesign"
import HeaderComponent from "../../components/HeaderComponent"
import { PanGestureHandler, type PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import CameraControlModal from "components/CameraControlModal";
import React from "react"

interface MatchDetailsScreenProps {
  players: Array<{ id: number; name: string; battingStyle: string; isOut: boolean }>;
  target: number;
  overs: number;
  route: { params: { overs: number } };
}

interface CompletedOver {
  player: string
  score: number
  balls: string[]
  overNumber: number
}

const getOrdinalSuffix = (number: number) => {
  const suffixes = ["th", "st", "nd", "rd"]
  const value = number % 100
  return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]
}

const PlayerRow = ({
  playerName,
  balls,
  overNumber,
  isOut,
}: { playerName: string; balls: string[]; overNumber: number; isOut: boolean }) => (
  <View style={[styles.playerRow, isOut && styles.disabledRow]}>
    <Text style={styles.playerName}>
      {playerName}'s {overNumber}{getOrdinalSuffix(overNumber)} Over:
    </Text>
    <View style={styles.overContainer}>
      {balls.map((ball, index) => (
        <View key={index} style={styles.ball}>
          <Text style={styles.ballText}>{ball}</Text>
        </View>
      ))}
    </View>
  </View>
)

export default function MatchDetailsScreen({ players, target, overs }: MatchDetailsScreenProps) {
  const [selectedSpeed, setSelectedSpeed] = useState<number>(80); // Default speed value

  if (typeof target !== 'number' || typeof overs !== 'number') {
    Alert.alert("Error", "Target and overs must be valid numbers.");
    return null;
  }
  const [iconPosition, setIconPosition] = useState(0);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [score, setScore] = useState(0);
  const [extras, setExtras] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [playerOvers, setPlayerOvers] = useState(Array(players.length).fill(0));
  const [ballsFaced, setBallsFaced] = useState(Array(players.length).fill(0));
  const [completedOvers, setCompletedOvers] = useState<CompletedOver[]>([]);
  const [balls, setBalls] = useState<string[]>(["", "", "", "", "", ""]);
  const [playerOnStrike, setPlayerOnStrike] = useState<number | null>(null);
  const [disputes, setDisputes] = useState(Array(players.length).fill(3));
  const [isCameraControlVisible, setIsCameraControlVisible] = useState(false);
  const [outPlayers, setOutPlayers] = useState<Array<number>>([]);

  useEffect(() => {
    console.log("Overs received:", overs)
    setPlayerOnStrike(players[0].id)
  }, [players, overs])

  const renderBall = (value: string | number, active = false) => (
    <View style={[styles.ball, active && styles.activeBall]}>
      <Text style={[styles.ballText, active && styles.activeBallText]}>{value}</Text>
    </View>
  )

  const renderScoreButton = (value: string, rowIndex: number) => (
    <TouchableOpacity
      style={[
        styles.scoreButton,
        rowIndex === 0 ? styles.scoreButtonRed : rowIndex === 1 ? styles.scoreButtonGreen : styles.scoreButtonBlue,
      ]}
      onPress={() => {
        if (players[currentPlayerIndex].isOut) {
          return
        }
        setScore((prevScore) => {
          const newScore = prevScore + Number.parseInt(value)
          if (newScore > target) {
            console.log(`${players[currentPlayerIndex].name} won!`)
          }
          return newScore
        })
        setBalls((prevBalls) => {
          const newBalls = [...prevBalls]
          const nextIndex = prevBalls.findIndex((ball) => ball === "")
          if (nextIndex !== -1) {
            newBalls[nextIndex] = value
          }
          return newBalls
        })
        setBallsFaced((prevBallsFaced) => {
          const newBallsFaced = [...prevBallsFaced]
          newBallsFaced[currentPlayerIndex] += 1
          return newBallsFaced
        })

        if (ballsFaced[currentPlayerIndex] + 1 > 6) {
          setCompletedOvers((prevCompleted) => [
            ...prevCompleted,
            {
              player: players[currentPlayerIndex].name,
              score: score,
              balls: [...balls],
              overNumber: playerOvers[currentPlayerIndex] + 1,
            },
          ])
          setBalls(["", "", "", "", "", ""])
          setBallsFaced((prevBallsFaced) => {
            const newBallsFaced = [...prevBallsFaced]
            newBallsFaced[currentPlayerIndex] = 0
            setPlayerOvers((prevOvers) => {
              const newOvers = [...prevOvers]
              newOvers[currentPlayerIndex] += 1
              return newOvers
            })
            if (playerOvers[currentPlayerIndex] + 1 >= overs) {
              setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length)
              setPlayerOnStrike(players[(currentPlayerIndex + 1) % players.length].id)
            }
            return newBallsFaced
          })
        }

        const totalBalls = overs * 6
        const ballsPlayed = balls.filter((ball) => ball !== "" && ball !== "NB" && ball !== "+1").length
        console.log(
          `Total Balls: ${totalBalls}, Balls Played: ${ballsPlayed}, Balls Left: ${Math.max(0, totalBalls - ballsPlayed)}`,
        )
      }}
    >
      <Text style={styles.scoreButtonText}>{value}</Text>
    </TouchableOpacity>
  )

  const handleDispute = (index: number) => {
    if (disputes[index] > 0) {
      const newDisputes = [...disputes]
      newDisputes[index] -= 1
      console.log("Current Disputes: ", disputes)

      setDisputes(newDisputes)
      if (newDisputes[index] === 0) {
        console.log("You're out of disputes")
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
  const oversRemaining = (overs * 6) - ballsPlayed
  const requiredRunRate =
    oversRemaining > 0 ? ((target - score) / oversRemaining).toFixed(2) : score >= target ? "0" : "0"

  const handleActionButtonPress = (action: string) => {
    switch (action) {
      case "Out":
        console.log(`${players[currentPlayerIndex].name} got out`)
        players[currentPlayerIndex].isOut = true
        setOutPlayers((prevOutPlayers) => [...prevOutPlayers, players[currentPlayerIndex].id])
        setPlayerOnStrike(players[(currentPlayerIndex + 1) % players.length].id)
        setScore(0)
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length)
        setPlayerOvers((prevOvers) => {
          const newOvers = [...prevOvers]
          newOvers[currentPlayerIndex] += 1
          return newOvers
        })
        break
      case "No Ball":
      case "Wide":
        setScore((prevScore) => prevScore + 1)
        setExtras((prevExtras) => prevExtras + 1)
        setBalls((prevBalls) => {
          const newBalls = [...prevBalls]
          const nextIndex = prevBalls.findIndex((ball) => ball === "")
          if (nextIndex !== -1) {
            newBalls[nextIndex] = action === "No Ball" ? "NB" : "+1"
          }
          return newBalls
        })
        setBalls((prevBalls) => {
          const newBalls = [...prevBalls, ""]
          return newBalls
        })
        break
      case "No Runs":
        setBalls((prevBalls) => {
          const newBalls = [...prevBalls]
          const nextIndex = prevBalls.findIndex((ball) => ball === "")
          if (nextIndex !== -1) {
            newBalls[nextIndex] = "•"
          }
          return newBalls
        })
        break
    }
  }

  return (
    <View style={styles.MatchDetailsScreenContainer}>
      <HeaderComponent title="Match Details" />
      <View style={styles.content}>
        <View>
          <View style={styles.scrollContent}>
            {players.map((player, index) => (
              <View
                key={player.id}
                style={[
                  styles.playerRow,
                  outPlayers.includes(player.id)
                    ? styles.disabledRow
                    : playerOnStrike === player.id
                      ? styles.activeRow
                      : styles.inactiveRow,
                ]}>
                <Text style={styles.playerName}>{player.name}'s</Text>
                <View style={styles.overContainer}>
                  <Text style={styles.overText}>
                    {playerOvers[index] + 1}{getOrdinalSuffix(playerOvers[index] + 1)}
                  </Text><Text style={styles.overTextOver}>Over</Text>
                  {playerOnStrike === player.id &&
                    balls.map((ball, index) => renderBall(ball, ball !== "" && playerOnStrike === player.id))}
                </View>
                <View style={styles.disputeBox}>
                  <TouchableOpacity onPress={() => handleDispute(index)}>
                    <Text style={styles.disputeText}>Dispute: {disputes[index]}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {completedOvers.map((over, index) => (
              <PlayerRow
                key={index}
                playerName={over.player}
                balls={over.balls}
                overNumber={over.overNumber}
                isOut={false}
              />
            ))}
          </View>
          <View style={styles.scoreEntrySection}>
            <View style={styles.autoManualSwitch}>
              <Text style={styles.scoreEntryText}>Score Entry</Text>
              <View style={styles.switchContainer}>
                <Text style={styles.switchContainerText}>Auto</Text>
                <Switch
                  value={isAutoMode}
                  onValueChange={setIsAutoMode}
                  trackColor={{ false: "rgba(0, 162, 180, 0.5)", true: "rgba(0, 162, 180, 0.5)" }}
                />
                <Text style={styles.switchContainerText}>Manual</Text>
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
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleActionButtonPress("Out")}
                    disabled={players[currentPlayerIndex].isOut}>
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
            <View style={styles.mainScore}>
              <Text style={styles.mainScoreText}>Score</Text>
              <View style={styles.mainScoreBoard}>
                <Text style={styles.scoreNumber}>{score}</Text>
                <Text style={styles.scoreSlash}> / </Text>
                <Text style={styles.maxScore}>{target}</Text>
              </View>
            </View>
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
                  <Text style={styles.statValue}>{Math.max(0, totalBalls - ballsPlayed)}</Text>
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
          <View style={styles.controlsSection}>
            <View style={styles.cameraControls}>
              <TouchableOpacity style={styles.cameraButton} onPress={() => setIsCameraControlVisible(true)}>
                <Icon name="left" size={22} color="#fff" />
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
                  <Text style={styles.controlValue}>{selectedSpeed !== null ? selectedSpeed : "N/A"}(km/h)</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.pauseButton}>
              <Icon name="pausecircleo" size={35} color="#fff" />
              <Text style={styles.pauseButtonText}>Pause</Text>
            </TouchableOpacity>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <TouchableOpacity style={styles.stopGameButton}>
                <Icon
                  style={[styles.stopGameButtonSlider, { transform: [{ translateX: iconPosition }] }]}
                  name="rightcircle"
                  color="#FFFFFF"
                  size={35}
                />
                <Text style={styles.buttonText}>Slide to Stop</Text>
              </TouchableOpacity>
            </PanGestureHandler>
          </View>
        </View>
        <CameraControlModal
          isVisible={isCameraControlVisible}
          onClose={() => setIsCameraControlVisible(false)}
          selectedSpeed={selectedSpeed}
          onSpeedChange={setSelectedSpeed} // Pass the speed change callback
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  MatchDetailsScreenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    width: 1030,
    borderWidth: 1,
    marginLeft: 120,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 95,
  },
  scrollContent: {
    flex: 1,
    overflowY: "auto",
    overflow: "scroll",
    marginTop: 10,
    width: 531,
  },
  playerRow: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 11,
    backgroundColor: "#fff",
    elevation: 3,
    borderWidth: 3.43,
  },
  glowingEffect: {
    borderColor: "#00A3B4",
    borderWidth: 3.43,
    elevation: 5,
  },
  activeRow: {
    borderColor: "#00A3B4",
    borderWidth: 3.43,
  },
  inactiveRow: {
    opacity: 0.7,
  },
  disabledRow: {
    backgroundColor: "#f0f0f0",
    opacity: 0.5,
  },
  playerName: {
    fontWeight: 700,
    fontSize: 20,
    marginBottom: 10,
  },
  overContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  overText: {
    backgroundColor: "#333",
    fontWeight: 700,
    fontSize: 24,
    color: "#fff",
    paddingLeft: 26,
    paddingRight: 26,
    textAlign: "center",
    transform: [{ skewX: '20deg' }],
  },
  overTextOver: {
    position: 'absolute',
    top: 40,
    left: 27,
    fontWeight: 700,
    fontSize: 16,
  },
  ball: {
    width: 46,
    height: 46,
    borderRadius: 46,
    borderWidth: 3,
    borderColor: "rgba(0,0,0, 0.4)",
    alignItems: "center",
    marginHorizontal: 5,
  },
  activeBall: {
    borderColor: "rgba(0,0,0, 0.4)",
  },
  ballText: {
    fontSize: 48,
    color: "#666",
  },
  activeBallText: {
    color: "#00A3B4",
    fontSize: 28,
    fontWeight: 600,
  },
  disputeBox: {
    position: 'absolute',
    top: -2,
    right: -3,
    width: 175,
    height: 49,
    textAlign: 'center',
    alignSelf: "flex-end",
  },
  disputeText: {
    color: "#F67676",
    borderWidth: 3,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 24,
    borderColor: "#F67676",
  },
  scoreEntrySection: {
    width: 531,
    height: 240,
    borderTopWidth: 3,
    borderColor: "#ddd",
    // paddingTop: 20,
  },
  autoManualSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreEntryText: {
    fontSize: 28,
    fontWeight: 700
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: 'center',
  },
  switchContainerText: {
    fontWeight: 400,
    fontSize: 16,
  },
  scoreButtonRow: {
    flexDirection: "row",
    gap: 3,
    paddingBottom: 10,
    elevation: 1,
  },
  scoreButton: {
    width: 44,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  scoreButtonRed: {
    backgroundColor: '#F67676',
    borderTopLeftRadius: 33,
    borderBottomLeftRadius: 33,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  scoreButtonGreen: {
    backgroundColor: "#00b894",
    borderRadius: 6,
  },
  scoreButtonBlue: {
    backgroundColor: "#0984e3",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopRightRadius: 33,
    borderBottomRightRadius: 33,
  },
  scoreButtonText: {
    color: "#fff",
    fontSize: 33,
    fontWeight: 500,
  },
  actionButtonsContainer: {
    marginVertical: 60,
    gap: 10,
  },
  actionButton: {
    backgroundColor: "#6ABBC4",
    borderRadius: 33,
    width: 168,
    height: 48,
    textAlign:'center',
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: 500,
    padding:5,
  },
  actionButtonRow: {
    flexDirection: "row",
    gap: 17,
  },
  scoreButtonsContainer: {
    // marginTop:10,
  },
  scoreEntryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  scorePanel: {
    //To not get an error
  },
  scoreSection: {
    width: 280,
    height: 290,
    marginBottom: 10,
    borderWidth: 3,
    borderRadius: 16,
    borderColor: '#00BDD2',
    marginTop: 10,
    marginLeft: 60,
    color: '#00000'
  },
  nextTarget: {
    fontSize: 12,
    fontWeight: 700,
    color: "#FFFFFF",
    width: 130,
    height: 48,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 16,
    textAlign: 'center',
    backgroundColor: '#00A2B4',
    position: 'absolute',
    right: 0,
    borderTopRightRadius: 13,
    borderBottomLeftRadius: 13,
  },
  mainScore: {
    // To not get error
  },
  mainScoreText: {
    top: 10,
    left: 20,
    fontWeight: 700,
    fontSize: 25,
  },
  mainScoreBoard: {
    flexDirection: 'row',
    left:20,
    top:10,
  },
  scoreNumber: {
    fontSize: 65,
    color: "#00A3B4",
    fontWeight: 700,
  },
  scoreSlash: {
    fontSize: 65,
    fontWeight: 700,
    color: "#333",
  },
  maxScore: {
    fontSize: 65,
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
    top: 30,
  },
  statItemGroupBalls: {
    position: 'absolute',
    left: 165,
    top: 30,
  },
  statItemGroupReq: {
    position: 'absolute',
    top: 100,
    left: 21,
  },
  statItemGroupStrRate: {
    position: 'absolute',
    top: 100,
    left: 165,
  },
  statLabel: {
    color: "#00000",
    fontWeight: 500,
    fontSize: 17,
  },
  statValue: {
    fontWeight: 700,
    fontSize: 26,
    color: "#00A3B4",
  },
  controlsSection: {
    left: 47,
  },
  cameraControls: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginBottom: 15,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: "#00A2B4",
    height: 91,
    width: 325,
  },
  cameraButton: {
    width: 22,
    height: 85,
    borderTopLeftRadius:14,
    borderBottomLeftRadius:14,
    backgroundColor: "#00A3B4",
    justifyContent: "center",
  },
  controlLabel: {
    fontSize: 14,
    color: "#00A3B4",
    fontWeight: 500,
    paddingLeft: 15,
  },
  controlValue: {
    color: "#333",
    fontWeight: 600,
    fontSize: 18,
    paddingLeft: 15,
  },
  cameraControlValues: {
    flexDirection: "row",
    // textAlign: 'center',
    // alignItems: 'center',
    flex: 1,
  },
  cameraControlValuesDisplay: {
    alignItems: 'center',
    rowGap: 5,
    padding: 15
  },
  pauseButton: {
    backgroundColor: "#00A3B4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginBottom: 10,
    height: 56,
    width: 261,
    marginLeft: 44,
  },
  pauseButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 19,
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
    height: 56,
    width: 261,
    marginLeft: 44,
  },
  stopGameButtonSlider: {
    elevation: 5,
    position: "absolute",
    bottom: 7.5,
    left: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: 700,
  },
})
