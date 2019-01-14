import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    Text
} from 'react-native';
import { createUser } from '../api/api'
import { saveUserId } from '../api/AsyncManager'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        validColorEmail: 'black',
        validColorPass: 'black',
        validColorFirstName: 'black',
        validColorLastName: 'black'

    }
    _validateNameRexEx(name) {
        const checkForIsName = /^[a-zA-Z1-9]{2,}$/
        return checkForIsName.test(name)
    }
    _validateName(name, isLastName) {
        if (!isLastName) {
            this.setState({ firstName: name })
            if (this._validateNameRexEx(name)) {
                this.setState({ validColorFirstName: 'green' })
            } else {
                this.setState({ validColorFirstName: 'red' })
            }
        } else {
            this.setState({ lastName: name })
            if (this._validateNameRexEx(name)) {
                this.setState({ validColorLastName: 'green' })
            } else {
                this.setState({ validColorLastName: 'red' })
            }
        }
    }

    _validateEmailRegEx(email) {
        const checkForIsEmail = /([@])\w.+/g
        return checkForIsEmail.test(email)
    }
    _validateEmail(email) {
        this.setState({ email: email })
        if (this._validateEmailRegEx(email)) {
            this.setState({ validColorEmail: 'green' })
        } else {
            this.setState({ validColorEmail: 'red' })
        }
    }
    _validatePassRegEx(password) {
        const checkForIsPassword = /^[a-zA-Z1-9]{5,}$/
        return checkForIsPassword.test(password)
    }
    _validatePassword(password) {
        this.setState({ password: password })
        if (this._validatePassRegEx(password)) {
            this.setState({ validColorPass: 'green' })
        } else {
            this.setState({ validColorPass: 'red' })
        }
    }

    _onSignUp() {
        if (
            this._validateEmailRegEx(this.state.email)
            && this._validatePassRegEx(this.state.password)
            && this._validateNameRexEx(this.state.firstName)
            && this._validateNameRexEx(this.state.lastName)) {

            const newUser = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                // this would be some kind of hashing function in real life
                password: this.state.password.toLowerCase()
            }
            createUser(newUser)
                .then(user => {
                    saveUserId(user.id)
                        .then(this.props.navigation.navigate('App'))
                })
        }else {
            Alert.alert( 'Missing information')
        }

    }


    render() {
        return (
            <ImageBackground source={require('../img/bg.png')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <Text style={styles.header}>Please Sign Up </Text>
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputContainer}>
                            <Icon name="filmstrip" size={30} style={styles.icon} color={this.state.validColorFirstName} />
                            <TextInput
                                clearTextOnFocus
                                placeholder="First Name"
                                style={styles.input}
                                onChangeText={(text) => this._validateName(text, false)}
                                value={this.state.firstName}>
                            </TextInput>
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="filmstrip" size={30} style={styles.icon} color={this.state.validColorLastName} />
                            <TextInput
                                clearTextOnFocus
                                placeholder="Last Name"
                                style={styles.input}
                                onChangeText={(text) => this._validateName(text, true)}
                                value={this.state.lastName}>
                            </TextInput>
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="email-outline" size={30} style={styles.icon} color={this.state.validColorEmail} />
                            <TextInput
                                clearTextOnFocus
                                placeholder="Email"
                                style={styles.input}
                                onChangeText={(text) => this._validateEmail(text)}
                                value={this.state.email}>
                            </TextInput>
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="check-outline" size={30} style={styles.icon} color={this.state.validColorPass} />
                            <TextInput
                                clearTextOnFocus
                                secureTextEntry
                                placeholder="Password"
                                style={styles.input}
                                onChangeText={(text) => this._validatePassword(text)}
                                value={this.state.password}>
                            </TextInput>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this._onSignUp()}
                        >
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}
export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 35,
        paddingBottom: 50,
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
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 35
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
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 30,
        fontWeight: '400',
        fontStyle: 'italic',
    },


});