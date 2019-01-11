import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    Text,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { login } from '../api/api'
import { saveUserId } from '../api/AsyncManager'

class SignIn extends Component {
    state = {
        email: 'email',
        password: 'password',
        validColor: 'black'
    }

    _validateEmailRegEx(email) {
        const checkForIsEmail = /([@])\w.+/g
        return checkForIsEmail.test(email)
    }
    _validateEmail(email){
        this.setState({email: email})
        if(this._validateEmailRegEx(email)){
            this.setState({ validColor : 'green'})
        } else {
           this.setState({validColor: 'red'}) 
        }
    }

    _onSignIn() {
        const email = this.state.email.toLowerCase()
        const password = this.state.password.toLowerCase()
        login(email)
            .then(user => {
                if (user.length === 0) {
                    Alert.alert(
                        'Incorrect Username or Password'
                    )
                } else {
                    user.map(data => {
                        if (data.email === email && data.password === password) {
                            saveUserId(data.id)
                                .then(this.props.navigation.navigate('App'))
                        }
                        if (data.email !== email || data.password !== password) {
                            Alert.alert(
                                'Incorrect Username or Password'
                            )
                        }
                    })
                }
            })
    }

    _goSignUp() {
        this.props.navigation.navigate('SignUp')
    }

    render() {

        return (
            <ImageBackground source={require('../img/bg.png')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <Text style={styles.header}>Welcome to Movie List</Text>
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputContainer}>
                            <Icon name="email-outline" size={30} style={styles.icon} color={this.state.validColor}/>
                            <TextInput
                                clearTextOnFocus
                                placeholder={this.state.email}
                                style={styles.input}
                                maxLength={15}
                                onChangeText={(text) => this._validateEmail(text)}
                                value={this.state.email}>
                            </TextInput>
                        </View>
                        <View style={styles.inputContainer}>
                        <Icon name="check-outline" size={30} style={styles.icon}/>
                            <TextInput
                                clearTextOnFocus
                                secureTextEntry
                                placeholder={this.state.password}
                                style={styles.input}
                                onChangeText={(text) => this.setState({ password: text })}
                                onChangeText={() => this._validate()}
                                onSubmitEditing={() => this._onSignIn()}
                                value={this.state.password}>
                            </TextInput>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this._onSignIn()}
                            >
                                <Text style={styles.buttonText}>Sign In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this._goSignUp()}
                            >
                                <Text style={styles.buttonText}>Sign Up!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <ActivityIndicator
                size='large'
                color='black'></ActivityIndicator> */}
                </View>
            </ImageBackground>
        )
    }
}
export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        textAlign: 'center',
        alignItems: 'flex-start',
        fontSize: 50,
        fontWeight: '400',
        fontStyle: 'italic',
    },
    inputWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        margin: 10,
        height: 70,
        width: 400,
        backgroundColor: 'rgb(250, 250, 250)',
        borderRadius: 25
    },
    icon: {
        marginLeft: 20,
        marginRight: 20,
    },
    input: {
        height: 40,
        fontSize: 30,
        fontWeight: '400',
        fontStyle: 'italic',
        color: 'black',
        textDecorationStyle: 'double',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    button: {
        height: 50,
        backgroundColor: 'rgb(250, 250, 250)',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        width: 150,
    },
    buttonText: {
        fontSize: 30,
        fontWeight: '400',
        fontStyle: 'italic',
    },


});