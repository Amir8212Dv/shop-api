const socket = io("http://localhost:4000");
const socket2 = io("http://192.168.1.5:4000");
let namespaceSocket
let userId



const initNamespacesConnection = endpoint => {

    if(namespaceSocket) {
        namespaceSocket.disconnect(false)
        delete namespaceSocket.io.nsps[namespaceSocket.nsp]
    }
    namespaceSocket = io(`http://localhost:4000/${endpoint}`)
    const messagesElement = document.querySelector('.messages ul')
    const messagesDivElement = document.querySelector('div.messages')
    
    namespaceSocket.on('connect' , () => {
        console.log(namespaceSocket.io.nsps)
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
                console.log(roomInfo)
                document.getElementById('count').innerText = roomInfo.onlineUsers.length
                document.querySelector('#roomName h3').innerText = roomInfo.room.name
                document.getElementById('roomImage').setAttribute('src' , roomInfo.room.image)
                messagesElement.innerHTML = ''
                for(const message of roomInfo.room.messages) {
                    messagesElement.insertAdjacentHTML("beforeend",
                    `  
                        <li class="${message.sender.toString() === userId ? 'sent' : 'replies'}">
                            <p>${message.sender.toString()} --> ${message.message}</p>
                        </li>
                    `)
                }
            })

        })
    })

    namespaceSocket.on('newwMessage' , ({message , sender}) => {
        console.log('a')
        messagesElement.insertAdjacentHTML("beforeend",
        `  
            <li class="${sender === userId ? 'sent' : 'replies'}">
                <p>${sender} --> ${message}</p>
            </li>
        `)

        window.scrollTo(0 , messagesDivElement.scrollHeight)
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
    
    socket.on('userId' , data => {
        userId = data
        document.getElementById('user').innerText = userId
    })
    
})




const sendMessage = (socket) => {
    const messageInput = document.getElementById('messageInput')
    const messageInputValue = messageInput.value.trim()
    if(!messageInputValue) return

    socket.emit('newMessage' , {message : messageInputValue , sender : userId})

    messageInput.value = ''
    

}





const initNamespacesConnection2 = endpoint => {

    if(namespaceSocket) {
        namespaceSocket.disconnect(false)
        delete namespaceSocket.io.nsps[namespaceSocket.nsp]
    }
    namespaceSocket = io(`http://192.168.1.5:4000/${endpoint}`)
    const messagesElement = document.querySelector('.messages ul')
    const messagesDivElement = document.querySelector('div.messages')
    
    namespaceSocket.on('connect' , () => {
        console.log(namespaceSocket.io.nsps)
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
                    const roomNameElement = document.querySelector('#roomName h3').innerText = room.name
                    namespaceSocket.emit('joinRoom' , room.name)
                    document.getElementById('roomImage').setAttribute('src' , room.image)
                    
                })
            }
            namespaceSocket.emit('joinRoom' , roomsList[0].name)
            namespaceSocket.on('roomInfo' , roomInfo => {
                document.getElementById('count').innerText = roomInfo.onlineUsers.length
                document.querySelector('#roomName h3').innerText = roomInfo.room.name
                document.getElementById('roomImage').setAttribute('src' , roomInfo.room.image)
                messagesElement.innerHTML = ''
                for(const message of roomInfo.room.messages) {
                    messagesElement.insertAdjacentHTML("beforeend",
                    `  
                        <li class="${message.sender.toString() === userId ? 'sent' : 'replies'}">
                            <p>${message.sender.toString()} --> ${message.message}</p>
                        </li>
                    `)
                }
            })

        })
    })

    namespaceSocket.on('newwMessage' , ({message , sender}) => {
        console.log('a')
        messagesElement.insertAdjacentHTML("beforeend",
        `  
            <li class="${sender === userId ? 'sent' : 'replies'}">
                <p>${sender} --> ${message}</p>
            </li>
        `)

        window.scrollTo(0 , messagesDivElement.scrollHeight)
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
    
    socket2.on('userId' , data => {
        userId = data
        document.getElementById('user').innerText = userId
    })
    
})