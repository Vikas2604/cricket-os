import React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native"
import Icon from "react-native-vector-icons/AntDesign"

interface CameraControlModalProps {
  isVisible: boolean
  onClose: () => void
}

export default function CameraControlModal({ isVisible, onClose }: CameraControlModalProps) {
  const [tilt, setTilt] = useState("Short")
  const [pan, setPan] = useState("Line 1")
  const [speed, setSpeed] = useState(80)

  const handleSpeedChange = (newSpeed: number) => {
    if (newSpeed >= 70 && newSpeed <= 90) {
      setSpeed(newSpeed)
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
              <Text style={styles.sectionTitle}>Tilt & Pan</Text>
              <View style={styles.tiltPanControls}>
                {/* Top P Button */}
                <TouchableOpacity style={[styles.controlButton, styles.topButton]}>
                  <Text style={styles.buttonText}>P</Text>
                </TouchableOpacity>

                {/* Middle Row */}
                <View style={styles.middleRow}>
                  <TouchableOpacity style={[styles.controlButton, styles.leftButton]}>
                    <Text style={styles.buttonText}>T</Text>
                  </TouchableOpacity>
                  <View style={styles.centerPoint} />
                  <TouchableOpacity style={[styles.controlButton, styles.rightButton]}>
                    <Text style={styles.buttonText}>T</Text>
                  </TouchableOpacity>
                </View>

                {/* Bottom P Button */}
                <TouchableOpacity style={[styles.controlButton, styles.bottomButton]}>
                  <Text style={styles.buttonText}>P</Text>
                </TouchableOpacity>

                <Text style={styles.positionText}>{tilt}</Text>
                <Text style={styles.lineText}>{pan}</Text>
              </View>
            </View>

            {/* Speed Controls */}
            <View style={styles.speedSection}>
              <Text style={styles.sectionTitle}>Speed</Text>
              <View style={styles.speedControls}>
                <TouchableOpacity style={styles.speedButton} onPress={() => handleSpeedChange(speed + 5)}>
                  <Icon name="caretup" size={20} color="#00A3B4" />
                </TouchableOpacity>

                <View style={styles.speedScale}>
                  {[90, 85, 80, 75, 70].map((value) => (
                    <View key={value} style={styles.speedMark}>
                      <Text style={[styles.speedValue, speed === value && styles.activeSpeedValue]}>{value}</Text>
                      <View style={[styles.speedLine, speed === value && styles.activeSpeedLine]} />
                    </View>
                  ))}
                </View>

                <TouchableOpacity style={styles.speedButton} onPress={() => handleSpeedChange(speed - 5)}>
                  <Icon name="caretdown" size={20} color="#00A3B4" />
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
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 7,
    padding: 20,
    width: 1375,
    height: 883,
  },
  closeButton: {
    position: "absolute",
    top: 6,
    left: 9,
    zIndex: 1,
    backgroundColor: '#444444',
    color: '#FFFFFF',
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  closeButtonX: {
    position: 'absolute',
    top: 7,
    left: 9
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  tiltPanSection: {
    flex: 1,
    marginRight: 20,
  },
  tiltPanControls: {
    alignItems: "center",
    position: "relative",
  },
  controlButton: {
    width: 50,
    height: 50,
    backgroundColor: "#00A3B4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  middleRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  centerPoint: {
    width: 10,
    height: 10,
    backgroundColor: "#00A3B4",
    borderRadius: 5,
  },
  topButton: {
    transform: [{ rotate: "180deg" }],
  },
  bottomButton: {
    marginTop: 20,
  },
  positionText: {
    marginTop: 10,
    fontSize: 18,
    color: "#333",
  },
  lineText: {
    position: "absolute",
    right: 0,
    top: "50%",
    fontSize: 18,
    color: "#333",
  },
  speedSection: {
    flex: 1,
    marginLeft: 20,
  },
  speedControls: {
    alignItems: "center",
  },
  speedScale: {
    height: 200,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  speedMark: {
    flexDirection: "row",
    alignItems: "center",
  },
  speedValue: {
    width: 30,
    textAlign: "right",
    marginRight: 10,
    color: "#666",
  },
  activeSpeedValue: {
    color: "#00A3B4",
    fontWeight: "bold",
  },
  speedLine: {
    width: 20,
    height: 2,
    backgroundColor: "#666",
  },
  activeSpeedLine: {
    backgroundColor: "#00A3B4",
    height: 3,
  },
  speedButton: {
    padding: 10,
  },
  speedUnit: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
  leftButton: {
    transform: [{ rotate: "-90deg" }],
  },
  rightButton: {
    transform: [{ rotate: "90deg" }],
  },
})

