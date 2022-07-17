const socket = io("http://localhost:4000");

let namespaceSocket

const initNamespacesConnection = endpoint => {
    console.log(io._nsps)
    // const namespaceSocket = io(`http://localhost:4000/${endpoint}`)
    if(namespaceSocket) namespaceSocket.close()
    if(namespaceSocket) namespaceSocket.disconnect()

    namespaceSocket = io(`http://localhost:4000/${endpoint}`)
    console.log(endpoint)
    
    namespaceSocket.on('connect' , () => {
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
            })
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

const sendMessage = (socket) => {
    const messageInput = document.getElementById('messageInput')
    const messageInputValue = messageInput.value.trim()
    console.log('a')
    if(!messageInputValue) return

    socket.emit('newMessage' , {message : messageInputValue})


    socket.on('confirmMessage' , message => {
        
    })
    socket.on('newMessage' , message => {

    })
    
    messageInput.value = ''
    
    document.querySelector('.messages ul').insertAdjacentHTML('beforeend' , `
    <li class="sent">
            <img src="https://media-exp1.licdn.com/dms/image/C5603AQE3g9gHNfxGrQ/profile-displayphoto-shrink_200_200/0/1645507738281?e=1659571200&v=beta&t=wtwELdT1gp6ICp3UigC2EgutGAQgDP2sZKUx0mjCTwI" alt="" />
            <p>${messageInputValue}</p>
        </li>
        `)
        

        const messagesElement = document.querySelector('div.messages')

        
        window.scrollTo(0 , messagesElement.scrollHeight)

}