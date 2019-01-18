import React, { Component } from 'react'
import {
    Text,
    ScrollView,
    StyleSheet,
    View,
    ImageBackground,
    TouchableOpacity,
    Alert
} from 'react-native'
import { getMovieDetail, saveMovieToDb } from '../api/api'
import { getUserId } from '../api/AsyncManager'

class MovieDetailList extends Component {
    state = {
        movie: {},
        currentUser: ''
    }
    componentDidMount() {
        const { navigation } = this.props
        const movie = navigation.getParam('itemId', 'null')
        getMovieDetail(movie).then(data => this.setState({ movie: data }))
        getUserId().then(data => this.setState({ currentUser: data }))
    }
    saveMovie(movie) {
        let userId = parseInt(this.state.currentUser.slice(-1))
        saveMovieToDb(movie, userId).then(success => {
            Alert.alert(
                `${success.movie.Title} added to your movies`
            )
        })
    }
    render() {
        const movie = this.state.movie
        return (
            <ImageBackground source={require('../img/bg.png')} style={{ height: '100%', width: '100%' }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>{movie.Title}</Text>
                    <TouchableOpacity
                        onPress={() => this.saveMovie(movie)}
                        style={styles.button} >
                        <Text>Save this Movie</Text>
                    </TouchableOpacity>
                    <Text style={styles.description}>Actors: </Text>
                    <Text style={styles.description}>{movie.Actors} </Text>
                    <Text style={styles.description}>Rated: {movie.Rated} </Text>
                    <Text style={styles.description}>imdb Rating: {movie.imdbRating} </Text>
                    <Text style={styles.description}>imdb Votes: {movie.imdbVotes} </Text>
                    <View style={styles.plotCard}>
                        <Text style={styles.title}>{movie.Plot}</Text>
                    </View>
                    <Text style={styles.description}>Run Time: {movie.RunTime} </Text>
                    <Text style={styles.description}>Awards: </Text>
                    <Text style={styles.description}>{movie.Awards}</Text>
                    <Text style={styles.description}>Genre: {movie.Genre} </Text>
                    <Text style={styles.description}>Release Date: {movie.Released}</Text>
                    <Text style={styles.description}>Year: {movie.Year}</Text>
                    <Text style={styles.description}>Language: {movie.Language}</Text>
                    <Text style={styles.description}>Writer: </Text>
                    <Text style={styles.description}>{movie.Writer}</Text>
                </ScrollView>
            </ImageBackground>
        )
    }
}
export default MovieDetailList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plotCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        width: 350,
        backgroundColor: 'rgba(250, 250, 250, .7)',
    },
    title: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
    },
    description: {
        fontSize: 12,
        fontWeight: '300',
        margin: 2,
        textAlign: 'center',
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
});