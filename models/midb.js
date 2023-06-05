import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

class MIdb {
    constructor(dbPath='data/midb.db') {
        this.connect(dbPath)
    }

    async connect(filename) {
        try {
            this.db = await open({
                filename: filename,
                driver: sqlite3.Database
            })
        } catch (err) {
            console.log('Connection Error!\n', err)
        }
    }

    setQueries(queries) {
        this.q = queries
    }

    async sql(query) {
        try {
            return await this.db.all(query)
        } catch (err) {
            console.log(err)
        }
    }

    async tables() {
        const query = 'select type, name from sqlite_master where type = "table" or type = "view" order by type'
        try {
            return await this.db.all(query)
        } catch (err) {
            console.log(err)
        }
    }

    async record(table, id = 1) {
        try {
            const obj = await this.db.get(`select * from ${table} limit 1`)
            
            for (const field of await Object.keys(await obj)) {
                obj[await field] = null
            }

            return await obj
        } catch (err) {
            console.log(err)
        }
    }
}

const mi = new MIdb()
const tsk = new MIdb('data/personal.db')
let tskQueries = {
    task: 'select * from view_tasks',
    add: 'insert into tasks'
}

export { mi, tsk }
