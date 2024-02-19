import {
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  TextInput,
  Text,
  ScrollView,
} from 'react-native';
import React from 'react';
//Icones
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//Composant
import Header from '../components/shared/Header';

export default function GalleryScreen() {
  return (
    <SafeAreaView style={styles.body}>
      {/* Header */}
      <Header title='Gallery' />

      {/* Search/filter/favorite container */}
      <View style={styles.containerSearch}>
        <View style={styles.icones}>
        <FontAwesome
            name='star'
            size={25}
            color='#002C82'
         
          />
          <FontAwesome
            name='filter'
            size={25}
            color='#002C82'
          
          />
        
          <FontAwesome
            name='search'
            size={25}
            color='#002C82'
           
          />
        </View>

        <View style={styles.searchBar}>
          <TextInput
            inlineImageLeft='search1'
            style={styles.text}
          />
        </View>
      </View>
      {/* Planes */}
      <View style={styles.containerPlanes}>
        <View style={styles.plane}>
          <View style={styles.img}>
            <Image
              style={styles.imgPlane}
              source={require('../assets/planes/A220.jpg')}
            />
          </View>

          <View style={styles.descPlane}>
            <Text style={{fontFamily:'Cabin-Bold'}}>A220</Text>
            <ScrollView>
              <Text style={styles.descPlane}>
                Loremdkdkdfkkeziizizkdsdgslndlbn vn skvn kv,n kdvn sdv,ns v;snv
                kqv
              </Text>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSearch: {
    width: '90%',
    height: '10%',
  
    marginTop: '15%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icones: {
    width: '30%',
    height: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around',
  },
  searchBar:{
    width: '70%',
    height: '80%',
    justifyContent:'center',
    alignItems:'flex-end',
  },
  containerPlanes: {
    width: '90%',
    height: '80%',

    alignItems: 'center',
    marginTop: 10,
    // backgroundColor: 'pink',
  },
  plane: {
    width: 335,
    height: 120,

    fontFamily: 'Cabin-Regular',
    color: '#002C82',

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#002C82',
    borderStyle: 'solid',
    borderRadius: 6,

    margin: 5,
    padding: 10,
  },
  img: {
    borderRadius: 6,
    overflow: 'hidden',
  },
  imgPlane: {
    width: 100,
    height: 100,
  },
  descPlane: {
    width: 220,
    height: 100,

    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
  },
  text: {
    width: '90%',
    height: '80%',

    borderWidth: 1,
    borderColor: '#002C82',

    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    zIndex: 0, // Pour que le TextInput soit en dessous du texte du label
  },
});
