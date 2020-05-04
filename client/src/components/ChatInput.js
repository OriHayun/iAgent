import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
const ChatInput = ({ sendMsg }) => {

  const [message, setMessage] = useState('')

  const handlePress = () => {
    if (message === ' ' || message === '') {
      return;
    }
    sendMsg(message)
    setMessage('');
  }

  return (
    <View style={styles.container}>
      <Ionicons name='ios-close' size={25} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          multiline={true}
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
    width: '70%',
  },
  input: {
    height: 60,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: 'row',
    paddingHorizontal: 10
  }
})

export default ChatInput;