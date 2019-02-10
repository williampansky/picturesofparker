/**
 * The guest session store module for managing session information
 */

// import Vue from 'vue';
// import { differenceInCalendarDays, format, addDays } from 'date-fns';
// import axios from 'axios';

const defaultState = () => {
    return {
        modalOpen: false,
        unsplash: [],
        stay: {
            // date: {
            //     start: new Date(),
            //     end: addDays(new Date(), 1)
            // },
        },
    };
};


export default {
    state: defaultState(),

    mutations: {
        openModal(state) { state.modalOpen = true; },
        closeModal(state) { state.modalOpen = false; },

        setUnsplashRequest(state, images) {
            state.unsplash = images;
        }
    },


    getters: {
        /**
         * @returns {Object} complete state object.
         */
        state(state) {
            return state;
        },

        modal(state) {
            return state.modalOpen;
        },

        unsplash(state) {
            return state.unsplash;
        }
    },


    actions: {}
};
