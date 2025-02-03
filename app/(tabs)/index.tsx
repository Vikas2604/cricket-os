import { View, StyleSheet } from 'react-native';
import React, { useState, createContext, useContext, ReactNode } from 'react';
import NavBar from '../../components/NavBar';
import PlayerInfoScreen from './PlayerInfoScreen';
import MatchInfoScreen from './MatchInfoScreen';
import MatchDetailsScreen from './MatchDetailsScreen';
import SideBarComponent from '../../components/SideBarComponent';

interface MatchInfoContextType {
  category: string;
  setCategory: (category: string) => void;
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  overs: number;
  setOvers: (overs: number) => void;
  isAutoSelection: boolean;
  setIsAutoSelection: (value: boolean) => void;
  selectedBowler: number | null;
  setSelectedBowler: (id: number | null) => void;
  target: number;
  setTarget: (target: number) => void;
}

const MatchInfoContext = createContext<MatchInfoContextType | undefined>(undefined);

export const MatchInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [category, setCategory] = useState('adults');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [overs, setOvers] = useState(0);
  const [isAutoSelection, setIsAutoSelection] = useState(true);
  const [selectedBowler, setSelectedBowler] = useState<number | null>(null);
  const [target, setTarget] = useState(0);

  return (
    <MatchInfoContext.Provider value={{
      category,
      setCategory,
      difficulty,
      setDifficulty,
      overs,
      setOvers,
      isAutoSelection,
      setIsAutoSelection,
      selectedBowler,
      setSelectedBowler,
      target,
      setTarget,
    }}>
      {children}
    </MatchInfoContext.Provider>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("1"); // Default to "MATCH DETAILS"
  const [players, setPlayers] = useState([{ id: 1, name: '', battingStyle: '' }]); // Lifted state
  const [target, setTarget] = useState(0); // Added target state
  const [overs, setOvers] = useState(0); // Added overs state

  const handleTabSelect = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <MatchInfoProvider>
      <React.Fragment>
        <NavBar />
        <View style={styles.container}>
          <SideBarComponent activeTab={activeTab} onTabSelect={handleTabSelect} />
          <View style={styles.tabContent}>
            {activeTab === "1" && <PlayerInfoScreen setActiveTab={setActiveTab} players={players} setPlayers={setPlayers} />}
            {activeTab === "2" && <MatchInfoScreen setActiveTab={setActiveTab} navigation={{ navigate: (screen: string) => screen === 'MatchDetailsScreen' && setActiveTab("3") }} setTarget={setTarget} />} {/* Pass route params */}
            {activeTab === "3" && <MatchDetailsScreen players={players} target={target} />} {/* Pass players and target here */}
          </View>
        </View>
      </React.Fragment>
    </MatchInfoProvider>
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
