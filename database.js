let fs = require('fs')
let fsp = require('fs').promises
let process = require('process')
let path = require('path')

// create database file if it does not exist
let databaseFilePath = path.resolve(process.cwd(), "database.txt")
if (!fs.existsSync(databaseFilePath))
    fs.writeFileSync(databaseFilePath, "{}", "utf8")

let createEntry = async (dataEntryObj) => {
    let allDataString = await fsp.readFile(databaseFilePath, "utf8")
    let allDataObj = JSON.parse(allDataString)

    let dataEntryKeys = Object.keys(dataEntryObj)

    // Check that there is only 1 key-value pair and that its value is an object
    if (dataEntryKeys.length === 1 && typeof dataEntryObj[dataEntryKeys[0]] === 'object') {
        // dataEntryObj is in the right format; merge it with allDataObj
        Object.assign(allDataObj, dataEntryObj)

        await fsp.writeFile(databaseFilePath, JSON.stringify(allDataObj), "utf8")
        return {status: `Data entry with key '${dataEntryKeys[0]}' successfully written to database`}
    }
    
    return {status: `Data entry not written to database. Please check format`}
}

let readEntry = async (key) => {
    let allDataString = await fsp.readFile(databaseFilePath, "utf8")
    let allDataObj = JSON.parse(allDataString)

    let dataEntry = allDataObj[key]
    
    return dataEntry ? {[key]: dataEntry} : {status: `No entry with key '${key}' found in database`}
}

let readAllEntries = async () => {
    let allDataString = await fsp.readFile(databaseFilePath, "utf8")
    let allDataObj = JSON.parse(allDataString)

    let keys = Object.keys(allDataObj)

    return keys.map(key => ({[key]: allDataObj[key]}) )
}

let updateEntry = async (dataEntryObj) => {
    let allDataString = await fsp.readFile(databaseFilePath, "utf8")
    let allDataObj = JSON.parse(allDataString)

    let dataEntryKeys = Object.keys(dataEntryObj)

    // Check that there is only 1 key-value pair and that its value is an object
    if (dataEntryKeys.length === 1 && typeof dataEntryObj[dataEntryKeys[0]] === 'object') {
        // dataEntryObj is in the right format
        let key = dataEntryKeys[0]
        
        // get the current entry in database and update the entry
        let oldDataVal = allDataObj[key]
        let newDataVal = dataEntryObj[key]
        let updatedDataVal = Object.assign({}, oldDataVal, newDataVal)

        let newDataEntry = {[key]: updatedDataVal}
        
        // update allDataObj
        Object.assign(allDataObj, newDataEntry) 

        await fsp.writeFile(databaseFilePath, JSON.stringify(allDataObj), "utf8")
        return {status: `Data entry with key '${dataEntryKeys[0]}' successfully updated in database`}
    }
    
    return {status: `Data entry not updated in database. Please check format`}
}

let deleteEntry = async (key) => {
    let allDataString = await fsp.readFile(databaseFilePath, "utf8")
    let allDataObj = JSON.parse(allDataString)

    let dataEntry = allDataObj[key]

    if (dataEntry) {
        delete allDataObj[key]
        await fsp.writeFile(databaseFilePath, JSON.stringify(allDataObj), "utf8")

        return {status: `Entry with key '${key}' deleted from database`}
    }
    
    return {status: `No entry with key '${key}' found in database`}
}

module.exports = {readEntry, createEntry, readAllEntries, updateEntry, deleteEntry}

