import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import NavBar from '@/components/NavBar';
import PlayerInfoScreen from './PlayerInfoScreen';
import MatchInfoScreen from './MatchInfoScreen';
import MatchDetailsScreen from './MatchDetailsScreen';

const App = () => {

  return (
    <React.Fragment>
      <NavBar />
      <MatchDetailsScreen />
      {/* <MatchInfoScreen /> */}
      {/* <PlayerInfoScreen /> */}
    </React.Fragment>
  );
};

export default App;

const styles = StyleSheet.create({

})