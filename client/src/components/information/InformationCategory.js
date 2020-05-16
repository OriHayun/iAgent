import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { accountId, key } from '../../api/triposo';
import { healthData, moneyData, eatingoutData } from './data';
import { navigate } from '../../navigationRef';

const informationCategory = ({ selected, destination }) => {

    if (selected == 'health') {
        return (
            <>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigate('infoResult', { name: healthData[0].name, lable: healthData[0].lable, destination })}>
                        <Image style={styles.category} source={require('../../../assets/dental.jpg')} />
                        <Text>{healthData[0].name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigate('infoResult', { name: healthData[1].name, lable: healthData[1].lable, destination })}>
                        <Image style={styles.category} source={require('../../../assets/doctor.png')} />
                        <Text>{healthData[1].name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigate('infoResult', { name: healthData[2].name, lable: healthData[2].lable, destination })}>
                        <Image style={styles.category} source={require('../../../assets/hospital.png')} />
                        <Text>{healthData[2].name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigate('infoResult', { name: healthData[3].name, lable: healthData[3].lable, destination })}>
                        <Image style={styles.category} source={require('../../../assets/pharmacy.png')} />
                        <Text>{healthData[3].name}</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
    else if (selected == 'money') {
        return (
            <View style={styles.row}>
                <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigate('infoResult', { name: moneyData[0].name, lable: moneyData[0].lable, destination })}>
                    <Image style={styles.category} source={require('../../../assets/atm.svg.png')} />
                    <Text>{moneyData[0].name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigate('infoResult', { name: moneyData[1].name, lable: moneyData[1].lable, destination })}>
                    <Image style={styles.category} source={require('../../../assets/bank.svg.png')} />
                    <Text>{moneyData[1].name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigate('infoResult', { name: moneyData[2].name, lable: moneyData[2].lable, destination })}>
                    <Image style={styles.category} source={require('../../../assets/change-money.png')} />
                    <Text>{moneyData[2].name}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    else {
        return (
            <>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigate('infoResult', { name: eatingoutData[0].name, lable: eatingoutData[0].lable, destination })}>
                        <Image style={styles.category} source={require('../../../assets/coffee.png')} />
                        <Text>{eatingoutData[0].name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigate('infoResult', { name: eatingoutData[1].name, lable: eatingoutData[1].lable, destination })}>
                        <Image style={styles.category} source={require('../../../assets/israel.png')} />
                        <Text>{eatingoutData[1].name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigate('infoResult', { name: eatingoutData[2].name, lable: eatingoutData[2].lable, destination })}>
                        <Image style={styles.category} source={require('../../../assets/vegan.png')} />
                        <Text>{eatingoutData[2].name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigate('infoResult', { name: eatingoutData[3].name, lable: eatingoutData[3].lable, destination })}>
                        <Image style={styles.category} source={require('../../../assets/vegetarian.png')} />
                        <Text>{eatingoutData[3].name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigate('infoResult', { name: eatingoutData[4].name, lable: eatingoutData[4].lable, destination })}>
                        <Image style={styles.category} source={require('../../../assets/sushi.png')} />
                        <Text>{eatingoutData[4].name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigate('infoResult', { name: eatingoutData[5].name, lable: eatingoutData[5].lable, destination })}>
                        <Image style={styles.category} source={require('../../../assets/breakfast.png')} />
                        <Text>{eatingoutData[5].name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigate('infoResult', { name: eatingoutData[6].name, lable: eatingoutData[6].lable, destination })}>
                        <Image style={styles.category} source={require('../../../assets/lunch.png')} />
                        <Text>{eatingoutData[6].name}</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigate('infoResult', { name: eatingoutData[7].name, lable: eatingoutData[7].lable, destination })}>
                        <Image style={styles.category} source={require('../../../assets/dinner.png')} />
                        <Text>{eatingoutData[7].name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigate('infoResult', { name: eatingoutData[8].name, lable: eatingoutData[8].lable, destination })}>
                        <Image style={styles.category} source={require('../../../assets/food-exp.png')} />
                        <Text>{eatingoutData[8].name}</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    TouchableOpacity: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    category: {
        height: 90,
        width: 90
    }
})

export default informationCategory;