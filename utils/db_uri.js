const { database } = require('../config/config')

function uri() {
    if (
        !database.url &&
        (!database.username ||
            !database.password ||
            !database.host ||
            !database.port)
    ) {
        throw new Error('Invalid database configuration')
    }
    let uri
    if (database.url) {
        uri = database.url
    } else {
        uri = `mongodb://${database.username}:${database.password}@${database.host}:${database.port}/${database.db_name}`
    }
    return uri
}

module.exports = {
    uri,
}
