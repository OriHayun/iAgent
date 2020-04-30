import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const tripProfileScreen = ({ navigation }) => {
    const tripId = navigation.getParam('tripId')
    
    return (
        <Text>trip profile screen</Text>
    );
};

tripProfileScreen.navigationOptions = () => {
    return {
        title: 'פרופיל טיול',
        headerTitleAlign: 'center',
    }
}

const styles = StyleSheet.create({

});

export default tripProfileScreen;
