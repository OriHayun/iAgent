import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import CameraType from '../components/camera/cameraType';
import CameraFlash from '../components/camera/cameraFlash';
import CameraSnap from '../components/camera/cameraSnap';
import * as FileSystem from 'expo-file-system';


const cameraScreen = ({ }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.on);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    snap = async () => {
        if (camera) {
            const options = { quality: 1 };
            camera.takePictureAsync({ skipProcessing: true }).then((photo) => {
                onPictureSaved(photo);
            });
        }
    };

    onPictureSaved = async (img) => {
        console.log(img)
        // const path = `${FileSystem.documentDirectory}DCIM/Camera`
        // console.log(path)

        // FileSystem.copyAsync({
        //     from: img.uri,
        //     to: path
        // }).then(() => {
        //     console.log('נשמר')
        // }).catch((error) => {
        //     console.log(error)
        // });
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>יש לאפשר גישה למצלמה</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera
                style={{ flex: 1 }}
                type={type}
                flashMode={flash}
                ref={ref => {
                    camera = ref;
                }}>
                <View style={styles.toolbar}>
                    <CameraType type={type} setType={setType} />
                    <CameraSnap snap={snap} />
                    <CameraFlash flash={flash} setFlash={setFlash} type={type} />
                </View>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    toolbar: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    }
})

export default cameraScreen;
