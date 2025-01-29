import { StyleSheet } from 'react-native';
import React from 'react';
import NavBar from '@/components/NavBar';
import PageInfo from '@/components/PageInfo'
import VectorComponent from '@/components/VectorComponent';

const App = () => {



  return (
    <React.Fragment>
      <NavBar />
      <PageInfo />
      <VectorComponent />
    </React.Fragment>
  );
};

export default App;

const styles = StyleSheet.create({

})