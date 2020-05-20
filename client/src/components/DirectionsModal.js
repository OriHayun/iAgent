import React from 'react'
import { View, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const directionsModal = ({ dirType, visible, LHL, closeModal }) => {
    console.log(LHL)
    let infoLable = 'קווי אוטובוס:'
    let info = LHL.bus.length > 0 ? LHL.bus[0].value : null;
    if (dirType === 'subway') {
        infoLable = 'רכבת תחתית:'
        info = LHL.subway[0].value
    }
    else if (dirType === 'train') {
        infoLable = 'רכבת:'
        info = LHL.train[0].value
    }
    return (
        <Modal transparent={true} visible={visible}>
            <View style={styles.noneFocusView}>
                <View style={styles.focusView}>
                    <Text style={styles.header}>Go with {dirType}</Text>
                    <Text style={styles.body}>{infoLable}</Text>
                    <Text style={styles.body}>{info}</Text>
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
        height: 300,
        width: 300,
        alignSelf: 'center'
    },
    header: {
        fontSize: 30,
        fontWeight: '900',
        alignSelf: 'center',
        paddingBottom: 20
    },
    body: {
        fontSize: 17,
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    arrowBack: {
        position: 'absolute',
        marginLeft: 20,
        marginTop: 15,
        padding: 10
    }
})

export default directionsModal;