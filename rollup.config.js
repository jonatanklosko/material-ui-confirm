import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
  ],
  external: ['react', '@material-ui/core'],
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    copy({
      targets: [
        { src: 'src/index.d.ts', dest: 'dist' }
      ],
    }),
  ]
};
