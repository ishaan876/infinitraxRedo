let fs = require('fs')
let process = require('process')
let path = require('path')

let databaseFilePath = path.join(process.cwd(), 'database.txt')
if (!fs.existsSync(databaseFilePath)) {
    fs.writeFileSync("database.txt", "{}", "utf8")
}

let getAll = () => {
    let allDataString = fs.readFileSync("database.txt", "utf8")
    let addData = JSON.parse(allDataString)
    return addData
}

let get = (key) => {
    let allKeysArr = Object.keys(allData)

    if(allKeysArr.includes(key)){
        return allData[key]
    }else{
        return null
    }


}

let post = (dataObj) => {
    let allDataString = fs.readFileSync("database.txt", "utf8")
    let allData = JSON.parse(allDataString)   
    let Alldata = Object.assign(allData, dataObj)
    fs.writeFileSync("database.txt", json.stringify(addData), "utf8")

}

let test = () => {
    post({"Ishaan": {h:180}})
    console.log(getAll())
}