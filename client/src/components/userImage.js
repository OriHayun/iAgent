import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Animated, Dimensions } from 'react-native';

const userImage = ({ img }) => {
    const [doAnimation, setDoAnimation] = useState(false)
    const [animation, setAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animation, {
            toValue: doAnimation ? 1 : 0,
            duration: 1000
        }).start();
    }, [doAnimation]);

    return (
        <TouchableOpacity onPress={() => setDoAnimation(!doAnimation)}>
            <Animated.Image
                source={{ uri: img }}
                style={{
                    borderRadius: 100,
                    borderWidth: 0.2,
                    borderColor: 'black',
                    alignSelf: 'center',
                    width: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [200, Dimensions.get('screen').width - 20],
                    }),
                    height: animation.interpolate({
                        inputRange: [0, 1.5],
                        outputRange: [200, 350],
                    }),
                }}
            />
        </TouchableOpacity>
    );
}

export default userImage;