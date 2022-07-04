const stringToArray = field => {
    if(typeof field === 'string') {
        if(field.indexOf(',') >= 0) return field.split(',').map(field => field.trim())
        if(field.indexOf('#') >= 0) return field.split('#').map(field => field.trim())
    }
    return field.map(item => item.trim())
}

export default stringToArray