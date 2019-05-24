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
import store from './store';
import axios from 'axios';
import UIkit from 'uikit';
import App from './App.vue';
import '@/styles/vendor/uikit.scss';
import Icons from 'uikit/dist/js/uikit-icons';
import VuePreview from './components/vue-preview';

UIkit.use(Icons);
window.UIkit = UIkit;


/**
 * Set global axios module.
 * @method axios
 * @see [GitHub]{@link https://github.com/axios/axios/}
 */
const flickrAPI = 'https://api.flickr.com/services/rest/';
axios.defaults.baseURL = flickrAPI;
Vue.prototype.$axios = axios;


/**
 * Set this to false to prevent the production tip on Vue startup.
 * @method productionTip
 * @see [Docs]{@link https://vuejs.org/v2/api/#productionTip}
 */
Vue.config.productionTip = false;


/**
 * A Vue Integrated PhotoSwipe Image Preview Plugin.
 * @method VuePreview
 * @see [GitHub]{@link https://github.com/LS1231/vue-preview}
 */
Vue.use(VuePreview);


/**
 * @method $mount
 * @see [Docs]{@link https://vuejs.org/v2/api/#vm-mount}
 */
new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
