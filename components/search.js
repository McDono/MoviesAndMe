import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';
import films from './../helpers/filmsData';
import FilmItem from './filmItem';
import Constants from 'expo-constants';

class Search extends Component {
  constructor() {
    return super();
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.textInput }
          placeholder="Titre du film"
        />
        <Button title="Rechercher" onPress={() => {}} />
        <FlatList
          style={styles.flatlist}
          data={films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem />}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 20
  },
  textInput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  flatlist: {

  }
})

export default Search;
