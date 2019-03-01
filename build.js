var fs = require('fs-extra');
var rollup = require('rollup');
var commonjs = require('rollup-plugin-commonjs');    // require
var resolve = require('rollup-plugin-node-resolve'); // require from node_modules
var terser = require('rollup-plugin-terser').terser; // minify
var prettier = require('rollup-plugin-prettier');

// clean previous build
fs.removeSync('/dist/three-disposer.js')
fs.removeSync('/dist/three-disposer.min.js')

async function build(inputOptions, outputOptions) {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    // generate code and a sourcemap
    const { code, map } = await bundle.generate(outputOptions);

    // or write the bundle to disk
    await bundle.write(outputOptions);
}

/*******************************************
 *  Debug build
 ******************************************/

build({
    input: 'src/disposer.js',
    plugins:  [ commonjs(), resolve() ],
    external: [ 'three-full/builds/Three.cjs.js' ],
}, {
    format: 'umd',
    name: 'THREEDisposer',
    file: './dist/browser/three-disposer.js',
    globals: {
        'three-full/builds/Three.cjs.js' : 'THREE'
    }
});


/*******************************************
 *  Minified build
 ******************************************/

build({
    input: 'src/disposer.js',
    plugins:  [
        commonjs(),
        resolve(),
        terser(),
        prettier({
          parser: 'babel',
          tabWidth: 0,
          singleQuote: false,
          bracketSpacing:false
        })
    ],
    external: [ 'three-full/builds/Three.cjs.js' ],
}, {
    format: 'umd',
    name: 'THREEDisposer',
    file: './dist/browser/three-disposer.min.js',
    globals: {
        'three-full/builds/Three.cjs.js' : 'THREE'
    }
});

