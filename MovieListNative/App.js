import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Home from './App/Home'
import MovieDetailList from './App/MovieDetailList'
import MyMovies from './App/MyMovies'
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'


const AppStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        headerRight: (<TouchableOpacity
          style={styles.button}
          onPress={() =>
            removeUserId()
              .then(
                navigation.navigate('Auth')
              )

          }
        ><Text style={styles.input}>Logout</Text>
        </TouchableOpacity>),
        headerTitle: (<TouchableOpacity
          style={styles.button}
          onPress={() =>
                navigation.navigate('Home')
          }
        ><Text style={styles.input}>Home</Text>
        </TouchableOpacity>),
        headerLeft: (<TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('MyMovies')}
        ><Text style={styles.input}>MyMovies</Text>
        </TouchableOpacity>)
      })
    },
    MovieDetailList: { screen: MovieDetailList },
    MyMovies: {
      screen: MyMovies,
      navigationOptions: ({navigation}) => ({
        headerRight: (<TouchableOpacity
          style={styles.button}
          onPress={() =>
            removeUserId()
              .then(
                navigation.navigate('Auth')
              )

          }
        ><Text style={styles.input}>Logout</Text>
        </TouchableOpacity>),
        headerTitle: (<TouchableOpacity
          style={styles.button}
          onPress={() =>
                navigation.navigate('Home')
          }
        ><Text style={styles.input}>Home</Text>
        </TouchableOpacity>),
        headerLeft: (<TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('MyMovies')}
        ><Text style={styles.input}>MyMovies</Text>
        </TouchableOpacity>)
      })
    }
  }
);

const AuthStack = createStackNavigator(
  {
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp }
  }
)



export default createAppContainer(createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'Auth',
  }
))

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 30,
    fontWeight: '400',
    fontStyle: 'italic',
    color: 'black',
    textDecorationStyle: 'double',
  }
})