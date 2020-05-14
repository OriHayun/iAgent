import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import BaseAtractionCard from './BaseAttractionCard';
import Spacer from '../spacer';

const baseLists = ({ data1, data2, title1, title2, score1, score2 }) => {
    return (
        <>
            <Text style={styles.title}>{title1}</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data1}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity>
                            <BaseAtractionCard attraction={item} score={item.score} />
                        </TouchableOpacity>
                    )
                }}
            />
            <Spacer />
            <Text style={styles.title}>{title2}</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data2}
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