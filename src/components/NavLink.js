import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Spacer from './spacer';
import { withNavigation } from 'react-navigation'


const navLink = ({ text, navigation, routeName }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
            <Spacer>
                <Text style={styles.signinLink}>
                    {text}
                </Text>
            </Spacer>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    signinLink: {
        color: 'rgba(255,255,255,0.7)'
    }
})

export default withNavigation(navLink);