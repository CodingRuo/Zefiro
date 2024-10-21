import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

export default {
    input: 'src/index.js',
    plugins: [ commonjs(), nodeResolve(), cleanup() ],                 // 2# Removes comments from the generated bundle
    output: [
        {
            file: 'dist/zefiro.js',   // 3# Name of the generated bundle
            format: 'esm',                  // 4# Formats the bundle as an ES module
            plugins: [ filesize() ],        // 5# Displays the size of the generated bundle
        },
        {
            file: 'dist/zefiro.min.js',
            format: 'esm',
            plugins: [ terser(), filesize() ]
        }
    ],
}