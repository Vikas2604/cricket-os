import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import PlayerInfoScreen from './PlayerInfoScreen';
import MatchInfoScreen from './MatchInfoScreen';
import MatchDetailsScreen from './MatchDetailsScreen';
import SideBarComponent from '../../components/SideBarComponent';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("1"); // Default to "MATCH DETAILS"

  const handleTabSelect = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <NavBar />
      <View style={styles.container}>
        <SideBarComponent activeTab={activeTab} onTabSelect={handleTabSelect} />
        <View style={styles.tabContent}>
          {activeTab === "1" && <PlayerInfoScreen setActiveTab={setActiveTab} />}
          {activeTab === "2" && <MatchInfoScreen setActiveTab={setActiveTab} />}
          {activeTab === "3" && <MatchDetailsScreen />}
        </View>
      </View>
    </React.Fragment>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tabContent: {
    flex: 1, // This will allow the tab content to take the remaining space
  },
});
