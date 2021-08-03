import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import tsc2 from 'rollup-plugin-typescript2'
import { uglify } from 'rollup-plugin-uglify'
import merge from 'rollup-merge-config'
import reload from 'rollup-plugin-livereload'
import serve from "rollup-plugin-serve"
import json from "@rollup/plugin-json"

const env = process.env.NODE_ENV
const isProd = () => env === 'production'

const config = {
    output: {
        // TODO file: dynamic define in script
        // TODO format: dynamic in script
        // TODO name: dynamic set in script
        sourcemap: !isProd()
    },
    plugins: [
        tsc2({
            outDir: './types'
        }), // TODO dyname use tsc.json for every project
        resolve(),
        replace({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        babel({
            exclude: '**/node_modules/**'
        }),
        commonjs(),
        json(),
        // dts()
    ],
    external: ['lodash'],
    global: {
        lodash: '_'
    }
}

const devConfig = () => ({
    plugins: [
        serve({
            open: false,
            verbose: true,
            contentBase: ['dist', 'public'],
            host: 'localhost',
            port: 3000
        }),
        reload(),
    ],
    watch: {
        exclude: '**/node_modules/**'
    }
})

const prodConfig = () => ({
    plugins: [
        uglify({
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false
          }
        })
    ]
})

export default merge(
    config,
    isProd() ? prodConfig() : null,
    !isProd() ? devConfig() : null
)
