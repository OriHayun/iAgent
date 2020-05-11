import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AttractionCard from './AttractionCard';

const attractionList = ({ title, result, location }) => {
    return (
        <View style={styles.container} >
            <Text style={styles.title}>{title}</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={result}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity>
                            <AttractionCard
                                attractionId={item}
                                location={location} />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 5
    }
});

export default attractionList;
