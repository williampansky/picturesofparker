/**
 * The guest session store module for managing session information
 */

// import Vue from 'vue';
// import { differenceInCalendarDays, format, addDays } from 'date-fns';
// import axios from 'axios';

const defaultState = () => {
    return {
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
        // setSessionId(state, id) {
        //     state.id = id;
        // },
    },


    getters: {
        /**
         * @returns {Object} complete state object.
         */
        state(state) {
            return state;
        },
    },


    actions: {}
};
