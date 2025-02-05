import React from 'react';
import { View, StyleSheet } from 'react-native';
import SideBarComponent from './SideBarComponent';
import PlayerInfoScreen from '../app/(tabs)/PlayerInfoScreen';
import MatchInfoScreen from '../app/(tabs)/MatchInfoScreen';
import MatchDetailsScreen from '../app/(tabs)/MatchDetailsScreen';

interface TabNavigatorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  players: Array<{ id: number; name: string; battingStyle: string }>;
  setPlayers: (players: Array<{ id: number; name: string; battingStyle: string }>) => void;
  target: number;
  setTarget: (target: number) => void;
  overs: number;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({ activeTab, setActiveTab, players, setPlayers, target, setTarget, overs }) => {
  return (
    <View style={styles.container}>
      <SideBarComponent activeTab={activeTab} onTabSelect={setActiveTab} />
      <View style={styles.tabContent}>
        {activeTab === "1" && <PlayerInfoScreen setActiveTab={setActiveTab} players={players} setPlayers={setPlayers} />}
        {activeTab === "2" && <MatchInfoScreen setActiveTab={setActiveTab} navigation={{ navigate: (screen: string) => screen === 'MatchDetailsScreen' && setActiveTab("3") }} setTarget={setTarget} playerOnStrike={null} setPlayerOnStrike={function (id: number | null): void {
          throw new Error('Function not implemented.');
        }} />}
        {activeTab === "3" && <MatchDetailsScreen players={players} target={target} overs={overs} />}
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
});

export default TabNavigator;
