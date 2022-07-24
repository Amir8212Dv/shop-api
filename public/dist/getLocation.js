
const getLocation = socket => {
    const locationButton = document.querySelector('button.location')

    locationButton.addEventListener('click' , () => {
        navigator.geolocation.getCurrentPosition(coords => {
            const lat = coords.coords.latitude
            const long = coords.coords.longitude
        
            socket.emit('newMessage' , {message : JSON.stringify({lat , long}) , sender : user , type : 'location'})
    })

    } , error => {
        alert('get location faild')
    })
    
}