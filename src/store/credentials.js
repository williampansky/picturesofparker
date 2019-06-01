import axios from 'axios';

export default {
    state: {
        error: null,
        key: null,
        user: null
    },

    mutations: {
        updateCredentials(state, credentials) {
            let prop;

            // Mutate state values individually
            for (prop in credentials) {
                if (typeof state[prop] !== 'undefined')
                    state[prop] = credentials[prop];
            }
        },
        updateCredentialsError(state, error) {
            state.error = error;
        }
    },

    getters: {
        credentials(state) {
            return state;
        }
    },

    actions: {
        /**
         * Async/await function for api credentials retrieval.
         * Doesn't query API again if already retrieved once.
         * @method getApiCredentials
         */
        async getApiCredentials({ commit, state }) {
            const nKey = process.env.VUE_APP_NETLIFY_APIKEY;
            const nUser = process.env.VUE_APP_NETLIFY_USR;

            if (
                (nKey !== null && typeof(nKey) !== 'undefined') &&
                (nUser !== null && typeof(nUser) !== 'undefined')
            ) {
                let obj = { key: nKey, user: nUser };
                commit('updateCredentials', obj);
                commit('updateLoadingState', 'credentials', { root: true });
                commit('updateSuccessState', 'credentials', { root: true });
            } else {
                const prefix = 'https://wt-30c7730f9ad0ef866a5444aa1e3835dc-0';
                const domain = '.sandbox.auth0-extend.com/';
                const affix  = 'picturesofparker';

                if (state.length) return Promise.resolve(state);

                try {
                    const response = await axios.get(prefix + domain + affix);
                    const data = response.data;
                    commit('updateCredentials', data);
                    commit('updateLoadingState', 'credentials', { root: true });
                    commit('updateSuccessState', 'credentials', { root: true });
                    return data;
                } catch (error) {
                    commit(
                        'updateCredentialsError',
                        error.status ? error.status : error
                    );
                    commit('updateErrorsState', 'credentials', { root: true });
                    Promise.reject(error);
                }
            }
        }
    }
};
