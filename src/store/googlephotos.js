/**
 * The guest session store module for managing session information
 */

// import Vue from 'vue';
// import { differenceInCalendarDays, format, addDays } from 'date-fns';
// import axios from 'axios';

const defaultState = () => {
    return [];
};


export default {
    state: defaultState(),

    mutations: {
        setGooglePhotosRequest(state, array) {
            state = array;
        },
    },


    getters: {
        googlephotos(state) {
            return state;
        },
    },


    actions: {
        // imageOrientation(state) {
        //     state.googlephotos.forEach(photo => {
        //         let orientation;
        //         let height = photo.mediaMetadata.height;
        //         let width = photo.mediaMetadata.width;

        //         if (width < height) orientation = 'landscape';
        //         else if (width > height) orientation = 'portrait';
        //         else orientation = 'even';

        //         return orientation;
        //     });
        // }
    }
};
