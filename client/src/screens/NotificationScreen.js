import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, FlatList, Vibration, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements'
import { Notifications } from 'expo';
import registerForPushNotificationsAsync from '../components/pushNotification/getPermissions';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as NotificationContext } from '../context/NotificationContext';
import ListNotification from '../components/pushNotification/ListNotification';
import Spacer from '../components/spacer';
import NotificationModal from '../components/pushNotification/notifigationModal';
const notificationScreen = () => {

    const { state: { token } } = useContext(AuthContext);
    const { state: { notifications }, getLastNotification } = useContext(NotificationContext);
    const [not, setNot] = useState(notifications[0]);
    const [showMosal, setShowModal] = useState(false);

    useEffect(() => {
        (async function bringPnToken() {
            const pnToken = await registerForPushNotificationsAsync();
            fetch('http://proj.ruppin.ac.il/igroup4/prod/api/notification/pntoken/' + pnToken, {
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

    handleNotification = notification => {
        Vibration.vibrate();
        getLastNotification(notification.data.RequestId)
    };

    changeNot = (key) => {
        setNot(notifications[key])
        _showModal();
    }

    _showModal = () => {
        if (showMosal == true) {
            setShowModal(false)
        }
        else {
            setShowModal(true);
        }
    }

    return (
        <View style={styles.container}>
            {notifications.length > 0 ?
                <FlatList
                    data={notifications}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <Spacer />
                                <ListNotification
                                    notification={item}
                                    notKey={index}
                                    changeNot={changeNot}
                                />
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
            <NotificationModal
                visible={showMosal}
                closeModal={_showModal}
                padPath={not.padPath}
                message={not.message}
            />
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