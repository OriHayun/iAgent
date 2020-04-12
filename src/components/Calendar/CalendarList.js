import React, { Component } from 'react';
import { CalendarList } from 'react-native-calendars';

export default class CalendarsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            today: new Date(),
        }
    }

    render() {
        const min = this.state.today;
        return (
            <CalendarList
                current={this.props.current}
                pastScrollRange={12}
                futureScrollRange={12}
                minDate={this.state.today}
                onDayPress={(day) => { console.log('selected day', day) }}
                firstDay={0}
                markedDates={{
                    '2020-05-28': { startingDay: true, color: 'yellow' },
                    '2020-05-29': { color: 'yellow' },
                    '2020-05-30': { color: 'yellow', },
                    '2020-05-31': { color: 'yellow' },
                    '2020-06-01': { color: 'yellow' },
                    '2020-06-02': { color: 'yellow' },
                    '2020-06-03': { endingDay: true, color: 'yellow' }
                }}
                markingType={'period'}

            />
        );
    }
}