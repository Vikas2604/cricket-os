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
  const [overs, setOvers] = useState(3)
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
          image: "https://s3-alpha-sig.figma.com/img/3243/63d5/a8b5e3bd3a5cae0a1718d06b0bd4aa37?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Izrn4cOa9SOwfE0EiZsLbCSoTzQzBzfMQgN6FkkcifFP7ckhFSYhKNHJPf1lu0RbhFCYrohSsboWV4T3uIEEt~JXlA4RyXLi9tqGkrlvKvoGfWNlQdaHS664AmQZPMNhhst7AW~sMjbe2naIHzH-mhs2h7IROcCRbpX-Oj~Za1438oAza8yLY~5E4fY9firVjx~vc1haICRG9iaLPlLMmVos2rJlkvT1LD82zjgzRuanybNOGYmFcTH7uNQAqTIV1O~g1aQuEDRB7qwUxNfQebHPmhOq209SJFvpZVOknvIOtVruibzjm1EOFN4ABprpSexJgzfjB9LtbWelBu~2lQ__"
        },
        {
          id: 2,
          name: "SANTA",
          image: "https://s3-alpha-sig.figma.com/img/9f6d/45e1/56a2182ff04d2da79acc0626acdb8037?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MEdnvSJW9FSb3UoustqtxrxGMgk8OA-4X0ELFzEONx8YtMF70whKo2WC3hSYp0RaCPlpz6kw6FpT24SD2IzvwJ6SE0aCSye4WnyqZpTpeSrVPnqnElrw1cx58VipibR4oBJ2h8-8MdHYQwHMNnt77aandCBG-brY4bl6V2~V7pNe4AYdriMR-PoZOoQd6lAD6Esnx90xZG9o2v7i-X3fs-blE5dUwm-4GoYHx--MPDdp6JbsIvLAFdf2e3ue8VYXoIAvqJyCgIZZaNSxNfUjtcZpVPRYfzXMuVozEqGBFGv32T4hN6Q5AuVkzMF61mE7WlFc8WQ0SJznPID-t7NlRA__"
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
          image: "https://s3-alpha-sig.figma.com/img/3633/d9a3/a51b7c2952b662aff20c36e7cbe25ec9?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=LfYI6LdU-B8GUFhO-9vDtlsuumg2rsYJ~N3WLKWpBGHB8EmvV1tYFIsmH8FHATQMN-o3VIFGPMU8oW9pN60Twjzl7PoaMhdmX6-fGCR2AlFe3oWDKu2aCaDbrr~WTke8vNqt8aqNw49Hg4dTIpxVf5S-asmyuDd42f-JB8sYjq0ujLtkHCIP70PEHpVHawd4RcaVw0iJPN1mXUaGODvR9Xm13hPA8WJxpgyhuWGFDipMd~6Xny9bjhqu7g6zs3Hl5Cs37t70KWFxrAETwenV-rj9oa7cKrM0JqvI1S8~q-qB0kflVb27cMoKo2eClrOiF1ByfGv07mqGiYvdNxlIRw__"
        },
        {
          id: 3,
          name: "Deepak",
          image: "https://s3-alpha-sig.figma.com/img/32b6/6c9d/4a3bb662f0c29b884693b649b19754ea?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RQU97dgqdkdkg8IsqOFUEONe7xJC2nRsHm~zRLVg5H1nHlH~xMef6Ovr4mbaG2VxLExdWSJmw2cEV0Hw0-A5mbx8s13ifLt5q0KlUJj2jguxRst7KJyRwDySbVsrbuisj5t2tWlgMbQ~kFk0Conwgoz1rpF5JqW-j~w0J7yOFmtCxAvyq4-mSUc0MwEFXhzmxMUXhksXlMHCSWy4fLuM4Mbn4QqKLcaE1Rp7UDwLGoebPKYh48aeXNp3wPv6Jy6BxtUrgS9BvPXgsMmVY6l9swGmiZ4S3e-NDOgm1Po6MCxWrmmYj1nFNjJeZ785okoC0zljQtOH2l7onkB8SeGoAw__"
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
                  <Icon style={styles.startGameButtonSlider} name="rightcircle" color="#FFFFFF" size={55} />
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
    marginLeft: 160,
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
    borderWidth: 2.5,
    borderRadius: 3.75,
    paddingLeft: 14,
    fontSize: 21.5,
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
    alignItems: "center",
    padding: 10
  },
  oversButtonText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: 600,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: 'center',
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
    gap: 80,
    marginTop: 8,
    marginLeft: 10,
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
  overInput: {
    textAlign: "center",
    fontSize: 55,
    fontWeight: 700,
    color: "#2D3748",
    height: 105,
    padding: 'auto',
    alignItems: 'center',
    paddingTop: 13
  },
  bowlersGrid: {
    flexDirection: "row",
    width: 170,
    height: 150,
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
    right: 90,
    bottom: 40,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 100,
  },
  bowlerName: {
    width: 120,
    height: 37,
    fontSize: 26,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
  startGameButton: {
    backgroundColor: "#00A3B4",
    paddingTop: 23,
    paddingBottom: 23,
    borderRadius: 50,
    alignItems: 'center',
    height: 84,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
  backGameButtonSlider: {
    position: "absolute",
    left: 80,
  },
  startGameButtonSlider: {
    position: "absolute",
    left: 10,
    top: 13,
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