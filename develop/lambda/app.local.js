const app = require('./app')
const port = 3000

app.listen(port)
console.log(`listening on http://localhost:${port}`)

process.env['debug'] = 1;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;