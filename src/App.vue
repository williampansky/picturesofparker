<template>
    <div id="app">
        <router-view />
    </div>
</template>


<script>
export default {
    name: 'App',
    methods: {
        /**
         * Workbox is a library that bakes in a set of best practices and
         * removes the boilerplate every developer writes when working
         * with service workers.
         *
         * @method registerServiceWorker
         * @see [Workbox/Webpack]{@link https://developers.google.com/web/tools/workbox/guides/codelabs/webpack}
         * @see [Workbox]{@link https://developers.google.com/web/tools/workbox/}
         */
        registerServiceWorker() {
            /**
             * Check that service workers are registered
             * @see [Step4]{@link https://developers.google.com/web/tools/workbox/guides/codelabs/webpack#register}
             */
            // if ('serviceWorker' in navigator) {
            //     window.addEventListener('load', () => {
            //         navigator.serviceWorker.register('/sw.js')
            //             .then(registration => {
            //                 console.log(
            //                     'SW registered: ', registration
            //                 );
            //             })
            //             .catch(registrationError => {
            //                 console.log(
            //                     'SW registration failed: ', registrationError
            //                 );
            //         });
            //     });
            // }
        }
    }
};
</script>


<style lang="scss" scoped>
// GLOBALS
// ========================================================================
// GLOBALS => html, body
html, body {
    cursor: default;
    background-color: $color-white;
    color: $base-font-color;
    font-family: $base-font-family;
    font-size: $base-font-size;
    line-height: $base-font-line-height;
    letter-spacing: $base-font-letter-spacing;
    font-weight: $base-font-weight;
    font-style: $base-font-style;

    @if $base-text-rendering == true {
        text-rendering: optimizeLegibility;
    }

    @if $base-font-smoothing == true {
        -webkit-font-smoothing: antialiased;
    }
}

body {
    @if $base-overflow-x-hidden == true {
        overflow-x: hidden;
    }
}


//_____________________________________
// GLOBALS => :focus event
// Remove global default outlines
// Keyboard focus event styles added back on per-component basis
:focus { outline: none; }


//_____________________________________
// GLOBALS => code
:not(pre) > code,
:not(pre) > kbd,
:not(pre) > samp { color: inherit; } // I dislike UIkit's red-colored <code />



// TYPOGRAPHY
// ========================================================================
// TYPOGRAPHY => resets/overrides
em {
    color: inherit;
}


//_____________________________________
// TYPOGRAPHY => cursor:default
// Applies default cursor across the board for the following tags
/* stylelint-disable */
em,
h1, h2, h3, h4, h5, h6,
label,
p,
span,
strong,
th, td {
    cursor: default;
    cursor: inherit;
}
/* stylelint-enable */


//_____________________________________
// TYPOGRAPHY => body copy
p:last-child,
p:last-of-type {
    margin-bottom: 0;
}


//_____________________________________
// TYPOGRAPHY => headings
h1, h2, h3, h4, h5, h6 {
    font-family: $font-condensed;
}
</style>
