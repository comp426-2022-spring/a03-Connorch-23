const express = require('express')
const app = express()
const port = 5000



const server = app.listen(port, () => {
    console.log('App listening on port %PORT'.replace('%PORT',port))
});

app.get('/app', (req,res) => {
    res.status(200).end("The API is working!")
    res.type("text/plain")
})
//Lets see if this works

app.use(function(req,res) {
    res.status(404).send("Endpoint does not exist.")
    res.type("text/plain")
})