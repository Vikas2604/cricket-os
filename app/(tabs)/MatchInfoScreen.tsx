import { useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Switch, TextInput, Image } from "react-native"
import { Picker } from "@react-native-picker/picker"
import Icon from "react-native-vector-icons/AntDesign"
import HeaderComponent from "../../components/HeaderComponent"
import React from "react"

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
  const [overs, setOvers] = useState(0)
  const [isAutoSelection, setIsAutoSelection] = useState(true)
  const [selectedBowlers, setSelectedBowlers] = useState<number[]>([])
  const [target, setTargetState] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("adults") // Updated state variable
  const players: never[] = [];

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
                  <Text style={styles.pickerDifficultyText}> Game Difficulty</Text>

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
                    <Text style={styles.targetInput}>{overs * 6}</Text>
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
            <View style={styles.verticalLine}></View>
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
    backgroundColor: "#fff",
    fontFamily: 'Poppins',

  },
  matchInfoScreenEntity: {
    marginTop: 100,
    marginLeft: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    // marginTop: 20,
  },
  section: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,

  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
    color: "#2D3748",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center',
    gap: 16,
    marginLeft: 10,
    marginTop: 24
  },
  radio: {
    padding: 10,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: 'rgba(158, 150, 150, .6)',
    width: 29,
    height: 29,
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
    fontSize: 23,
  },
  radioSelected: {
    backgroundColor: "#FFFFFF",
    borderColor: '#00A3B4'
  },
  pickerContainer: {
    overflow: "hidden",
    width: 356,
    paddingTop: 20
  },
  pickerDifficultyText: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    left: 10,
    bottom: 50,
    paddingLeft: 4,
    paddingRight: 5,
    fontSize: 23,
    fontWeight: 600,
    color: '#00A2B4'
  },
  picker: {
    height: 66,
    width: 356,
    borderColor: "#00A3B4",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingLeft: 14,
    fontSize: 21
  },
  oversSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
    gap: 11.5,
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
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
    marginLeft: 20,
    marginTop: 24,
  },
  toggleText: {
    fontSize: 22,
    color: "#000000",
  },
  scoreContainer: {
    flexDirection: "row",
    gap: 101,
    marginTop: 8,
  },
  scoreBox: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    textAlign: 'center',
    height: 150,
    width: 355,
    position: "relative",
    right: 254,
  },
  scoreLabel: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 700,
    color: "#FFFFFF",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: "#00A2B4",
    height: 45,
    padding: 5,
  },
  oversCount: {
    fontSize: 22,
    fontWeight: 400,
    borderWidth: 1.5,
    borderColor: 'rgba(158, 150, 150, .5)',
    width: 100,
    height: 70,
    alignContent: "center",
    textAlign: "center",
  },
  targetInput: {
    textAlign: "center",
    fontSize: 55,
    fontWeight: 700,
    color: "#2D3748",
    height: 105,
    padding: 'auto',
    alignItems: 'center',
  },
  bowlersGrid: {
    flexDirection: "row",
    width: 200,
    height: 150,
    gap: -10,
  },
  bowlerCard: {
    width: '100%',
    alignItems: "flex-start",
  },
  bowlerImage: {
    width: 112,
    height: 112,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#00A2B4",
  },
  checkCircleBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 30,
  },
  bowlerName: {
    width: 120,
    height: 36,
    fontSize: 26,
    fontWeight: 500,
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
    width: 398,
    gap: 10,
    marginLeft: 110,
    textAlign: 'center',
    marginBottom: 20,
  },
  goBackButton: {
    backgroundColor: "#00A3B4",
    padding: 16,
    borderRadius: 50,
    alignItems: "center",
    height: 84,
  },
  startGameButton: {
    backgroundColor: "#00A3B4",
    paddingTop: 23,
    paddingBottom: 23,
    borderRadius: 50,
    alignItems: 'center',
    height: 84,
  },
  backGameButtonSlider: {
    position: "absolute",
    left: 80,
  },
  startGameButtonSlider: {
    position: "absolute",
    left: 10,
    top: 17,
  },
  buttonText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },
  verticalLine: {
    borderLeftWidth: 3,
    height: 270,
    marginTop: 30,
    marginLeft: 140,
  },
})