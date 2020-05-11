import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { Context as customerContext } from '../context/CustomerContext';
import AttractionList from '../components/attraction/AttractionList';
import CategoryDropDown from '../components/attraction/CategoryDropDown';
const searchAttractionScreen = ({ navigation }) => {

    const { state: { agentId } } = useContext(customerContext)
    const trip = navigation.getParam('trip')
    const [promoted, setPromoted] = useState([]);
    const [attraction, setAttraction] = useState([]);

    useEffect(() => {
        //      לגשת תחילה לדאטה בייס להביא את כל המומלצים לפי סוכן עיר ופרופיל טיול
        (async function () {
            const response = await axios.get(`http://proj.ruppin.ac.il/igroup4/prod/api/Promotion/getpromotionbycity/${agentId}/${trip.Destination}/${trip.TripProfileID}`)
            setPromoted(response.data);
        })();
        //     אחרי זה להביא את האטרקציות מה טריפוסו ולהכניס למערך הקיים אחרי הקידומים
        //     setAttraction()
    }, [])

    return (
        <View style={styles.container}>
            {promoted.length > 0 ?
                <>
                    <CategoryDropDown
                        location={trip.Destination}
                    />
                    <ScrollView>
                        <AttractionList
                            title='אטרקציות מובילות'
                            location={trip.Destination}
                            result={promoted}
                        />
                        <AttractionList

                        />
                        <AttractionList

                        />
                        <AttractionList

                        />
                    </ScrollView>
                </>
                :
                <ActivityIndicator size='large' />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default searchAttractionScreen