import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, ClipPath, Defs, Rect, Text } from "react-native-svg";

interface SideBarProps {
  number: number;
  label: string;
  style: object;
  color: string;
}

const SideBar: React.FC<SideBarProps> = ({ number, label, style, color }) => {
  return (
    <View style={[styles.sidebarContainer, style]}>
      <Svg width="150" height="907" style={styles.svg}>
        <Defs>
          <ClipPath id="clipPath">
            <Path d="M 0,0 L 130,0 L 149,20 L 149,250 L 74.5,350 L 74.5,907 L 0,907 L 0,0 Z" />
          </ClipPath>
        </Defs>

        {/* Clipped Rectangle with dynamic color */}
        <Rect width="150" height="907" fill={color} clipPath="url(#clipPath)" />

        {/* Number Text */}
        <Text x="85" y="170" fontSize="90" fontWeight="500" fill="white" textAnchor="start">
          {number}
        </Text>

        {/* Rotated Label Text */}
        <Text x="85" y="534" fontSize="24" fontWeight="600" fill="white" transform="rotate(-90, 95, 580)">
          {label}
        </Text>
      </Svg>
    </View>
  );
};

const App = () => {
  const sideBarData = [
    { number: 3, label: "MATCH DETAILS", style: styles.matchDetails, color: "#02626C" },
    { number: 2, label: "MATCH INFO", style: styles.matchInfo, color: "#00808F" },
    { number: 1, label: "PLAYER INFO", style: styles.playerInfo, color: "#0091A1" },
  ];
  return (
    <View style={styles.container}>
      {sideBarData.map((data, index) => (
        <SideBar key={index} number={data.number} label={data.label} style={data.style} color={data.color} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 62,
    marginLeft: 93,
  },
  sidebarContainer: {},
  svg: {},
  playerInfo: {},
  matchInfo: {
    position: "absolute",
    left: 70,
  },
  matchDetails: {
    position: "absolute",
    left: 140,
  },
});

export default App;
