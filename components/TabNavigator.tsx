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

const setPlayerOnStrike = (id: number | null) => { };

const TabNavigator: React.FC<TabNavigatorProps> = ({ activeTab, setActiveTab, players, setPlayers, target, setTarget, overs }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabContent}>
        {activeTab === "3" && <MatchDetailsScreen players={players} target={target} overs={overs} route={{ params: { overs: 0 } }} />}
        {activeTab === "2" && <MatchInfoScreen setActiveTab={setActiveTab} navigation={{ navigate: (screen: string) => screen === 'MatchDetailsScreen' && setActiveTab("3") }} setTarget={setTarget} playerOnStrike={null} setPlayerOnStrike={setPlayerOnStrike} />}

        {activeTab === "1" && <PlayerInfoScreen setActiveTab={setActiveTab} players={players} setPlayers={setPlayers} />}
      </View>
      <View style={styles.sideBarContainer}>
        {activeTab === "1" && (
          <>
            <SideBar number={1} label="PLAYER INFO" style={styles.playerInfo} color="#0091A1" activeTab={activeTab} onTabSelect={setActiveTab} />
            <View>
              <SideBar number={3} label="MATCH DETAILS" style={styles.matchDetails} color="#02626C" activeTab={activeTab} onTabSelect={setActiveTab} />
              <SideBar number={2} label="MATCH INFO" style={styles.matchInfo} color="#00808F" activeTab={activeTab} onTabSelect={setActiveTab} />
            </View>
          </>
        )}
        {activeTab === "2" && (
          <>
            <SideBar number={2} label="MATCH INFO" style={styles.matchInfo2} color="#00808F" activeTab={activeTab} onTabSelect={setActiveTab} />

            <SideBar number={1} label="PLAYER INFO" style={styles.playerInfo2} color="#0091A1" activeTab={activeTab} onTabSelect={setActiveTab} />
            <View>
              <SideBar number={3} label="MATCH DETAILS" style={styles.matchDetails2} color="#02626C" activeTab={activeTab} onTabSelect={setActiveTab} />
            </View>
          </>
        )}
        {activeTab === "3" && (
          <>
            <SideBar number={3} label="MATCH DETAILS" style={styles.matchDetails3} color="#02626C" activeTab={activeTab} onTabSelect={setActiveTab} />
            <SideBar number={2} label="MATCH INFO" style={styles.matchInfo3} color="#00808F" activeTab={activeTab} onTabSelect={setActiveTab} />
            <SideBar number={1} label="PLAYER INFO" style={styles.playerInfo3} color="#0091A1" activeTab={activeTab} onTabSelect={setActiveTab} />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  sideBarContainer: {
    flexDirection: 'row',
  },
  tabContent: {
    width: 1700,
    height: 920,
    flex: 1,
    marginTop: 62,
    marginLeft: 80,
  },
  playerInfo: {
    right: 1690,
    top: 62,
  },
  matchInfo: {
    position: "absolute",
    right: 80,
    top: 62
  },
  matchDetails: {
    position: 'absolute',
    top: 62,
    right: 10,
  },
  playerInfo2: {
    position: 'absolute',
    right: 1690,
    top: 62,
  },
  matchInfo2: {
    right: 1620,
    top: 62
  },
  matchDetails2: {
    position: 'absolute',
    top: 62,
    right: 75,
  },
  matchDetails3: {
    right: 1405,
    top: 62,
  },
  matchInfo3: {
    right: 1620,
    top: 62,
  },
  playerInfo3: {
    position: 'absolute',
    right: 1690,
    top: 62,
  },
});

export default TabNavigator;
