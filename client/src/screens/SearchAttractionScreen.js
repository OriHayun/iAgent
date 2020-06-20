import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Context as customerContext } from '../context/CustomerContext';
import AttractionList from '../components/attraction/AttractionList';
import BaseLists from '../components/attraction/BaseLists';
import CategoryDropDown from '../components/attraction/CategoryDropDown';
import { accountId, key } from '../api/triposo';
import Spacer from '../components/spacer';
import SelectedAttraction from '../components/attraction/SelectedAttraction';

const searchAttractionScreen = ({ navigation }) => {

    const { state: { agentId } } = useContext(customerContext)
    const trip = navigation.getParam('trip')
    const [promotedId, setPromotedId] = useState([]);
    const [promoted, setPromoted] = useState([]);
    const [attraction, setAttraction] = useState([]);
    const [base, setBase] = useState('');
    const [baseAttractions, setBaseAttractions] = useState([]);

    useEffect(() => {
        switch (trip.TripProfileID) {
            case 1: {
                setBase('do');
                break;
            }
            case 2: {
                setBase('character-Kid_friendly');
                break;
            }
            case 3: {
                setBase('dancing');
                break;
            }
            case 4: {
                setBase('museums');
                break;
            }
            case 5: {
                setBase('topattractions');
                break;
            }
            default: {
                setBase('character-Romantic');
            }
        }
    }, [])

    useEffect(() => {
        if (base != '') {
            console.log('base=', base)
            setBases();
        }
    }, [base])

    useEffect(() => {
        (async function () {
            const response = await axios.get(`http://proj.ruppin.ac.il/igroup4/prod/api/Promotion/getpromotionbycity/${agentId}/${trip.Destination}/${trip.TripProfileID}`)
            setPromotedId(response.data);
        })();
    }, [])

    useEffect(() => {
        if (promotedId.length > 0) {
            const attractionArray = [];
            promotedId.forEach(async id => {
                let response = await axios.get(`https://www.triposo.com/api/20190906/poi.json?location_id=${trip.Destination}&id=${id}&fields=all&count=20&account=${accountId}&token=${key}`)
                attractionArray.push(response.data.results[0])
                if (attractionArray.length == promotedId.length) {
                    setPromoted(attractionArray);
                }
            })
        }
    }, [promotedId])

    const setBases = async () => {
        let arr = []
        const responseBase = await axios.get(`https://www.triposo.com/api/20200405/poi.json?location_id=${trip.Destination}&tag_labels=${base}&fields=id,name,images,properties&order_by=-score&count=20&account=${accountId}&token=${key}`);
        responseBase.data.results.forEach(att => {
            const images = [];
            if (att.images.length > 0) {
                att.images.forEach(image => {
                    images.push(image)
                })
            }
            let obj = {
                id: att.id,
                name: att.name,
                images: images,
                properties: att.properties,
            }
            arr.push(obj);
        })
        console.log('arr=',arr[1])
        setBaseAttractions(arr);
    }

    const setAttractionByCategory = (results) => {
        setAttraction(results);
    }

    return (
        <View style={styles.container}>
            <CategoryDropDown
                location={trip.Destination}
                setAttractionByCategory={setAttractionByCategory}
            />
            {base != '' ?
                <>
                    <ScrollView>
                        {promoted.length > 0 ?
                            <>
                                <AttractionList
                                    title='אטרקציות מובילות'
                                    location={trip.Destination}
                                    result={promoted}
                                />
                            </>
                            : null
                        }
                        <Spacer />
                        {attraction.length > 0 ?
                            <SelectedAttraction
                                data={attraction}
                                title='הבחירה שלך'
                            />
                            :
                            <BaseLists
                                data={baseAttractions}
                                title='במיוחד בשבילך'
                            />
                        }
                    </ScrollView>
                </>
                : <ActivityIndicator size='large' />
            }
        </View>

    );
};

searchAttractionScreen.navigationOptions = ({ navigation }) => {
    let trip = navigation.getParam('trip')
    return {
        title: 'חיפוש אטרקציה',
        headerTitleAlign: 'center',
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default searchAttractionScreen