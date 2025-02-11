import React, { useState, createContext, ReactNode } from 'react';
import NavBar from '../../components/NavBar';
import TabNavigator from 'components/TabNavigator';

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
  const [players, setPlayers] = useState<Array<{ id: number; name: string; battingStyle: string; isOut: boolean }>>([]);
  const [activeTab, setActiveTab] = useState('');

  return (
    <MatchInfoProvider>
      <React.Fragment>
        <NavBar />
        <TabNavigator
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          players={players}
          setPlayers={setPlayers}
          target={0}
          setTarget={function (target: number): void {
            throw new Error('Function not implemented.');
          }}
          overs={0}
        />
      </React.Fragment>
    </MatchInfoProvider>
  );
};

export default App;
