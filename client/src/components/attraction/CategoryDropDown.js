import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { accountId, key } from '../../api/triposo'
import axios from 'axios';

const categoryDropDown = ({ location, setAttractionByCategory }) => {
    const [firstCategory, setFirstCategory] = useState('');
    const [secondeCategotyValue, setSecondeCategoryValue] = useState([])
    const [secondeCategotyName, setSecondeCategoryName] = useState([])

    const mainCategory = [{
        value: '',
        value: 'פעילויות',
    }, {
        value: 'טיולים',
    }, {
        value: 'אתרים',
    }, {
        value: 'חיי לילה',
    }];

    const bringSecondeCategory = async (category) => {
        let enMainCategory = '';
        switch (category) {
            case 'פעילויות': {
                enMainCategory = 'do'
                break;
            }
            case 'טיולים': {
                enMainCategory = 'tours'
                break;
            }
            case 'אתרים': {
                enMainCategory = 'sightseeing'
                break;
            }
            case 'חיי לילה': {
                enMainCategory = 'nightlife'
                break;
            }
            default: return
        }
        const response = await axios.get(`https://www.triposo.com/api/20200405/tag.json?location_id=${location}&ancestor_label=${enMainCategory}&order_by=-score&fields=label,name&count=20&account=${accountId}&token=${key}`)
        let arrName = []
        let arrValue = []
        response.data.results.forEach(res => {
            let objName = { value: res.name }
            let objValue = { value: res.label }
            arrName.push(objName)
            arrValue.push(objValue)
        })
        setFirstCategory(enMainCategory);
        setSecondeCategoryName(arrName);
        setSecondeCategoryValue(arrValue)
    }

    const bringAttraction = async (secCategory) => {

        const index = secondeCategotyName.map(function (e) { return e.value; }).indexOf(secCategory)
        let arr = [];
        if (firstCategory == 'tours') {
            let results = await axios.get(`https://www.triposo.com/api/20200405/tour.json?location_ids=${location}&tag_labels=${secondeCategotyValue[index].value}&fields=id,name,images,properties&order_by=-score&count=25&account=${accountId}&token=${key}`);
            results.data.results.forEach(att => {
                const images = [];
                if (att.images.length > 0) {
                    att.images.forEach(image => {
                        images.push(image)
                    })
                }
                let obj = {
                    id: att.id,
                    name: att.name,
                    image: images,
                    properties: att.properties,
                }
                arr.push(obj);
            })
            setAttractionByCategory(arr)
        }
        else {
            let results = await axios.get(`https://www.triposo.com/api/20200405/poi.json?location_id=${location}&tag_labels=${secondeCategotyValue[index].value}&fields=id,name,images,properties&order_by=-score&count=25&account=${accountId}&token=${key}`);
            results.data.results.forEach(att => {
                const images = [];
                if (att.images.length > 0) {
                    att.images.forEach(image => {
                        images.push(image)
                    })
                }
                let obj = {
                    id: att.id,
                    name: att.name,
                    image: images,
                    properties: att.properties,
                }
                arr.push(obj);
            })
            setAttractionByCategory(arr)
        }
    }

    const bringAllAttraction = async () => {
        let arr = [];
        if (firstCategory == 'tours') {
            let results = await axios.get(`https://www.triposo.com/api/20200405/tour.json?location_ids=${location}&fields=id,name,images,properties&order_by=-score&count=25&account=${accountId}&token=${key}`);
            results.data.results.forEach(att => {
                const images = [];
                if (att.images.length > 0) {
                    att.images.forEach(image => {
                        images.push(image)
                    })
                }
                let obj = {
                    id: att.id,
                    name: att.name,
                    image: images,
                    properties: att.properties,
                }
                arr.push(obj);
            })
            setAttractionByCategory(arr)
        }
        else {
            let results = await axios.get(`https://www.triposo.com/api/20200405/poi.json?location_id=${location}&tag_labels=${firstCategory}&fields=id,name,images,properties&order_by=-score&count=25&account=${accountId}&token=${key}`);
            results.data.results.forEach(att => {
                const images = [];
                if (att.images.length > 0) {
                    att.images.forEach(image => {
                        images.push(image)
                    })
                }
                let obj = {
                    id: att.id,
                    name: att.name,
                    image: images,
                    properties: att.properties,
                }
                arr.push(obj);

            })
            setAttractionByCategory(results.data.results)
        }
    }

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View>
                    <Dropdown
                        label='קטגוריה ראשית'
                        data={mainCategory}
                        onChangeText={(category) => bringSecondeCategory(category)}
                        containerStyle={{ width: 130, paddingRight: 10 }}
                    />
                </View>
                {secondeCategotyName.length > 0 ?
                    <View>
                        <Dropdown
                            label='קטגוריה משנית'
                            data={secondeCategotyName}
                            onChangeText={(secCategory) => bringAttraction(secCategory)}
                            containerStyle={{ width: 130, paddingLeft: 10 }}
                        />
                    </View>
                    : null
                }
            </View>
            {secondeCategotyName.length > 0 &&
                <TouchableOpacity style={styles.all} onPress={bringAllAttraction}>
                    <Text style={{ color: 'blue' }}>הצג הכל לקטגוריה ראשית</Text>
                </TouchableOpacity>
                
            }
        </>
    );
};

const styles = StyleSheet.create({
    all: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }
})

export default categoryDropDown;