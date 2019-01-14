import React, { Component } from 'react';
import { StyleSheet, FlatList, View, TextInput, ActivityIndicator, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { searchMovies } from '../api/api.js'
import MovieCard from './MovieCard.js';
import { removeUserId } from '../api/AsyncManager'

export default class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (<TouchableOpacity
        style={styles.button}
        onPress={() =>
          removeUserId()
            .then(
              navigation.navigate('Auth')
            )

        }
      ><Text style={styles.input}>Logout</Text>
      </TouchableOpacity>)
    }
  }
  state = {
    text: 'Search for a movie',
    movies: [],
    isLoading: false,
    searchComplete: false
  }

  _onSearch() {
    this.setState({ text: '', isLoading: true })
  }

  _onSubmit() {
    if (this.state.text !== '') {
      const param = this.state.text
      searchMovies(param).then(movies => this.setState({ movies: movies, isLoading: false, searchComplete: true }))
    } else if (this.state.text === '') {
      this.setState({
        text: 'Search for a movie',
        movies: [],
        isLoading: false,
        searchComplete: false
      })
    }
  }

  _renderApp() {
    const { navigate } = this.props.navigation

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View >
      )
    }
    else {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <FlatList
            data={this.state.movies}
            renderItem={({ item }) => <MovieCard item={item} navigate={navigate} />}
            keyExtractor={item => (item.movie.imdbID)}>
          </FlatList>
        </View>
      )
    }
  }

  render() {
    return (
      <ImageBackground source={require('../img/bg.png')} style={{ height: '100%', width: '100%' }}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              clearTextOnFocus
              placeholder={this.state.text}
              style={styles.input}
              onChangeText={(text) => this.setState({ text })}
              onFocus={() => this._onSearch()}
              onSubmitEditing={() => this._onSubmit()}
              value={this.state.text}>
            </TextInput>
          </View>
          {this._renderApp()}

        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 25,
    height: 50,
    width: 400,
    backgroundColor: 'rgba(250, 250, 250, .7)',
    borderRadius: 25
  },
  input: {
    height: 40,
    fontSize: 30,
    fontWeight: '400',
    fontStyle: 'italic',
    color: 'black',
    textDecorationStyle: 'double',
  },
  button: {
    // flex: 2,
    // alignItems: 'center',
    // justifyContent: 'center',
    // height: 40,
    // fontSize: 30,
    // fontWeight: '400',
    // fontStyle: 'italic',
    // color: 'black',
    // backgroundColor: '#FBBA00',
    // width: 100,
    // height: 50,
    // borderRadius: 25,
    // margin: 20
  }
});
