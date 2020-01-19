import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class FilmItem extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <View style={styles.main_container}>
        <Text style={styles.title_text} >Titre du film</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container : {
    height: 190
  },
  title_text: {
    
  }
})

export default FilmItem;