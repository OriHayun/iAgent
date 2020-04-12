import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Spacer from '../spacer';
import TicketInfo from './TicketInfo';
import TicketImage from './TicketImage';
import { navigate } from '../../navigationRef';


const tripTicket = ({ trip }) => {
    return (
        <Spacer>
            <TouchableOpacity onPress={() => navigate('trip', {trip})} >
                <View style={styles.ticket}>

                    <TicketImage
                        _destination={trip._Destination}
                    />
                    <TicketInfo
                        _destination={trip._Destination}
                        _depart={trip._Depart}
                        _return={trip._Return}
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
        width: Dimensions.get('window').width - 45,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'grey',
        alignSelf: 'center',
        backgroundColor: '#cce6ff'
    }
})

export default tripTicket;