import React, { useContext, useState, useEffect } from 'react';
import { Text, FlatList, View, Platform, KeyboardAvoidingView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons'
import ChatInput from '../components/ChatInput';
import Message from '../components/Message';
import { Context as CustomerContext } from '../context/CustomerContext';
import moment from 'moment';

const chatScreen = ({ navigation }) => {

    const { state: { customerId } } = useContext(CustomerContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        firebase.database().ref(`/chat/${customerId}`).on('child_added', (snapshot) => {
            setMessages(prevMessages => [snapshot.val(), ...prevMessages])
        })
    }, [])

    listener = () => {
        firebase.database().ref(`/chat/${customerId}`).on('child_added', (snapshot) => {
            setMessages([snapshot.val(), ...messages])
        })
    }

    onSend = (message) => {
        firebase.database().ref(`/chat/${customerId}`).push().set({
            //צריך פה להשתמש במזהה של היוזר שלנו כדי שנידע באיזה צד לשים את ההודעה
            time: moment().format('HH:mm'),
            userId: customerId,
            message: message,
            id: messages.length
        })
        listener()
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <SafeAreaView forceInset={{ top: 'always' }}>
                <View style={styles.messagesContainer}>
                    <View style={styles.header}>
                        <Image style={{ height: 40, width: 40, borderRadius: 40, marginLeft: 18 }} source={require('../../assets/genericAgentFace.jpg')} />
                        <Text style={{ fontSize: 20, fontWeight: '800', alignSelf: 'center' }}>     היי איך אני יכולה לעזור?</Text>
                    </View>
                    <FlatList
                        inverted
                        data={messages}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <Message side={item.userId !== customerId ? 'left' : 'right'} message={item.message} time={item.time} />
                            )
                        }}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <ChatInput sendMsg={onSend} />
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

chatScreen.navigationOptions = () => {
    return {
        title: "צ'ט",
        tabBarOptions: {
            tabStyle: { backgroundColor: '#dddce1' },
            labelStyle: { fontSize: 12 },
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
        },

        tabBarIcon: ({ focused }) => {
            return <AntDesign size={focused ? 25 : 18} name='wechat' color={focused ? "black" : "grey"} />;
        }

        // tabBarIcon: <AntDesign size={25} name='wechat' />
    };
};

const styles = StyleSheet.create({
    messagesContainer: {
        height: '100%',
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#dddce1',
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    inputContainer: {
        width: '100%',
        height: 100,
        position: 'absolute',
        bottom: 0,
        paddingVertical: 10,
        paddingLeft: 20,
        borderTopWidth: 1,
        borderTopColor: 'grey'
    }
})

export default chatScreen;