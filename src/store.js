/**
 * @todo Fill in some additional info here; to better explain how to use it/etc.
 * @summary State management pattern + library for Vue.js applications.
 *
 * @namespace $store
 *
 * @see [Docs]{@link https://vuex.vuejs.org/}
 *
 * @description
 * Vuex is a state management pattern + library for Vue.js applications. It
 * serves as a centralized store for all the components in an application,
 * with rules ensuring that the state can only be mutated in a predictable
 * fashion. It also integrates with Vue's official devtools extension to
 * provide advanced features such as zero-config time-travel debugging and
 * state snapshot export / import.
 *
 * ![Vuex](api-vuex.jpg)
*/
import Vue  from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';


/**
 * @method session
 * @memberof store
 * @description
 * The guest session store module for managing session information.
 */
import session from './store/session';


Vue.use(Vuex);
export default new Vuex.Store({
    // plugins: [
    //     logrocketPlugin,
    //     // createPersistedState()
    // ],
    strict: false,

    modules: {
        session
    },

    state: {
        authError: ''
    },

    mutations: {
        setAuthError(state, error) {
            state.authError = error;
        }
    }
});
