import CreateDataContext from './createDataContext';
import moment from 'moment';

const tripsReducer = (state, action) => {
    switch (action.type) {
        case 'set_trips':
            return { ...state, arrTrips: [...state.arrTrips, action.payload] }
        case 'update_trip_profile': {
            state.arrTrips[0].trips.forEach(trip => {
                if (trip.TripID == action.payload.TripID) {
                    trip.TripProfileID = action.payload.TripProfileID
                }
            })
            return state;
        }
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

const updateTripProfile = dispatch => (TripID, TripProfileID) => {
    dispatch({ type: 'update_trip_profile', payload: { TripID, TripProfileID } });
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
    { getCustomerTrips, updateTripProfile },
    { arrTrips: [] }
);