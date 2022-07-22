const reformatPhoneNumber = phoneNumber => {
    if(phoneNumber[0] === '0') return `+98${phoneNumber.substring(1)}`
    return phoneNumber
}

export default reformatPhoneNumber