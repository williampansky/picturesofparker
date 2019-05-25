/**
 * @namespace $store.photos
 * @requires axios
 */
import axios from 'axios';

/**
 * Flickr API methods
 * @member methods
 * @memberof $store.photos
 * @see https://www.flickr.com/services/api/flickr.photos.search.htm
 */
const methods = {
    prefix: '?method=',
    getPhotos: 'flickr.people.getPhotos',
    search: 'flickr.photos.search',
    tags: 'flickr.tags.getListUserPopular'
};

/**
 * A comma-delimited list of extra information
 * to fetch for each returned record.
 * @member photoextras
 * @memberof $store.photos
 * @see https://www.flickr.com/services/api/flickr.photos.search.htm
 */
const photoextras = [
    'description',
    'date_upload',
    'date_taken',
    'sizes',
    'tags',
    'url_h', // Large 1600 (1600 x 900)
    'url_l', // Large 1024 (1024 x 576)
    'url_m', // Medium 500 (500 x 281)
    'url_n', // Small 320 (320 x 180)
    'url_o', // Original (3840 x 2160)
    'url_q', // Square 150 (150 x 150)
    'url_t', // Thumbnail (100 x 56)
    'views'
].toString();

/**
 * Return method string of endpoint to hit.
 * @function getMethodString
 * @memberof $store.photos
 * @see https://www.flickr.com/services/api
 */
const getMethodString = key => {
    switch (key) {
        case 'getPhotos': return methods.prefix + methods.getPhotos;
        case 'search': return methods.prefix + methods.search;
        case 'tags': return methods.prefix + methods.tags;
        default: return methods.prefix + methods.search;
    }
};

export default {
    state: {
        error: {
            requestUrl: '',
            requestMethod: '',
            statusCode: '',
            status: ''
        },
        data: {}
    },

    mutations: {
        updatePhotosState(state, data = {}) {
            if (state.data && state.data.photo && state.data.photo.length) {
                state.data.photo.push(...data);
                state.data.page += 1;
            } else {
                state.data = data;
            }
        },

        updatePhotosError(state, error = {}) {
            state.error = {
                requestUrl: error.requestUrl,
                requestMethod: error.requestMethod,
                statusCode: error.statusCode,
                status: error.status
            };
        }
    },

    getters: {
        photos(state) {
            return state.data;
        }
    },

    actions: {
        /**
         * Async/await function for photo retrieval.
         * Doesn't query API again if already retrieved once.
         * @method getPhotos
         */
        async getPhotos(
            { commit, state, rootGetters },
            options,
            timeout = 8000
        ) {
            if (state.data && state.data.photo && state.data.photo.length)
                return Promise.resolve(state);

            try {
                const response = await axios.get(
                    getMethodString(), {
                        params: {
                            api_key: rootGetters.credentials.key,
                            user_id: rootGetters.credentials.user,
                            extras: options && options.extras
                                ? options && options.extras : photoextras,
                            page: options && options.page
                                ? options && options.page : 1,
                            sort: options && options.sort
                                ? options && options.sort : 'date-taken-desc',
                            format: 'json',
                            nojsoncallback: 1,
                            timeout: timeout
                        }
                    });
                const data = response.data.photos;
                commit('updatePhotosState', data);
                commit('updateLoadingState', 'api', { root: true });
                commit('updateSuccessState', 'api', { root: true });
                return data;
            } catch (error) {
                commit('updatePhotosError', error);
                commit('updateErrorsState', 'api', { root: true });
                Promise.reject(error);
            }
        },

        /**
         * Async/await function to update state.data.photo array.
         * Doesn't query API again if already retrieved once.
         * @method updatePhotos
         */
        async updatePhotos(
            { commit, state, rootGetters },
            options,
            timeout = 8000
        ) {
            if (state.data && !state.data.photo && !state.data.photo.length)
                return Promise.resolve(state);

            try {
                const response = await axios.get(
                    getMethodString(), {
                        params: {
                            api_key: rootGetters.credentials.key,
                            user_id: rootGetters.credentials.user,
                            extras: options && options.extras
                                ? options && options.extras : photoextras,
                            page: options && options.page
                                ? options && options.page : 1,
                            sort: options && options.sort
                                ? options && options.sort : 'date-taken-desc',
                            format: 'json',
                            nojsoncallback: 1,
                            timeout: timeout
                        }
                    });
                const data = response.data.photos.photo;
                commit('updatePhotosState', data);
                return data;
            } catch (error) {
                commit('updatePhotosError', error);
                commit('updateErrorsState', 'api', { root: true });
                Promise.reject(error);
            }
        }
    }
};
