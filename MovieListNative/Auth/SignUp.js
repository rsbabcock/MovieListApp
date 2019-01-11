import React, { Component } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    Text
} from 'react-native';

class SignUp extends Component {
    state = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        password: 'Password',
    }

    _onSignUp() {
        this.props.navigation.navigate('SignIn')
    }

    render() {
        return (
            <ImageBackground source={require('../img/bg.png')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <Text style={styles.header}>Please Sign Up </Text>
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                clearTextOnFocus
                                placeholder={this.state.firstName}
                                style={styles.input}
                                onChangeText={(text) => this.setState({ firstName: text })}
                                // onFocus={() => this._onSearch()}
                                // onSubmitEditing={() => this._onSubmit()}
                                value={this.state.firstName}>
                            </TextInput>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                clearTextOnFocus
                                placeholder={this.state.lastName}
                                style={styles.input}
                                onChangeText={(text) => this.setState({ lastName: text })}
                                // onFocus={() => this._onSearch()}
                                // onSubmitEditing={() => this._onSubmit()}
                                value={this.state.lastName}>
                            </TextInput>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                clearTextOnFocus
                                placeholder={this.state.email}
                                style={styles.input}
                                onChangeText={(text) => this.setState({ email: text })}
                                // onFocus={() => this._onSearch()}
                                // onSubmitEditing={() => this._onSubmit()}
                                value={this.state.email}>
                            </TextInput>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                clearTextOnFocus
                                secureTextEntry
                                placeholder={this.state.password}
                                style={styles.input}
                                onChangeText={(text) => this.setState({ password: text })}
                                // onFocus={() => this._onSearch()}
                                // onSubmitEditing={() => this._onSubmit()}
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
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 25,
        height: 50,
        width: 400,
        backgroundColor: 'rgb(250, 250, 250)',
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