import React from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons'
import { GiftedChat } from 'react-native-gifted-chat-fix';


class chatScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            ref: firebase.database().ref('/chat')
        }
    }

    componentDidMount() {
        const ref = this.state.ref;

        ref.on('child_added', (snapshot) => {
            let message = snapshot.val();
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        })
    }

    onSend(message) {
        const ref = this.state.ref;
        ref.push().set({
            name: "Ori Hayun",
            message,
        })
    }

    render() {

        const chat = <GiftedChat
            messages={this.state.messages}
            onSend={message => this.onSend(message)}
        />

        if (Platform.OS === 'android') {
            return (
                <KeyboardAvoidingView
                    style={{ flex: 1 , backgroundColor:'rgba(200,200,200,0.7)' }}
                    behavior='height'
                    keyboardVerticalOffset={40}
                    enabled
                >
                    {chat}
                </KeyboardAvoidingView>
            );
        }
        return (
            <SafeAreaView style={{backgroundColor:'rgba(200,200,200,0.7)'}}>
                {chat}
            </SafeAreaView>
        )
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

const styles = StyleSheet.create({})

export default chatScreen;