const stringToArray = field => {
    if(typeof field === 'string') {
        if(field.indexOf('[') === 0 && field.indexOf(']') >= 0) return JSON.parse(field).map(item => item.trim())
        if(field.indexOf(',') >= 0) return field.split(',').map(item => item.trim())
        if(field.indexOf('#') >= 0) return field.split('#').map(item => item.trim())
    }
    return field.map(item => item.trim())
}


export default stringToArray