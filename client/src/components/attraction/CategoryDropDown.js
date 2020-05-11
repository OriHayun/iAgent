import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { accountId, key } from '../../api/triposo'
import axios from 'axios';

const categoryDropDown = ({ location }) => {
    const [secondeCategoty, setSecondeCategory] = useState([])
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
        let arr = []
        response.data.results.forEach(res => {
            let obj = { value: res.name }
            arr.push(obj)
        })
        setSecondeCategory(arr);
    }


    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View>
                <Dropdown
                    label='קטגוריה ראשית'
                    data={mainCategory}
                    onChangeText={(category) => bringSecondeCategory(category)}
                    containerStyle={{ width: 130, paddingRight: 10 }}
                />
            </View>
            <View>
                <Dropdown
                    label='קטגוריה משנית'
                    data={secondeCategoty}
                    // onChangeText={}
                    containerStyle={{ width: 130, paddingLeft: 10 }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({})

export default categoryDropDown;