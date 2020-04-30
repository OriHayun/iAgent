import React from 'react';
import { Image } from 'react-native';

const logo = ({logo}) => {
    return (
        <Image resizeMode='cover' source={require('../../assets/iAgentLogo.png')} style={logo} />
    );
};

export default logo;