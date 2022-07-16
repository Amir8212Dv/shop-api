const socket = io("http://localhost:4000");

const initNamespacesConnection = endpoint => {
    const namespaceSocket = io(`http://localhost:4000/${endpoint}`)
    
    namespaceSocket.on('connect' , () => {
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
                    const roomNameElement = document.getElementById('roomName')
                    roomNameElement.innerText = room.name
                    namespaceSocket.emit('joinRoom' , room.name)
                    namespaceSocket.on('roomInfo' , roomInfo => {
                        console.log('a')
                        const onlineCountElement = document.getElementById('count')
                        onlineCountElement.innerText = roomInfo.onlineUsers.length

                    })
                    
                })

                namespaceSocket.on('amir' , roomInfo => {
                    console.log('b')

                })

            }
        })
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
    
})
