const mogoose = require ('mongoose')

mogoose
    .connect('mongodb://admin.lafaete:Geradores2050@ds217208.mlab.com:17208/lafa_db', {useNewUrlParser: true})
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mogoose.connection

module.exports = db