import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AccountScreen from './src/screens/AccountScreen';
import tripsScreen from './src/screens/tripsScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackDetailsScreen from './src/screens/TrackDetailsScreen';
import IndexScreen from './src/screens/IndexScreen';
import ChatScreen from './src/screens/chatScreen'
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/resolveAuthScreen';
import { FontAwesome } from '@expo/vector-icons'
import firebaseConfig from './src/api/firebase';
import firebase from 'firebase';

firebase.initializeApp(firebaseConfig);

const MainFlow = createStackNavigator({
  Index: IndexScreen,
  TrackDetails: TrackDetailsScreen
})

MainFlow.navigationOptions = () => {
  return {
    title: 'ראשי',
    activeColor: '#222222',
    tabBarOptions: {
      tabStyle: { backgroundColor: '#b8b894' },
      labelStyle: { fontSize: 16 },
    },
    tabBarIcon: <FontAwesome name='home' size={20} />
  }
}

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    MainFlow,
    trips: tripsScreen,
    Chat: ChatScreen,
    Account: AccountScreen

  })
});


const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App
        ref={(navigator) => setNavigator(navigator)}
      />
    </AuthProvider>
  );
}