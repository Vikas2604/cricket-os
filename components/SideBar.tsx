import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path, ClipPath, Defs, Rect, Text } from "react-native-svg";

interface SideBarProps {
  number: number;
  label: string;
  style: object;
  color: string;
  activeTab: string;
  onTabSelect: (tab: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ number, label, style, color, activeTab, onTabSelect }) => {
  return (
    <TouchableOpacity onPress={() => onTabSelect(number.toString())}>
      <View style={[styles.sidebarContainer, style]}>
        <Svg width="150" height="920" style={styles.svg}>
          <Defs>
            <ClipPath id="clipPath">
              <Path d="M 0,0 L 110,0 L 149,20 L 149,250 L 74.5,350 L 74.5,920 L 0,920 Z" />
            </ClipPath>
          </Defs>

          {/* Clipped Rectangle with dynamic color */}
          <Rect width="150" height="920" fill={color} clipPath="url(#clipPath)" />

          {/* Arch Path
          <Path
            d="M 110,0 A 75 75 0 0 1 149 20"
            fill={color}
            stroke={color}
            strokeWidth="1"
          /> */}

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
    </TouchableOpacity>
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

export default SideBar;