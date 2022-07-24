const socket = io("http://localhost:4000");
const socket2 = io("http://192.168.1.5:4000");
let namespaceSocket
let user


const sendMessage = (socket) => {
    const messageInput = document.getElementById('messageInput')
    const messageInputValue = messageInput.value.trim()
    if(!messageInputValue) return
    socket.emit('newMessage' , {message : messageInputValue , sender : user})

    messageInput.value = ''
}

const createMessage = ({message , sender , type}) => {
    const messageClass = sender.senderId.toString() === user.senderId.toString() ? 'sent' : 'replies'
    const {lat , long} = type === 'location' ? JSON.parse(message) : {}
    
    const messageElement = type === 'message' ?`  
    <li class="${messageClass}">
        <p>${sender.senderName} --> ${message}</p>
    </li>
    ` :type === 'location' ? `
    <li class="${messageClass}">
    <div class="mapouter">
        <div class="gmap_canvas">
            <iframe width="250" height="250" id="gmap_canvas" src="https://maps.google.com/maps?q=${lat},${long}&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            <a href="https://putlocker-is.org">putlocker</a><br>
            <style>.mapouter{position:relative;text-align:right;height:250px;width:250px;}</style>
            <a href="https://www.embedgooglemap.net"></a>
            <style>.gmap_canvas {overflow:hidden;background:none!important;height:250px;width:250px;}</style>
            </div>
            </div>
            </li>
            ` : type === 'file' && `
            <li width="250" class="${messageClass}">
                <img class="messageImage" width="250" height="250" src=${message} alt="" />
            </li> `

    const messageContainer = document.querySelector('.messages ul')
    const messagesDivElement = document.querySelector('div.messages')

    
    messageContainer.insertAdjacentHTML("beforeend", messageElement)

    window.scrollTo(0 , messagesDivElement.scrollHeight)

}



const initNamespacesConnection = endpoint => {

    if(namespaceSocket) {
        namespaceSocket.disconnect(false)
        delete namespaceSocket.io.nsps[namespaceSocket.nsp]
    }
    namespaceSocket = io(`http://localhost:4000/${endpoint}`)
    const messageContainer = document.querySelector('.messages ul')
    
    namespaceSocket.on('connect' , () => {
        getLocation(namespaceSocket)
        window.addEventListener('keydown' , e => {
            if (e.code === 'Enter') sendMessage(namespaceSocket)
        })
        document.querySelector('button.submit').addEventListener('click' , () => {
            sendMessage(namespaceSocket)
        })
        namespaceSocket.on('roomsList' , roomsList => {
            const roomsElement = document.querySelector('#contacts ul')
            roomsElement.innerHTML = ''
            for (const room of roomsList) {
                const li = document.createElement('li')

                li.insertAdjacentHTML("beforeend",
                `<li class="contact">
                    <div class="wrap">
                        <img src="${room.image}" height="40"/>
                        <div class="meta">
                            <p class="name">${room.name}</p>
                            <p class="preview">${room.description}</p>
                        </div>
                    </div>
                </li>`)
                roomsElement.appendChild(li)
                li.addEventListener('click' , () => {
                    document.querySelector('#roomName h3').innerText = room.name
                    namespaceSocket.emit('joinRoom' , room.name)
                    document.getElementById('roomImage').setAttribute('src' , room.image)
                    
                })
            }
            namespaceSocket.emit('joinRoom' , roomsList[0].name)
            namespaceSocket.on('roomInfo' , roomInfo => {
                document.getElementById('count').innerText = roomInfo.onlineUsers.length
                document.querySelector('#roomName h3').innerText = roomInfo.room.name
                document.getElementById('roomImage').setAttribute('src' , roomInfo.room.image)
                messageContainer.innerHTML = ''
                for(const messageData of roomInfo.room.messages) {
                    createMessage(messageData)
                }
            })

        })
    })

    namespaceSocket.on('newMessage' , messageData => {
        createMessage(messageData)
    })
}



socket.on('connect' , () => {

    
    socket.on('namespacesList' , data => {
        const namespaceListElement = document.getElementById('namespaces')
        namespaceListElement.innerHTML = ''
        data.forEach(space => {
            const li = document.createElement('li')
            const p = document.createElement('p')
            
            p.innerText = space.title       
            li.appendChild(p)
            namespaceListElement.appendChild(li)

            li.addEventListener('click' , () => {
                socket.emit('joinNamespace' , space.endpoint)

                initNamespacesConnection(space.endpoint)
            })
        })
    })
    
    socket.on('userInfo' , data => {
        user = data
        document.getElementById('user').innerText = data.senderName
    })
    
})











const initNamespacesConnection2 = endpoint => {

    if(namespaceSocket) {
        namespaceSocket.disconnect(false)
        delete namespaceSocket.io.nsps[namespaceSocket.nsp]
    }
    namespaceSocket = io(`http://192.168.1.5:4000/${endpoint}`)
    const messageContainer = document.querySelector('.messages ul')
    const messagesDivElement = document.querySelector('div.messages')
    
    namespaceSocket.on('connect' , () => {
        getLocation(namespaceSocket)
        window.addEventListener('keydown' , e => {
            if (e.code === 'Enter') sendMessage(namespaceSocket)
        })
        document.querySelector('button.submit').addEventListener('click' , () => {
            sendMessage(namespaceSocket)
        })
        namespaceSocket.on('roomsList' , roomsList => {
            const roomsElement = document.querySelector('#contacts ul')
            roomsElement.innerHTML = ''
            for (const room of roomsList) {
                const li = document.createElement('li')

                li.insertAdjacentHTML("beforeend",
                `<li class="contact">
                    <div class="wrap">
                        <img src="${room.image}" height="40"/>
                        <div class="meta">
                            <p class="name">${room.name}</p>
                            <p class="preview">${room.description}</p>
                        </div>
                    </div>
                </li>`)
                roomsElement.appendChild(li)
                li.addEventListener('click' , () => {
                    document.querySelector('#roomName h3').innerText = room.name
                    namespaceSocket.emit('joinRoom' , room.name)
                    document.getElementById('roomImage').setAttribute('src' , room.image)
                    
                })
            }
            namespaceSocket.emit('joinRoom' , roomsList[0].name)
            namespaceSocket.on('roomInfo' , roomInfo => {
                document.getElementById('count').innerText = roomInfo.onlineUsers.length
                document.querySelector('#roomName h3').innerText = roomInfo.room.name
                document.getElementById('roomImage').setAttribute('src' , roomInfo.room.image)
                messageContainer.innerHTML = ''
                for(const messageData of roomInfo.room.messages) {
                    createMessage(messageData)
                }
            })

        })
    })

    namespaceSocket.on('newMessage' , messageData => {
        createMessage(messageData)
    })
}



socket2.on('connect' , () => {

    
    socket2.on('namespacesList' , data => {
        const namespaceListElement = document.getElementById('namespaces')
        namespaceListElement.innerHTML = ''
        data.forEach(space => {
            const li = document.createElement('li')
            const p = document.createElement('p')
            
            p.innerText = space.title       
            li.appendChild(p)
            namespaceListElement.appendChild(li)

            li.addEventListener('click' , () => {
                socket.emit('joinNamespace' , space.endpoint)

                initNamespacesConnection2(space.endpoint)
            })
        })
    })
    
    socket2.on('userInfo' , data => {
        user = data
        document.getElementById('user').innerText = data.senderName
    })
    
})










