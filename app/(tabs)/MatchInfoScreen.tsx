import React, { useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Switch, TextInput, Image } from "react-native"
import { Picker } from "@react-native-picker/picker"
import Icon from "react-native-vector-icons/AntDesign"
import HeaderComponent from "../../components/HeaderComponent"


interface MatchInfoProps {
  setActiveTab: (tab: string) => void
  navigation: any
  setTarget: (target: number) => void
  playerOnStrike: number | null
  setPlayerOnStrike: (id: number | null) => void
}

export default function MatchInfoScreen({
  setActiveTab,
  navigation,
  setTarget,
  playerOnStrike,
  setPlayerOnStrike,
}: MatchInfoProps) {
  const [category, setCategory] = useState("adults")
  const [difficulty, setDifficulty] = useState("Beginner")
  const [overs, setOvers] = useState(1)
  const [isAutoSelection, setIsAutoSelection] = useState(true)
  const [selectedBowlers, setSelectedBowlers] = useState<number[]>([])
  const [target, setTargetState] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("adults");
  const players: never[] = [];

  const bowlers =
    category === "kids"
      ? [
        {
          id: 1,
          name: "PANDA",
          image: "https://www.figma.com/file/NbSw89Q7fCsjf0DRYeaO35/image/324363d5a8b5e3bd3a5cae0a1718d06b0bd4aa37"
        },
        {
          id: 2,
          name: "SANTA",
          image: "https://www.figma.com/file/NbSw89Q7fCsjf0DRYeaO35/image/9f6d45e156a2182ff04d2da79acc0626acdb8037"
        },
      ]
      : [
        {
          id: 1,
          name: "Aswin",
          image: "https://www.figma.com/file/NbSw89Q7fCsjf0DRYeaO35/image/06d7eb42bc32e31670510c58a73c382f45d5a835"
        },
        {
          id: 2,
          name: "Ishant",
          image: "https://www.figma.com/file/NbSw89Q7fCsjf0DRYeaO35/image/3633d9a3a51b7c2952b662aff20c36e7cbe25ec9"
        },
        {
          id: 3,
          name: "Deepak",
          image: "https://www.figma.com/file/NbSw89Q7fCsjf0DRYeaO35/image/32b66c9d4a3bb662f0c29b884693b649b19754ea"
        },
        {
          id: 4,
          name: "Shakib",
          image: "https://www.figma.com/file/NbSw89Q7fCsjf0DRYeaO35/image/91a8d13b22e18bfda83e874482f206e2adde113a"
        },
      ]

  return (
    <View style={styles.matchInfoScreenContainer}>
      <HeaderComponent title="Match Info" />
      <View>
        <View style={styles.matchInfoScreenEntity}>
          <View style={styles.row}>
            <View style={styles.column}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Choose your Category</Text>
                <View style={styles.radioGroup}>
                  <TouchableOpacity
                    style={[styles.radio, selectedCategory === "adults" && styles.radioSelected]}
                    onPress={() => {
                      setCategory("adults");
                      setSelectedCategory("adults");
                    }}>
                    {selectedCategory === "adults" && <View style={styles.insideRadioButton}></View>}
                  </TouchableOpacity>
                  <Text style={styles.radioButtonText}>Adults</Text>

                  <TouchableOpacity
                    style={[styles.radio, selectedCategory === "kids" && styles.radioSelected]}
                    onPress={() => {
                      setCategory("kids");
                      setSelectedCategory("kids");
                    }}>
                    {selectedCategory === "kids" && <View style={styles.insideRadioButton}></View>}
                  </TouchableOpacity>
                  <Text style={styles.radioButtonText}>Kids</Text>
                </View>
              </View>
            </View>

            <View style={styles.column}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Choose Game Difficulty</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={difficulty}
                    onValueChange={(value) => setDifficulty(value)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Backyard" value="Backyard" />
                    <Picker.Item label="Beginner" value="Beginner" />
                    <Picker.Item label="Intermediate" value="Intermediate" />
                    <Picker.Item label="Expert" value="Expert" />
                  </Picker>
                </View>
                <Text style={styles.pickerDifficultyText}>Game Difficulty</Text>
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Select No. of Overs</Text>
                <View style={styles.oversSelector}>
                  <TouchableOpacity style={styles.oversButton} onPress={() => setOvers(Math.max(1, overs - 1))}>
                    <Text style={styles.oversButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.oversCount}>{overs}</Text>
                  <TouchableOpacity style={styles.oversButton} onPress={() => setOvers(overs + 1)}>
                    <Text style={styles.oversButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Bowler Selection Type</Text>
                <View style={styles.toggleContainer}>
                  <Text style={styles.toggleText}>Auto</Text>
                  <Switch
                    value={isAutoSelection}
                    style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }} onValueChange={setIsAutoSelection}
                    trackColor={{ false: "rgba(0, 162, 180, 0.5)", true: "rgba(0, 162, 180, 0.5)" }}
                    thumbColor={isAutoSelection ? "rgb(0, 162, 180)" : "rgb(0, 162, 180)"}
                  />
                  <Text style={styles.toggleText}>Manual</Text>
                </View>
              </View>
            </View>

            <View style={styles.column}>
              <View style={styles.section}>
                <View style={styles.scoreContainer}>
                  <View style={styles.scoreBox}>
                    <Text style={styles.scoreLabel}>Target</Text>
                    <TextInput
                      style={styles.targetInput}
                      value={target.toString()}
                      onChangeText={(value) => {
                        const newTarget = Number(value);
                        setTarget(newTarget);
                        setTargetState(newTarget);
                      }}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.scoreBox}>
                    <Text style={styles.scoreLabel}>Balls</Text>
                    <Text style={styles.overInput}>{overs * 6}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Select Bowlers</Text>
                <View style={styles.bowlersGrid}>
                  {bowlers.map((bowler) => (
                    <TouchableOpacity
                      key={bowler.id}
                      style={styles.bowlerCard}
                      onPress={() => {
                        setSelectedBowlers((prev) =>
                          prev.includes(bowler.id) ? prev.filter((id) => id !== bowler.id) : [...prev, bowler.id],
                        )
                      }}
                    >
                      <Image source={{ uri: bowler.image }} style={styles.bowlerImage} />
                      {selectedBowlers.includes(bowler.id) && (
                        <View style={styles.checkCircleBackground}>
                          <Icon name="checkcircleo" size={55} color="green" />
                        </View>
                      )}
                      <Text style={[styles.bowlerName, selectedBowlers.includes(bowler.id) && styles.bowlerNameSelected]}>
                        {bowler.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
            <View style={styles.verticalLine}>
            </View >
            <View style={styles.column}>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.goBackButton} onPress={() => setActiveTab("1")}>
                  <Icon style={styles.backGameButtonSlider} name="arrowleft" color="#FFFFFF" size={45} />
                  <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.startGameButton}
                  onPress={() => {
                    console.log("Overs being passed:", overs)
                    navigation.navigate("MatchDetailsScreen", { overs, target, players });
                  }}
                >
                  <Icon style={styles.startGameButtonSlider} name="rightcircle" color="#FFFFFF" size={45} />
                  <Text style={styles.buttonText}>Start Game</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  matchInfoScreenContainer: {
    flex: 1,
    fontFamily: 'Poppins',
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    width: 1070,
  },
  matchInfoScreenEntity: {
    width: 930,
    marginTop: 50,
    marginLeft: 160,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
  },
  section: {
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#2D3748",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center',
    gap: 16,
    marginLeft: 10,
    marginTop: 14
  },
  radio: {
    padding: 10,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: 'rgba(158, 150, 150, .6)',
    width: 19,
    height: 19,
    alignItems: "center",
    justifyContent: 'center',
  },
  insideRadioButton: {
    height: 15,
    width: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00A3B4',
    backgroundColor: '#00A3B4'
  },
  radioButtonText: {
    fontSize: 13,
  },
  radioSelected: {
    backgroundColor: "#FFFFFF",
    borderColor: '#00A3B4'
  },
  pickerContainer: {
    backgroundColor: '#F7F7F7',
    borderWidth: 2.5,
    borderRadius: 5,
    borderColor: "#00A2B4",
    overflow: "hidden",
    width: 236,
  },
  pickerDifficultyText: {
    position: 'absolute',
    left: 25,
    bottom: 65,
    paddingLeft: 2,
    paddingRight: 5,
    fontSize: 13,
    fontWeight: 600,
    color: '#00A2B4',
    backgroundColor: '#F7F7F7'
  },
  picker: {
    height: 56,
    width: 236,
    backgroundColor: '#F7F7F7',
    textAlign: 'center',
    fontSize: 6,
    paddingLeft: 2
  },
  oversSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    gap: 10,
  },
  oversButton: {
    backgroundColor: "#00A3B4",
    width: 50,
    height: 50,
    alignItems: "center",
  },
  oversButtonText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: 600,
  },
  oversCount: {
    fontSize: 22,
    fontWeight: 400,
    borderWidth: 1.5,
    borderColor: 'rgba(158, 150, 150, .5)',
    width: 60,
    height: 50,
    textAlign: "center",
    paddingTop: 7,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: 'center',
    justifyContent: "flex-start",
    gap: 6,
    marginLeft: 10,
    marginTop: 14,
  },
  toggleText: {
    fontSize: 16,
    color: "#000000",
  },
  scoreContainer: {
    flexDirection: "row",
    gap: 40,
    marginTop: 8,
    marginLeft:10,
  },
  scoreBox: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    textAlign: 'center',
    height: 120,
    width: 236,
    position: "relative",
    right: 164,
  },
  scoreLabel: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 700,
    color: "#FFFFFF",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: "#00A2B4",
    padding: 5,
  },
  targetInput: {
    textAlign: "center",
    fontSize: 55,
    fontWeight: 700,
    color: "#2D3748",
    padding: 'auto',
    alignItems: 'center',
  },
  overInput: {
    textAlign: "center",
    fontSize: 55,
    fontWeight: 700,
    color: "#2D3748",
    height: 85,
    padding: 'auto',
    alignItems: 'center',
  },
  bowlersGrid: {
    flexDirection: "row",
    width: 120,
    height: 80,
  },
  bowlerCard: {
    width: '100%',
    alignItems: "flex-start",
    gap: 1,
  },
  bowlerImage: {
    width: 82,
    height: 82,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#00A2B4",
  },
  checkCircleBackground: {
    position: "absolute",
    top: 1,
    left: 0,
    right: 37,
    bottom: 0,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 100,
  },
  bowlerName: {
    width: 82,
    padding: 4,
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: 1.5,
    color: "#FFFFFF",
    backgroundColor: "#00A2B4",
    textAlign: 'center',
    borderRadius: 9,
  },
  bowlerNameSelected: {
    color: "#FFFFFF",
  },
  actionButtons: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-end",
    width: 298,
    gap: 10,
    marginLeft: 120,
    marginBottom: -30,
  },
  goBackButton: {
    backgroundColor: "#00A3B4",
    padding: 16,
    borderRadius: 50,
    alignItems: "center",
    height: 64,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
  startGameButton: {
    backgroundColor: "#00A3B4",
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    height: 64,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
  backGameButtonSlider: {
    position: "absolute",
    left: 50,
    top: 10,
  },
  startGameButtonSlider: {
    position: "absolute",
    left: 7,
    top: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  verticalLine: {
    position: 'absolute',
    borderLeftWidth: 3,
    height: 150,
    right: 400,
    top: 30,
  },
})