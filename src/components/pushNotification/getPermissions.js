import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default async function registerForPushNotificationsAsync() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
        alert('No notification permissions!');
        return;
    }

    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    return (
        // POST the token to your backend server from where you can retrieve it to send push notifications.
        token
    );
}