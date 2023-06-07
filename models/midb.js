import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

class MYdb {
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

    write(table, record) {
        let query = `insert into ${table} values (${Object.values(record).join(', ')})`

        try {
            this.db.run(query)
        } catch (err) {
            console.log(err)
        }
    }
}

class MIdb extends MYdb {
    constructor(dbPath='data/midb.db') {
        super(dbPath)
    }

    async conditions(date) {
        return await this.sql(`select * from conditions where date like '%${date}%'`)
    }

    async verification(query) {
        return await this.sql(`select * from verification where (id || mi_type) like '${query}'`)
    }
}

class TasksDb extends MYdb {
    constructor(dbPath='data/personal.db') {
        super(dbPath)
    }
}

const mi = new MIdb()
const tsk = new TasksDb()

export { mi, tsk }
