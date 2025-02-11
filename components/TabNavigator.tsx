import React from 'react';
import { View, StyleSheet } from 'react-native';
import SideBar from './SideBar'; // Updated import statement
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

const TabNavigator: React.FC<TabNavigatorProps> = ({ activeTab, setActiveTab, players, setPlayers, target, setTarget, overs }) => {
  const sideBarData = [
    { number: 3, label: "MATCH DETAILS", style: styles.matchDetails, color: "#02626C" },
    { number: 2, label: "MATCH INFO", style: styles.matchInfo, color: "#00808F" },
    { number: 1, label: "PLAYER INFO", style: styles.playerInfo, color: "#0091A1" },
  ];

  return (
    <View style={styles.container}>
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
      <View style={styles.tabContent}>
        {activeTab === "1" && <PlayerInfoScreen setActiveTab={setActiveTab} players={players} setPlayers={setPlayers} />}
        {activeTab === "2" && <MatchInfoScreen setActiveTab={setActiveTab} navigation={{ navigate: (screen: string) => screen === 'MatchDetailsScreen' && setActiveTab("3") }} setTarget={setTarget} playerOnStrike={null} setPlayerOnStrike={function (id: number | null): void {
          throw new Error('Function not implemented.');
        }} />}
        {activeTab === "3" && <MatchDetailsScreen players={players} target={target} overs={overs} route={{
          params: {
            overs: 0
          }
        }} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    margin: 100,
  },
  tabContent: {
    flex: 1,
  },
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

export default TabNavigator;
