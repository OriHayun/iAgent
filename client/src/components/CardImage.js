import React from 'react';
import { Image, StyleSheet } from 'react-native';

const cardImage = ({ arrLength, uri }) => {
    return (
        <>
            {
                arrLength ?
                    <Image
                        style={styles.image}
                        source={{ uri }}
                    />
                    :
                    <Image
                        style={styles.image}
                        source={require('../../assets/defaultImage.png')}
                    />
            }
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 298,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    }
})

export default cardImage;