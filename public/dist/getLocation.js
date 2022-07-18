
const getLocation = socket => {
    const locationButton = document.querySelector('button.location')
    const messagesElement = document.querySelector('.messages ul')

    locationButton.addEventListener('click' , () => {
        console.log('location clicked')
        navigator.geolocation.getCurrentPosition(coords => {
            const lat = coords.coords.latitude
            const long = coords.coords.longitude
        
            socket.emit('newMessage' , {message : JSON.stringify({lat , long}) , sender : user , type : 'location'})
    })

    } , error => {
        alert('get location faild')
    })
    
}