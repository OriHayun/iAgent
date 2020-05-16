import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { accountId, key } from '../api/triposo';
import axios from 'axios';
import Results from '../components/information/results';

const informationResult = ({ navigation }) => {
    const lable = navigation.getParam('lable');
    const destination = navigation.getParam('destination');

    const [result, setResult] = useState([]);
    useEffect(() => {
        (async function () {
            const response = await axios.get(`https://www.triposo.com/api/20200405/poi.json?location_id=Barcelona&tag_labels=${lable}&fields=all&order_by=-score&account=${accountId}&token=${key}`)
            setResult(response.data.results)
        })()
    }, [])

    return (
        <View style={styles.container}>
            {result.length > 0 ?
                <FlatList
                    data={result}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Results
                                destination={destination}
                                name={item.name}
                                coordinates={item.coordinates}
                                phone={
                                    item.properties.length > 0 && item.properties[0].key == 'phone' ?
                                        item.properties[0].value
                                        : null
                                }
                                facebook={
                                    item.attribution.length > 0 && item.attribution[0].source_id == 'facebook' ?
                                        item.attribution[0].url
                                        : null
                                }
                            />
                        );
                    }}
                />
                :
                <>
                    <ActivityIndicator size='large' />
                    <Text>לא נמצאו תוצאות</Text>
                </>
            }
        </View>
    );
};

informationResult.navigationOptions = ({ navigation }) => {
    const name = navigation.getParam('name')

    return {
        headerTitle: () => {
            return (
                <Text style={{ fontSize: 20, fontWeight: '700' }}>{name}</Text>
            )
        },
        headerStyle: {
            backgroundColor: '#dddce1'
        },
        headerTitleAlign: 'center',
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default informationResult;