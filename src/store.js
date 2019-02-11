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
import createPersistedState from 'vuex-persistedstate';


/**
 * @method googlephotos
 * @memberof store
 */
// import googlephotos from './store/googlephotos';


Vue.use(Vuex);
export default new Vuex.Store({
    plugins: [
        createPersistedState()
    ],
    strict: false,

    modules: {
        // googlephotos
    },

    state: {
        authError: '',
        googlephotos: [],
        modalOpen: false,
    },

    mutations: {
        setAuthError(state, error) { state.authError = error; },
        openModal(state) { state.modalOpen = true; },
        closeModal(state) { state.modalOpen = false; },
        setGooglePhotosRequest(state, array) {
            state.googlephotos = array;
        },
    },

    getters: {
        googlephotos(state) {
            return state.googlephotos;
        },

        modal(state) {
            return state.modalOpen;
        }
    },
});
