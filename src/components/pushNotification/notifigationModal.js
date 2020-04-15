import React from 'react'
import { View, StyleSheet, Modal, TouchableOpacity, Linking, Text } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const notificationModal = ({ visible, closeModal, padPath , message }) => {

    showPdfFile = () => {
        Linking.canOpenURL(padPath).then(supported => {
            if (supported) {
                Linking.openURL(padPath);
            } else {
                console.log("Don't know how to open URI: " + wikipediaUrl);
            }
        });
    }

    return (
        <Modal transparent={true} visible={visible}>
            <View style={styles.noneFocusView}>
                <View style={styles.focusView}>
                    <Text>{message}</Text>
                    <TouchableOpacity >
                        <AntDesign name='pdffile1' size={35} />
                    </TouchableOpacity>
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
    arrowBack: {
        position: 'absolute',
        marginLeft: 20,
        marginTop: 15,
        padding: 10
    }
})

export default notificationModal;