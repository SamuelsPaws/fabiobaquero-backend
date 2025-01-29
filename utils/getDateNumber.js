// Takes in a full date in this format: MM/DD/YYYY eg 01/22/2025
// Returns a unique number for each day, a higher number for a later date
const getDateNumber = date => {
    const splitArr = date.split('/');
    const dayNum = parseInt(splitArr[1]);
    const monthNum = parseInt(splitArr[0]) * 100;
    const yearNum = parseInt(splitArr[2]) * 10000;

    return dayNum + monthNum + yearNum;
}

module.exports = { getDateNumber };