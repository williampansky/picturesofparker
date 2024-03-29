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
import connection from '@/mixins/connection';
export default {
    name: 'SwipeModal',
    mixins: [connection],
    props: {
        images: {
            type: Array,
            default: () => ([])
        },
        credentials: {
            type: Object,
            default: () => ({})
        }
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
                    title: this.parseTitle(img.title),
                    // return height depending on connection
                    h: this.parseImageDimensions('height', img),
                    // return width depending on connection
                    w: this.parseImageDimensions('width', img),
                    // return kebab-cased title or img.id
                    pid: img.title
                        ? this.convertTitleToPID(img.title)
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
                    // size => Small 240 (240 x 135)
                    url_s: img.url_s,
                    height_s: Number(img.height_s),
                    width_s: Number(img.width_s),
                    // size => Thumbnail (100 x 56)
                    url_t: img.url_t,
                    height_t: Number(img.height_t),
                    width_t: Number(img.width_t),
                    sizes: img.sizes,

                    /**
                     * Custom key/value pairs
                     */
                    // dateTaken in human-readable string format
                    dateTakenString: this.parseDateTaken(
                        img.datetaken, img.datetakengranularity
                    ),
                    // webpage url direct link
                    webUrl: this.buildWebUrl(img.id)
                };
            });
        }
    },

    methods: {
        handleClose() { this.modal = {}; },
        handleOpen(payload) { this.modal = payload; },

        /**
         * Parses param & returns url string depending on connection.
         * @param {Object} img Image object
         */
        parseSrc(img) {
            const connection = this.connection;
            const type = connection && connection.type;
            const effType = connection && connection.effectiveType;
            const saveData = connection && connection.saveData;

            if (connection && (type === 'wifi' || effType === '4g')) {
                // return original image if user is on wifi
                return img.url_o;
            } else if (connection && saveData) {
                // if user's device has saveData on (true), return the
                // Large 1024 (1024 x 576) or Original (3840 x 2160)
                return img.url_l ? img.url_l : img.url_o;
            } else {
                // return Large 1600 (1600 x 900) or Original (3840 x 2160)
                return img.url_h ? img.url_h : img.url_o;
            }
        },

        /**
         * Parses img object param & returns dimensions depending on the key.
         * @param {String} key Switch key for height or width
         * @param {Object} img Image object
         */
        parseImageDimensions(key, img) {
            const connection = this.connection;
            const type = connection && connection.type;
            const effType = connection && connection.effectiveType;
            const saveData = connection && connection.saveData;

            if (connection && (type === 'wifi' || effType === '4g')) {
                // return original image if user is on wifi
                switch (key) {
                    case 'height': return img.height_o;
                    case 'width': return img.width_o;
                }
            } else if (connection && saveData) {
                // if user's device has saveData on (true), return the
                // Large 1024 (1024 x 576) or Original (3840 x 2160)
                switch (key) {
                    case 'height':
                        return img.height_l ? img.height_l : img.height_o;
                    case 'width':
                        return img.width_l ? img.width_l : img.width_o;
                }
            } else {
                // return Large 1600 (1600 x 900) or Original (3840 x 2160)
                switch (key) {
                    case 'height':
                        return img.height_h ? img.height_h : img.height_o;
                    case 'width':
                        return img.width_h ? img.width_h : img.width_o;
                }
            }
        },

        /**
         * Parses string param & returns url sizing for mobile devices;
         * first checks original size url and returns that if it's a gif.
         * This allows gifs to play during the grid/gallery view.
         * @param {Object} img Image object
         */
        parseMsrc(img) {
            // check if url_o is a gif, if true - return gif
            if (img.url_o.match(/(gif)/g)) return img.url_o;
            else if (img.url_n) return img.url_n; // Small 320 (320 x 180)
            else return img.url_t; // Thumbnail (100 x 56)
        },

        /**
         * If the string doesn't match a generated title, e.g. IMG_1234,
         * then return the string; else return the default.
         * @param {String} string String to parse
         */
        parseTitle(string) {
            const isGeneratedTitle = string.match(/((img_)|(download_))\w+/gi);
            if (!isGeneratedTitle) return string;
            else return 'A picture of Parker.';
        },

        /**
         * Parses string param & returns it kebab-cased for id use.
         * @param {String} string String to parse
         * @see [StackOverflow]{@link https://stackoverflow.com/a/1983661}
         */
        convertTitleToPID(string) {
            return string.replace(/\W+/g, '-').toLowerCase();
        },

        /**
         * Parses string param & returns it with commas.
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
         * @param {String} date String to parse & format
         * @param {String} formatter Date format per date-fns
         * @see [format]{@link https://date-fns.org/v1.30.1/docs/format}
         */
        formatDate(date, formatter = 'MMMM DD, YYYY HH:mmA') {
            return format(date, formatter);
        },

        /**
         * Builds direct link to image on flickr.com site; e.g:
         * https://www.flickr.com/photos/{user-id}/{photo-id} to
         * https://www.flickr.com/photos/165794294@N08/46958736805
         * @param {String} id Id of photo to link to
         * @see [urls]{@link https://www.flickr.com/services/api/misc.urls.html}
         */
        buildWebUrl(id) {
            const domain = 'https://www.flickr.com/photos';
            const userId = this.credentials.user;
            return domain + '/' + userId + '/' + id;
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
