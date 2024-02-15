import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
//Composants
import ListInput from './ListInput'

//Local address
// const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Services() {

  //State Reset de la List
  const [resetList, setResetList] = useState(false);
  const [dataMovies,setDataMovies] =useState(null);


  //Chargement des movies
  useEffect(()=>{
    fetchMovies()
  },[])

  const fetchMovies = async() => {
    try{
      const response = await fetch('https://flightcollector-be.vercel.app/flights/movies');
      const data = await response.json();
      if (!data){
        console.log('No movies')
        return
      }
      setDataMovies(data.movies)
      console.log(dataMovies)
    }catch(error) {
      console.error('Error during Fetch:', error);
    }
  };

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