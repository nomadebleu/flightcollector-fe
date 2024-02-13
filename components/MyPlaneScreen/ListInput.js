import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
//Icones
import { FontAwesome5 } from '@expo/vector-icons';

export default function ListInput(props) {
  //States
  const [inputValue, setInputValue] = useState('');
  const [showList, setShowList] = useState(false);
  const [data, setData] = useState(
    Array.from(Array(20).keys()).map((item) => `Item ${item + 1}`)
  ); //Permet de créer un tableau d'entrée de 20.

  const [selectedItem, setSelectedItem] = useState(null); //pour suivre l'item selectionné


  //Gestion de la remise à 0 de la liste
  useEffect(() => {
    if (props.resetList) {
      setInputValue('');
      setShowList(false);
    }
  }, [props.resetList]);

  //Open the list
  const toggleList = () => {
    setShowList(!showList);
  };

  //Select Item
  const handleSelectItem = (item) => {
    setInputValue(item);
    setSelectedItem(item)
    setShowList(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
           style={[styles.input, selectedItem === inputValue && styles.selectedInput]} 
          value={inputValue}
          onChangeText={setInputValue}
          placeholder='Choose your movie'
          placeholderTextColor='#002C82'
          editable={false}
        />
        <TouchableOpacity onPress={toggleList}>
          {showList ? (
            <FontAwesome5
              name='chevron-circle-up'
              size={30}
              color='#002C82'
            />
          ) : (
            <FontAwesome5
              name='chevron-circle-down'
              size={30}
              color='#002C82'
            />
          )}
        </TouchableOpacity>
      </View>
      {showList && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectItem(item)}>
              <Text style={styles.listItem}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingTop:10,
    paddingRight:20,
  },
  //Input List
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#002C82',
    borderRadius: 6,
    padding: 10,
    marginRight: 10,
  },
  listItem: {
    padding: 10,
    color:'#002C82',
    fontFamily:'Cabin-Regular',
    backgroundColor:'red',
    justifyContent:'center',
    width:'85%',
  },
  selectedInput:{
    backgroundColor:'#002C82',
    color:'#06D6A0',
    fontFamily:'Cabin-Bold',
  }
});
