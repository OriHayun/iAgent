import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { key } from '../../api/unsplash';
import axios from 'axios';

const ticketImage = ({ _destination }) => {
    const [imageUri, setImageUri] = useState('');

    getImage = async (destination) => {
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${destination}&client_id=${key}`)
        setImageUri(response.data.results[0].urls.small)
    }

    useEffect(() => {
        getImage(_destination);
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
        flex: 0.7,
        borderRadius: 2,
        alignSelf: 'center',
        height: 130,
        width: 130,
        justifyContent: 'center'
    }
})

export default ticketImage;