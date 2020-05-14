import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Spacer from '../components/spacer';

const destinationInfo = ({ }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.icon}>
                <FontAwesome5 name="hospital" size={100} color="black" />
            </TouchableOpacity>
            <Spacer>
                <TouchableOpacity style={styles.icon}>
                    <FontAwesome name="bank" size={100} color="black" />
                </TouchableOpacity>
            </Spacer>
            <TouchableOpacity style={styles.icon}>
                <MaterialCommunityIcons name="food" size={100} color="black" />
            </TouchableOpacity>
        </View>
    );
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