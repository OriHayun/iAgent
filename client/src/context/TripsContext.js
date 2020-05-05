import CreateDataContext from './createDataContext';
import moment from 'moment';

const tripsReducer = (state, action) => {
    switch (action.type) {
        case 'set_trips':
            return { ...state, arrTrips: [...state.arrTrips, action.payload] }
        default:
            return state;
    };
};

const getCustomerTrips = dispatch => (id) => {
    if (id) {
        fetch(`http://proj.ruppin.ac.il/igroup4/prod/api/Trip/customertrips/${id}`)
            .then(res => res.json())
            .then((result) => {
                const sortedTripsArray = sortTripsByDepartDate(result);
                dispatch({ type: 'set_trips', payload: { trips: sortedTripsArray } })
            },
                (error) => {
                    console.log('err 1 ', error);
                });
    }
}


const sortTripsByDepartDate = (trips) => {
    let array = [];
    trips.forEach(trip => {
        let obj = { date: trip.DepartDate }
        array.push(obj);
    })
    const sortedDates = array.sort((a, b) => {
        return new moment(a.date).format('YYYYMMDD') - new moment(b.date).format('YYYYMMDD')
    })

    array = [];
    trips.forEach(trip => {
        let counter = 0;
        sortedDates.forEach(date => {
            if (trip.DepartDate == date.date) {
                array.splice(counter, 0, trip)
                counter++;
            } else {
                counter++;
            }
        })
    })
    return array;
}

export const { Provider, Context } = CreateDataContext(
    tripsReducer,
    { getCustomerTrips },
    { arrTrips: [] }
);