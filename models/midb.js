import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const db = (async () => {
    return await open({
        filename: './data/midb.db',
        driver: sqlite3.Database
    })
})()

export { sqlite3, db }
