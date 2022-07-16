const socket = io("http://localhost:4000");

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
        })
    })
    
})
            