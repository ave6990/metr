import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

class MIdb {
    constructor() {
        this.connect('./data/midb.db')
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

    async sql(query) {
        let data

        try {
            return await this.db.all(query)
        } catch (err) {
            console.log(err)
        }
    }
}

const mi = new MIdb()

export { mi }
