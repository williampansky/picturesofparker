/**
 * @namespace $state.photos
 * @requires axios
 */
// import axios from 'axios';

export default {
    state: {
        errors: {
            credentials: false,
            api: false,
            tags: false
        },
        loading: {
            credentials: true,
            api: true,
            tags: true
        },
        success: {
            credentials: false,
            api: false,
            tags: false
        },
    },

    mutations: {
        updateErrorsState(state, key) {
            switch (key) {
                case 'credentials':
                    if (!state.errors.credentials) state.errors.credentials = true;
                    else state.errors.credentials = false;
                    break;
                case 'api':
                    if (!state.errors.api) state.errors.api = true;
                    else state.errors.api = false;
                    break;
                case 'tags':
                    if (!state.errors.tags) state.errors.tags = true;
                    else state.errors.tags = false;
                    break;
            }
        },
        updateLoadingState(state, key) {
            switch (key) {
                case 'credentials':
                    if (!state.loading.credentials) state.loading.credentials = true;
                    else state.loading.credentials = false;
                    break;
                case 'api':
                    if (!state.loading.api) state.loading.api = true;
                    else state.loading.api = false;
                    break;
                case 'tags':
                    if (!state.loading.tags) state.loading.tags = true;
                    else state.loading.tags = false;
                    break;
            }
        },
        updateSuccessState(state, key) {
            switch (key) {
                case 'credentials':
                    if (!state.success.credentials) state.success.credentials = true;
                    else state.success.credentials = false;
                    break;
                case 'api':
                    if (!state.success.api) state.success.api = true;
                    else state.success.api = false;
                    break;
                case 'tags':
                    if (!state.success.tags) state.success.tags = true;
                    else state.success.tags = false;
                    break;
            }
        }
    },

    getters: {
        state(state) { return state; },
        errors(state) { return state.errors; },
        loading(state) { return state.loading; },
        success(state) { return state.success; }
    }
};
