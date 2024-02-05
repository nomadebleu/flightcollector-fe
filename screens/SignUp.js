import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function SignUp({navigation}) {
  
  const handleSignIn = () => {
    navigation.navigate('Home');
  }

  return (
    <View>
      <Text>SignUp</Text>
      <Button title='Se connecter' onPress={handleSignIn} />
    </View>
  )
}

const styles = StyleSheet.create({})