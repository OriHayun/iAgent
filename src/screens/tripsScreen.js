import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'
import { SafeAreaView } from 'react-navigation'




const tripsScreen = () => {
    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h3>Create Track</Text>
        </SafeAreaView>
    );
}

tripsScreen.navigationOptions = () => {
    return {
        title: 'טיולים',
        tabBarOptions: {
            tabStyle: { backgroundColor: '#a3a375' },
            labelStyle: { fontSize: 16 }
        },
        tabBarIcon: <Entypo size={20} name='suitcase' />
    };
};

const styles = StyleSheet.create({})

export default tripsScreen;