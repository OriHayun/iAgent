import React from 'react'
import { View, StyleSheet, Modal, TouchableOpacity, Linking, Text } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';

const notificationModal = ({ visible, closeModal, pdfPath, message }) => {

    showPdfFile = () => {
        Linking.canOpenURL(pdfPath).then(supported => {
            if (supported) {
                Linking.openURL(pdfPath);
            } else {
                console.log("Don't know how to open URI: " + wikipediaUrl);
            }
        });
    }
    return (
        <Modal transparent={true} visible={visible}>
            <View style={styles.noneFocusView}>
                <View style={styles.focusView}>
                    <Text style={{ marginTop: 20, marginLeft: 20, fontSize: 18 }}>{message}</Text>
                    {pdfPath ?
                        <TouchableOpacity style={{ alignItems: 'center', paddingTop: 20 }} onPress={showPdfFile} >
                            <Entypo name="ticket" size={30} color="black" />
                            <Text style={{ fontSize: 12 }}>לצפייה בכרטיסים</Text>
                        </TouchableOpacity>
                        : null
                    }
                    <TouchableOpacity style={styles.arrowBack} onPress={closeModal}>
                        <Ionicons name='ios-arrow-forward' size={35} />
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
        marginVertical: 200,
        padding: 40,
        height: 200,
        width: 250,
        alignSelf: 'center',
        borderTopRightRadius: 70,
        borderBottomLeftRadius: 70
    },
    arrowBack: {
        position: 'absolute',
        marginLeft: 20,
        marginTop: 15,
        padding: 3
    }
})

export default notificationModal;