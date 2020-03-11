const express = require('express')
const app = express()
const PORT = 3000
const dashjs = require('dashjs')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.get('/', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`);

})