import CreateDataContext from './createDataContext';
import axios from 'axios';

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'add_notification':
            return [...notifications, action.payload]
        default:
            return state;
    }
}

const insertNotification = (notification) => {
    let subject = 'בקשה מספר ' + notification.requestId;
    let message = '';
    let pdfPath = notification.pdfPath;
    switch (notification.status_) {
        case 'new':
            message = 'הבקשה התקבלה, אך עדיין לא טופלה';
        case 'in process':
            message = 'הבקשה התקבלה והיא בטיפול';
        case 'success':
            message = 'הבקשה הסתיימה בהצלחה תהנו :)';
        case 'failure':
            message = 'הבקשה הסתיימה ולא ניתן להשלימה';
    }
    dispatch({ type: 'add_notification', payload: { subject, message, pdfPath } })
}


const getNotificationsFromDb = dispatch => async (tripId) => {
    const response = await axios.get(`http://proj.ruppin.ac.il/igroup4/mobile/servertest/api/notification/${tripId}`);
    console.log(response.data);
    response.data.map(notification => {
        insertNotification(notification)
    })
}

const pushNotificationToDb = dispatch => async (
    tripId,
    attractionId,
    requestedDate,
    numOfTickets
) => {
    const notification = { tripId, attractionId, requestedDate, numOfTickets }
    const response = await axios.post('http://proj.ruppin.ac.il/igroup4/mobile/servertest/api/notification/insertNewNotification',
        JSON.stringify(notification));
    console.log(response.data)
    if (response.data) {
        let subject = 'נשלחה בקשה חדשה'
        let message = 'הבקשה התקבלה, אך עדיין לא טופלה';
        let pdfPath = '';
        dispatch({ type: 'add_notification', payload: { subject, message, pdfPath } })
    }
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
    { getNotificationsFromDb, pushNotificationToDb , getLastNotification },
    { notifications: [] }
);