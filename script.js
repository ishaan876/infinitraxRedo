
// let runAll = async () => {
//     await fetch("http://localhost:3000/?key=Ishaan",{
//         method: "get"
//     })

import { fstat, writeFileSync } from "fs"

//     let data = await res.json()

//     console.log(res.json)
// }

// runAll()

let data = {
    "Ishaan": {
        hp: 1,
        age:10        
    }
}

function postOne(data)

fs.writeFileSync("data.txt", data, "utf8")