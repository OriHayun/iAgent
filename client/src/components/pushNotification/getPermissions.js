import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default async function registerForPushNotificationsAsync() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
        alert('No notification permissions!');
        return;
    }

    let pnToken = await Notifications.getExpoPushTokenAsync();
    console.log(pnToken);

    return (
        pnToken
    );
}