import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Login({navigation}) {
  
  const handleSignIn = () => {
    navigation.navigate('HomeStack');
  }

  return (
    <View>
      <Text>SignUp</Text>
      <Button title='Se connecter' onPress={handleSignIn} />
    </View>
  )
}

const styles = StyleSheet.create({})