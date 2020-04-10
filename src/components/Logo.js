import React from 'react';
import { StyleSheet, Image } from 'react-native';
import Logo from '../../assets/iAgentLogo.png';

const logo = ({logo}) => {
    return (
        <Image resizeMode='cover' source={require('../../assets/iAgentLogo.png')} style={logo} />
    );
};

export default logo;