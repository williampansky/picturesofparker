/**
 * @namespace $store.tags
 * @requires axios
 */
import axios from 'axios';

export default {
    state: {
        error: {
            requestUrl: '',
            requestMethod: '',
            statusCode: '',
            status: ''
        },
        data: []
    },

    mutations: {
        updateTagsList(state, data = {}) {
            state.data = data;
        },

        updateTagsListError(state, error = {}) {
            state.error = {
                requestUrl: error.requestUrl,
                requestMethod: error.requestMethod,
                statusCode: error.statusCode,
                status: error.status
            };
        }
    },

    getters: {
        tagslist(state) {
            return state.data;
        }
    },

    actions: {
        /**
         * Async/await function for tag list retrieval.
         * Doesn't query API again if already retrieved once.
         * @method getTagsList
         */
        async getTagsList(
            { commit, state, rootGetters },
            options,
            timeout = 8000
        ) {
            if (state.length) return Promise.resolve(state);

            try {
                const response = await axios.get(
                    '?method=flickr.tags.getListUserPopular', {
                        params: {
                            api_key: rootGetters.credentials.key,
                            user_id: rootGetters.credentials.user,
                            count: options && options.count
                                ? options && options.count : 30,
                            format: 'json',
                            nojsoncallback: 1,
                            timeout: timeout
                        }
                    });
                const data = response.data.who.tags.tag;
                commit('updateTagsList', data);
                commit('updateLoadingState', 'tags', { root: true });
                commit('updateSuccessState', 'tags', { root: true });
                return data;
            } catch (error) {
                commit('updateTagsListError', error);
                commit('updateErrorsState', 'tags', { root: true });
                Promise.reject(error);
            }
        }
    }
};
