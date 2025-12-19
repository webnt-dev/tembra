// Import rollup plugins
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import summary from 'rollup-plugin-summary';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json' with { type: 'json' };



export default {
  plugins: [
		commonjs(),
    // html({
    //   input: [
		// 		...htmlSrc
		// 	],
		// 	rootDir: path.join(process.cwd(), 'build'),
		// 	flattenOutput: false,
    // }),

    resolve({
      // mainFields: ['browser', 'module', 'main'],  // This helps resolve Monaco's dependencies
      browser: true,  // Ensure it's bundled for the browser environment
		}),
    terser({
      // ecma: 2022,
      module: true,
      warnings: true,

    }),
    summary({
			showMinifiedSize: true,
		}),
  ],

	input: {
		"tembra-api": 'build/index.mjs',
	},
  output: {
    dir: 'public',
    // file: `public/tembra-api-${pkg.version}.js`,
    format: 'esm',
    sourcemap: true,
    entryFileNames: `[name].${pkg.version}.mjs`, // Add hash to JS filenames
    // // chunkFileNames: '[name].[hash].js', // Add hash to chunk filenames
    // assetFileNames: '[name].[hash].[ext]', // Add hash to other assets
  },
  preserveEntrySignatures: 'strict',
  onwarn: function(warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }

    // console.warn everything else
    console.warn( warning.message );
  },
	// inlineDynamicImports: true,
};


