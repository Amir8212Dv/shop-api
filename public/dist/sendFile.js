document.getElementById('fileInput').addEventListener('change' , function() {
    const file = this.files[0]
    console.log(file)
    namespaceSocket.emit('newMessage' , {message : {file , fileType : file.type} , type : 'file' , sender : user})
})