import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { Notifications } from 'expo';
import registerForPushNotificationsAsync from '../components/pushNotification/getPermissions';

class notificationScreen extends Component {

    state = {
        notification: {},
    };

    componentDidMount() {
        registerForPushNotificationsAsync();
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = notification => {
        // do whatever you want to do with the notification
        this.setState({ notification }, () => console.log(this.state.notification));
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Origin: {this.state.notification.origin}</Text>
                <Text>Data: {JSON.stringify(this.state.notification)}</Text>
            </View>
        );
    }
}
export default notificationScreen;