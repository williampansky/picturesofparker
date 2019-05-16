<template>
    <vue-preview
    :slides="computedImages"
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
export default {
    name: 'SwipeModal',

    props: {
        images: {
            type: Array,
            default: () => ([])
        }
    },

    computed: {
        computedImages() {
            return this.images.map(img => {
                return {
                    src: img.url_o, // Large 1600 (1600 x 900)
                    msrc: img.url_m, // Medium 500 (500 x 281)
                    alt: img.description._content
                        ? img.description._content
                        : 'A picture of Parker.',
                    title: img.title,
                    w: Number(img.width_o),
                    h: Number(img.height_o),
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
                    datetaken: img.datetaken,
                    datetakengranularity: img.datetakengranularity,
                    datetakenunknown: img.datetakenunknown,
                    views: img.views,
                    tags: img.tags,
                    url_h: img.url_h,
                    height_h: Number(img.height_h),
                    width_h: Number(img.width_h),
                    url_l: img.url_l,
                    height_l: Number(img.height_l),
                    width_l: Number(img.width_l),
                    url_m: img.url_m,
                    height_m: Number(img.height_m),
                    width_m: Number(img.width_m),
                    url_n: img.url_n,
                    height_n: Number(img.height_n),
                    width_n: Number(img.width_n),
                    url_o: img.url_o,
                    height_o: Number(img.height_o),
                    width_o: Number(img.width_o),
                    url_q: img.url_q,
                    height_q: Number(img.height_q),
                    width_q: Number(img.width_q),
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
        handleClose() {
            // console.log('close event');
        },

        // resizeMasonryItem(item) {
        //     /**
        //      * Get the grid object, its row-gap,
        //      * and the size of its implicit rows.
        //      */
        //     // const grid = document.querySelector('.masonry');
        //     const grid = document.querySelector('.masonry');

        //     const rowGap = parseInt(
        //         window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
        //     );

        //     const rowHeight = parseInt(
        //         window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
        //     );

        //     /*
        //      * Spanning for any brick = S
        //      * Grid's row-gap = G
        //      * Size of grid's implicitly create row-track = R
        //      * Height of item content = H
        //      * Net height of the item = H1 = H + G
        //      * Net height of the implicit row-track = T = G + R
        //      * S = H1 / T
        //      */
        //     const rowSpan = Math.ceil(
        //         (item.querySelector('.masonry-content')
        //             .getBoundingClientRect()
        //             .height + rowGap
        //         ) / (rowHeight + rowGap)
        //     );

        //     /**
        //      * Set the spanning as calculated above (S)
        //      */
        //     item.style.gridRowEnd = 'span ' + rowSpan;

        //     /**
        //      * Make the images take all the
        //      * available space in the cell/item.
        //      */
        //     item.querySelector('.masonry-content')
        //         .style.height = rowSpan * 10 + 'px';
        // },

        // resizeAllMasonryItems() {
        //     // Get all item class objects in one list
        //     const allItems = document.querySelectorAll('.masonry-item');

        //     /*
        //      * Loop through the above list & execute
        //      * the spanning function to each
        //      * list-item (i.e. each masonry item)
        //      */
        //     for (let i = 0; i > allItems.length; i++)
        //         this.resizeMasonryItem(allItems[i]);
        // },

        // waitForImages() {
        //     const allItems = document.querySelectorAll('.masonry-item');
        //     for (let i = 0; i < allItems.length; i++) {
        //         imagesLoaded(allItems[i], instance => {
        //             let item = instance.elements[0];
        //             this.resizeMasonryItem(item);
        //         });
        //     }
        // }
    }

};
</script>


<style lang="scss">
/* stylelint-disable */
// figure {
//     margin: 0 !important;
// }

figure a {
    display: block;
}

figure img {
    width: 100%;
}

// .masonry {
//     display: grid;
//     grid-auto-rows: 0;
//     grid-gap: 10px;
//     grid-template-columns: repeat(auto-fill, minmax(200px,1fr));

//     &-item {
//         background-color: #eee;
//         border-radius: 0;
//         margin: 0;
//         overflow: hidden;
//         position: relative;
//     }

//     &-item a {
//         display: block;
//     }

//     &-item img {
//         position: relative;
//     }

//     &:after {
//         align-items: center;
//         background-color: rgba(0, 0, 0, 0.5);
//         color: white;
//         counter-increment: masonry;
//         display: flex;
//         font-weight: bold;
//         height: 100%;
//         justify-content: center;
//         left: 0;
//         position: absolute;
//         top: 0;
//         transition: all 100ms ease-in;
//         width: 100%;
//     }

//     &:hover, &:focus {
//         &:after {
//             background-color: rgba(0, 0, 0, 0.75);
//         }
//     }
// }
</style>
