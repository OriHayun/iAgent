import React from 'react';
import { FlatList, View, Platform, KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons'
import ChatInput from '../components/ChatInput';
import Message from '../components/Message';

class chatScreen extends React.Component {



    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            //לקחת את היוזר שנמצא באפליקציה ולהחליף במקום 1
            userId: 1,
            ref: firebase.database().ref('/chat')
        }
    }

    componentDidMount() {
        firebase.database().ref('/chat').on('child_added', (snapshot) => {
            this.setState({
                messages: [snapshot.val(), ...this.state.messages]
            })
        })
    }

    onSend(message) {
        firebase.database().ref('/chat').push().set({
            //צריך פה להשתמש במזהה של היוזר שלנו כדי שנידע באיזה צד לשים את ההודעה
            userId: 1,
            message: message
        })
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.Os == "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <SafeAreaView>
                    <View style={styles.messagesContainer}>
                        <FlatList
                            inverted
                            data={this.state.messages}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <Message side={item.userId !== this.state.userId ? 'left' : 'right'} message={item.message} />
                                )
                            }}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <ChatInput sendMsg={this.onSend} />
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}


chatScreen.navigationOptions = () => {
    return {
        title: "צ'ט",
        tabBarOptions: {
            tabStyle: { backgroundColor: '#7a7a52' },
            labelStyle: { fontSize: 16 }
        },
        tabBarIcon: <AntDesign size={20} name='wechat' />
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