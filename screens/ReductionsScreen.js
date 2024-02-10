import React from 'react';
import { StyleSheet, View } from 'react-native';
//Composants
import Header from '../components/shared/Header';

export default function ReductionScreen() {
  return (
    <View>
      <Header title='Reductions'/>
    </View>
  );
}

const styles = StyleSheet.create({
  //Header
  header: {
    width: '100%',
    height: 100,

    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    top: 0,
  },
});
