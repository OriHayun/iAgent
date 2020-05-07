import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const searchAttractionScreen = ({ navigation }) => {
    const trip = navigation.getParam('trip')
    const [attraction, setAttraction] = useState([]);
    console.log(trip)

    // const sortPromotionByRate = (data) => {
    //     let arr = [];
    //     אם המערך ריק לחזור
    //     אחרת לרוץ על הרשימה ולמיין לפי דירוג
    //     return data;
    // }

    // const sortCategoryByTripProfile = (data) => {
    //     let arr = [];
    //     לרוץ על הרשימה ולעשות סוויץ קייס על הפרופיל טיול כדי להחליט איזה קטגוריות יהיו קודם
    //     setAttraction(...attraction, arr)
    // }

    // useEffect(() => {
    //     לגשת תחילה לדאטה בייס להביא את כל המומלצים לפי פרופיל טיול
    //     אחרי זה למיין אותם לפי הדירוג
    //     אחרי זה להביא את האטרקציות מה טריפוסו ולהכניס למערך הקיים אחרי הקידומים
    //     setAttraction()
    // },[])

    return (

        // <>
        //     {attraction.length > 0 ?
        //         <FlatList />
        //         : <ActivityIndicator />
        //     }
        // </>
        <View>
            <Text>חיפוש אטרקציות</Text>
        </View>
    );
};

const styles = StyleSheet.create({})

export default searchAttractionScreen