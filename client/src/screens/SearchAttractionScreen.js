import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Context as customerContext } from '../context/CustomerContext';

const searchAttractionScreen = ({ navigation }) => {

    const { state: { agentId } } = useContext(customerContext)
    const trip = navigation.getParam('trip')
    const [promoted, setPromoted] = useState([]);
    const [attraction, setAttraction] = useState([]);

    useEffect(() => {
        //      לגשת תחילה לדאטה בייס להביא את כל המומלצים לפי סוכן עיר ופרופיל טיול
        (async function () {
            const response = await axios.get(`http://proj.ruppin.ac.il/igroup4/prod/api/Promotion/getpromotionbycity/${agentId}/${trip.Destination}/${trip.TripProfileID}`)
            console.log(response.data)
            //setPromoted(response.data);
        })();

        //     אחרי זה להביא את האטרקציות מה טריפוסו ולהכניס למערך הקיים אחרי הקידומים
        //     setAttraction()
    }, [])

    return (
        // // <>
        // //     {attraction.length > 0 ?
        //         <>
        // //         <FlatList /> promoted
        //            <FlatList/> rest
        //         </>
        // //         : <ActivityIndicator />
        // //     }
        // // </>
        <View>
            <Text>חיפוש אטרקציות</Text>
        </View>
    );
};

const styles = StyleSheet.create({})

export default searchAttractionScreen