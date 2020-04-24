import React, { useState, useContext } from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import DirectionsModal from '../components/DirectionsModal';
import DirTypeIcon from '../components/DirTypeIcon';
import OrderModal from '../components/orderModal';
import { Context as TripContext } from '../context/TripsContext';

const localHighlightDetails = ({ navigation }) => {
    const item = navigation.getParam('item')
    const { state: { arrTrips } } = useContext(TripContext);
    const LHL = {
        name: item.name,
        images: item.images.map(img => img.sizes.original.url),
        bus: item.properties.filter(dir => dir.key === 'bus'),
        subway: item.properties.filter(dir => dir.key === 'subway'),
        train: item.properties.filter(dir => dir.key === 'train'),
        price: item.properties.filter(item => item.key === 'price')
    }
    const [dirType, setDirType] = useState('');
    const [showDirModal, setShowDirModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);

    toggleDirModal = (dirType) => {
        if (showDirModal == true) {
            setShowDirModal(false)

        }
        else {
            setDirType(dirType);
            setShowDirModal(true);
        }
    }

    toggleOrderModal = () => {
        if (showOrderModal == true) {
            setShowOrderModal(false)
        }
        else {
            setShowOrderModal(true)
        }
    }

    return (
        <>
            <Text h1 style={{ alignSelf: 'center' }}>{LHL.name}</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={LHL.images}
                keyExtractor={img => img}
                renderItem={(item) => {
                    return (
                        <Image style={styles.img} source={{ uri: item.item }} />
                    );
                }}
            />
            <DirectionsModal
                visible={showDirModal}
                dirType={dirType}
                LHL={LHL}
                closeModal={toggleDirModal}
            />
            <OrderModal
                visible={showOrderModal}
                closeModal={toggleOrderModal}
                tripId={arrTrips[0].trips[0].TripID}
                attractionId={item.id}
                attractionName={item.name}
                minDate={arrTrips[0].trips[0].DepartDate}
                maxDate={arrTrips[0].trips[0].ReturnDate}
            />
            <Text h5 style={{ alignSelf: 'center', fontSize: 16 }}>דרכי הגעה</Text>
            <View style={styles.directions}>
                {LHL.bus.length > 0 ? <DirTypeIcon iconName='bus-double-decker' dirInfoModal={() => toggleDirModal('bus')} /> : null}
                {LHL.subway.length > 0 ? <DirTypeIcon iconName='subway' dirInfoModal={() => toggleDirModal('subway')} /> : null}
                {LHL.train.length > 0 ? <DirTypeIcon iconName='train-variant' dirInfoModal={() => toggleDirModal('train')} /> : null}
            </View>
            {LHL.price.length > 0 ?
                <>
                    <Text>Price : {LHL.price[0].value}</Text>
                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={toggleOrderModal}
                    >
                        <View style={styles.orderBtn}><Text h4>הזמן</Text></View></TouchableOpacity>
                </>
                : null
            }
        </>
    );
}

localHighlightDetails.navigationOptions = () => { return (title = '') }

const styles = StyleSheet.create({
    img: {
        height: 250,
        width: 250,
        marginHorizontal: 15,
        borderRadius: 25
    },
    directions: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    dirTypes: {
        fontSize: 30
    },
    orderBtn: {
        height: 50,
        width: 100,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    }

})

export default localHighlightDetails;