import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Spacer from '../components/spacer';
import InformationCategory from '../components/information/InformationCategory';

const destinationInfo = ({ navigation }) => {
    
    const destination = navigation.getParam('destination')
    const [choice, setChoice] = useState(null);

    if (choice == null) {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.icon} onPress={() => setChoice(1)}>
                    <FontAwesome5 name="hospital" size={100} color="black" />
                    <Text style={styles.Text}>רפואה</Text>
                </TouchableOpacity>
                <Spacer>
                    <TouchableOpacity style={styles.icon} onPress={() => setChoice(2)}>
                        <FontAwesome name="bank" size={100} color="black" />
                        <Text style={styles.Text}>פיננסי</Text>
                    </TouchableOpacity>
                </Spacer>
                <TouchableOpacity style={styles.icon} onPress={() => setChoice(3)}>
                    <MaterialCommunityIcons name="food" size={100} color="black" />
                    <Text style={styles.Text}>אוכל</Text>
                </TouchableOpacity>
            </View>
        );
    }

    else if (choice == 1) {
        return (
            <View style={styles.container}>
                <InformationCategory selected='health' destination={destination} />
                <Spacer />
                <Button
                    buttonStyle={styles.btn}
                    title='חזור'
                    onPress={() => setChoice(null)}
                />
            </View>
        );
    }

    else if (choice == 2) {
        return (
            <View style={styles.container}>
                <InformationCategory selected='money' destination={destination} />
                <Spacer />
                <Button
                    buttonStyle={styles.btn}
                    title='חזור'
                    onPress={() => setChoice(null)}
                />
            </View>
        )

    }

    else {
        return (
            <View style={styles.container}>
                <InformationCategory selected='eatingout' destination={destination} />
                <Spacer />
                <Button
                    buttonStyle={styles.btn}
                    title='חזור'
                    onPress={() => setChoice(null)}
                />
            </View>
        )
    }
};

destinationInfo.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: () => {
            return (
                <Text style={{ fontSize: 20, fontWeight: '700' }}>מידע כללי</Text>
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
        alignItems: 'center'
    },
    btn: {
        paddingHorizontal: 40
    },
    Text: {
        fontSize: 20,
        fontWeight: '500'
    }
})

export default destinationInfo;