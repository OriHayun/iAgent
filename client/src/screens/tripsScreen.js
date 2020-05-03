import React, { useContext } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, View } from 'react-native';
import { Text } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import { Context as TripsContext } from '../context/TripsContext';
import TripTicket from '../components/trips/TripTicket';

const tripsScreen = () => {

    const { state: { arrTrips } } = useContext(TripsContext);

    return (
        <View style={styles.container}>
            <SafeAreaView forceInset={{ top: 'always' }}>
                <Text h2 style={styles.header}>הטיולים שלי</Text>
                {arrTrips.length > 0 ?
                    <FlatList
                        data={arrTrips[0].trips}
                        keyExtractor={trip => trip.TripID.toString()}
                        renderItem={({ item }) => {
                            return (
                                <TripTicket
                                    trip={item}
                                />
                            );
                        }}
                    />
                    : <ActivityIndicator size='large' />
                }
            </SafeAreaView>
        </View>
    );
}

tripsScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#f2f2f2'
    },
    header: {
        textAlign: 'center',
        marginVertical: 10,
        color: 'rgba(0,0,0,0.8)'
    }
})

export default tripsScreen;