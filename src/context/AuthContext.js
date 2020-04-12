import CreateDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error': {
            return { ...state, errorMessage: action.payload };
        }
        case 'signin': {
            return { token: action.payload, errorMessage: '' }
        }
        case 'clear_error_message': {
            return { ...state, errorMessage: '' }
        }
        case 'signout': {
            return { token: null, errorMessage: '' }
        }
        default:
            return state
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token })
        navigate('Index', '');
    } else {
        navigate('Signup', '');
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' })
}



const signup = dispatch => async (email, password) => {
    //make api request to sign up with that email & password
    try {
        const response = await trackerApi.post('/signup', { email, password });
        insertTokenToDB(email, response.data.token);
        await AsyncStorage.setItem('token', response.data.token)
        dispatch({ type: 'signin', payload: response.data.token })
        navigate('Index', '')
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Something went worng with sign up' })
    }
};


const signin = dispatch => async (email, password) => {
    try {
        const response = await trackerApi.post('/signin', { email, password })
        insertTokenToDB(email, response.data.token);
        await AsyncStorage.setItem('token', response.data.token)
        dispatch({ type: 'signin', payload: response.data.token })
        navigate('Index', '')
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Something went worng with sign up' })
    };
};


const signout = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('Signin', '')
};

const insertTokenToDB = (email, token) => {

    const data = { email, token }
    const options = {
        method: "POST",
        headers: new Headers({
            'Content-type': 'application/json; charset=UTF-8'
        }),
        body: JSON.stringify(data)
    }

    fetch(`http://proj.ruppin.ac.il/igroup4/Mobile/servertest/api/Auth`, options)
        .then(
            () => {
                console.log('post authToken success');
            },
            (error) => {
                console.log("err post=", error);
            });
}


export const { Provider, Context } = CreateDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
);