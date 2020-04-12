import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

export default class calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: moment(),
            selectedEndDate: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date, type) {
        console.log('sdsd')
        if (type === 'END_DATE') {
            this.setState({
                selectedEndDate: date,
            });
        } else {
            this.setState({
                selectedStartDate: date,
                selectedEndDate: null,
            });
        }
    }

    render() {
        const minDate = new Date(); // Today
        // const maxDate = new Date(2021, 6, 3);

        return (
            <View style={styles.container}>
                <CalendarPicker
                    startFromMonday={true}
                    allowRangeSelection={true}
                    minDate={minDate}
                    // maxDate={maxDate}
                    weekdays={['שבת', 'שישי', 'חמישי', 'רביעי', 'שלישי', 'שני', 'ראשון']}
                    months={['ינואר', 'פאבואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר']}
                    previousTitle="חודש קודם"
                    nextTitle="חודש הבא"
                    todayBackgroundColor="#e6ffe6"
                    selectedDayColor="#66ff33"
                    selectedDayTextColor="#000000"
                    scaleFactor={373}
                    textStyle={{
                        color: '#000000',
                    }}
                    onDateChange={this.onDateChange}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 100
    },
});