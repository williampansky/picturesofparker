/**
 * @summary The Progressive JavaScript Framework.
 * @namespace Vue
 * @see [GitHub]{@link https://vuejs.org/}
 * @description
 * Vue (pronounced /vjuː/, like view) is a progressive framework for building
 * user interfaces. It is designed from the ground up to be incrementally
 * adoptable, and can easily scale between a library and a framework depending
 * on different use cases. It consists of an approachable core library that
 * focuses on the view layer only, and an ecosystem of supporting libraries
 * that helps you tackle complexity in large Single-Page Applications.
 */
import Vue from 'vue';
import VueMq from 'vue-mq';
import App from './App.vue';
import store from './store';
import router from './router';
import axios from 'axios';
import SmoothReflow from './components/SmoothReflow';
import VuePreview from './components/vue-preview';
import UIkit from 'uikit';
import '@/styles/vendor/uikit.scss';
import Icons from 'uikit/dist/js/uikit-icons';

UIkit.use(Icons);
window.UIkit = UIkit;


/**
 * @method axios
 * @see [GitHub]{@link https://github.com/axios/axios/}
 *
 * @description
 * According to LogRocket's (error tracking api) documentation, it needs to be
 * initialized after, _"any library which wraps XHRHttpRequest (e.g. axios)"_.
 * Therefore, this file imports axios globally to be used throughout the app;
 * accessible via the variable `this.$axios`.
 */
const flickrAPI = 'https://api.flickr.com/services/rest/';
axios.defaults.baseURL = flickrAPI;
Vue.prototype.$axios = axios;




/**
 * @method productionTip
 * @see [Docs]{@link https://vuejs.org/v2/api/#productionTip}
 *
 * @description
 * Set this to false to prevent the production tip on Vue startup.
 */
Vue.config.productionTip = false;




/**
 * @method LazyLoadDirective
 * @see [CssTricks]{@link https://css-tricks.com/lazy-loading-images-with-vue-js-directives-and-intersection-observer}
 */
// Vue.directive('lazyload', LazyLoadDirective);




/**
 * @method VuePreview
 * @see [GitHub]{@link https://github.com/LS1231/vue-preview}
 */
Vue.use(VuePreview);




/**
 * @method VueLazyload
 * @see [GitHub]{@link https://github.com/hilongjw/vue-lazyload}
 */
// Vue.use(VueLazyload, {
//     attempt: 3,
//     error: '',
//     lazyComponent: true,
//     loading: '',
//     preLoad: 1.3,
// });




/**
 * @method keyCodes
 * @see [Docs]{@link https://vuejs.org/v2/api/#keyCodes}
 * @see [Keycodes]{@link https://keycode.info/}
 *
 * @description
 * Define custom key alias(es) for v-on.
 */
Vue.config.keyCodes = {
    f1: 112,
    f2: 113,
    f3: 114,
    f4: 115,
    f5: 116,
    prev: 37,
    next: 39
};




/**
 * @method VueMq
 * @see [GitHub]{@link https://github.com/AlexandreBonaventure/vue-mq}
 *
 * @description
 * Define your breakpoints and build responsive design semantically and
 * declaratively in a mobile-first way with Vue.
 *
 * ```js
 * xsmall(xs):  0px - 639px
 * small (s):   640px - 959px
 * medium (m):  960px - 1199px
 * large (l):   1200px - 1599px
 * xlarge(xl):  1600px+
 * ```
 */
Vue.use(VueMq, {
    breakpoints: {
        xs: 640,
        s:  960,
        m:  1200,
        l:  1600,
        xl: Infinity
    }
});




/**
 * @method shortkey
 * @see [GitHub]{@link https://github.com/iFgR/vue-shortkey}
 *
 * @description
 * Plugin for VueJS 2.x accepts shortcuts globaly and in a single listener.
 */
Vue.use(require('vue-shortkey'));




/**
 * @method SmoothReflow
 * @see [GitHub]{@link https://github.com/guanzo/vue-smooth-reflow}
 *
 * @description
 * Transition an elements reflow when the data changes.
 */
Vue.component('SmoothReflow', SmoothReflow);





/**
 * @method $mount
 * @see [Docs]{@link https://vuejs.org/v2/api/#vm-mount}
 */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
