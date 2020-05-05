import React, { useContext } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Context as CustomerContext } from '../context/CustomerContext';

const Message = ({ message, side }) => {
    const isLeftSide = side === 'left'
    const { state: { img } } = useContext(CustomerContext)
    //סוכן שמאל
    //לקוח ימין
    const containerStyles = isLeftSide ? styles.container : flattenedStyles.container
    const textContainerStyles = isLeftSide ? styles.textContainer : flattenedStyles.textContainer
    const textStyles = isLeftSide ? flattenedStyles.leftText : flattenedStyles.rightText

    return (
        <View style={containerStyles}>
            {!isLeftSide ?
                < Image
                    style={styles.contactImage}
                    source={img ? { uri: img } : null}
                />
                : null
            }
            <View style={textContainerStyles}>
                <Text style={textStyles}>
                    {message}
                </Text>
            </View>
            {isLeftSide ?
                < Image
                    style={styles.contactImage}
                    source={require('../../assets/genericAgentFace.jpg')}
                />
                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 3,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1
    },
    textContainer: {
        width: 160,
        backgroundColor: 'grey',
        borderRadius: 40,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginLeft: 10
    },
    rightContainer: {
        justifyContent: 'flex-start'
    },
    rightTextContainer: {
        backgroundColor: '#7398C3',
        marginRight: 10
    },
    leftText: {
        textAlign: 'left'
    },
    contactImage: {
        height: 25,
        width: 25,
        borderRadius: 25
    },
    text: {
        fontSize: 13
    }
})

const flattenedStyles = {
    container: StyleSheet.flatten([styles.container, styles.rightContainer]),
    textContainer: StyleSheet.flatten([styles.textContainer, styles.rightTextContainer]),
    leftText: StyleSheet.flatten([styles.leftText, styles.text]),
    rightText: StyleSheet.flatten([styles.leftText, styles.text])
}
export default Message;