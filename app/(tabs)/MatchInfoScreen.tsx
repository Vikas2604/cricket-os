import { useState } from "react"
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

export default function MatchInfo({
  setActiveTab,
  navigation,
  setTarget,
  playerOnStrike,
  setPlayerOnStrike,
}: MatchInfoProps) {
  const [category, setCategory] = useState("adults")
  const [difficulty, setDifficulty] = useState("Beginner")
  const [overs, setOvers] = useState(0)
  const [isAutoSelection, setIsAutoSelection] = useState(true)
  const [selectedBowlers, setSelectedBowlers] = useState<number[]>([])
  const [target, setTargetState] = useState(0)

  const bowlers =
    category === "kids"
      ? [
        {
          id: 1,
          name: "PANDA",
          image:
            "https://s3-alpha-sig.figma.com/img/3243/63d5/a8b5e3bd3a5cae0a1718d06b0bd4aa37?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Bb4jQpFn9NG7bU~Eg9e4YM48bB1HNTv-42-m19I-z3N0SZys84XGJqTLmY2QlOMnTUYyEaZo~UOE-WE75ojtnhxX~XuNQrhjNlHAQtylar-gkB5YPRFmBZdSvNjxKPbAYVzBZ34LR22l7xUrdWTmjT95Mgfh-JGOnDxQVG~Qik-2QjSXcxH8o3CLvywjw5KYwQLwooh092Lk4D37gXL9vOY4j4pG11xdXZDI-CWUMFkVHEeTGOdTvw~jfNzHng8Afl5XvBAYha8K9NQvT5DfeLPpViFN~W9SBBQLt-Y3tKUtVZgij~NDx0UHHLNhgo5wOGkUOuSnMInhsF-1c77KlQ__",
        },
        {
          id: 2,
          name: "SANTA",
          image:
            "https://s3-alpha-sig.figma.com/img/9f6d/45e1/56a2182ff04d2da79acc0626acdb8037?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VJBQ8ERbeAzIBFQLlogADj9~V9CeDZrpSZWX8WFVtRVeHJhN-A5IEb6hF5a5mNoldnHHd9k~8XqRJI7SjDumDPVt5XC4yirjYTUmjxj79Yv6H-oASsmoq7TQKUDDyoW5lJfttBLl-GsR2sRp66mfHzkihXJrrPGXsSbYVPRq7ItVkkbW6~jC7aEg9sHDA25x-JSZ2TuCLSiN38E79Rv9gX79tQJQi~8xH3LQZDXnxEItonM60b6HsrqK2dGR~dydMzUez1C824NmIewri1R3Sy91twEYWM0kUXuL0EIFWLhuYELlLSOUA19ijXOTxqk~GIu158mxnamtW5qsPg0NTg__",
        },
      ]
      : [
        {
          id: 1,
          name: "Aswin",
          image:
            "https://s3-alpha-sig.figma.com/img/06d7/eb42/bc32e31670510c58a73c382f45d5a835?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lc-O2XW0sdVb23dMj-fkJJX1SLbU1Ef13VL1HxEDRNlLDG8dQp~isc~czXqxSb3NnJ2JH83VAxNvpzrN-TqFdIy~jlGVXfrIHE2FY0Im-YdjIdeq962sFpw46LQFtBDi4RCL8icaXzRVeHd7zQbk9ZE9ILc0kyHEU6spN2fn8r7jyDpj45N5E5ma74CU4SRbBqPRfhTS8XjLF0Z26IxferSx3F~X4YR1VEkNHHNB3Ul-E3JkkkHqHqGws5uV8L86sSpqKbUNe3ADsKOG4LO52lXSwCXJw~Qq~U0512OA4ZcffQbqA099mKDGRnRt1fZ63xE43bxoPorAhMPQl8pDhA__",
        },
        {
          id: 2,
          name: "Ishant",
          image:
            "https://s3-alpha-sig.figma.com/img/3633/d9a3/a51b7c2952b662aff20c36e7cbe25ec9?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KolY9EJbHeBPQkjgodFBb6mwl2JEpiN2RtXt0HNv90XBgxDDfebz--bFtYhdbW-8AqUN2greDUSh3JgJAYrEu4eTvj5LbUtsR07qIJTYC3yU4TL~nKz9MjvNYsKF~-5kZEKNn~zU48~1sTX8O7DkGLtw1yq79W47FCK1NeC0Vee3H0F2eRUiP5Kz1hkcx36R8cM9JLMHRmw9-5nCh85NBC4BpOvRaptjSP0y4WLQFyHEAIB3Mn5oIbx0leHG9glUanbH6iBMxmjhlP34qojCLlzGR9qqS7lb5LTqKhbz82c8btbQKLv9GbyHDdrEtTh8hLzs3Qm90a8W5aYGT-7Gyg__",
        },
        {
          id: 3,
          name: "Deepak",
          image:
            "https://s3-alpha-sig.figma.com/img/32b6/6c9d/4a3bb662f0c29b884693b649b19754ea?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=R1mrotDNNqkdQ977ACjr4wy9rNQ0V3EycD~QnSVIzsqwYSxgLqNYmdD6wIMTnZ0LXlz9LV~U~SaQCHRz6URrwcBgaN51ks-P-4MaTLvSCos5gcZ~bYwMWOnREa1iKzeAvr17Ha9OJ0Wyg9onxV6zkdIbxzDSERuWx63ZgRONmkmTyhY4BYHh3PTkbfcurx5o5EpLrYso4EmqFJoN7ubd~NvK-sz~NHAwJGufr0FrQxkqfkKaCSxTnQuBsw9MLSfH-bXNLc2-s-87hh6HEtYIPjs2vH1YgrxXZ2D97TDeW09ev3WTsCVPA5lo9jFWvI9PqM8OKUjer4vtAH-nE4Irfg__",
        },
        {
          id: 4,
          name: "Shakib",
          image:
            "https://s3-alpha-sig.figma.com/img/91a8/d13b/22e18bfda83e874482f206e2adde113a?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HDo2xGEVwGyCA1lv0-3OLt8ujANaSTO7DF5n6G4~fisI8gJ1NOEeezVcen3pNoetwWIZ11Jc-nIWwMCxxdTBpUunUl~4neWmjac-LgnNcb3qIYgK388YJNpUENxR7Hvhfpg2Lzg7-8ooQtdN9YzwKL205PjGLWUpsyzPPFcsoOXrj9FT6Q0U19mdmpSr3-PkR-ZMZgeq2115w1WhtzjzJ1GoG18PpF3JE1JbPgbAV71jf9Ln9cVPkaKEUWJrQNmVq9H83SUyXLSM32QBAGDiLVH2wkb9AeOMMyG68d-vHogNexa4lqtctc3t0bJC7sfe7mYWoJbbnhvxa0l-c3QatQ__",
        },
      ]

  return (
    <View style={styles.matchInfoScreenContainer}>
      <HeaderComponent title="Match Info" />
      <View>
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Choose your Category</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={[styles.radio, category === "adults" && styles.radioSelected]}
                  onPress={() => setCategory("adults")}
                >
                  <Text style={[styles.radioText, category === "adults" && styles.radioTextSelected]}>Adults</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.radio, category === "kids" && styles.radioSelected]}
                  onPress={() => setCategory("kids")}
                >
                  <Text style={[styles.radioText, category === "kids" && styles.radioTextSelected]}>Kids</Text>
                </TouchableOpacity>
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
                  onValueChange={setIsAutoSelection}
                  trackColor={{ false: "#767577", true: "#00A3B4" }}
                  thumbColor={isAutoSelection ? "#fff" : "#f4f3f4"}
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
                      const newTarget = Number(value)
                      setTarget(newTarget)
                      setTargetState(newTarget)
                      setTarget(newTarget)
                    }}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.scoreBox}>
                  <Text style={styles.scoreLabel}>Balls</Text>
                  <Text style={styles.scoreValue}>{overs * 6}</Text>
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
                        <Icon name="checkcircleo" size={35} color="green" />
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

          <View style={styles.column}>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.goBackButton} onPress={() => setActiveTab("1")}>
                <Icon style={styles.startGameButtonSlider} name="arrowleft" color="#FFFFFF" size={45} />
                <Text style={styles.buttonText}>Go Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.startGameButton}
                onPress={() => {
                  console.log("Overs being passed:", overs)
                  navigation.navigate("MatchDetailsScreen", { overs: overs })
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
  )
}

