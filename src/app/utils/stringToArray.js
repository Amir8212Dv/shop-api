const stringToArray = string => {
    if(string.indexOf(',') >= 0) return string.split(',').map(item => item.trim())
    if(string.indexOf('#') >= 0) return string.split('#').map(item => item.trim())
}

export default stringToArray