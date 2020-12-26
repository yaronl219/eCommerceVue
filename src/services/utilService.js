export const utilService = {
    makeId,
    parseTimestamp,
    getRandomInteger,
    buildSearchParam,
    getRandomColor
}

function makeId(length = 12) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getRandomInteger(min,max) {
    return Math.round(Math.random() * (max - min) + min)
}

function parseTimestamp(timestamp) {
    const parsedTime = new Date(timestamp)
    return parsedTime.toLocaleString()
}

function buildSearchParam(baseQuery,query) {
    const searchParam = new URLSearchParams()
    searchParam.append('query',baseQuery)
    query.forEach(param => {
        if (Object.values(param)[0]) {
            const key = Object.keys(param)[0]
            const value = Object.values(param)[0]
            searchParam.append(key,value)
        }
    });
    return searchParam
}

function getRandomColor(alpha) {
    let randomColorArr = []
    for (let i=0; i<3; i++) {
        randomColorArr.push(getRandomInteger(0,255))
    }
    return `rgb(${randomColorArr.join(',')},${alpha})`
}