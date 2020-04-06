import CreateDataContext from './createDataContext';
import { AsyncStorage } from 'react-native';



const customerReducer = (state, action) => {
    switch (action.type) {
        case 'set_customer': {
            console.log(state)
            return {
                customerId: action.payload.customerId,
                firstName: action.payload.firstName,
                sureName: action.payload.sureName,
                birthdate: action.payload.birthdate,
                email: action.payload.email,
                img: action.payload.img,
                pnToken: action.payload.pnToken,
                authToken: action.payload.authToken,
                agentId: action.payload.agentId
            }
        }
        case 'change_img':
            console.log(action.payload)
            return { ...state, img: action.payload }
        default:
            return state
    };
}

const getCustomer = dispatch => async () => {
    const token = await AsyncStorage.getItem('token')

    fetch('http://proj.ruppin.ac.il/igroup4/mobile/servertest/api/Auth', {
        method: "GET",
        headers: new Headers({
            'Authorization': `${token}`
        }),
    })
        .then(res => res.json())
        .then((result) => {
            dispatch({
                type: 'set_customer',
                payload: {
                    customerId: result.Id,
                    firstName: result.FirstName,
                    sureName: result.SureName,
                    birthdate: result.BirthDay,
                    email: result.Email,
                    img: result.Img,
                    pnToken: result.PnToken,
                    agentId: result.AgentId
                }
            })
        },
            (error) => {
                console.log('err ', error);
            });
};

const changeImg = dispatch => (img) => {
    //להעלות אותה לשרת
    console.log('context', img)
    dispatch({ type: 'change_img', payload: img })
}

export const { Provider, Context } = CreateDataContext(
    customerReducer,
    { getCustomer, changeImg },
    {
        customerId: '',
        firstName: '',
        sureName: '',
        birthdate: '',
        email: '',
        img: '',
        pnToken: '',
        agentId: ''
    }
);