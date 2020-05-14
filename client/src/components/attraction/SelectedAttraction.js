import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import BaseAtractionCard from './BaseAttractionCard';

const selectedAttraction = ({ title, data }) => {
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
                        <TouchableOpacity>
                            <BaseAtractionCard attraction={item} score={item.score} />
                        </TouchableOpacity>
                    )
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 5
    }
});

export default selectedAttraction;