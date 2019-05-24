/**
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
*/
import Vue from 'vue';
import Vuex from 'vuex';

/**
 * Store module for managing api credentials.
 * @method credentials
 * @memberof store
 */
import credentials from './store/credentials';

/**
 * Store module for managing photos from the api.
 * @method photos
 * @memberof store
 */
import photos from './store/photos';

/**
 * Store module for managing global state.
 * @method state
 * @memberof store
 */
import state from './store/state';

/**
 * Store module for managing user's tag list.
 * @method tagslist
 * @memberof store
 */
import tagslist from './store/tags';

/**
 * Vuex plugins
 */
const plugins = [];

Vue.use(Vuex);
export default new Vuex.Store({
    plugins,
    strict: false,
    modules: {
        credentials,
        photos,
        state,
        tagslist
    },
    state: {
        authError: '',
        notifications: []
    },
    mutations: {
        setAuthError(state, error) {
            state.authError = error;
        },
        clearNotifications(state) {
            state.notifications = [];
        },
        stashNotification(state, payload = {}) {
            if (payload.type !== 'loading') {
                state.notifications.push({
                    id: payload.id
                        ? Number(payload.id)
                        : Number(state.notifications.length),
                    active: false,
                    message: payload.message ? payload.message : 'Notification',
                    type: payload.type ? payload.type : 'default',
                    group: payload.group ? payload.group : null,
                    timeout: payload.timeout ? payload.timeout : 3000,
                    timestamp: payload.timestamp ? payload.timestamp : null
                });
            }
        }
    },
    getters: {
        notifications(state) { return state.notifications; }
    }
});
