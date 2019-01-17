import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import Home from './App/Home'
import MovieDetailList from './App/MovieDetailList'
import MyMovies from './App/MyMovies'
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'


const AppStack = createStackNavigator(
  {
    Home: { screen: Home },
    MovieDetailList: { screen: MovieDetailList },
    MyMovies: {screen: MyMovies}
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