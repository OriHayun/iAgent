import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, View, Dimensions, Button } from 'react-native';
import { Text } from 'react-native-elements';
import Logo from '../components/Logo';
import { SafeAreaView } from 'react-navigation';
import LocalHighlight from '../components/LocalHighlight';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { key } from '../api/triposo';
import { accountId } from '../api/triposo';
import { Ionicons } from '@expo/vector-icons'
import { Context as customerContext } from '../context/CustomerContext';
import { Context as TripContext } from '../context/TripsContext';
import { Context as NotificationContext } from '../context/NotificationContext';
import TripTicket from '../components/trips/TripTicket';
import Timer from '../components/timer';

const indexScreen = ({ navigation }) => {

    const { state: { customerId }, getCustomer } = useContext(customerContext)
    const { state: { arrTrips }, getCustomerTrips } = useContext(TripContext);
    const { getNotificationsFromDb } = useContext(NotificationContext);

    const [location, setLocation] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [localHighlights, setLocalHighlights] = useState([]);
    const [closeTripDepartDate, setCloseTripDepartDate] = useState(new Date());
    const [closeTripReturnDate, setCloseTripReturnDate] = useState(new Date());

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
        getCustomer();
    }, [])

    useEffect(() => {
        getCustomerTrips(customerId);
        getNotificationsFromDb(customerId);
    }, [customerId])

    useEffect(() => {
        if (arrTrips.length > 0) {
            setCloseTripDepartDate(new Date(arrTrips[0].trips[0].DepartDate));
            setCloseTripReturnDate(new Date(arrTrips[0].trips[0].ReturnDate));
        }
    }, [arrTrips])

    return (
        <View style={styles.container}>
            {arrTrips.length > 0 ?
                <SafeAreaView forceInset={{ top: 'always' }}>
                    {new Date() > closeTripDepartDate && new Date() < closeTripReturnDate ?
                        <>
                            {location ?
                                <Text h2 style={{ alignSelf: 'center', color: 'rgba(0,0,0,0.8)' }}>חם באזורך</Text>
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
                                : <ActivityIndicator size='large' style={styles.spiner} />
                            }
                            {errorMessage ? <Text>{errorMessage}</Text> : null}
                        </>
                        :
                        <>
                            <Text h2 style={styles.nextTripHeader}>הטיולים שלי</Text>
                            <TripTicket
                                trip={arrTrips[0].trips[0]}
                                style={styles.indexTicket}
                            />
                            <Timer
                                departDate={new Date(arrTrips[0].trips[0].DepartDate)}
                            />
                            <View style={styles.searchAtractionBtn}>
                                <Button
                                    title='הוסף אטרקציה'
                                    onPress={() => navigation.navigate('search', { trip: arrTrips[0].trips[0] })}
                                />
                            </View>
                        </>
                    }
                </SafeAreaView>
                : <Text style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>אין טיולים באופק</Text>
            }
        </View>
    );
}


indexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: () => {
            return (
                <Logo logo={styles.logo} />
            )
        },
        headerStyle: {
            backgroundColor: '#dddce1'
        },
        headerTitleAlign: 'center',
        headerLeft: () => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                    <>{
                        <Ionicons name="md-notifications" style={styles.notification} />
                    }
                    </>
                </TouchableOpacity>
            )
        }
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#595959',
    },
    spiner: {
        flex: 1,
        justifyContent: 'center'
    },
    notification: {
        fontSize: 30,
        marginLeft: 10
    },
    logo: {
        height: 80,
        width: 140,
        resizeMode: 'contain',
    },
    header: {
        textAlign: 'center',
        marginVertical: 10,
        color: 'rgba(0,0,0,0.8)'
    },
    nextTripHeader: {
        textAlign: 'center',
        marginVertical: 10,
        color: 'rgba(0,0,0,0.8)'
    },
    indexTicket: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 160,
        width: Dimensions.get('window').width - 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'grey',
        alignSelf: 'center',
        backgroundColor: '#e6e6e6'
    },
    searchAtractionBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    }
})

export default indexScreen;