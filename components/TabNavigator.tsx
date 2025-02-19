import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SideBar from './SideBar';
import PlayerInfoScreen from '../app/(tabs)/PlayerInfoScreen';
import MatchInfoScreen from '../app/(tabs)/MatchInfoScreen';
import MatchDetailsScreen from '../app/(tabs)/MatchDetailsScreen';

interface TabNavigatorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  players: Array<{ phoneNumber: string; name: string; battingStyle: string; isOut: boolean }>;
  setPlayers: (players: Array<{ phoneNumber: string; name: string; battingStyle: string; isOut: boolean }>) => void;
  target: number;
  setTarget: (target: number) => void;
  overs: number;
}

const setPlayerOnStrike = (phoneNumber: string | null) => {
  // Update the player on strike in the match state
  console.log(`Player on strike set to: ${phoneNumber}`);
};

const { width, height } = Dimensions.get('window');

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
            <SideBar number={1} label="MATCH SETUP" style={styles.playerInfo} color="#0091A1" activeTab={activeTab} onTabSelect={setActiveTab} />
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
    // paddingTop: 20,
  },
  sideBarContainer: {
    flexDirection: 'column',
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  tabContent: {
    flex: 1,
    // marginLeft: width * 0.05,  // Adjust based on screen width
    // marginRight: width * 0.2,  // Adjust based on screen width
  },
  playerInfo: {
    position: 'absolute',
    right: width * 0.883,  // Adjust position relative to screen width
  },
  matchInfo: {
    position: "absolute",
    right: width * 0.035,  // Adjust position relative to screen width
  },
  matchDetails: {
    position: 'absolute',
    right: -10,
  },
  playerInfo2: {
    position: 'absolute',
    top: 20,
    right: width * 0.75,  // Adjust position relative to screen width
  },
  matchInfo2: {
    position: 'absolute',
    top: 20,
    right: width * 0.1,  // Adjust position relative to screen width
  },
  matchDetails2: {
    position: 'absolute',
    right: 0,
    top: 20,
  },
  matchDetails3: {
    position: 'absolute',
    right: width * 0.12,  // Adjust position relative to screen width
    top: 20,
  },
  matchInfo3: {
    position: 'absolute',
    right: width * 0.1,  // Adjust position relative to screen width
    top: 20,
  },
  playerInfo3: {
    position: 'absolute',
    right: width * 0.15,  // Adjust position relative to screen width
    top: 20,
  },
});

export default TabNavigator;
