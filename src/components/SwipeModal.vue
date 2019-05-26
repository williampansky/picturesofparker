<template>
    <vue-preview
    :slides="computedImages"
    @open="handleOpen($event)"
    @close="handleClose" />
</template>


<script>
/**
 * @module SwipeModal
 * @see [docs]{@link https://github.com/LS1231/vue-preview}
 * @see [masonry]{@link https://codepen.io/chriscoyier/pen/bOQqXv}
 */
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
                    src: this.parseSrc(img),
                    msrc: this.parseMsrc(img),
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
                    description: img.description._content
                        ? img.description._content
                        : 'A picture of Parker.',
                    dateupload: img.dateupload,
                    dateTakenString: this.parseDateTaken(
                        img.datetaken, img.datetakengranularity
                    ),
                    datetaken: this.formatDate(img.datetaken),
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

    methods: {
        handleClose() { this.modal = {}; },
        handleOpen(payload) { this.modal = payload; },

        /**
         * Parses string param & returns url sizing.
         * @method parseSrc
         * @param {Object} img Image object
         */
        parseSrc(img) {
            // return Large 1600 (1600 x 900) or Original (3840 x 2160)
            return img.url_h ? img.url_h : img.url_o;
        },

        /**
         * Parses string param & returns url sizing for mobile devices;
         * first checks original size url and returns that if it's a gif.
         * This allows gifs to play during the grid/gallery view.
         * @method parseMsrc
         * @param {Object} img Image object
         */
        parseMsrc(img) {
            // check if url_o is a gif, if true - return gif
            if (img.url_o.match(/(gif)/g)) return img.url_o;
            else if (img.url_m) return img.url_m; // Medium 500 (500 x 281)
            else return img.url_t; // Thumbnail (100 x 56)
        },

        /**
         * Parses string param & returns it kebab-cased.
         * @method parseTitle
         * @param {String} string String to parse
         * @see [StackOverflow]{@link https://stackoverflow.com/a/1983661}
         */
        parseTitle(string) {
            return string.replace(/\W+/g, '-').toLowerCase();
        },

        /**
         * Parses string param & returns it with commas.
         * @method parseTags
         * @param {String} string String to parse
         * @see [StackOverflow]{@link https://stackoverflow.com/a/1983661}
         */
        parseTags(string) {
            return string.replace(/\W+/g, ', ').toLowerCase();
        },

        /**
         * Parses string param & returns as a formatted date;
         * e.g: "2019-05-18 07:55:45" to "May 18, 2019". Also checks
         * the granularity of the date; which (according to the Flickr API)
         * determines the accuracy to which we know the date to be true.
         *
         * At present, the following granularities are used:
         * 0 — Y-m-d H:i:s  (returns "May 18, 2019")
         * 4 — Y-m          (returns "May, 2019")
         * 6 — Y            (returns "Sometime in 2019")
         * 8 — Circa...     (returns "Circa 2019")
         * @method parseDateTaken
         * @param {String} date String to parse & format
         * @param {Number} granularity Accuracy of date
         * @see [format]{@link https://date-fns.org/v1.30.1/docs/format}
         */
        parseDateTaken(date, granularity) {
            switch (Number(granularity)) {
                case 0: return 'Taken on ' + format(date, 'MMMM DD, YYYY');
                case 4: return 'Taken in ' + format(date, 'MMMM, YYYY');
                case 6: return 'Taken sometime in ' + format(date, 'YYYY');
                case 8: return 'Taken in ' + format(date, 'YYYY');
                default: return 'Taken on ' + format(date, 'MMMM DD, YYYY');
            }
        },

        /**
         * Formats the date param with a default,
         * optionally overriden, formatter param.
         * @method parseDateTaken
         * @param {String} date String to parse & format
         * @param {String} formatter Date format per date-fns
         * @see [format]{@link https://date-fns.org/v1.30.1/docs/format}
         */
        formatDate(date, formatter = 'MMMM DD, YYYY HH:mmA') {
            return format(date, formatter);
        }
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
    .pswp__caption {
        position: fixed;
    }

    .flexr {
        width: 100%;
        @include display-flex(row nowrap, center, space-between);
    }

    .pswp__caption__center {
        cursor: default;
        margin: 0;
        max-width: none;
        @include display-flex(column nowrap, flex-start, flex-start);

        .caption-left {
            width: 100%;
        }
        // .caption-left,
        // .caption-right {
        //     width: 100%;
        // }

        // .caption-left + .caption-right {
        // }

        .caption-hr {
            $spacing: 2px;
            border-color: #555;
            margin: calc(#{$spacing} + 1px) 0 $spacing 0;
            width: 100%;
        }

        .caption-title {
            color: white;
            font-weight: bold;
        }

        .caption-tags {
            display: block;
            @media (min-width: 320px) {
                line-height: 1;
            }
        }

        @include breakpoint('small') {
            justify-content: space-between;

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
