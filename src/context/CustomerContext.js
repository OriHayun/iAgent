import CreateDataContext from './createDataContext';
import { AsyncStorage } from 'react-native';
import axios from 'axios';



const customerReducer = (state, action) => {
    switch (action.type) {
        case 'set_customer': {
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

const changeImg = dispatch => (result) => {
    const data = new FormData();
    data.append("userImage", result);
    fetch(`http://proj.ruppin.ac.il/igroup4/Mobile/servertest/api/uploadimage`, {
        method: 'POST',
        contentType: false,
        processData: false,
        mode: 'no-cors',
        body: data
    }).then(function (data) {
        saveToDb(imageUrl);
    }).catch((error) => {
        console.log(error);
    });
    dispatch({ type: 'change_img', payload: result.uri })
}

// const saveToDb = async (imageUrl) =>{
//     const token = await AsyncStorage.getItem('token')

//     const options = {
//         method: "POST",
//         headers: new Headers({
//             'Content-type': 'application/json; charset=UTF-8',
//             'Authorization': `${token}`
//         }),
//         body: imageUrl
//     }

//     fetch(`http://proj.ruppin.ac.il/igroup4/Mobile/servertest/api/image`, options)
//         .then(res => {
//             console.log('res=', res);
//         })
//         .then(
//             () => {
//                 console.log('success');
//             },
//             (error) => {
//                 console.log("err post=", error);
//             });
// }



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