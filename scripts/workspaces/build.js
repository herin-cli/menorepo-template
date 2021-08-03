#! /usr/bin/env node

// ######################
// this is only an example about bundle all subprojects by rollup to `umd module`.
// exec yarn build try it 

// please write your own script
// ######################

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const execa = require('execa')
const pkg = require('../../package.json')

const resolve = (...args) => path.resolve(__dirname, '../../', ...args)

const guessBoundingTargets = () => 
    fs.readdirSync(resolve(pkg.workspaces), {withFileTypes: true})
    .filter(i => i.isDirectory())
    .map(i => path.join(pkg.workspaces, i.name))


run()

async function run() {
    const targets = guessBoundingTargets()
    await buildAll(targets);
}


async function buildAll(targets) {
    await conCurrencyLimitExecute(require('os').cpus().length, targets, build)
}


async function conCurrencyLimitExecute(limit, sources, asyncFn) {
    const rets = []
    const executing = []
    for(let i in sources) {
        if(executing.length >= limit) {
            await Promise.race(executing)
        }

        const p = Promise.resolve().then(() => asyncFn(sources[i], sources))
        rets[i] = p;
        const e = p.then(() => {executing.splice(executing.indexOf(e), 1)})
        executing.push(e)
    }

    return Promise.all(rets)
}

async function build(target) {
    const pkgPath = resolve(target, 'package.json')
    const project = target.split(path.sep).pop()
    if(!fs.existsSync(pkgPath)) {
        console.warn(
        `project: ${chalk.red(project)} doesn't exit package.json...unbuild it.`
        )
        return
    }
    const targetPkg = require(pkgPath)

    if(targetPkg.private) {
        return 
    }
    console.log(`building ${target}...`)
    return await execa(
        `rollup`,
        [
            '-c',
            `--input=${path.join(target, 'src/main.ts')}`,
            `-o=dist/${project + '.umd.js'}`,
            `--format=umd`,
            `--name=${project}`,
            '--environment=NODE_ENV:production',
        ],
        {
            stdout: 'inherit'
        }
    )
    
    
}

