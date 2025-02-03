import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import PlayerInfoScreen from './PlayerInfoScreen';
import MatchInfoScreen from './MatchInfoScreen';
import MatchDetailsScreen from './MatchDetailsScreen';
import SideBarComponent from '../../components/SideBarComponent';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("1"); // Default to "MATCH DETAILS"
  const [players, setPlayers] = useState([{ id: 1, name: '', battingStyle: '' }]); // Lifted state

  const handleTabSelect = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <NavBar />
      <View style={styles.container}>
        <SideBarComponent activeTab={activeTab} onTabSelect={handleTabSelect} />
        <View style={styles.tabContent}>
          {activeTab === "1" && <PlayerInfoScreen setActiveTab={setActiveTab} players={players} setPlayers={setPlayers} />}
          {activeTab === "2" && <MatchInfoScreen setActiveTab={setActiveTab} navigation={{ navigate: (screen: string) => screen === 'MatchDetailsScreen' && setActiveTab("3") }} />}
          {activeTab === "3" && <MatchDetailsScreen players={players} />} {/* Pass players here */}
        </View>
      </View>
    </React.Fragment>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    margin: 100,
  },
  tabContent: {
    flex: 1, // This will allow the tab content to take the remaining space
  },
});
