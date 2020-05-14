import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { accountId, key } from '../../api/triposo';

const informationCategory = ({ selected, }) => {

    const healthData = [
        { name: 'רפואת שיניים', lable: 'poitype-Dentist' },
        { name: 'רפואה כללית', lable: 'poitype-Doctor' },
        { name: 'בתי חולים', lable: 'poitype-Hospital' },
        { name: 'בתי מרקחת', lable: 'poitype-Pharmacy' }
    ];

    const moneyData = [
        { name: 'כספומט', lable: 'poitype-Atm' },
        { name: 'בנק', lable: 'poitype-Bank' },
        { name: 'המרת כסף', lable: 'poitype-Bureau_de_change' }
    ];

    const eatingoutData = [
        { name: 'בתי קפה', lable: 'coffee' },
        { name: 'מסעדות ישראליות', lable: 'cuisine-Israeli' },
        { name: 'טבעוני', lable: 'cuisine-Vegan' },
        { name: 'צמחוני', lable: 'cuisine-Vegetarian' },
        { name: 'סושי', lable: 'cuisine-Sushi' },
        { name: 'ארוחות בוקר', lable: 'breakfast' },
        { name: 'ארוחות צהריים', lable: 'lunch' },
        { name: 'ארוחות ערב', lable: 'dinner' },
        { name: 'חווית אוכל', lable: 'foodexperiences' }];

    if (selected == 'health') {
        return (
            <>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.TouchableOpacity}>
                        <Image style={styles.category} source={require('../../../assets/dental.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity}>
                        <Image style={styles.category} source={require('../../../assets/doctor.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.TouchableOpacity}>
                        <Image style={styles.category} source={require('../../../assets/hospital.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity}>
                        <Image style={styles.category} source={require('../../../assets/pharmacy.png')} />
                    </TouchableOpacity>
                </View>
            </>
        );
    }
    else if (selected == 'money') {
        return (
            <View style={styles.row}>
                <TouchableOpacity style={styles.TouchableOpacity}>
                    <Image style={styles.category} source={require('../../../assets/atm.svg.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.TouchableOpacity}>
                    <Image style={styles.category} source={require('../../../assets/bank.svg.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.TouchableOpacity}>
                    <Image style={styles.category} source={require('../../../assets/change-money.png')} />
                </TouchableOpacity>
            </View>
        );
    }
    else {
        return (
            <>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.TouchableOpacity}>
                        <Image style={styles.category} source={require('../../../assets/coffe.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity}>
                        <Image style={styles.category} source={require('../../../assets/israel.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity}>
                        <Image style={styles.category} source={require('../../../assets/vegan.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.TouchableOpacity}>
                        <Image style={styles.category} source={require('../../../assets/vegetarian.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity}>
                        <Image style={styles.category} source={require('../../../assets/sushi.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity}>
                        <Image style={styles.category} source={require('../../../assets/breakfast.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.TouchableOpacity}>
                        <Image style={styles.category} source={require('../../../assets/lunch.png')} />
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.TouchableOpacity}>
                        <Image style={styles.category} source={require('../../../assets/dinner.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity}>
                        <Image style={styles.category} source={require('../../../assets/food-exp.png')} />
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
        padding: 10
    },
    category: {
        height: 90,
        width: 90
    }
})

export default informationCategory;