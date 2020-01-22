import React, { Component } from 'react';
import { getFilmDetail, getImage } from './../api/tmdbAPI';
import moment from 'moment';
import numeral from 'numeral';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  ActivityIndicator,
  Image
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class FilmDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      film: undefined,
      isLoading: true
    };
  }

  componentDidMount() {
    getFilmDetail(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      });
    });
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

  _displayFilm() {
    const {film} = this.state;
    if (film !== undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image style={styles.image} source={{uri: getImage(film.backdrop_path)}}/>
          <Text style={styles.title_text}>{film.title}</Text>
          <Text style={styles.description_text}>{film.overview}</Text>
          <View style={styles.infos_container}>
            <Text >Sortie le {moment(new Date(film.release_date)).format('DD/MM/YY')} </Text>
            <Text >Note: {film.vote_average} / 10 </Text>
            <Text >Nombre de vote: {film.vote_count} </Text>
            <Text >Budget:  {numeral(film.budget).format('$ 0,0[.]00') }</Text>
            <Text >Genre(s): {film.genres.map(genre => genre.name).join(" / ")} </Text>
            <Text >Companie(s): {film.production_companies.map(comp => comp.name).join(" / ")} </Text>
          </View>
        </ScrollView>
      );
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 170,
    margin: 5
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 26,
    textAlign: 'center',
    margin: 10,
    flex: 1,
    flexWrap: 'wrap',

  },
  description_text: {
    fontStyle: 'italic',
    fontSize: 14,
    marginLeft: 5,
    color: "#6b6b6b"
  },
  infos_container: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
    marginBottom: 5
  }
});

export default FilmDetail;
