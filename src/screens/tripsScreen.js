import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, View } from 'react-native';
import { Text } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'
import { SafeAreaView } from 'react-navigation'
import { Context as CustomerContext } from '../context/CustomerContext';
import { Context as TripsContext } from '../context/TripsContext';
import TripTicket from '../components/trips/TripTicket';




const tripsScreen = () => {
    const { state: { customerId } } = useContext(CustomerContext);
    const { state: { arrTrips }, getCustomerTrips } = useContext(TripsContext);

    useEffect(() => {
        getCustomerTrips(customerId)
    }, [])

    return (
        <View style={styles.container}>
            <SafeAreaView forceInset={{ top: 'always' }}>
                <Text h2 style={styles.header}>הטיולים שלי</Text>
                {arrTrips.length > 0 ?
                    <FlatList
                        data={arrTrips[0].trips}
                        keyExtractor={trip => trip.Id.toString()}
                        renderItem={({ item }) => {
                            console.log('item = ', item)
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
        title: 'טיולים',
        tabBarOptions: {
            tabStyle: { backgroundColor: '#a3a375' },
            labelStyle: { fontSize: 16 }
        },
        tabBarIcon: <Entypo size={20} name='suitcase' />
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(100,145,177,0.7)'
    },
    header: {
        textAlign: 'center',
        marginVertical: 10
    }
})

export default tripsScreen;