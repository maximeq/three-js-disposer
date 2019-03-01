// import de nos plugins
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from "rollup-plugin-uglify";

export default {
    input: './src/disposer.js',
    output: {
        file: './dist/browser/three-disposer.js',
        format: 'cjs'
    },
    external: ['three-full'],
    plugins: [
        commonjs(), // prise en charge de require
        resolve(), // prise en charge des modules depuis node_modules
    ]
};
