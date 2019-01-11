import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'


class MovieCard extends Component {
    state = {
        hidden: false,
    }

    _handleDetailPress(item) {

    }

    render() {
        const item = this.props.item.movie
        // const { navigate } = this.props.navigation
        
        
        return (
            <View style={styles.card}>
                <Text style={styles.title}>{item.Title}</Text>
                <Text style={styles.description}>Release Date: {item.Year}</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigate('MovieDetailList', { itemId : item.imdbID})}
                    style={styles.button} >
                    <Text>Get Details</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default MovieCard

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        width: 300,
        backgroundColor: 'rgba(250, 250, 250, .95)',
    },
    title: {
        fontSize: 15,
        fontWeight: '400',
        textAlign: 'left',
    },
    description: {
        fontSize: 12,
        fontWeight: '300',
        marginLeft: 7,
        textAlign: 'left',
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