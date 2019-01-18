import React, { Component } from 'react';
import { StyleSheet, FlatList, View, ImageBackground, Text } from 'react-native';
import MovieCard from './MovieCard.js';
import { getUsersMovies } from '../api/api.js'
import { getUserId } from '../api/AsyncManager'

export default class MyMovies extends Component {
    state = {
        myMovies: [],
    }
    componentDidMount() {
        getUserId().then(user => {
            const userId = parseInt(user.slice(-1))
            getUsersMovies(userId).then(movies => this.setState({ myMovies: movies }))
        }
        )
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <ImageBackground source={require('../img/bg.png')} style={{ height: '100%', width: '100%' }}>
                <View style={styles.container}>
                <Text style={styles.header}>My Movies</Text>
                        <FlatList
                            data={this.state.myMovies}
                            renderItem={({ item }) => <MovieCard item={item} navigate={navigate} />}
                            keyExtractor={item => (item.movie.imdbID)}>
                        </FlatList>
                </View>
            </ImageBackground>
        )
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
    header: {
      height: 40,
      fontSize: 30,
      fontWeight: '400',
      fontStyle: 'italic',
      color: 'black',
      textDecorationStyle: 'double',
    },
})