const express = require('express')
const app = express()
const register = require('./admin/register')

app.use(express.json())
app.use(register)
app.use(require('./admin/login'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("app is listening on port", PORT)
})
