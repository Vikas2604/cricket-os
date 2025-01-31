import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

export default function MatchDetailsScreen() {
  const [isAutoMode, setIsAutoMode] = useState(true)

  const renderBall = (value: string | number, active = false) => (
    <View style={[styles.ball, active && styles.activeBall]}>
      <Text style={[styles.ballText, active && styles.activeBallText]}>{value}</Text>
    </View>
  )

  const renderScoreButton = (value: string) => (
    <TouchableOpacity
      style={[
        styles.scoreButton,
        value === "2" ? styles.scoreButtonRed : value === "4" ? styles.scoreButtonGreen : styles.scoreButtonBlue,
      ]}
      onPress={() => renderBall(value)}
    >
      <Text style={styles.scoreButtonText}>{value}</Text>
    </TouchableOpacity>
  )

  const handleDispute = () => {
    console.log("Dispute raised")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MATCH DETAILS</Text>

      <View style={styles.content}>
        <ScrollView style={styles.scrollContent}>
          {/* Nikhil's Row */}
          <View style={[styles.playerRow, styles.inactiveRow]}>
            <Text style={styles.playerName}>Nikhil's</Text>
            <View style={styles.overContainer}>
              <Text style={styles.overText}>1st{"\n"}Over</Text>
              {renderBall(6)}
              {renderBall(4)}
              {renderBall(2)}
              {renderBall("•")}
              {renderBall("•")}
              {renderBall(4)}
            </View>
            <View style={styles.disputeBox}>
              <TouchableOpacity onPress={handleDispute}>
                <Text style={styles.disputeText}>Dispute: 3</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sahil's Row */}
          <View style={[styles.playerRow, styles.activeRow]}>
            <Text style={styles.playerName}>Sahil's</Text>
            <View style={styles.overContainer}>
              <Text style={styles.overText}>1st{"\n"}Over</Text>
              {renderBall(6, true)}
              {renderBall(4, true)}
              {renderBall(2, true)}
              {renderBall("•", true)}
              {renderBall("•", true)}
            </View>
            <View style={styles.disputeBox}>
              <TouchableOpacity onPress={handleDispute}>
                <Text style={styles.disputeText}>Dispute: 3</Text>
              </TouchableOpacity>
            </View>
          </View>

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
                  {renderScoreButton("2")}
                  {renderScoreButton("2")}
                  {renderScoreButton("2")}
                </View>
                <View style={styles.scoreButtonRow}>
                  {renderScoreButton("4")}
                  {renderScoreButton("4")}
                  {renderScoreButton("4")}
                </View>
                <View style={styles.scoreButtonRow}>
                  {renderScoreButton("6")}
                  {renderScoreButton("6")}
                  {renderScoreButton("6")}
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
            <Text style={styles.nextTarget}>Next Target : 60</Text>
            <Text style={styles.mainScore}>
              <Text style={styles.scoreNumber}>12</Text>
              <Text style={styles.scoreSlash}> / </Text>
              <Text style={styles.maxScore}>20</Text>
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
              <Icon name="pause" size={24} color="#fff" />
              <Text style={styles.pauseButtonText}>Pause</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.slideButton}>
              <Text style={styles.slideButtonText}>Slide to Stop</Text>
              <Icon name="chevron-right" size={24} color="#00A3B4" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#00A3B4",
    color: "#fff",
    padding: 16,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
  },
  autoManualSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
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
    width: "25%",
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
    fontWeight: "bold",
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
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  pauseButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
  },
  slideButton: {
    backgroundColor: "#E0F7FA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
  },
  slideButtonText: {
    color: "#00A3B4",
    marginRight: 8,
  },
})

