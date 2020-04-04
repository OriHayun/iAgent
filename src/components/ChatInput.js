import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

const ChatInput = (props) => {

  const [message, setMessage] = useState('')

  const handlePress = () => {
    const messageArr = message.split('')
    console.log(messageArr)
    if (message === ' ' || message === '') {
      return;
    }
    props.sendMsg(message)
    setMessage('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="כתוב הודעה" />
      </View>
      <Button title="שלח" onPress={handlePress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  inputContainer: {
    width: '70%'
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: 'row',
    paddingHorizontal: 10
  }
})

export default ChatInput;