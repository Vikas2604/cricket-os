import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SideBar from './SideBar';
import PlayerInfoScreen from '../app/(tabs)/PlayerInfoScreen';
import MatchInfoScreen from '../app/(tabs)/MatchInfoScreen';
import MatchDetailsScreen from '../app/(tabs)/MatchDetailsScreen';

interface TabNavigatorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  players: Array<{ id: number; name: string; battingStyle: string; isOut: boolean }>;
  setPlayers: (players: Array<{ id: number; name: string; battingStyle: string; isOut: boolean }>) => void;
  target: number;
  setTarget: (target: number) => void;
  overs: number;
}



const setPlayerOnStrike = (id: number | null) => {

};
const TabNavigator: React.FC<TabNavigatorProps> = ({ activeTab, setActiveTab, players, setPlayers, target, setTarget, overs }) => {
  const sideBarData = [
    { number: 3, label: "MATCH DETAILS", style: styles.matchDetails, color: "#02626C" },
    { number: 2, label: "MATCH INFO", style: styles.matchInfo, color: "#00808F" },
    { number: 1, label: "PLAYER INFO", style: styles.playerInfo, color: "#0091A1" },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.tabContent}>
        {activeTab === "1" && <PlayerInfoScreen setActiveTab={setActiveTab} players={players} setPlayers={setPlayers} />}
        {activeTab === "2" && <MatchInfoScreen setActiveTab={setActiveTab} navigation={{ navigate: (screen: string) => screen === 'MatchDetailsScreen' && setActiveTab("3") }} setTarget={setTarget} playerOnStrike={null} setPlayerOnStrike={setPlayerOnStrike} />}
        {activeTab === "3" && <MatchDetailsScreen players={players} target={target} overs={overs} route={{
          params: {
            overs: 0
          }
        }} />}
      </View>
      <View style={styles.sideBarContainer}>
        {sideBarData.map((data) => (
          <SideBar
            key={data.number}
            number={data.number}
            label={data.label}
            style={data.style}
            color={data.color}
            activeTab={activeTab}
            onTabSelect={setActiveTab}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    // borderWidth: 1,
    // margin: 50,
  },
  sideBarContainer: {

  },
  tabContent: {
    width: 1426,
    height: 920,
    flex: 1,
    marginTop: 62,
    marginLeft: 171,
    borderWidth: 1,

    // margin: 100,
  },
  playerInfo: {
    // position: 'absolute',
    top: 62,
    right: 1670,
  },
  matchInfo: {
    position: "absolute",
    right: 1600,
    top: 62,
  },
  matchDetails: {
    position: "absolute",
    right: 75,
    top: 62,
  },
});

export default TabNavigator;
