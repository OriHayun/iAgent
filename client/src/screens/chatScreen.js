import React, { useContext, useState, useEffect } from 'react';
import { FlatList, View, Platform, KeyboardAvoidingView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons'
import ChatInput from '../components/ChatInput';
import Message from '../components/Message';
import { Context as CustomerContext } from '../context/CustomerContext';
import moment from 'moment';
import axios from 'axios';
import ChatHedder from '../components/chatHedder';

const chatScreen = ({ navigation }) => {

    const { state: { customerId, agentId } } = useContext(CustomerContext);
    const [messages, setMessages] = useState([]);
    const [agentImage, setAgentImage] = useState(null);
    const [agentPhone, setAgentPhone] = useState('');
    const [agentMail, setAgentMail] = useState('');

    useEffect(() => {
        let counter = 0;
        firebase.database().ref(`/chat/${customerId}`).on('child_added', (snapshot) => {
            if (snapshot.val().id == -1) {
                if (counter == 0) {
                    counter = 1;
                    setMessages(prevMessages => [snapshot.val(), ...prevMessages])
                }
            }
            else {
                setMessages(prevMessages => [snapshot.val(), ...prevMessages])
            }
        })
    }, [])

    useEffect(() => {
        (async function () {
            const response = await axios.get(`http://proj.ruppin.ac.il/igroup4/prod/api/Agent`)
            const agents = response.data;

            agents.forEach(agent => {
                if (agent.AgentID == agentId) {
                    if (agent.Gender == 'ז') {
                        setAgentImage(require('../../assets/genericAgentFace2.jpg'))
                    }
                    else {
                        setAgentImage(require('../../assets/genericAgentFace.jpg'))
                    }
                    setAgentPhone(agent.PhoneNumber)
                    setAgentMail(agent.Email)
                }
            })
        })()
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

    useEffect(() => {
        noNewMessages()
        const focusListener = navigation.addListener('didFocus', () => {
            noNewMessages();
            return () => {
                focusListener.remove();
            }
        });
    }, [])

    noNewMessages = async () => {
        await axios.put(`http://proj.ruppin.ac.il/igroup4/prod/api/badge/noNewMessage/${customerId}`)
        navigation.setParams({ 'chatMessageBadge': 0 });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <SafeAreaView forceInset={{ top: 'always' }}>
                <View style={styles.messagesContainer}>
                    <ChatHedder
                        agentImage={agentImage}
                        agentPhone={agentPhone}
                        agentMail={agentMail}
                    />
                    <FlatList
                        inverted
                        data={messages}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <Message side={item.userId !== customerId ? 'left' : 'right'} message={item.message} time={item.time} agentImage={agentImage} />
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

chatScreen.navigationOptions = ({ navigation }) => {

    const chatMessageBadge = navigation.getParam('chatMessageBadge');

    return {
        title: "צ'ט",
        tabBarOptions: {
            tabStyle: { backgroundColor: '#dddce1' },
            labelStyle: { fontSize: 12 },
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
        },

        tabBarIcon: ({ focused }) => {
            return (
                <View>
                    {chatMessageBadge == 1 ?
                        <View style={styles.badge}></View>
                        : null
                    }
                    <AntDesign size={focused ? 25 : 18} name='wechat' color={focused ? "black" : "grey"} />
                </View>
            );
        }
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
    },
    badge: {
        height: 5,
        width: 5,
        borderRadius: 5,
        backgroundColor: 'red',
        position: 'absolute',
    }
})

export default chatScreen;