import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation'
import Spacer from '../components/spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions';

const accountScreen = ({ navigation }) => {
    const { state: { token }, signout } = useContext(AuthContext);
    const [img, setImg] = useState(null);
    const [url, setUrl] = useState()
    const [customer, setCustomer] = useState({});
    // const customer = {
    //     img,
    //     fullName: 'אורי חיון',
    //     email: 'hayun.ori@gmail.com',
    //     birthdate: '04.08.1993',
    //     age: null
    // }
    // const DOB = customer.birthdate.split('.')
    // const today = new Date();
    // let age = today.getFullYear() - DOB[2];
    // customer.age = age

    useEffect(() => { 
        // לגשת לשרת ולקחת את הפרטים של הלקוח ולאחסן בסטייט ולהציג על המסך
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
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.cancelled) {
            //להעלות אותה לשרת
            setImg(result.uri)
        }
    };

    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
            <Text h2 style={styles.header} >אזור אישי</Text>
            {img ?
                <Image source={{ uri: img }} style={styles.image} />
                : null
            }
            <View style={styles.detailsView}>
                <Spacer>
                    <Text h3> {customer.fullName} </Text>
                </Spacer>
                <Spacer>
                    <Text h3> {customer.email}</Text>
                </Spacer>
                <Spacer>
                    <Text h3> {customer.age}</Text>
                </Spacer>
            </View>
            <View style={styles.btnView}>
                <Button
                    title="התנתק"
                    onPress={signout}
                />
                <Button
                    title="בחר תמונה"
                    onPress={this._pickImage}
                />
            </View>

        </SafeAreaView>
    );
}

accountScreen.navigationOptions = () => {
    return {
        title: 'אזור אישי',
        tabBarOptions: {
            tabStyle: { backgroundColor: '#6b6b47' },
            labelStyle: { fontSize: 16 }
        },
        tabBarIcon: <FontAwesome size={20} name='user' />
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(200,200,200,0.7)'
    },
    header: {
        alignSelf: 'center',
        marginVertical: 20
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
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
    }
})

export default accountScreen;