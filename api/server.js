import {app} from "./app.js"

app.listen(process.env.SERVER_PORT ||9901, () => console.log('Server Rodando!'))
