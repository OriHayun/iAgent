import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const cameraSnap = ({ snap }) => {
    return (
        <TouchableOpacity
            style={{
                flex: 0.6,
                alignSelf: 'flex-end',
                alignItems: 'center',
            }}
            onPress={snap}>
            <MaterialIcons style={{ marginBottom: 10 }} name="camera" size={40} color="black" />
        </TouchableOpacity>
    );
};

export default cameraSnap