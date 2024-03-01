const convertTempToCelsius = (kelvin) => {
    return kelvin - 273.15;
}

export const formatDate = (dateToFormat) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let date = new Date(dateToFormat);
    let day = String(date.getDate()).padStart(2, '0');
    let month = date.getMonth();
    let year = date.getFullYear();
    const dateString = `${day}, ${months[month]}, ${year}`
    return dateString;
}

export const formatTemperature = (temperature) => {
    return Math.round(convertTempToCelsius(temperature))
}