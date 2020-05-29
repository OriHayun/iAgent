import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const cameraType = ({ type, setType }) => {


    return (
        <TouchableOpacity
            style={{
                flex: 0.2,
                alignSelf: 'flex-end',
                alignItems: 'center',
            }}
            onPress={() => {
                setType(
                    type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                );
            }}>
            <Ionicons style={{ marginBottom: 10, marginLeft: 10 }} name="md-reverse-camera" size={30} color="black" />
        </TouchableOpacity>
    );
};

export default cameraType;