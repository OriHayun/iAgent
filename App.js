import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AccountScreen from './src/screens/AccountScreen';
import TripsScreen from './src/screens/tripsScreen';
import TripScreen from './src/screens/tripScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import IndexScreen from './src/screens/IndexScreen';
import NotificationScreen from './src/screens/NotificationScreen'
import LocalHighlightDetailsScreen from './src/screens/localHighlightDetailsScreen';
import ChatScreen from './src/screens/chatScreen'
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as CustomerProvider } from './src/context/CustomerContext';
import { Provider as TripsProvider } from './src/context/TripsContext';
import { Provider as NotificationProvider } from './src/context/NotificationContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/resolveAuthScreen';
import { FontAwesome, Entypo } from '@expo/vector-icons'
import firebaseConfig from './src/api/firebase';
import firebase from 'firebase';

firebase.initializeApp(firebaseConfig);

const MainFlow = createStackNavigator({
  Index: IndexScreen,
  Notification: NotificationScreen,
  Details: LocalHighlightDetailsScreen
})
MainFlow.navigationOptions = () => {
  return {
    title: 'ראשי',
    tabBarOptions: {
      tabStyle: { backgroundColor: '#ffe0b3' },
      labelStyle: { fontSize: 16 },
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
    tabBarIcon: <FontAwesome name='home' size={20} />
  }
}

const tripsFlow = createStackNavigator({
  trips: TripsScreen,
  trip: TripScreen,


})
tripsFlow.navigationOptions = () => {
  return {
    title: 'טיולים',
    tabBarOptions: {
      tabStyle: { backgroundColor: '#a3a375' },
      labelStyle: { fontSize: 16 }
    },
    tabBarIcon: <Entypo size={20} name='suitcase' />
  };
}


const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    MainFlow,
    tripsFlow,
    Chat: ChatScreen,
    Account: AccountScreen
  })
});


const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <NotificationProvider>
      <TripsProvider>
        <CustomerProvider>
          <AuthProvider>
            <App
              ref={(navigator) => setNavigator(navigator)}
            />
          </AuthProvider>
        </CustomerProvider>
      </TripsProvider>
    </NotificationProvider>
  );
}