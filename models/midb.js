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

    async getCondition(date='2023-03-03') {
        return await this.db.all(`select * from conditions where date = '${date}'`)
    }
}

const mi = new MIdb()

export { mi }
