<template>
    <vue-preview
    :slides="computedImages"
    @open="handleOpen($event)"
    @close="handleClose"></vue-preview>
</template>


<script>
/**
 * @module SwipeModal
 * @see [docs]{@link https://github.com/LS1231/vue-preview}
 * @see [masonry]{@link https://codepen.io/chriscoyier/pen/bOQqXv}
 */
// const imagesLoaded = require('imagesloaded');
// import imagesLoaded from 'imagesloaded';
// const masonryEvents = ['load', 'resize'];
import { format } from 'date-fns';
export default {
    name: 'SwipeModal',

    props: {
        images: {
            type: Array,
            default: () => ([])
        }
    },

    data() {
        return {
            modal: {}
        };
    },

    computed: {
        computedImages() {
            return this.images.map(img => {
                return {
                    /**
                     * vue-preview required key/value pairs:
                     * — src    (large endpoint)
                     * — msrc   (mobile endpoint)
                     * — alt    (image alt text)
                     * — title  (image title)
                     * — h      (image height)
                     * — w      (image width)
                     * — pid    (custom url hash)
                     */
                    // Large 1600 (1600 x 900) or Original (3840 x 2160)
                    src: img.url_h
                        ? img.url_h
                        : img.url_o,
                    // return Medium 500 (500 x 281) or Thumbnail (100 x 56)
                    msrc: img.url_m
                        ? img.url_m
                        : img.url_t,
                    // return description string or default
                    alt: img.description._content
                        ? img.description._content
                        : 'A picture of Parker.',
                    // return title string or default
                    title: img.title
                        ? img.title
                        : 'A picture of Parker.',
                    // return Large 1600 height or Original height
                    h: img.height_h
                        ? Number(img.height_h)
                        : Number(img.height_o),
                    // return Large 1600 width or Original width
                    w: img.width_h
                        ? Number(img.width_h)
                        : Number(img.width_o),
                    // return kebab-cased title or img.id
                    pid: img.title
                        ? this.parseTitle(img.title)
                        : img.id,

                    /**
                     * additional api key/value pairs
                     */
                    id: img.id,
                    owner: img.owner,
                    secret: img.secret,
                    server: img.server,
                    farm: img.farm,
                    ispublic: img.ispublic,
                    isfriend: img.isfriend,
                    isfamily: img.isfamily,
                    description: img.description,
                    dateupload: img.dateupload,
                    datetaken: img.datetaken
                        ? format(img.datetaken, 'MMMM DD, YYYY')
                        : '',
                    datetakengranularity: img.datetakengranularity,
                    datetakenunknown: img.datetakenunknown,
                    // return tags comma-separated or null
                    tags: img.tags
                        ? this.parseTags(img.tags)
                        : '',
                    views: img.views,
                    // size => Large 1600 (1600 x 900)
                    url_h: img.url_h,
                    height_h: Number(img.height_h),
                    width_h: Number(img.width_h),
                    // size => Large 1024 (1024 x 576)
                    url_l: img.url_l,
                    height_l: Number(img.height_l),
                    width_l: Number(img.width_l),
                    // size => Medium 500 (500 x 281)
                    url_m: img.url_m,
                    height_m: Number(img.height_m),
                    width_m: Number(img.width_m),
                    // size => Small 320 (320 x 180)
                    url_n: img.url_n,
                    height_n: Number(img.height_n),
                    width_n: Number(img.width_n),
                    // size => Original (3840 x 2160)
                    url_o: img.url_o,
                    height_o: Number(img.height_o),
                    width_o: Number(img.width_o),
                    // size => Square 150 (150 x 150)
                    url_q: img.url_q,
                    height_q: Number(img.height_q),
                    width_q: Number(img.width_q),
                    // size => Thumbnail (100 x 56)
                    url_t: img.url_t,
                    height_t: Number(img.height_t),
                    width_t: Number(img.width_t),
                    sizes: img.sizes
                };
            });
        }
    },

    // mounted() {
    //     /**
    //      * Resize all the grid items
    //      * on the load and resize events.
    //      */
    //     masonryEvents.forEach(event => {
    //         window.addEventListener(
    //             event,
    //             this.resizeAllMasonryItems()
    //         );
    //     });

    //     /**
    //      * Do a resize once more when
    //      * all the images finish loading.
    //      */
    //     this.waitForImages();
    // },

    // beforeDestroy() {
    //     masonryEvents.forEach(event => {
    //         window.removeEventListener(
    //             event,
    //             this.resizeAllMasonryItems()
    //         );
    //     });
    // },

    methods: {
        handleClose() { this.modal = {}; },
        handleOpen(payload) { this.modal = payload; },

        /**
         * Parses string param & returns it kebab-cased.
         * @method parseTitle
         * @param {String} string String to parse & return with dashes
         * @see [StackOverflow]{@link https://stackoverflow.com/a/1983661}
         */
        parseTitle(string) {
            return string.replace(/\W+/g, '-').toLowerCase();
        },

        /**
         * Parses string param & returns it with commas.
         * @method parseTags
         * @param {String} string String to parse & return with commas
         * @see [StackOverflow]{@link https://stackoverflow.com/a/1983661}
         */
        parseTags(string) {
            return string.replace(/\W+/g, ', ').toLowerCase();
        },
    }
};
</script>


<style lang="scss">
.grid-item {
    &-link {
        display: block;
    }

    &-image {
        width: 100%;
    }
}

// photoswipe (pswp) modal dialog
.pswp {
    // add transition for keypresses
    // .pswp__container {
    //     transition: transform 200ms ease-in-out;
    // }

    // caption/title
    .pswp__caption__center {
        cursor: default;
        margin: 0;
        max-width: none;
        @include display-flex(column nowrap, flex-start, flex-start);

        .caption-left,
        .caption-right {
            width: 100%;
        }

        .caption-left + .caption-right {
            $spacing: 4px;
            border-top: 1px solid #555;
            margin-top: calc(#{$spacing} + 2px);
            padding-top: $spacing;
        }

        .caption-title {
            color: white;
            font-weight: bold;
        }

        @include breakpoint('small') {
            @include display-flex(row nowrap, flex-end, space-between);
            .caption-left + .caption-right {
                border-top: 0;
                margin-top: 0;
                padding-top: 0;
                text-align: right;
            }
        }
    }
}
</style>
