document.getElementById('fileInput').addEventListener('change' , function() {
    const file = this.files[0]
    namespaceSocket.emit('newMessage' , {message : {file , fileType : file.type} , type : 'file' , sender : user})
})