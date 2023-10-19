'use strict';

import firebase from '../node_modules/firebase/package.json'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript'
import alias from '@rollup/plugin-alias'
import minify from 'rollup-plugin-minify-html-literals'
import { terser } from 'rollup-plugin-terser'
import size from 'rollup-plugin-size'
import litcss from 'rollup-plugin-lit-css'
import { litCssConfig } from './rollup.config.rest'
import json from '@rollup/plugin-json';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.ts',
  output: {
    dir: "./dist/scripts",
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    json(),
    alias({
      entries: [{
        find: 'lit-html/lib/shady-render.js',
        replacement: 'node_modules/lit-html/lit-html.js',
      }]
    }),
    replace({
      'FIREBASE_SDK_VERSION': firebase.version,
    }),
    resolve({
      dedupe: [
        'lit-element',
        'lit-html'
      ]
    }),
    production && minify(),
    litcss( litCssConfig ),
    typescript({ typescript: require('typescript') }),
    production && terser({
      output: {
        comments: false
      }
    }),
    production && size(),
  ]
}
