import CreateDataContext from './createDataContext';

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
                dispatch({ type: 'set_trips', payload: { trips: result } })
            },
                (error) => {
                    console.log('err 1 ', error);
                });
    }
}

export const { Provider, Context } = CreateDataContext(
    tripsReducer,
    { getCustomerTrips },
    { arrTrips: [] }
);