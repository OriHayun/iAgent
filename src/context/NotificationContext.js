import CreateDataContext from './createDataContext';
import axios from 'axios';
import { navigate } from '../navigationRef';
import Swal from 'sweetalert2';

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'add_notification':
            return { ...state, notifications: [...state.notifications, action.payload] }
        default:
            return state;
    }
}

const convertDateFormat = (orderDate) => {
    //recived format = 'DD/MM/YYYY'
    let orderDateArr = orderDate.split('/');
    let newOrderDate = `${orderDateArr[2]}-${orderDateArr[1]}-${orderDateArr[0]}`
    return newOrderDate;
}

const buildtNotification = (notification) => {

    let subject = 'בקשה מספר ' + notification.Id;
    let message = '';
    let pdfPath = notification.PdfFile;
    let tripId = notification.TripID;
    let attractionName = notification.AttractionName;
    let orderDate = convertDateFormat(notification.Order_date);
    switch (notification.Status) {
        case 'new': {
            message = 'הבקשה התקבלה, אך עדיין לא טופלה';
            return { subject, message, pdfPath, tripId, attractionName, orderDate }
        }
        case 'in process': {
            message = 'הבקשה התקבלה והיא בטיפול';
            return { subject, message, pdfPath, tripId, attractionName, orderDate }
        }
        case 'success': {
            message = 'הבקשה הסתיימה בהצלחה תהנו :)';
            return { subject, message, pdfPath, tripId, attractionName, orderDate }
        }
        default: {
            message = 'הבקשה הסתיימה ולא ניתן להשלימה';
            return { subject, message, pdfPath, tripId, attractionName, orderDate }
        }
    }
}

const getNotificationsFromDb = dispatch => async (customerId) => {
    if (customerId) {
        const response = await axios.get(`http://proj.ruppin.ac.il/igroup4/prod/api/notification/${customerId}`);
        response.data.map(notification => {
            const { subject, message, pdfPath, tripId, attractionName, orderDate } = buildtNotification(notification)
            dispatch({ type: 'add_notification', payload: { subject, message, pdfPath, tripId, attractionName, orderDate } })
        })
    }
}

const pushNotificationToDb = dispatch => async (
    TripID,
    AttractionID,
    Order_date,
    NumTickets,
    customerId,
    AttractionName
) => {

    const url = `http://proj.ruppin.ac.il/igroup4/prod/api/notification/insertNewNotification/${customerId}`;
    const notification = { AttractionID, AttractionName, NumTickets, Order_date, TripID }
    const options = {
        method: "POST",
        headers: new Headers({
            'Content-type': 'application/json; charset=UTF-8'
        }),
        body: JSON.stringify(notification)
    }

    fetch(url, options)
        .then(response => response.json())
        .then(response => {
            if (response == 1) {
                let subject = 'נשלחה בקשה חדשה'
                let message = 'הבקשה התקבלה, אך עדיין לא טופלה';
                let pdfPath = '';
                dispatch({ type: 'add_notification', payload: { subject, message, pdfPath, TripID, AttractionID, Order_date } })
            }
        })
        .catch(error => {
            console.log("send request failed = ", error);
            alert("הייתה בעיה בשליחת ההתראה נסה שנית");
        });
}

const getLastNotification = dispatch => async (requestId) => {
    const response = axios.get('http://proj.ruppin.ac.il/igroup4/prod/api/notification/specificNotification/' + requestId)
    let subject = 'בקשה מספר ' + requestId;
    let message = response.data.message;
    let pdfPath = response.data.pdfPath;
    dispatch({ type: 'add_notification', payload: { subject, message, pdfPath } })
}

export const { Provider, Context } = CreateDataContext(
    notificationReducer,
    { getNotificationsFromDb, pushNotificationToDb, getLastNotification },
    { notifications: [] }
);