import { StyleSheet, View } from 'react-native';
import React from 'react';
//Icones
import { FontAwesome5 } from '@expo/vector-icons';

export default function Badge(props) {
  return (
    <View>
      <FontAwesome5
        name='award'
        size={props.size}
        color={props.color}
      />
    </View>
  );
}

