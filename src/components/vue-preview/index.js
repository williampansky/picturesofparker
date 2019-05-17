import PreviewComponent from './preview.vue';
import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';

/**
 * A Vue Integrated PhotoSwipe Image Preview Plugin. Slightly refactored
 * to fit my picturesofparker.com needs (api integration) and to avoid
 * code that spans past the column width (80).
 *
 * @module VuePreview
 * @type {ObjectConstructor}
 * @requires [PhotoSwipe]{@link https://github.com/dimsemenov/PhotoSwipe}
 *
 * @author LS1231
 * @see [GitHub]{@link https://github.com/LS1231/vue-preview}
 *
 */
const VuePreview = {
    install(Vue, options) {
        Vue.component('VuePreview', {
            mixins: [PreviewComponent],

            props: {
                slides: {
                    type: Array,
                    required: true,
                    default: () => ([])
                }
            },

            methods: {
                initPhotoSwipeFromDOM(gallerySelector) {
                    /**
                     * Note: I believe the author didn't use arrow
                     * functions in the following code to avoid
                     * complications with `this` scope.
                     *
                     * @member self
                     * @memberof VuePreview
                     * @inner
                     * @returns this
                     */
                    const self = this;

                    /**
                     * parse slide data (url, title, size ...)
                     * from DOM elements (children of gallerySelector)
                     * @method parseThumbnailElements
                     * @param {Element} el DOM element to parse
                     */
                    const parseThumbnailElements = function(el) {
                        let thumbElements = el.childNodes;
                        let numNodes = thumbElements.length;
                        let items = [];
                        let figureEl;
                        let linkEl;
                        let size;
                        let item;

                        for (let i = 0; i < numNodes; i++) {
                            figureEl = thumbElements[i]; // <figure> element

                            // include only element nodes
                            if (figureEl.nodeType !== 1)
                                continue;

                            linkEl = figureEl.children[0]; // <a> element
                            size = linkEl.getAttribute('data-size').split('x');

                            // create slide object
                            item = {
                                src: linkEl.getAttribute('href'),
                                w: parseInt(size[0], 10),
                                h: parseInt(size[1], 10),
                                pid: figureEl.getAttribute('data-pswp-pid')
                            };

                            // <figcaption> content
                            if (figureEl.children.length > 1)
                                item.title = figureEl.children[1].innerHTML;

                            // <img> thumbnail element,
                            // retrieving thumbnail url
                            if (linkEl.children.length > 0) {
                                item.msrc = linkEl
                                    .children[0]
                                    .getAttribute('src');
                            }

                            // save link to element for getThumbBoundsFn()
                            item.el = figureEl;

                            // push items to array
                            items.push(item);
                        }

                        return items;
                    };

                    /**
                     * find nearest parent element
                     * @method closest
                     * @param {Element} el DOM element to find
                     * @param {Function} fn recursive callback
                     */
                    const closest = function closest(el, fn) {
                        return el && (
                            fn(el)
                                ? el
                                : closest(el.parentNode, fn)
                        );
                    };

                    /**
                     * triggers when user clicks on thumbnail
                     * @method onThumbnailsClick
                     * @param {Event} e event
                     */
                    const onThumbnailsClick = function(e) {
                        e = e || window.event;
                        e.preventDefault
                            ? e.preventDefault()
                            : e.returnValue = false;
                        let eTarget = e.target || e.srcElement;

                        // find root element of slide
                        let clickedListItem = closest(eTarget, function(el) {
                            return (
                                el.tagName &&
                                el.tagName.toUpperCase() === 'FIGURE'
                            );
                        });

                        if (!clickedListItem) return;

                        // Find index of clicked item by looping through all
                        // child nodes. Alternatively, you may define index
                        // via data-* attribute.
                        let clickedGallery = clickedListItem.parentNode;
                        let childNodes = clickedListItem.parentNode.childNodes;
                        let numChildNodes = childNodes.length;
                        let nodeIndex = 0;
                        let index;

                        for (let i = 0; i < numChildNodes; i++) {
                            if (childNodes[i].nodeType !== 1) continue;

                            if (childNodes[i] === clickedListItem) {
                                index = nodeIndex;
                                break;
                            }

                            nodeIndex++;
                        }

                        // open PhotoSwipe if valid index found
                        if (index >= 0) openPhotoSwipe(index, clickedGallery);

                        return false;
                    };

                    /**
                     * parse picture index and gallery index from URL
                     * e.g: (#&pid=1&gid=2)
                     * @method photoSwipeParseHash
                     */
                    const photoSwipeParseHash = function() {
                        let hash = window.location.hash.substring(1);
                        let params = {};
                        if (hash.length < 5) return params;

                        let vars = hash.split('&');

                        for (let i = 0; i < vars.length; i++) {
                            if (!vars[i]) continue;

                            let pair = vars[i].split('=');
                            if (pair.length < 2) continue;

                            params[pair[0]] = pair[1];
                        }

                        if (params.gid) params.gid = parseInt(params.gid, 10);

                        return params;
                    };

                    /**
                     * @method openPhotoSwipe
                     * @param {Number} index Index of array to open
                     * @param {Element} galleryElement DOM gallery element
                     * @param {Boolean} disableAnimation Animation boolean
                     * @param {Boolean} fromURL URL query boolean
                     */
                    const openPhotoSwipe = function(
                        index,
                        galleryElement,
                        disableAnimation,
                        fromURL
                    ) {
                        let gid = (
                            galleryElement.getAttribute('data-pswp-uid') - 1
                        ) || 0;

                        let pswpElement = document
                            .querySelectorAll('.pswp')[gid];

                        let gallery;
                        let photoSwipeOptions;
                        let items;

                        items = parseThumbnailElements(galleryElement);

                        // define photoSwipeOptions (if needed)
                        photoSwipeOptions = {
                            // enable custom hash strings
                            // https://photoswipe.com/documentation/faq.html#custom-pid-in-url
                            history: true,
                            galleryPIDs: true,

                            // define gallery index (for URL)
                            galleryUID: galleryElement
                                .getAttribute('data-pswp-uid'),

                            // See Options -> getThumbBoundsFn section of
                            // documentation for more information on options.
                            // https://photoswipe.com/documentation/options.html
                            getThumbBoundsFn: function(index) {
                                // find thumbnail
                                let thumbnail = items[index]
                                    .el
                                    .getElementsByTagName('img')[0];

                                // get browser vertical scroll position
                                let pageYScroll = window.pageYOffset ||
                                document.documentElement.scrollTop;

                                // get bounding rectangle
                                let rect = thumbnail.getBoundingClientRect();

                                return {
                                    x: rect.left,
                                    y: rect.top + pageYScroll,
                                    w: rect.width
                                };
                            },

                            ...options
                        };

                        // PhotoSwipe opened from URL
                        if (fromURL) {
                            if (photoSwipeOptions.galleryPIDs) {
                                // parse real index when custom PIDs are used
                                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                                for (let j = 0; j < items.length; j++) {
                                    if (items[j].pid === index) {
                                        photoSwipeOptions.index = j;
                                        break;
                                    }
                                }
                            } else {
                                // in URL indexes start from 1
                                photoSwipeOptions.index = parseInt(
                                    index, 10
                                ) - 1;
                            }
                        } else {
                            photoSwipeOptions.index = parseInt(index, 10);
                        }

                        // exit if index not found
                        if (isNaN(photoSwipeOptions.index)) return;

                        if (disableAnimation)
                            photoSwipeOptions.showAnimationDuration = 0;

                        // Pass data to PhotoSwipe class
                        gallery = new PhotoSwipe(
                            pswpElement,
                            PhotoSwipeUIDefault,
                            items,
                            photoSwipeOptions
                        );

                        // initialize it
                        gallery.init();

                        // Gallery starts opening
                        gallery.listen('open', function() {
                            self.$emit('open');
                        });

                        // Gallery starts closing
                        gallery.listen('close', function() {
                            self.$emit('close');
                        });
                    };

                    // loop through all gallery elements and bind events
                    const galleryElements = document
                        .querySelectorAll(gallerySelector);

                    for (let i = 0, l = galleryElements.length; i < l; i++) {
                        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
                        galleryElements[i].onclick = onThumbnailsClick;
                    }

                    // Parse URL and open gallery if it contains #&pid=3&gid=1
                    const hashData = photoSwipeParseHash();

                    if (hashData.pid && hashData.gid) {
                        openPhotoSwipe(
                            hashData.pid, // index
                            galleryElements[hashData.gid - 1], // element
                            false, // disableAnimation
                            true // fromUrl
                        );
                    }
                }
            },

            mounted() {
                this.initPhotoSwipeFromDOM('.uk-grid-view');
            }
        });
    }
};

if (typeof window !== 'undefined' && window.Vue)
    window.Vue.use(VuePreview);

export default VuePreview;
