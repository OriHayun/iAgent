import CreateDataContext from './createDataContext';
import axios from 'axios';

const notificationReducer = (state, action) => {
    console.log(action.payload)
    switch (action.type) {
        case 'add_notification':
            return { ...state, notifications: [...state.notifications, action.payload] }
        default:
            return state;
    }
}

const buildtNotification = (notification) => {

    let subject = 'בקשה מספר ' + notification.RequestId;
    let message = '';
    let pdfPath = notification.PdfPath;
    switch (notification.Status) {
        case 'new': {
            message = 'הבקשה התקבלה, אך עדיין לא טופלה';
            return { subject, message, pdfPath }
        }
        case 'in process': {
            message = 'הבקשה התקבלה והיא בטיפול';
            return { subject, message, pdfPath }
        }
        case 'success': {
            message = 'הבקשה הסתיימה בהצלחה תהנו :)';
            return { subject, message, pdfPath }
        }
        default: {
            message = 'הבקשה הסתיימה ולא ניתן להשלימה';
            return { subject, message, pdfPath }
        }
    }
}


const getNotificationsFromDb = dispatch => async (customerId) => {
    const response = await axios.get(`http://proj.ruppin.ac.il/igroup4/mobile/servertest/api/notification/${customerId}`);

    response.data.map(notification => {
        const { subject, message, pdfPath } = buildtNotification(notification)
        dispatch({ type: 'add_notification', payload: { subject, message, pdfPath } })
    })
}

const pushNotificationToDb = dispatch => async (
    tripId,
    attractionId,
    requestedDate,
    numOfTickets
) => {
    const notification = { tripId, attractionId, requestedDate, numOfTickets }
    console.log(notification)
    // const response = await axios.post('http://proj.ruppin.ac.il/igroup4/mobile/servertest/api/notification/insertNewNotification',
    //     JSON.stringify(notification));
    // console.log(response.data)
    // if (response.data == 1) {
    //     let subject = 'נשלחה בקשה חדשה'
    //     let message = 'הבקשה התקבלה, אך עדיין לא טופלה';
    //     let pdfPath = '';
    //     dispatch({ type: 'add_notification', payload: { subject, message, pdfPath } })
    // }
}

const getLastNotification = dispatch => async (requestId) => {
    const response = axios.get('http://proj.ruppin.ac.il/igroup4/mobile/servertest/api/notification/specificNotification/' + requestId)
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