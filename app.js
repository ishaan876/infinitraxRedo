let http = require ('http')

let handler = (request, response) => {
    console.log(`

    REQUEST
    ========
    METHOD: ${request.method}
    RESPONSE: ${request.url}
    HEADERS: 
    `)

    console.log(request.headers)
    response.statusCode(200)
    response.write("OK")
    response.end()
}

let server = http.createServer(handler)
server.listen(3000)