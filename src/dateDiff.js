
export const dateDiff = (trip) => {
    const StartDateArr = trip._Depart.split('-');
    const EndDateArr = trip._Return.split('-');
    const sdd = parseInt(StartDateArr[0]);
    const smm = parseInt(StartDateArr[1]);
    const syyyy = parseInt(StartDateArr[2]);

    const edd = parseInt(EndDateArr[0]);
    const emm = parseInt(EndDateArr[1]);
    const eyyyy = parseInt(EndDateArr[2]);

    const startDate = new Date(syyyy, smm, sdd);
    const endDate = new Date(eyyyy, emm, edd);
    const days = Math.floor((endDate - startDate) / 86400000)
    return (days)
}

