import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { htmlPage } from '../lib/html-gen.js'
import fs from 'fs'

class MYdb {
    constructor(dbPath='data/midb.db') {
        this.connect(dbPath)
        this.q = []
        this._html = new htmlPage((cnt) => {
            fs.writeFile('view.html', cnt, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('The data wrote to the file.')
                }
            })
        })
    }

    async connect(filename) {
        try {
            this._db = await open({
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
            const data = await this._db.all(query)
            this._html.write(data)
            return data
        } catch (err) {
            console.log(err)
        }
    }

    run(query) {
        try {
            this._db.run(query)
        } catch (err) {
            console.log(err)
        }
    }

    async tables() {
        const query = 'select type, name from sqlite_master where type = "table" or type = "view" order by type'
        try {
            return await this._db.all(query)
        } catch (err) {
            console.log(err)
        }
    }

    async record(table) {
        try {
            const obj = await this._db.get(`select * from ${table} limit 1`)
            
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
            this._db.run(query)
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

    async findMI(query) {

    }
}

class TasksDb extends MYdb {
    constructor(dbPath='data/personal.db') {
        super(dbPath)
    }

    async tasks() {
        return await this.sql(`select * from view_tasks where status != 'done'`)
    }
}

const mi = new MIdb()
const tsk = new TasksDb()

export { mi, tsk }
