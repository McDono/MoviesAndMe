import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  ActivityIndicator
} from 'react-native';
import FilmItem from './filmItem';
import { getFilmsWithSearchText } from './../api/tmdbAPI';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      isLoading: false
    };
    this.searchedText = '';
    this.currentPage = 0;
    this.totalPage = 0;
  }

  _loadFilms() {
    console.log(this.searchedText);
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true });
      getFilmsWithSearchText(this.searchedText, this.currentPage + 1).then(
        data => {
          this.currentPage = data.page;
          this.totalPage = data.total_pages;
          this.setState({
            films: [...this.state.films, ...data.results],
            isLoading: false
          });
        }
      );
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  render() {
    console.log('RENDER');

    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TextInput
            style={styles.textInput}
            placeholder="Titre du film"
            onChangeText={text => this._searchTextInputChanged(text)}
            onSubmitEditing={() => this._loadFilms()}
          />
          <Button title="Rechercher" onPress={() => this._loadFilms()} />
        </View>

        <View style={styles.content}>
          <FlatList
            style={styles.flatlist}
            data={this.state.films}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <FilmItem film={item} />}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (this.currentPage < this.totalPage) {
                this._loadFilms();
              }
            }}
          />
          {this._displayLoading()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 30
  },
  header: {
    // flex: 2
  },
  content: {
    flex: 1
  },
  textInput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  flatlist: {},
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 20,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Search;
