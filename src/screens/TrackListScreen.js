import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';
const trackListScreen = ({ navigation }) => {
    return (
        <SafeAreaView forceInset={{ top: 'always' }}>

            <Text style={{ fontSize: 48 }}>track List Screen</Text>
            <Button
                title="Go to Track detail"
                onPress={() => navigation.navigate('TrackDetails')}
            />
        </SafeAreaView>
    );
}

trackListScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({})

export default trackListScreen;