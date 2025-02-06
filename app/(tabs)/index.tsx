import { View, StyleSheet } from 'react-native';
import React, { useState, createContext, ReactNode } from 'react';
import NavBar from '../../components/NavBar';
import TabNavigator from '../../components/TabNavigator';

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
  const [overs] = useState(0); // Added overs state


  return (
    <MatchInfoProvider>
      <React.Fragment>
        <NavBar />
        <TabNavigator
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          players={players}
          setPlayers={setPlayers}
          target={target}
          setTarget={setTarget}
          overs={overs}
        />

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
    flex: 1,
  },
});
