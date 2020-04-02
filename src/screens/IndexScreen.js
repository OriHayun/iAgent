import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import LocalHighlight from '../components/LocalHighlight';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { key } from '../api/triposo';
import { accountId } from '../api/triposo';
import { Ionicons } from '@expo/vector-icons'

const indexScreen = () => {

    const [location, setLocation] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [localHighlights, setLocalHighlights] = useState([]);

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setErrorMessage('יש לאפשר שירותי מיקום')
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        fingLocalHighlights(loc.coords.latitude, loc.coords.longitude)
    };

    fingLocalHighlights = (latitude, longitude) => {
        const url = `https://www.triposo.com/api/20190906/local_highlights.json?latitude=48.858093&longitude=2.294694&poi_fields=all&account=${accountId}&token=${key}`
        fetch(url)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                setLocalHighlights(data.results[0].pois)
            })
    }

    useEffect(() => {
        getLocationAsync();
    }, [])

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            {location ?
                <Text h2 style={{ alignSelf: 'center' }}>חם באזורך</Text>
                : null
            }
            {localHighlights.length ?
                <FlatList
                    data={localHighlights}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <LocalHighlight
                                myCoords={{ latitude: 48.858093, longitude: 2.294694 }}
                                item={item}
                                id={item.id}
                                name={item.name}
                                score={item.score.toFixed(1)}
                                uri={item.images.length ? item.images[0].sizes.medium.url : null}
                                arrLength={item.images.length ? item.images.length : null}
                            />
                        );
                    }}
                />
                : null
            }
            {errorMessage ? <Text>{errorMessage}</Text> : null}
        </SafeAreaView>
    );
}

indexScreen.navigationOptions = ({ navigation }) => {
    return {
        title: 'I Agent',
        headerTitleAlign: 'center',
        headerLeft:
            <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                <Ionicons name="md-notifications" style={styles.notification} />
            </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    notification: {
        fontSize: 30,
        marginLeft: 10
    }
})

export default indexScreen;