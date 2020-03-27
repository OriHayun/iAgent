import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';



const indexScreen = ({ navigation }) => {
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
        title:'I Agent',
        headerTitleAlign:'center'
        //להוסיף טאב בצד ימין למעלה שישלח אותי למסך נוטיפיקציות
    };
};

const styles = StyleSheet.create({})

export default indexScreen;