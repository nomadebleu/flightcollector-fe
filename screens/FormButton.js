import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function FormButton(props) {
  
  //State Cliked pour le button
  const [isClicked, setIsClicked] = useState(false);

  //Fonction pour change l'état
  const handleClick = () => {
    setIsClicked(true);
    //Retour à l'initial après 1s
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          handleClick();
          props.onPress();
        }}
        style={[styles.btn, props.formStyle, isClicked && styles.btnClicked]} // Condition pr chger en vert
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.text,
            props.titleStyle,
            isClicked && styles.textClicked,
          ]}
        >
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    color: '#80C9FF',
    fontFamily: 'Cabin-Bold',
    letterSpacing: 5,
    fontSize: 20,
  },
  btn: {
    width: 345,
    height: 55,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 20,
    backgroundColor: '#002C82',
    borderColor: '#80C9FF',
    borderWidth: 2,
  },
  //Style Clicked
  textClicked: {
    color: 'white',
  },
  btnClicked: {
    backgroundColor: '#06D6A0',
    borderColor: '#0092FF',
  },
});
