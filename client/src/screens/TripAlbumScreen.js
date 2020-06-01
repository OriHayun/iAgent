import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import axios from 'axios';
import { Feather, Entypo, AntDesign } from '@expo/vector-icons';
import { Context as NotificationContext } from '../context/NotificationContext';
import { Context as CustomerContext } from '../context/CustomerContext';

const tripAlbumScreen = ({ navigation }) => {

    const { pushNotificationToDb } = useContext(NotificationContext);
    const { state: { customerId } } = useContext(CustomerContext);

    const trip = navigation.getParam('trip');
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [deleteIcon, setDeleteIcon] = useState(false);
    const [selectedImageDelete, setSelectedImageDelete] = useState('')
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        navigation.setParams({ 'imagesLength': images.length })
    }, [images])

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.cancelled) {
            uploadImageToAlbum(result);
        }
    };

    takePicture = async () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        const result = await ImagePicker.launchCameraAsync(options)
        if (!result.cancelled) {
            uploadImageToAlbum(result);
        }
    };

    createFormData = (photo) => {
        const name = photo.uri.split('ImagePicker/');
        const data = new FormData();
        data.append("userPhoto", {
            name: name[1],
            type: photo.type + '/jpg',
            uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });

        return data;
    };

    saveToAlbumDb = async (imageUrl) => {
        const options = {
            method: "POST",
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8',
            }),
            body: JSON.stringify(`http://proj.ruppin.ac.il/igroup4/prod/${imageUrl[0]}`)
        }
        fetch(`http://proj.ruppin.ac.il/igroup4/prod/api/Trip/addToAlbum/${trip}`, options)
            .then(
                () => {
                    let newImage = { url: `http://proj.ruppin.ac.il/igroup4/prod/${imageUrl[0]}` }
                    console.log(newImage)
                    setImages(prevImages => [newImage, ...prevImages])
                },
                (error) => {
                    console.log("err post=", error);
                });
    }

    uploadImageToAlbum = async (result) => {
        console.log(result)
        const data = createFormData(result)

        fetch("http://proj.ruppin.ac.il/igroup4/prod/api/image/uploadimage", {
            method: "POST",
            body: data
        })
            .then(response => response.json())
            .then(response => {
                saveToAlbumDb(response);
            })
            .catch(error => {
                console.log("upload error", error);
                alert("Upload failed!");
            });
    }

    useEffect(() => {
        (async function () {
            const response = await axios.get(`http://proj.ruppin.ac.il/igroup4/prod/api/Trip/getTripAlbum//${trip.TripID}`)
            if (response.data.length > 0) {
                const album = [];
                response.data.forEach(imageUrl => {
                    let obj = { url: imageUrl };
                    album.push(obj);
                })
                setImages(album);
            }
        })()
    }, []);

    imageClick = (url) => {
        let arr = [];
        arr.push({ url })
        images.forEach(img => {
            if (img.url != url) {
                arr.push(img);
            }
        })
        setImages(arr)
        setShowModal(true)
    }

    showDelteIcon = (image) => {
        setDeleteIcon(true);
        setSelected(image)
        setSelectedImageDelete(image);
    }

    removeImage = async () => {
        const options = {
            method: "DELETE",
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8',
            }),
            body: JSON.stringify(selectedImageDelete)
        }
        fetch(`http://proj.ruppin.ac.il/igroup4/prod/api/Trip/removeImage/${trip.TripID}`, options)
            .then(
                () => {
                    console.log('Image deleted');
                    let arr = [];
                    images.forEach(img => {
                        if (img.url != selectedImageDelete) {
                            arr.push(img);
                        }
                    })
                    setSelectedImageDelete('');
                    setImages(arr);
                },
                (error) => {
                    console.log("err post=", error);
                });
        setDeleteIcon(false);
    }

    cancelDeleteOption = () => {
        setDeleteIcon(false);
        setSelectedImageDelete('');
        setSelected('');
    }

    askForLupa = () => {
        let orderDate = trip.ReturnDate.split('-');
        let convertOrderDate = `${orderDate[2]}/${orderDate[1]}/${orderDate[0]}`
        pushNotificationToDb(trip.TripID, `lupa`, convertOrderDate, 1, customerId, `lupa-album-${trip.Destination}`)
    }

    return (
        <View style={{ flex: 0.8 }}>
            {images.length > 0 ?
                <>
                    <View>
                        <FlatList
                            data={images}
                            keyExtractor={(item) => item.url}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={selected == '' ? () => imageClick(item.url) : null}
                                        onLongPress={() => showDelteIcon(item.url)}
                                    >
                                        <Image style={selected == item.url ? styles.selected : { width: 130, height: 130 }} source={{ uri: item.url }} />
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                    <Modal visible={showModal} transparent={true} >
                        <TouchableOpacity style={styles.closeModal} onPress={() => setShowModal(false)}>
                            <AntDesign name="closecircleo" size={24} color="white" />
                        </TouchableOpacity>
                        <ImageViewer imageUrls={images} />
                    </Modal>
                    {deleteIcon == true &&
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-start', padding: 20 }} onPress={removeImage}>
                                <Feather name="trash-2" size={35} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignSelf: 'flex-start', padding: 20 }} onPress={cancelDeleteOption}>
                                <Entypo name="arrow-with-circle-left" size={35} color="black" />
                            </TouchableOpacity>
                        </View>
                    }
                </>
                : null
            }
        </View >
    );
};

tripAlbumScreen.navigationOptions = ({ navigation }) => {
    const imagesLength = navigation.getParam('imagesLength')

    return {
        headerTitle: () => {
            return (
                <Text style={{ fontSize: 20, fontWeight: '700' }}>אלבום תמונות</Text>
            )
        },
        headerStyle: {
            backgroundColor: '#dddce1'
        },
        headerTitleAlign: 'center',
        headerRight: () => {
            return (
                <View style={{ flexDirection: 'row', marginRight: 5 }}>

                    <TouchableOpacity style={{ marginRight: 20 }} onPress={takePicture}>
                        <AntDesign name="camera" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={pickImage}>
                        <AntDesign name="plus" size={24} color="black" />
                    </TouchableOpacity>

                </View >
            )
        },
        headerLeft: () => {
            return (
                <View style={{ flexDirection: 'row', marginLeft: 5 }}>

                    <TouchableOpacity style={{ marginRight: 20, marginTop: 5 }} onPress={() => navigation.pop()}>
                        <Feather name="arrow-right" size={24} color="black" />
                    </TouchableOpacity>
                    {imagesLength > 0 ?
                        <>
                            <TouchableOpacity onPress={askForLupa}>
                                <Image style={{ height: 30, width: 30 }} source={require('../../assets/Lupaicon.png')} />
                            </TouchableOpacity>
                        </>
                        : null
                    }

                </View >
            )
        }
    }
}

const styles = StyleSheet.create({
    closeModal: {
        zIndex: 10,
        position: 'absolute',
        marginTop: 10,
        marginLeft: 10
    },
    selected: {
        height: 130,
        width: 130,
        borderWidth: 4,
        borderColor: 'black'
    }
});


export default tripAlbumScreen;