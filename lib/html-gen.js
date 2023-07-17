class htmlPage {
    constructor(fn = console.log) {
        this.writeFunction = fn
        this.author = 'Aleksandr Ermolaev'
        this.email = 'ave6990@ya.ru'
        this.version = '2023-06-20'
        this.title = 'HTML_out'
        this.content = 'Here must be a content...'
        this.css = `html {
            font-family: "Droid Sans", sans-serif;
        }
        table {
            margin: 10px 0;
            border-collapse: collapse;
            border: 1px solid;
            font-size: 10pt;
            line-height: 0.9;
        }
        td, th {
            border: 1px solid;
            padding: 5px;
        }`
    }

    html() {
        return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="author" content=${this.author}>
    <meta name="email" content=${this.email}>
    <meta name="version" content=${this.version}>
    <style type="text/css">
        ${this.css}
    </style>
</head>
<body>
${this.content}
</body>
</html>`
    }

    async write(content) {
        this.content = ''

        if (Array.isArray(content)) {
            for (let item of content) {
                this.content = `${this.content}\n${this.jsonToTable(item)}`
            }
        } else {
            this.content = this.jsonToTable(await content)
        }

        this.writeFunction(this.html())
    }

    jsonToTable(data, table_id = 'data_from_query', header = true) {
        let rows = ''
        let thead = ''
        let tbody = ''

        if (header) {
            console.log(data, data[0])
            for (const field of Object.keys(data[0])) {
                rows = `${rows}\n<th>${field}</th>`
            }
            thead = `<thead>\n<tr>${rows}\n</tr>\n</thead>`
            rows = ''
        }
        for (const [i, record] of data.entries()){
            let cols = ''
            for (const [j, field] of Object.keys(data[0]).entries()) {
                cols = `${cols}\n<td id='cell_${i}_${j}'>${record[field]}</td>`
            }
            rows = `${rows}\n<tr id='row_${i}'>${cols}\n</tr>`
        }

        const table = `<table class='data_from_query'>\n${thead}\n<tbody>${rows}\n</tbody>\n</table>`
        return table
    }
}

export { htmlPage }
