import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text
} from 'react-native';
import FilmItem from './filmItem';
import { getFilmsWithSearchText } from './../api/tmdbAPI';

class Search extends Component {
  constructor(props) {
    super(props);
    this.searchedText = '';
    this.state = {
      films: []
    };
  }

  _loadFilms() {
    console.log(this.searchedText);
    if (this.searchedText.length > 0) {
      getFilmsWithSearchText(this.searchedText).then(data => {
        this.setState({ films: data.results });
      });
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  render() {
    console.log('RENDER');
    
    return (
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Titre du film"
          onChangeText={text => this._searchTextInputChanged(text)}
        />
        <Button title="Rechercher" onPress={() => this._loadFilms()} />
        <FlatList
          style={styles.flatlist}
          data={this.state.films}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <FilmItem film={item} />}
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
  flatlist: {}
});

export default Search;
