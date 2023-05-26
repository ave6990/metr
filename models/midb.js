import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

/*// midb.db.then(db => db.all('select * from mi limit 1')).then(console.log)
const db = (async () => {
    return open({
        filename: './data/midb.db',
        driver: sqlite3.Database
    })
})() */

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

const queries = {
    getConditions: `select * from conditions`
}

const mi = new MIdb()

export { mi }
