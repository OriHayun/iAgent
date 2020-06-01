import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, FlatList, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { SafeAreaView, NavigationActions } from 'react-navigation'
import { Context as AuthContext } from '../context/AuthContext';
import { Context as CustomerContext } from '../context/CustomerContext';
import { Context as TripsContext } from '../context/TripsContext';
import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions';
import { AntDesign, Entypo } from '@expo/vector-icons'
import TripProfileCard from '../components/tripProfile/TripProfileCard';
import UserImage from '../components/userImage';
import { Notifications } from 'expo';

const accountScreen = ({ navigation }) => {

    const { signout } = useContext(AuthContext);
    const { state: { arrTrips } } = useContext(TripsContext);
    const { state: { img }, changeImg } = useContext(CustomerContext);


    useEffect(() => {
        notificationSubscription = Notifications.addListener(handleNotification);
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
            console.log(result)
            changeImg(result)
        }
    };

    handleNotification = notification => {
        navigation.dispatch(NavigationActions.setParams({
            routeName: 'Chat',
            key: 'Chat',
            params: { 'chatMessageBadge': 1 },
        }));
    };



    return (
        <>
            {arrTrips.length > 0 ?
                <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
                    <Text h2 style={styles.header} >אזור אישי</Text>
                    {img ?
                        <UserImage img={img} />
                        :
                        <Image source={require('../../assets/defaultImage.png')} style={styles.image} />
                    }
                    <FlatList
                        data={arrTrips[0].trips}
                        keyExtractor={trip => trip.TripID.toString()}
                        renderItem={({ item }) => {
                            return (
                                <TripProfileCard trip={item} />
                            );
                        }}
                    />
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
                            onPress={_pickImage}
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
        borderRadius: 100,
        borderWidth: 0.2,
        borderColor: 'black',
        alignSelf: 'center',
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 30
    },
    spiner: {
        flex: 1,
        justifyContent: 'center'
    }
})

export default accountScreen;