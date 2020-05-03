import CreateDataContext from './createDataContext';
import { AsyncStorage } from 'react-native';

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
    fetch('http://proj.ruppin.ac.il/igroup4/prod/api/Auth', {
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
                    agentId: result.AgentID
                }
            })
        },
            (error) => {
                console.log('err ', error);
            });
};

const createFormData = (photo) => {
    const name = photo.uri.split('ImagePicker/');
    const data = new FormData();
    data.append("userPhoto", {
        name: name[1],
        type: photo.type + '/jpg',
        uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    return data;
};

const changeImg = dispatch => async (result) => {
    dispatch({ type: 'change_img', payload: result.uri })

    const data = createFormData(result)

    fetch("http://proj.ruppin.ac.il/igroup4/prod/api/image/uploadimage", {
        method: "POST",
        body: data
    })
        .then(response => response.json())
        .then(response => {
            saveToDb(response);
        })
        .catch(error => {
            console.log("upload error", error);
            alert("Upload failed!");
        });
}

const saveToDb = async (imageUrl) => {
    const token = await AsyncStorage.getItem('token')
    const options = {
        method: "POST",
        headers: new Headers({
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `${token}`
        }),
        body: JSON.stringify(imageUrl[0])
    }

    fetch(`http://proj.ruppin.ac.il/igroup4/prod/api/image`, options)
        .then(
            () => {
                console.log('success');
            },
            (error) => {
                console.log("err post=", error);
            });
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