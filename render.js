// # ! /usr/env/node node
const ejs = require('ejs')
const fs = require('fs-extra')
const { red } = require('chalk')

// likes [{filename: String, ctx: Record<string>: any}]
const renderList = []

renderList.forEach(render)

async function render({filename, ctx}) {
    if(typeof filename !== 'string' && !filename.endWith('.tmpl')) {
        throw new TypeError(red('filename must end with string'))
    }
    try {
        const content = await fs.readFile(filename)
        const result = await ejs.render(content, ctx, {
            rmWhitespace: true,
            async: true
        })
        const targetPath = filename.split('.').slice(0, -1).join('.')
        fs.writeFileSync(targetPath, result)
    }catch(e) {
        throw new Error(red("render file message error"))
    }
}
