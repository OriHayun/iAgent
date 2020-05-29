import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const cameraFlash = ({ flash, setFlash, type }) => {

    return (
        <TouchableOpacity
            style={{
                flex: 0.2,
                alignSelf: 'flex-end',
                alignItems: 'center',
            }}
            onPress={() => {
                setFlash(
                    flash === Camera.Constants.FlashMode.on
                        ? Camera.Constants.FlashMode.off
                        : Camera.Constants.FlashMode.on
                );
            }}>
            {type === Camera.Constants.Type.back && flash === Camera.Constants.FlashMode.on ?
                <Ionicons style={{ marginBottom: 10 }} name="ios-flash" size={30} color="black" />
                :
                <Ionicons style={{ marginBottom: 10 }} name="ios-flash-off" size={30} color="black" />

            }
        </TouchableOpacity>
    );
};

export default cameraFlash;