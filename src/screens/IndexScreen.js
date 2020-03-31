import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';



const indexScreen = ({ navigation }) => {

    const [location, setLocation] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);


    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setErrorMessage('יש לאפשר שירותי מיקום')
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
    };





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

indexScreen.navigationOptions = () => {
    return {
        title: 'I Agent',
        headerTitleAlign: 'center'
        //להוסיף טאב בצד ימין למעלה שישלח אותי למסך נוטיפיקציות
    };
};

const styles = StyleSheet.create({})

export default indexScreen;