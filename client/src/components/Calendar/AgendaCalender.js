import React, { useState, useContext, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Context as NotificationContext } from '../../context/NotificationContext';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';


const agendaCalendar = ({ current, rangeOfDates, tripId }) => {

    const [items, setItems] = useState({});
    const { state: { notifications } } = useContext(NotificationContext);

    useEffect(() => {
        const itemsArr = notifications.filter(not => not.tripId === tripId)
        let obj = {};
        itemsArr.forEach(itemArr => {
            if (!obj[itemArr.orderDate]) {
                obj[itemArr.orderDate] = []
                obj[itemArr.orderDate].push({ name: itemArr.attractionName, pdfFile: itemArr.pdfPath });
                setItems({ ...items, obj });
            }
            else {
                obj[itemArr.orderDate].push({ name: itemArr.attractionName, pdfFile: itemArr.pdfPath, height: 65 });
                setItems({ ...items, obj });
            }
        })
    }, [notifications])

    showTickets = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    };

    renderItem = (item) => {

        console.log(item)
        return (
            <>
                {item.pdfFile ?
                    <TouchableOpacity
                        style={[styles.completeItme, { height: item.height }]}
                        onPress={() => showTickets(item.pdfFile)}
                    >
                        <Text>{item.name}</Text>
                        <Text>אושר  <AntDesign name='check' /></Text>
                        <Text style={{ fontSize: 10 }}>לחץ לצפייה הכרטיסים</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        // testID={testIDs.agenda.ITEM}
                        style={[styles.notCompleteItme, { height: item.height }]}
                    >
                        <Text>{item.name}</Text>
                        <Text>ממתין לאישור  <SimpleLineIcons name='question' /></Text>
                    </TouchableOpacity>
                }
            </>
        );
    }

    markedDates = (dates) => {
        const markedDatesObject = {};
        dates.forEach(date => markedDatesObject[date] = { marked: true });
        return markedDatesObject;
    }

    renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Text style={{ fontSize: 28, fontWeight: 'bold' }}>אין תוכניות ליום זה</Text>
                <TouchableOpacity>
                    <Text style={{ color: 'blue', fontSize: 16 }}>מצא מה לעשות</Text>
                </TouchableOpacity>
            </View>
        );
    }

    rowHasChanged = (r1, r2) => {
        return r1.name !== r2.name;
    }

    return (
        <Agenda
            // items={{
            //     '2020-05-28': [{ name: 'item 1 - any js object' }],
            //     '2020-05-29': [{ name: 'item 2 - any js object', height: 80 }],
            //     '2020-05-31': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
            // }}
            items={items.obj}
            // Callback that gets called when items for a certain month should be loaded (month became visible)
            // loadItemsForMonth={(month) => { console.log(month) }}
            // Callback that fires when the calendar is opened or closed
            // onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}
            // Callback that gets called on day press
            onDayPress={(day) => { console.log(day) }}
            // Callback that gets called when day changes while scrolling agenda list
            onDayChange={(day) => { console.log('day changed') }}
            // Initially selected day
            selected={current}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={current}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={rangeOfDates[rangeOfDates.length - 1]}
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={3}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={3}
            // Specify how each item should be rendered in agenda
            renderItem={(item, firstItemInDay) => { return (renderItem(item)) }}
            // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
            // renderDay={(day, item) => { return (<View />); }}
            // Specify how empty date content with no items should be rendered
            // renderEmptyDate={() => { return (<View />); }}
            // Specify how agenda knob should look like
            // renderKnob={() => { return (<View />); }}
            // Specify what should be rendered instead of ActivityIndicator
            renderEmptyData={() => { return (renderEmptyDate()); }} // במידה ואין כלום בתוכנית מה להציג
            // Specify your item comparison function for increased performance
            // rowHasChanged={(r1, r2) => { console.log('asas') }}
            // Hide knob button. Default = false
            // hideKnob={false}
            // By default, agenda dates are marked if they have at least one item, but you can override this if needed
            markedDates={markedDates(rangeOfDates)}
            // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
            // disabledByDefault={false}
            // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
            onRefresh={() => console.log('refreshing...')}
            // Set this true while waiting for new data from a refresh
            refreshing={true}
            // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
            refreshControl={null}
            // Agenda theme
            theme={{
                agendaDayTextColor: 'black',
                agendaDayNumColor: 'green',
                agendaTodayColor: 'red',
                agendaKnobColor: 'blue'
            }}
            // Agenda container style
            style={{}}
        />
    );
}

const styles = StyleSheet.create({
    completeItme: {
        backgroundColor: '#8cd98c',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 10
    },
    notCompleteItme: {
        backgroundColor: '#cccccc',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 10
    },
    emptyDate: {
        height: 15,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default agendaCalendar;