const styles = StyleSheet.create({
  matchInfoScreenContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginTop: 20,
  },
  section: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
    color: "#2D3748",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 5,
  },
  radio: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#00A3B4",
    width: 100,
    alignItems: "center",
  },
  radioSelected: {
    backgroundColor: "#00A3B4",
  },
  radioText: {
    color: "#00A3B4",
  },
  radioTextSelected: {
    color: "#FFFFFF",
  },
  pickerContainer: {
    overflow: "hidden",
    width: 200,
  },
  picker: {
    height: 50,
    width: 150,
    borderColor: "#00A3B4",
    borderWidth: 1,
    borderRadius: 8,
  },
  oversSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  oversButton: {
    backgroundColor: "#00A3B4",
    width: 70,
    height: 70,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  oversButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scoreBox: {
    borderWidth: 1,
    borderColor: "#00A3B4",
    borderRadius: 8,
    height: 150,
    width: "45%",
  },
  scoreLabel: {
    textAlign: "center",
    fontSize: 24,
    color: "#FFFFFF",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: "#00A2B4",
    padding: 8,
  },
  scoreValue: {
    textAlign: "center",
    fontSize: 55,
    fontWeight: "700",
    color: "#2D3748",
  },
  oversCount: {
    fontSize: 22,
    fontWeight: 400,
    borderWidth: 1,
    width: 100,
    height: 70,
    alignContent: "center",
    textAlign: "center",
  },
  targetInput: {
    textAlign: "center",
    fontSize: 55,
    fontWeight: "700",
    color: "#2D3748",
    height: 150,
  },
  bowlersGrid: {
    flexDirection: "row",
    width: 150,
    gap: 10,
  },
  bowlerCard: {
    width: "80%",
    alignItems: "center",
  },
  bowlerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: "#00A2B4",
  },
  checkCircleBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 35,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 30,
  },
  bowlerName: {
    fontSize: 26,
    fontWeight: "500",
    color: "#FFFFFF",
    backgroundColor: "#00A2B4",
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
  bowlerNameSelected: {
    color: "#FFFFFF",
  },
  actionButtons: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-end",
    width: 398,
    gap: 10,
    marginTop: 100,
    marginLeft: 100,
  },
  goBackButton: {
    backgroundColor: "#00A3B4",
    padding: 16,
    borderRadius: 50,
    alignItems: "center",
  },
  startGameButton: {
    backgroundColor: "#00A3B4",
    padding: 16,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
  },
  startGameButtonSlider: {
    position: "absolute",
    left: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
  },
  toggleText: {
    fontSize: 22,
    color: "#000000",
  },
})

