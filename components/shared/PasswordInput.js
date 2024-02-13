import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
//Icones
import { Entypo } from 'react-native-vector-icons';
//Composants
import FormInput from './FormInput';

export default function PasswordInput(props) {
    const [showPassword, setShowPassword] = useState(false);

      // Visibilité du password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
   <View>
   <FormInput
     label={props.label}
     value={props.value}
     name={props.name}
     onChangeText={props.onChangeText}
     secureTextEntry={!showPassword}//Pour cacher les caractères
     placeholder={props.placeholder}
   />
   <Entypo
     onPress={togglePasswordVisibility}
     name={showPassword ? 'eye' : 'eye-with-line'}
     size={30}
     color='#002C82'
     style={styles.eyeIcon}
   />
 </View>
  )
}

const styles = StyleSheet.create({
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 15,
      },
    
})