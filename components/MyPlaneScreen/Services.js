import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
//Composants
import ListInput from './ListInput'


export default function Services() {

  //State Reset de la List
  const [resetList, setResetList] = useState(false);

  return (
    <View style={styles.onglet}>
      <Text style={styles.title}>YOUR MOVIES</Text>
     <ListInput resetList={resetList}/>
     {/* <Text style={styles.title}>YOUR MEALS</Text>
     <ListInput resetList={resetList}/>
     <Text style={styles.title}>YOUR MOVIES</Text>
     <ListInput resetList={resetList}/> */}
    </View>
  )
}

const styles = StyleSheet.create({
    onglet:{
        backgroundColor:'#06D6A0',
        flex:1,
    },
    title:{
      fontFamily:'Cabin-Bold',
      color:'#002C82',
      paddingLeft:20,
      paddingTop:10,
    },
})