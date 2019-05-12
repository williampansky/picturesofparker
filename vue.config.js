/**
 * @summary vue.config.js
 * @namespace config:vue
 *
 * @requires path
 *
 * @prop {String} outputDir=dist - Output directory of compiled Vue bundle.
 * @prop {String} assetsDir=media - Assets will be referenced using /media as the base URL.
 */

const path = require('path');
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
// const workboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    outputDir: 'dist',

    /**
     * @prop {String} assetsDir=media - Assets will
     * be referenced using /assets as the base URL.
     */
    assetsDir: 'assets',

    configureWebpack: {
        // plugins: [
        //     new OptimizeCSSPlugin({
        //         assetNameRegExp: /\.css$/g,
        //         cssProcessor: require('cssnano'),
        //         cssProcessorPluginOptions: {
        //             preset: ['default', {
        //                 safe: true,
        //                 map: { inline: false },
        //                 discardComments: {
        //                     removeAll: true
        //                 }
        //             }],
        //         },
        //         canPrint: true
        //     }),
        // ]
    },

    chainWebpack: config => {
        // Development only plugins
        if (process.env.NODE_ENV === 'development') {
            console.log('NODE_ENV === development')
        }
    },

    filenameHashing: true,

    pluginOptions: {
        lintStyleOnBuild: true,
        stylelint: {
            fix: false
        },
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                path.resolve(__dirname, 'src/styles/variables/_colors.scss'),
                path.resolve(__dirname, 'src/styles/variables/_typography.scss'),
                path.resolve(__dirname, 'src/styles/_mixins.scss'),
                path.resolve(__dirname, 'src/styles/_config.scss'),
            ]
        }
    },

    baseUrl: undefined,
    runtimeCompiler: true,
    productionSourceMap: undefined,
    parallel: undefined,

    css: {
        sourceMap: true
    },

    lintOnSave: undefined
};
