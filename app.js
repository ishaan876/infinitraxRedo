
let express = require('express')
let morgan = require('morgan')
let bodyParser = require('body-parser')
let db = require("./database.js")

let server = express()

server.use(morgan("combined"))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

// expects json request body in format 
// {key: {attrKey1: val1, ..., attrKeyN: valN}}
server.post('/', async (req, res) => {
    try {
        let body = req.body
        let statusObj = await db.createEntry(body)

        if (statusObj.status.includes("not written to database"))
            res.status(404)
        else
            res.status(200)
        
        res.json(statusObj)
    } catch (err) {
        res.status(404).json({status: `Error: ${err.message}`})
    }
})

// expects json request body in format {key: "KEY_VALUE_STRING_FOR_DATA_ENTRY"}
server.get('/', async (req, res) => {
    try {
        let body = req.body
        let dataObj = await db.readEntry(body.key)

        if (dataObj.status)
            res.status(404).json(dataObj)
        else
            res.status(200).json(dataObj)
            
    } catch (err) {
        res.status(404).json({status: `Error: ${err.message}`})
    }
})

server.get('/all', async (req, res) => {
    try {
        let dataArr = await db.readAllEntries()
        res.status(200).json(dataArr)
    } catch (err) {
        res.status(404).json({status: `Error: ${err.message}`})
    }  
})

// expects json request body in format 
// {key: {attrKey1: val1, ..., attrKeyN: valN}}
server.put('/', async (req, res) => {
    try {
        let body = req.body
        let statusObj = await db.updateEntry(body)

        if (statusObj.status.includes("not updated in database"))
            res.status(404)
        else
            res.status(200)
        
        res.json(statusObj)
    } catch (err) {
        res.status(404).json({status: `Error: ${err.message}`})
    }
})

// expects json request body in format {key: "KEY_VALUE_STRING_FOR_DELETING_DATA_ENTRY"}
server.delete("/", async (req, res) => {
    try {
        let body = req.body
        let statusObj = await db.deleteEntry(body.key)
        console.log(statusObj)

        if (statusObj.status.includes("No entry with key"))
            res.status(404).json(statusObj)
        else
            res.status(200).json(statusObj)
    } catch (err) {
        res.status(404).json({status: `Error: ${err.message}`})
    }
})

server.use((req, res) => {
    res.status(404).json({status: "Bad request"})
})

server.listen(3000)