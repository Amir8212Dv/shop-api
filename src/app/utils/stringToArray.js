const stringToArray = field => { // converst string and stringify arrays to real array and makes array items unique
    return [... new Set(
        typeof field === 'string' ? (
        field.indexOf('[') === 0 && field.indexOf(']') >= 0 ? JSON.parse(field).map(item => item.trim()) :
        field.indexOf(',') >= 0 ? field.split(',').map(item => item.trim()) :
        (field.indexOf('#') >= 0) ? field.split('#').map(item => item.trim()) :
        [field.trim()]
        ) : field
    )]

}

export default stringToArray