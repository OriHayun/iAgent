import React, { useContext, useState } from 'react'
import { View, StyleSheet, Text, Modal, TouchableOpacity, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Context as NotificationContext } from '../context/NotificationContext';
import { Context as CustomerContext } from '../context/CustomerContext';

import DatePicker from 'react-native-datepicker'
import NumericInput from 'react-native-numeric-input'


const orderModal = ({ visible, closeModal, tripId, attractionId, attractionName, minDate, maxDate }) => {

    const { pushNotificationToDb } = useContext(NotificationContext);
    const { state: { customerId } } = useContext(CustomerContext)
    const [numOfTickets, setNumOfTickets] = useState(1);
    const [requestedDate, setRequestedDate] = useState(new Date());

    const makeReservation = () => {
        let d = new Date(requestedDate);
        let dateString = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
        pushNotificationToDb(tripId, attractionId, dateString, numOfTickets, customerId, attractionName);
    }

    return (
        <Modal transparent={true} visible={visible}>
            <View style={styles.noneFocusView}>
                <View style={styles.focusView}>
                    <Text style={styles.header}>בקשת הזמנה</Text>
                    <View style={{ alignItems: 'center' }}>
                        <NumericInput
                            rounded
                            minValue={numOfTickets}
                            value={numOfTickets}
                            onChange={value => setNumOfTickets(value)}
                            rightButtonBackgroundColor='#5cd65c'
                            leftButtonBackgroundColor='#ff4d4d'
                        />
                    </View>
                    <DatePicker
                        style={{ width: 200, marginVertical: 15 }}
                        date={new Date()}
                        mode="date"
                        placeholder="בחר תאריך רצוי"
                        format="DD-MM-YYYY"
                        // minDate={minDate}
                        // maxDate={maxDate}
                        confirmBtnText="אישור"
                        cancelBtnText="ביטול"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => setRequestedDate(date)}
                    />
                    <Button
                        title='בצע הזמנה'
                        onPress={makeReservation}
                    />
                    <TouchableOpacity style={styles.arrowBack} onPress={closeModal}>
                        <Ionicons name='ios-arrow-back' size={35} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    noneFocusView: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)"
    },
    focusView: {
        backgroundColor: "white",
        marginHorizontal: 50,
        marginVertical: 100,
        padding: 40,
        borderRadius: 10,
        height: 200,
        width: 300,
        alignSelf: 'center',
        flex: 0.5,
    },
    arrowBack: {
        position: 'absolute',
        marginLeft: 20,
        marginTop: 15,
        padding: 10
    },
    header: {
        fontSize: 30,
        fontWeight: '900',
        alignSelf: 'center',
        paddingBottom: 20
    },
    space: {
        marginBottom: 15
    }
})

export default orderModal;