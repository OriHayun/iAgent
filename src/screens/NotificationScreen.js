import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, FlatList, Vibration, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements'
import { Notifications } from 'expo';
import registerForPushNotificationsAsync from '../components/pushNotification/getPermissions';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as NotificationContext } from '../context/NotificationContext';
import { Context as CustomerContext } from '../context/CustomerContext';
import ListNotification from '../components/pushNotification/ListNotification';
import Spacer from '../components/spacer';


const notificationScreen = () => {

    const { state: { token } } = useContext(AuthContext);
    // const [arrNotification, setArrNotification] = useState([]);
    const { state: { customerId } } = useContext(CustomerContext);
    const { state: { notifications }, getNotificationsFromDb } = useContext(NotificationContext);


    useEffect(() => {
        (async function bringPnToken() {
            const pnToken = await registerForPushNotificationsAsync();
            fetch('http://proj.ruppin.ac.il/igroup4/mobile/servertest/api/notification/pntoken/' + pnToken, {
                method: "POST",
                headers: new Headers({
                    'Authorization': `${token}`
                }),
            })
                .then(
                    () => {
                        console.log('post pnToken success');
                    },
                    (error) => {
                        console.log("err post=", error);
                    });
        })();
        notificationSubscription = Notifications.addListener(handleNotification);
    }, [])

    // useEffect(() => {
    //     console.log(arrNotification)
    // }, [arrNotification])

    useEffect(() => {
        getNotificationsFromDb(customerId);
    }, [])

    handleNotification = notification => {
        Vibration.vibrate();
        //לוודא ששולחים לי בהתראה את המזהה של הבקשה
        // getLastNotification(notification.requestId)
        setArrNotification(prevArrNotification => ([notification, ...prevArrNotification]))
    };

    return (
        <View style={styles.container}>
            {notifications.length > 0 ?
                <FlatList
                    data={notifications}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <>
                                <Spacer />
                                <ListNotification notification={item} />
                            </>
                        );
                    }}
                />
                :
                <View style={styles.noNotification}>
                    <ActivityIndicator size='large' />
                    <Text h3>לא נמצאו התראות</Text>
                </View>
            }
        </View>
    );

}

notificationScreen.navigationOptions = () => {
    return {
        title: 'התראות',
        headerTitleAlign: 'center',
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    noNotification: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center'

    }
})
export default notificationScreen;