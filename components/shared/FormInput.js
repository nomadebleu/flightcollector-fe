import React from 'react';
import { View, Text, TextInput,StyleSheet } from 'react-native';

export default function FormInput(props) {

  return (
    <View style={styles.container}>
      <View style={styles.containerLabel}>
      <Text style={[styles.label,props.titleStyle]}>{props.label}</Text>
      </View>
      <TextInput
        style={[styles.input,props.formStyle]}
        value={props.value}
        onChangeText={(value) => props.onChangeText(props.name, value)}
        editable={props.editable} // Rend le champ non modifiable
        placeholder={props.placeholder ? props.placeholder : ''}//Conditionne la possibilité d'avoir un placeholder
        secureTextEntry={props.secureTextEntry}
      ></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 20,
  },
  containerLabel:{
    position: 'absolute',
    top: -10,
    left: 35,

    backgroundColor: '#F1F1F1',
    paddingHorizontal: 5,
    borderRadius:5,
    zIndex: 1, // Pour que la legend soit au-dessus du TextInput
  },

  label: {
    fontFamily: 'Cabin-Regular',
    color: '#002C82',
  },
  input: {
    width: 345,
    height: 55,

    borderWidth: 1,
    borderColor: '#002C82',

    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,

    zIndex: 0, // Pour que le TextInput soit en dessous du texte du label
  },
});
