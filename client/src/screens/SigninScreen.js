import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, Button , ImageBackground } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import signBg from '../../assets/SignBg.jpg'


const signinScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext)

    return (
        <ImageBackground source={signBg} style={styles.ImageBackground}>
            <View style={styles.container}>
                <NavigationEvents
                    onWillBlur={clearErrorMessage}
                />
                <AuthForm
                    headerText='התחבר'
                    buttonTitle='כנס'
                    errorMessage={state.errorMessage}
                    onSubmit={signin}
                />
                <NavLink
                    routeName='Signup'
                    text='אין לך משתמש? הרשם עכשיו'
                />
            </View>
        </ImageBackground>
    );
}

signinScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    ImageBackground:{
        flex:1,
        height:null,
        width:null,
    },
    container: {
        marginBottom: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default signinScreen;