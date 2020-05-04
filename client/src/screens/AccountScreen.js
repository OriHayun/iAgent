import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation'
import Spacer from '../components/spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as CustomerContext } from '../context/CustomerContext';
import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions';
import { AntDesign, Entypo } from '@expo/vector-icons'

const accountScreen = ({ navigation }) => {
    console.log(navigation)
    const { signout } = useContext(AuthContext);
    const { state: {
        firstName,
        sureName,
        birthdate,
        email,
        img }, changeImg } = useContext(CustomerContext);

    if (birthdate) {
        var today = new Date();
        arrBirthdate = birthdate.split('-')
        var YOB = arrBirthdate[0];
        age = today.getFullYear() - YOB
    }

    useEffect(() => {
        getPermissionAsync();
    }, [])

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.cancelled) {
            changeImg(result)
        }
    };

    return (
        <>
            {firstName != '' ?
                <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
                    <Text h2 style={styles.header} >אזור אישי</Text>
                    {img ?
                        <Image source={{ uri: img }} style={styles.image} />
                        : <Image source={require('../../assets/defaultImage.png')} style={styles.image} />
                    }
                    <View style={styles.detailsView}>
                        <Spacer>
                            <Text h3> {firstName} {sureName} </Text>
                        </Spacer>
                        <Spacer>
                            <Text h3> {email}</Text>
                        </Spacer>
                        <Spacer>
                            <Text h3> {age}</Text>
                        </Spacer>
                    </View>
                    <View style={styles.btnView}>
                        <Button
                            title=" התנתק"
                            onPress={signout}
                            icon={
                                <AntDesign
                                    style={{ marginTop: 4 }}
                                    name="logout"
                                    color="black"
                                />
                            }
                            buttonStyle={{ backgroundColor: '#d9d9d9' }}
                            titleStyle={{ color: 'black' }}
                        />
                        <Button
                            title=" בחר תמונה"
                            onPress={this._pickImage}
                            icon={
                                <Entypo
                                    style={{ marginTop: 4 }}
                                    name="image"
                                    color="black"
                                />
                            }
                            buttonStyle={{ backgroundColor: '#d9d9d9' }}
                            titleStyle={{ color: 'black' }}
                        />
                    </View>

                </SafeAreaView>
                : <ActivityIndicator size='large' style={styles.spiner} />
            }
        </>
    );
}

accountScreen.navigationOptions = () => {

    return {
        title: 'אזור אישי',
        tabBarOptions: {
            tabStyle: { backgroundColor: '#dddce1' },
            labelStyle: { fontSize: 12 },
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
        },
        tabBarIcon: ({ focused }) => {
            return <FontAwesome size={focused ? 25 : 18} name='user' color={focused ? "black" : "grey"} />;
        }
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f2f2f2'
    },
    header: {
        alignSelf: 'center',
        marginVertical: 20
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 0.2,
        borderColor: 'black',
        alignSelf: 'center'
    },
    detailsView: {
        alignItems: 'center',
        marginTop: 25,
        justifyContent: 'space-around',

    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 25
    },
    spiner: {
        flex: 1,
        justifyContent: 'center'
    }
})

export default accountScreen;