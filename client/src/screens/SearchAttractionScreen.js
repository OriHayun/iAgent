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
    const [base1, setBase1] = useState('');
    const [base2, setBase2] = useState('');
    const [base1Attractions, setBase1Attractions] = useState([]);
    const [base2Attractions, setBase2Attractions] = useState([]);

    useEffect(() => {
        switch (trip.TripProfileID) {
            case 1: {
                setBase1('do');
                setBase2('sightseeing');
                break;
            }
            case 2: {
                setBase1('character-Kid_friendly');
                setBase2('daytrips');
                break;
            }
            case 3: {
                setBase1('dancing');
                setBase2('gambling');
                break;
            }
            case 4: {
                setBase1('museums');
                setBase2('citypass');
                break;
            }
            case 5: {
                setBase1('topattractions');
                setBase2('character-Popular_with_locals');
                break;
            }
            default: {
                setBase1('character-Romantic');
                setBase2('cruises');
            }
        }
    }, [])

    useEffect(() => {
        if (base1 != '' && base2 != '') {
            setBases();
        }
    }, [base1, base2])

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
        let arr1 = [], arr2 = [];
        let endPointBase2 = '';
        base2 == 'citypass' ? endPointBase2 = 'tour.json' : endPointBase2 = 'poi.json';

        const responseBase1 = await axios.get(`https://www.triposo.com/api/20200405/poi.json?location_id=${trip.Destination}&tag_labels=${base1}&fields=id,name,images&order_by=-score&count=20&account=${accountId}&token=${key}`);
        responseBase1.data.results.forEach(att => {
            let obj = {
                id: att.id,
                name: att.name,
                image: att.images.length > 0 ? att.images[0].sizes.medium.url : '',
                score: att.do_score ? att.do_score : 4
            }
            arr1.push(obj);
        })
        setBase1Attractions(arr1);

        const responseBase2 = await axios.get(`https://www.triposo.com/api/20200405/${endPointBase2}?location_id=${trip.Destination}&tag_labels=${base2}&fields=id,name,images&order_by=-score&count=20&account=${accountId}&token=${key}`);
        responseBase2.data.results.forEach(att => {
            let obj = {
                id: att.id,
                name: att.name,
                image: att.images.length > 0 ? att.images[0].sizes.medium.url : '',
                score: att.do_score ? att.do_score : 4
            }
            arr2.push(obj);
        })

        setBase2Attractions(arr2);
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
            {base1 != '' && base2 != '' ?
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
                                data1={base1Attractions}
                                data2={base2Attractions}
                                title1='במיוחד בשבילך'
                                title2='מותאם אלייכם'
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