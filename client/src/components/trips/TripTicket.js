import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Spacer from '../spacer';
import TicketInfo from './TicketInfo';
import TicketImage from './TicketImage';
import { navigate } from '../../navigationRef';

const tripTicket = ({ trip, style }) => {


    return (
        <Spacer>
            <TouchableOpacity onPress={() => navigate('trip', { trip })} >
                <View style={style ? style : styles.ticket}>

                    <TicketImage
                        _destination={trip.Destination}
                    />
                    <TicketInfo
                        _destination={trip.Destination}
                        _depart={trip.DepartDate}
                        _return={trip.ReturnDate}
                    />

                </View>
            </TouchableOpacity>
        </Spacer>
    );
}

const styles = StyleSheet.create({
    ticket: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 150,
        width: Dimensions.get('window').width-30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'grey',
        alignSelf: 'center',
        backgroundColor: '#e6e6e6'
    }
})

export default tripTicket;