import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Button, Modal, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';

const tripAlbumScreen = ({ navigation }) => {
    const tripId = navigation.getParam('tripId');
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [deleteIcon, setDeleteIcon] = useState(false);
    const [selectedImageDelete, setSelectedImageDelete] = useState('')
    const [selected, setSelected] = useState(false);

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
        fetch(`http://proj.ruppin.ac.il/igroup4/prod/api/Trip/addToAlbum/${tripId}`, options)
            .then(
                () => {
                    let newImage = { url: imageUrl[0] }
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
            const response = await axios.get(`http://proj.ruppin.ac.il/igroup4/prod/api/Trip/getTripAlbum//${tripId}`)
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
        fetch(`http://proj.ruppin.ac.il/igroup4/prod/api/Trip/removeImage/${tripId}`, options)
            .then(
                () => {
                    console.log('Image deleted');
                    let arr = [];
                    images.forEach(img => {
                        if (img.url != selectedImageDelete) {
                            arr.push(img);
                        }
                    })
                    console.log(arr);
                    setSelectedImageDelete('');
                    setImages(arr);
                },
                (error) => {
                    console.log("err post=", error);
                });
        setDeleteIcon(false);
    }

    return (
        <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
            {images.length > 0 ?
                <>
                    <View>
                        <FlatList
                            data={images}
                            keyExtractor={(item) => item.url}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        style={selected ? styles.selected : null}
                                        onPress={() => imageClick(item.url)}
                                        onLongPress={() => showDelteIcon(item.url)}
                                    >
                                        <Image style={{ width: 100, height: 100 }} source={{ uri: item.url }} />
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
                        <TouchableOpacity style={{ flex: 0.1, padding: 20 }} onPress={removeImage}>
                            <Feather name="trash-2" size={24} color="black" />
                        </TouchableOpacity>
                    }
                </>
                : <Text>האלבום ריק</Text>
            }
        </View >
    );
};

tripAlbumScreen.navigationOptions = ({ navigation }) => {
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

                    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('camera', {})}>
                        <AntDesign name="camera" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={pickImage}>
                        <AntDesign name="plus" size={24} color="black" />
                    </TouchableOpacity>

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
        borderWidth: 1,
        borderColor: 'black'
    }
});


export default tripAlbumScreen;