import { StyleSheet } from 'react-native';
import React from 'react';
import NavBar from '@/components/NavBar';
import PageInfro from '@/components/PageInfro';
import VectorComponent from '@/components/VectorComponent';


const App = () => {

  return (
    <React.Fragment>
      <NavBar />
      <PageInfro />
      <VectorComponent />
    </React.Fragment>
  );
};

export default App;

const styles = StyleSheet.create({

})