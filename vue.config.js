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
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    outputDir: 'dist',

    /**
     * @prop {String} assetsDir=media - Assets will
     * be referenced using /assets as the base URL.
     */
    assetsDir: 'assets',

    configureWebpack: {
        plugins: [
            new OptimizeCSSPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', {
                        safe: true,
                        map: { inline: false },
                        discardComments: {
                            removeAll: true
                        }
                    }],
                },
                canPrint: true
            })
        ]
    },

    chainWebpack: config => {
        /**
         * @method chainWebpack
         * @memberof config:vue
         * @desc disable preload/prefetch directives in link elements
         */
        // config.plugins.delete('preload');
        // config.plugins.delete('prefetch');

        /**
         * @method chainWebpack_development
         * @memberof config:vue
         * @desc Development only chainWebpack options
         */
        if (process.env.NODE_ENV === 'production') {
            console.log('NODE_ENV:', process.env.NODE_ENV);
            console.log('REPOSITORY_URL:', process.env.REPOSITORY_URL);
            console.log('API_KEY:', process.env.REACT_APP_CUSTOM_API_KEY);
            console.log('USER_ID:', process.env.REACT_APP_CUSTOM_USER_ID);
        } else if (process.env.NODE_ENV === 'development') {
            console.log('NODE_ENV:', process.env.NODE_ENV);
            console.log('VUE_APP_APIKEY:', process.env.VUE_APP_APIKEY);
            console.log('VUE_APP_APIUSER:', process.env.VUE_APP_APIUSER);
        }
    },

    filenameHashing: false,

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

    // Speed up build
    productionSourceMap: false,

    // Multi-thread babel transpiling
    parallel: true,

    css: {
        sourceMap: true
    },

    lintOnSave: undefined
};
