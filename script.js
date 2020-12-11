
let runAll = async () => {
    await fetch("http://localhost:3000/?key=Ishaan",{
        method: "get"
    })

    let data = await res.json()

    console.log(res.json)
}

runAll()

