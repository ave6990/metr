import sqlite3 from 'sqlite3'
//import { open } from 'sqlite'

const db = new sqlite3.Database('./data/midb.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected to the data base')
    }
})

export { sqlite3, db }
