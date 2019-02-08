/**
 * @summary Http route definitions with `vue-router`.
 *
 * @namespace $router
 *
 * @desc
 * ```treeview
home
└── home/
└── post-login/
└── sandbox/
└── dashboard/
    └── profile/
 * ```
 */

// base imports
import Vue from 'vue';
// import $store from '@/store';
import Router from 'vue-router';
// import jwtDecode from 'jwt-decode';

// Views => Home/Login
import TheHome from '@/views/TheHome.vue';

// Views => 404
import NotFound from '@/views/The404.vue';

/**
 * Lazyloading
 * @see [Lazy-Loading]{@link https://router.vuejs.org/guide/advanced/lazy-loading.html}
 */

// Views => Dashboard
// const TheDashboard = () => import(/* webpackChunkName: "dashboard" */ '@/views/TheDashboard.vue');


Vue.use(Router);
const DEFAULT_TITLE = 'Pictures of Parker'; // Default meta title


const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path:      '/',
            name:      'home',
            component: TheHome,
            meta: {
                title: DEFAULT_TITLE
            }
        },
        {
            path: '*',
            component: NotFound,
            meta: {
                title: DEFAULT_TITLE + ' | 404'
            }
        }
    ],


    /**
     * @summary Renders pageview to the top page on route changes.
     * @method scrollBehavior
     * @memberof router
     * @see [StackOverflow]{@link https://stackoverflow.com/a/42127327}
     */
    scrollBehavior: (to, from, savedPosition) => {
        if (to.hash)
            return { selector: to.hash };
        else
            return { x: 0, y: 0 };
    },
});


/**
 * @method MetaPageTitle
 * @memberof router
 * @inner
 * @description
 * ```jsx
 * document.title = to.meta.title || DEFAULT_TITLE;
 * ```
 */
router.afterEach((to, from) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});


export default router;
