import React, { useContext } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { NavigationEvents } from 'react-navigation';
import signBg from '../../assets/SignBg.jpg'


const signupScreen = () => {

    const { state, signup, clearErrorMessage } = useContext(AuthContext)


    return (
        <ImageBackground source={signBg} style={styles.ImageBackground}>
            <View style={styles.container}>
                <NavigationEvents
                    onWillBlur={clearErrorMessage}
                />
                <AuthForm
                    headerText='דף הרשמה'
                    buttonTitle='הרשם'
                    errorMessage={state.errorMessage}
                    onSubmit={signup}
                />
                <NavLink
                    routeName='Signin'
                    text='יש לך משתמש? התחבר עכשיו'
                />
            </View>
        </ImageBackground>
    );
}

signupScreen.navigationOptions = () => {
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

export default signupScreen;