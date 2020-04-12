import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { key } from '../../api/unsplash';
import axios from 'axios';

const ticketImage = ({ _destination }) => {
    const [imageUri, setImageUri] = useState('');

    useEffect(() => {
        (async function image() {
            const response = await axios.get(`https://api.unsplash.com/search/photos?query=${_destination}&client_id=${key}`)
            setImageUri(response.data.results[0].urls.small)
        })();
    }, [])

    return (
        <>
            {imageUri !== '' ?
                <Image source={{ uri: imageUri }} style={styles.image} />
                :
                <Image
                    source={require('../../../assets/defaultImage.png')}
                    style={styles.image}
                />
            }
        </>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 0.8,
        borderRadius: 2,
        alignSelf: 'center',
        height: 130,
        width: 120,
        justifyContent: 'center'
    }
})

export default ticketImage;