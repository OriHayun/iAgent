import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import { AntDesign } from '@expo/vector-icons'

const chatScreen = () => {

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>

            <Text style={{ fontSize: 40 }}>Chat Screen</Text>

        </SafeAreaView>
    );
}

chatScreen.navigationOptions = () => {
    return {
        title: "צ'ט",
        tabBarOptions: {
            tabStyle: { backgroundColor: '#7a7a52' },
            labelStyle: { fontSize: 16 }
          },
        tabBarIcon: <AntDesign size={20} name='wechat' />
    };
};

const styles = StyleSheet.create({})

export default chatScreen;