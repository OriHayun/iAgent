import React, { useContext, useState, useEffect } from 'react';
import { FlatList, View, Platform, KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons'
import ChatInput from '../components/ChatInput';
import Message from '../components/Message';
import { Context as CustomerContext } from '../context/CustomerContext';

const chatScreen = () => {

    const { state: { customerId } } = useContext(CustomerContext);
    const [messages, setMessages] = useState([])

    useEffect(() => {
        firebase.database().ref(`/chat/${customerId}`).on('child_added', (snapshot) => {
            setMessages(prevMessages => [snapshot.val(), ...prevMessages])
        })
    }, [])

    listener = () => {
        firebase.database().ref(`/chat/${customerId}`).on('child_added', (snapshot) => {
            setMessages([...messages, snapshot.val()])
        })
    }

    onSend = (message) => {
        firebase.database().ref(`/chat/${customerId}`).push().set({
            //צריך פה להשתמש במזהה של היוזר שלנו כדי שנידע באיזה צד לשים את ההודעה
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
            <SafeAreaView>
                <View style={styles.messagesContainer}>
                    <FlatList
                        inverted
                        data={messages}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <Message side={item.userId !== customerId ? 'left' : 'right'} message={item.message} />
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
            tabStyle: { backgroundColor: '#266dd1' },
            labelStyle: { fontSize: 16 },
            activeTintColor: 'white',
            inactiveTintColor: 'gray',
        },

        tabBarIcon: ({ focused }) => {
            return <AntDesign size={focused ? 25 : 18} name='wechat' />;
        }

        // tabBarIcon: <AntDesign size={25} name='wechat' />
    };
};

const styles = StyleSheet.create({
    messagesContainer: {
        height: '100%',
        paddingBottom: 100,
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