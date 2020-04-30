import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const dirTypeIcon = ({ iconName, dirInfoModal }) => {
    return (
        <>
            <TouchableOpacity onPress={dirInfoModal}>
                <MaterialCommunityIcons
                    name={iconName}
                    size={50}
                />
            </TouchableOpacity>
        </>
    );
};

export default dirTypeIcon;