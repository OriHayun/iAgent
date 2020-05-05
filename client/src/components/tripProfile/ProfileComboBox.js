import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown'
import axios from 'axios';



const profileComboBox = ({ tripProfileId, tripId }) => {

    const [listOfProfileName, setListOfProfileName] = useState([]);
    const [currentProfileName, setCurrentProfileName] = useState('בחר פרופיל טיול');

    useEffect(() => {
        // ולהביא את רשימת פרופילי הטיול מהדאטה בייס ולאחסן אותם במערך בסטייט 
        (async function getListOfTripProfile() {
            const listResponse = await axios.get('http://proj.ruppin.ac.il/igroup4/prod/api/Trip/tripProfile')
            const arr = [];
            listResponse.data.forEach(pn => {
                let obj = { value: pn }
                arr.push(obj);
            })
            setListOfProfileName(arr);
        })();
    }, [])

    useEffect(() => {
        if (listOfProfileName.length > 0) {
            console.log(listOfProfileName);
            setCurrentProfileName(listOfProfileName[tripProfileId - 1].value)
        }
    }, [listOfProfileName])

    const changeProfileTrip = async (item) => {
        let profileId;
        for (let i = 0; i < listOfProfileName.length; i++) {
            if (listOfProfileName[i].value == item) {
                profileId = i + 1;
            }
        }
        const response = await axios.put(`http://proj.ruppin.ac.il/igroup4/prod/api/Trip/updatetripprofile/${tripId}/${profileId}`)
    }
    return (
        <>
            <Dropdown
                label={currentProfileName == '' ? 'בחר פרופיל טיול' : currentProfileName}
                data={listOfProfileName}
                onChangeText={(value) => changeProfileTrip(value)}
                containerStyle={{ width: 130 }}
            />
        </>
    );
};

const styles = StyleSheet.create({});

export default profileComboBox;