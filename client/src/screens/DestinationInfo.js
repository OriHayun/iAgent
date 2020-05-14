import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Spacer from '../components/spacer';
import InformationCategory from '../components/information/InformationCategory';

const destinationInfo = ({ }) => {

    const [choice, setChoice] = useState(null);


    if (choice == null) {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.icon} onPress={() => setChoice(1)}>
                    <FontAwesome5 name="hospital" size={100} color="black" />
                </TouchableOpacity>
                <Spacer>
                    <TouchableOpacity style={styles.icon} onPress={() => setChoice(2)}>
                        <FontAwesome name="bank" size={100} color="black" />
                    </TouchableOpacity>
                </Spacer>
                <TouchableOpacity style={styles.icon} onPress={() => setChoice(3)}>
                    <MaterialCommunityIcons name="food" size={100} color="black" />
                </TouchableOpacity>
            </View >);
    }

    else if (choice == 1) {
        return (
            <View style={styles.container}>
                <InformationCategory selected='health' />
                <Button title='נקה' onPress={() => setChoice(null)} />
            </View>
        );
    }

    else if (choice == 2) {
        return (
            <View style={styles.container}>
                <InformationCategory selected='money' />
                <Button title='נקה' onPress={() => setChoice(null)} />
            </View>
        )

    }

    else {
        return (
            <View style={styles.container}>
                <InformationCategory selected='eatingout' />
                <Button title='נקה' onPress={() => setChoice(null)} />
            </View>
        )
    }
};

destinationInfo.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: () => {
            return (
                <Text style={{ fontSize: 18 }}>מידע כללי</Text>
            )
        },
        headerStyle: {
            backgroundColor: '#dddce1'
        },
        headerTitleAlign: 'center',
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        padding: 20,
    }
})

export default destinationInfo;