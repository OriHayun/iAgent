import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import BaseAtractionCard from './BaseAttractionCard';
import { navigate } from '../../navigationRef';

const baseLists = ({ data, title }) => {

    return (
        <>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigate('Details', { item })}>
                            <BaseAtractionCard attraction={item}  />
                        </TouchableOpacity>
                    )
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 5
    }
})


export default baseLists;