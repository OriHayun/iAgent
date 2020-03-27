import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from './spacer';
import { Feather, AntDesign } from '@expo/vector-icons';


const authForm = ({ headerText, buttonTitle, errorMessage, onSubmit }) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Spacer>
                <Text h2 style={styles.header}>{headerText}</Text>
            </Spacer>
            <View>
                <Feather name='user' color='rgba(255,255,255,0.7)' style={styles.inputIcon} />
                <TextInput
                    style={styles.Input}
                    placeholder="שם משתמש"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
            </View>
            <Spacer />
            <View>
                <AntDesign name='lock' color='rgba(255,255,255,0.7)' style={styles.inputIcon} />
                <TextInput
                    style={styles.Input}
                    placeholder="סיסמה"
                    // secureTextEntry
                    labelStyle={{ color: '#000' }}
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
            </View>
            <Spacer>
                {errorMessage ?
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    : null}
                <TouchableOpacity style={styles.login} onPress={() => onSubmit(email, password)}>
                    <Text style={styles.loginText} >{buttonTitle}</Text>
                </TouchableOpacity>

                {/* <Button
                    title={buttonTitle}
                    onPress={() => onSubmit(email, password)}
                /> */}
            </Spacer>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 40
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginVertical: 15,
        textAlign: 'center'
    },
    Input: {
        width: Math.round(Dimensions.get('window').width) - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25
    },
    inputIcon: {
        fontSize: 28,
        position: 'absolute',
        top: 10,
        left: 37
    },
    login: {
        width: Math.round(Dimensions.get('window').width) - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        marginTop: 20
    },
    loginText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        textAlign: 'center'
    }
})

export default authForm;
