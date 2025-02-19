import React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native"
import Icon from "react-native-vector-icons/AntDesign"

interface CameraControlModalProps {
  isVisible: boolean
  onClose: () => void
  selectedSpeed: number // New prop for selected speed
  onSpeedChange: (newSpeed: number) => void // New prop for speed change callback
}

export default function CameraControlModal({ isVisible, onClose, selectedSpeed, onSpeedChange }: CameraControlModalProps) {
  const [tilt, setTilt] = useState("Short")
  const [pan, setPan] = useState("Line 1")

  const handleSpeedChange = (newSpeed: number) => {
    if (newSpeed >= 70 && newSpeed <= 90) {
      onSpeedChange(newSpeed) // Call the callback to update speed in MatchDetailsScreen
    }
  }

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon style={styles.closeButtonX} name="close" size={32} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.controlsContainer}>
            {/* Tilt & Pan Controls */}
            <View style={styles.tiltPanSection}>
              <Text style={[styles.sectionTitle, styles.sectionTitlePan]}>Tilt & Pan</Text>
              <View style={styles.tiltPanControls}>
                {/* Top P Button */}
                <TouchableOpacity>
                  <Icon name="caretup" size={100} color="#00A3B4" />
                  <Text style={[styles.buttonText, styles.topButtonText]}>P</Text>
                </TouchableOpacity>
                <View style={styles.verticalLine} />
                <View style={styles.verticalLine1} />
                <View style={styles.verticalLine2} />
                <View style={styles.verticalLine3} />
                <View style={styles.verticalLine4} />

                {/* Middle Row */}
                <View style={styles.middleRow}>
                  <TouchableOpacity style={[styles.leftButton]}>
                    <Icon name="caretup" size={100} color="#00A3B4" />
                    <Text style={[styles.buttonText, styles.topButtonText, styles.leftButtonText]}>T</Text>
                  </TouchableOpacity>
                  <View style={styles.horizontalLine} />
                  <View style={styles.horizontalLine1} />
                  <View style={styles.horizontalLine2} />
                  <View style={styles.horizontalLine3} />
                  <View style={styles.horizontalLine4} />

                  <View style={styles.centerPoint} />
                  <TouchableOpacity style={[styles.rightButton]}>
                    <Icon name="caretup" size={100} color="#00A3B4" />
                    <Text style={[styles.buttonText, styles.topButtonText, styles.rightButtonText]}>T</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.horizontalcenterPoint} />
                {/* Bottom P Button */}
                <TouchableOpacity style={[styles.bottomButton]}>
                  <Icon name="caretup" size={100} color="#00A3B4" />
                  <Text style={[styles.buttonText, styles.topButtonText, styles.bottomButtonText]}>P</Text>
                </TouchableOpacity>

                <Text style={styles.positionText}>{tilt}</Text>
                <Text style={styles.lineText}>{pan}</Text>
              </View>
            </View>

            {/* Speed Controls */}
            <View style={styles.speedSection}>
              <Text style={[styles.sectionTitle, styles.sectionTitleSpeed]}>Speed</Text>
              <View style={styles.speedControls}>
                <TouchableOpacity style={styles.speedButton} onPress={() => handleSpeedChange(selectedSpeed - 5)}>
                  <Icon name="caretup" size={80} color="#00A3B4" />
                </TouchableOpacity>

                <View style={styles.speedScale}>
                  {[70, 75, 80, 85, 90].map((value) => (
                    <View key={value} style={styles.speedMark}>
                      <Text style={[styles.speedValue, selectedSpeed === value && styles.activeSpeedValue]}>{value}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity style={styles.speedButton} onPress={() => handleSpeedChange(selectedSpeed + 5)}>
                  <Icon name="caretdown" size={80} color="#00A3B4" />
                </TouchableOpacity>

                <Text style={styles.speedUnit}>(km/h)</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 7,
    padding: 10,
    width: 1000,
    height: 583,
  },
  closeButton: {
    position: "absolute",
    top: 6,
    left: 9,
    zIndex: 1,
    backgroundColor: '#444444',
    color: '#FFFFFF',
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  closeButtonX: {
    position: 'absolute',
    top: 3,
    left: 5
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: 700,
  },
  sectionTitlePan: {
    marginTop: -100,
    // marginBottom: 100,
    marginLeft: 100,
  },
  sectionTitleSpeed: {
    marginLeft: 200,
  },
  tiltPanSection: {
    flex: 1,
    top: 100,
    left: 106,
  },
  tiltPanControls: {
    // marginLeft:-70,
    // alignItems: "center",
    width: 450,
    height: 450,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: 700,
  },
  middleRow: {
    // flexDirection: "row",
    // width: 450,
    // height: 150,
    // justifyContent: "space-between",
  },
  centerPoint: {
    position: 'absolute',
    left: 215,
    top: 29,
    width: 21,
    height: 21,
    borderRadius: 21,
    backgroundColor: "#00A3B4",
  },
  horizontalcenterPoint: {
    position: 'absolute',
    top: 224,
    left: 131,
    width: 21,
    height: 21,
    backgroundColor: "#00A3B4",
    borderRadius: 21,
  },
  topButtonText: {
    position: 'absolute',
    top: 25,
    left: 40,
    fontSize: 32,
    fontWeight: 700,
  },
  rightButtonText: {
    top: 55,
    left: 60,
    transform: [{ rotate: "270deg" }],
  },
  leftButtonText: {
    top: 55,
    left: 60,
    transform: [{ rotate: "90deg" }],
  },
  bottomButtonText: {
    top: 55,
    left: 60,
    transform: [{ rotate: "180deg" }],
  },
  bottomButton: {
    transform: [{ rotate: "180deg" }],
  },
  positionText: {
    fontSize: 28,
    fontWeight: 700,
    color: "#333",
  },
  lineText: {
    left: 275,
    bottom: "62%",
    fontSize: 28,
    fontWeight: 700,
    color: "#333",
  },
  speedSection: {
    flex: 1,
  },
  speedControls: {
    alignItems: "center",
  },
  speedScale: {
    justifyContent: "space-between",
  },
  speedMark: {
    flexDirection: "row",
    alignItems: "center",
  },
  speedValue: {
    width: 130,
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 28,
    padding: 10,
    color: "#666",
  },
  activeSpeedValue: {
    color: "#000000",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    fontWeight: 600,
    fontSize: 32,
  },
  speedButton: {
    // padding: 10,
  },
  speedUnit: {
    position: 'absolute',
    top: 200,
    right: 50,
    color: "#666",
    fontSize: 36,
    fontWeight: 600,
  },
  leftButton: {
    transform: [{ rotate: "-90deg" }],
  },
  rightButton: {
    transform: [{ rotate: "90deg" }],
  },
  verticalLine: {
    position: 'absolute',
    top: 120,
    borderWidth: 1,
    width: 1,
    height: 217,
    opacity: 0.2,
  },
  verticalLine1: {
    position: 'absolute',
    top: 220,
    left: 138,
    borderWidth: 1,
    width: 1,
    height: 29,
    borderColor: '#000000',
    opacity: 0.2,
  },
  verticalLine2: {
    position: 'absolute',
    top: 220,
    left: 178,
    borderWidth: 1,
    width: 1,
    height: 29,
    borderColor: '#000000',
    opacity: 0.2,
  },
  verticalLine3: {
    position: 'absolute',
    top: 220,
    left: 268,
    borderWidth: 1,
    width: 1,
    height: 29,
    borderColor: '#000000',
    opacity: 0.2,
  },
  verticalLine4: {
    position: 'absolute',
    top: 220,
    left: 298,
    borderWidth: 1,
    width: 1,
    height: 29,
    borderColor: '#000000',
    opacity: 0.2,
  },
  horizontalLine: {
    position: 'absolute',
    bottom: -40,
    left: 220,
    transform: [{ rotate: "90deg" }],
    borderWidth: 1,
    width: 1,
    height: 217,
    borderColor: '#000000',
    opacity: 0.2,
  },
  horizontalLine1: {
    position: 'absolute',
    bottom: 135,
    left: 222,
    transform: [{ rotate: "90deg" }],
    borderWidth: 1,
    width: 1,
    height: 29,
    borderColor: '#000000',
    opacity: 0.2,
  },
  horizontalLine2: {
    position: 'absolute',
    top: 25,
    left: 222,
    transform: [{ rotate: "90deg" }],
    borderWidth: 1,
    width: 1,
    height: 29,
    borderColor: '#000000',
    opacity: 0.2,
  },
  horizontalLine3: {
    position: 'absolute',
    bottom: 12,
    left: 222,
    transform: [{ rotate: "90deg" }],
    borderWidth: 1,
    width: 1,
    height: 29,
    borderColor: '#000000',
    opacity: 0.2,
  },
  horizontalLine4: {
    position: 'absolute',
    bottom: -20,
    left: 222,
    transform: [{ rotate: "90deg" }],
    borderWidth: 1,
    width: 1,
    height: 29,
    borderColor: '#000000',
    opacity: 0.2,
  },
})
