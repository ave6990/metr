import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { htmlPage } from '../lib/html-gen.js'
import fs from 'fs'
import { tasksQueries } from '../lib/sql.js'
import * as date from '../lib/date.js'

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

    /** Execute a single query and return the resulting data. */
    async sql(query) {
        try {
            return await this._db.all(query)
        } catch (err) {
            console.log(err)
        }
    }

    async getRecord(table, id) {
        const rec = await this.sql(`select * from ${table} where id =${id}`)
        return rec[0]
    }

    /** Out the results an html file. */
    async view(queries) {
        const results = []

        if (!Array.isArray(queries)) {
            queries = [ queries ]
        }

        for (let query of queries) {
            results.push(await this.sql(query))
        }

        this._html.write(results)
    }

    /** data - json objects array [ [{}, {}, ...], [{}, {}, ...], ...] */
    jsonView(data) {
        try {
            this._html.write(data)
        } catch (err) {
            console.error('Data undefined!\n', err)
        }
    }

    run(query) {
        try {
            this._db.run(query)
        } catch (err) {
            console.log(err)
        }
    }

    /** Show the data base tables. */
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

    insert(table, data) {
        if (!Array.isArray(data)) {
            data = [ data ]
        }

        data = this.validRecord(data)

        let values = data.map((record) => `(${Object.values(record).join(', ')})`).join(', ')
        let query = `insert into ${table} values ${values}`

        this.run(query)
    }

    validRecord(data) {
        for (const [i, rec] of Object.entries(data)) {
            for (const [key, value] of Object.entries(rec)) {
                if (typeof value == 'string') {
                    data[i][key] = `"${value}"`
                } else if (value === null) {
                    data[i][key] = 'null'
                } 
            }
        }

        return data
    }

    update(table, data) {
        if (!Array.isArray(data)) {
            data = [ data ]
        }

        data = this.validRecord(data)

        for (const [i, rec] of Object.entries(data)) {
            let values = [] 

            for (const [key, value] of Object.entries(rec)) {
                values.push(`${key} = ${value}`)
            }

            let query = `update ${table} set ${values.join(', ')} where id = ${rec.id}`
            this.run(query)
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
    constructor(dbPath='data/tasks.db') {
        super(dbPath)
        this.setQueries(tasksQueries)
    }

    async active(limit = 0) {
        let query = this.q.active_tasks()

        if (limit > 0) {
            query = `${query} limit ${limit}`
        }

        return await this.sql(query)
    }

    async record(description = null, priority = 10, date_to = null) {
        const obj = await super.record('tasks')
        obj.description = description
        obj.date_from = date.toString(new Date())
        obj.date_to = date.toString(new Date())
        obj.status = 0
        obj.priority = priority

        return obj
    }

    add(data) {
        super.insert('tasks', data)
    }

    update(data) {
        super.update('tasks', data)
    }

    async task(id) {
        return await this.sql(this.q.tasks_by_id(id))
    }

    complete(id) {
        this.run(this.q.complete_task(id, date.toString(new Date())))
    }
}

const mi = new MIdb()
const tsk = new TasksDb()
const ptsk = new TasksDb('data/personal.db')

export { mi, tsk, ptsk }
