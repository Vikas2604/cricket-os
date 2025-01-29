import { StyleSheet } from 'react-native';
import React from 'react';
import NavBar from '@/components/NavBar';
import PageInfro from '@/components/PageInfro';
import VectorComponent from '@/components/VectorComponent';
import StartGameButton from '@/components/StartGameButton';

const App = () => {

  return (
    <React.Fragment>
      <NavBar />
      <PageInfro />
      <StartGameButton />
      <VectorComponent />
    </React.Fragment>
  );
};

export default App;

const styles = StyleSheet.create({

})