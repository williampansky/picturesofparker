<template>
    <figure
    class="appimage-figure">
        <div
        v-show="loading"
        :style="style"
        class="appimage-loader" />

        <img
        v-show="!loading"
        :data-src="src"
        :data-srcset="srcset"
        :class="{ 'uk-animation-fade': !loading }"
        class="appimage-img">
        <!-- :style="style" -->
    </figure>
</template>


<script>
/**
 * @module AppImage
 * @requires lozad
 *
 * @see [lozad]{@link https://github.com/ApoorvSaxena/lozad.js}
 * @see [credit]{@link https://markus.oberlehner.net/blog/lazy-loading-responsive-images-with-vue/}
 */

import lozad from 'lozad';

export default {
    name: `AppImage`,

    props: {
        backgroundColor: {
            type: String,
            default: `#eee`
        },
        height: {
            type: Number,
            default: null,
            required: true
        },
        src: {
            type: String,
            default: null
        },
        srcset: {
            type: String,
            default: null
        },
        width: {
            type: Number,
            default: null,
            required: true
        },
    },

    data() {
        return {
            /**
             * Toggle this bool in the Vue devtools
             * to view the loading animation state.
             */
            loading: true
        };
    },

    /**
     * @member $vm.$watch.src
     * Watches this.$props.src to make sure the value
     * coming in from the api doesn't contain any
     * undefined parameters. Once the string no longer
     * contains any undefined, swap the src with data-src.
     */
    watch: {
        src: {
            deep: true,
            immediate: true,
            handler(value) {
                if (!value.match(/(undefined)/g) || value !== null) {
                    this.$nextTick(() => {
                        const imageElement = this.$el.children[1];
                        const datasrc = imageElement.getAttribute('data-src');
                        imageElement.setAttribute('src', datasrc);
                        this.loading = false;
                        return value;
                    });
                }
            }
        }
    },

    computed: {
        /**
         * @member aspectRatio
         * Calculate the aspect ratio of the image
         * if the width and the height are given.
         */
        aspectRatio() {
            if (!this.width || !this.height) return null;
            return (this.height / this.width) * 100;
        },


        /**
         * @member style
         * Computed data property to combine our height, width,
         * and optional backgroundColor props to set inline
         * style applications to both the <figure /> wrapper
         * element and the central <img /> element. Alleviates
         * the content jump that occurs with loading images.
         */
        style() {
            /**
             * The background color is used as a
             * placeholder while loading the image.
             * You can use the dominant color of the
             * image to improve perceived performance.
             * @see {@link https://manu.ninja/dominant-colors-for-lazy-loading-images/}
             *
             * Note that this property is optional, and
             * the current swipe-animation is our placeholder.
             */
            const style = { backgroundColor: this.backgroundColor };
            if (this.width) style.width = `${this.width}px`;

            /**
             * If the image is still loading and an
             * aspect ratio could be calculated, we
             * apply the calculated aspect ratio by
             * using padding top.
             */
            const applyAspectRatio = this.loading && this.aspectRatio;
            if (applyAspectRatio) {
                // Prevent flash of unstyled image
                // after the image is loaded.
                style.height = 0;
                // Scale the image container according
                // to the aspect ratio.
                style.paddingTop = `${this.aspectRatio}%`;
            }

            return style;
        },
    },

    mounted() {
        /**
         * As soon as the <img> element triggers
         * the `load` event, the loading state is
         * set to `false`, which removes the apsect
         * ratio we've applied earlier.
         */
        const setLoadingState = () => { this.loading = false; };
        this.$el.addEventListener(`load`, setLoadingState);


        /**
         * We remove the event listener as soon as
         * the component is destroyed to prevent
         * potential memory leaks.
         */
        this.$once(`hook:destroyed`, () => {
            this.$el.removeEventListener(`load`, setLoadingState);
        });


        /**
         * Originally, we initialize Lozad.js on the root
         * element of our component; i.e:
         * const observer = lozad(this.$el);
         * observer.observe();
         *
         * However, since we wrapped our component in a
         * <figure /> tag, we need to grab the <img />;
         * i.e: children[1].
         */
        const imageElement = this.$el.children[1];
        // console.log(imageElement);
        const observer = lozad(imageElement);
        observer.observe();
    },
};
</script>


<style lang="scss">
.appimage-figure {
    margin: 0;
    position: relative;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
}

// Responsive image styles.
.appimage-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    vertical-align: middle;
    object-fit: cover;

    &.uk-animation-fade {
        animation-duration: 250ms;
    }
}

.appimage-loader {
    cursor: wait;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18), 0 2px 15px rgba(0, 0, 0, 0.08);
    height: 100%;
    min-height: 150px;
    width: 100%;
    min-width: 50px;
    /* stylelint-disable */
    padding: 0 !important;
    // @include position-absolute(0, 0, 0, 0);
    @include display-flex(column nowrap, center, space-between);
    @include animation-swipe;
}
</style>
