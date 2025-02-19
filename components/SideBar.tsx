import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, ClipPath, Defs, Rect, Text } from "react-native-svg";

interface SideBarProps {
  number: number;
  label: string;
  style: object;
  color: string;
  activeTab: string;
  onTabSelect: (tab: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ number, label, style, color}) => {
  return (
    <View>
      <View style={[styles.sidebarContainer, style]}>
        <Svg width="150" height="920" style={styles.svg}>
          <Defs>
            <ClipPath id="clipPath">
              <Path d="M 0,0 L 70,0 L 100,40 L 100,200 L 50,275 L 50,620 L 0,620 Z" />
            </ClipPath>
          </Defs>

          {/* Clipped Rectangle with dynamic color */}
          <Rect width="100" height="620" fill={color} clipPath="url(#clipPath)" />

          {/* Number Text */}
          <Text x="57" y="155" fontSize="70" fontWeight="500" fill="white" textAnchor="start">
            {number}
          </Text>

          {/* Rotated Label Text */}
          <Text x="185" y="517" fontSize="20" fontWeight="600" fill="white" transform="rotate(-90, 95, 580)">
            {label}
          </Text>
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    fontFamily: 'Inter',
  },
  sidebarContainer: {},
  svg: {},
  playerInfo: {
  },
  matchInfo: {
  },
  matchDetails: {
  },
});

export default SideBar;
