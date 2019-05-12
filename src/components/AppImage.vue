<template>
    <!-- <figure> -->
    <!-- <figcaption>Image</figcaption> -->
    <!-- <picture>
            <source
            :srcset="src"
            media="(min-width: 600px)"
            > -->
    <img
    v-if="preload"
    :src="src"
    rel="preload">
    <img
    v-else
    :src="src">
    <!-- </picture>
    </figure> -->
</template>


<script>
export default {
    name: 'AppImage',
    data() {
        return {
            max: false
        };
    },
    props: {
        preload: {
            type: Boolean,
            default: false
        },
        src: {
            type: String,
            default: ''
        }
    }
};
</script>


<style lang="scss" scoped>
picture {
    display: block;
    // max-width: 40vw;
}

figure {
    margin: 0;
}

// img {
//     width: 100vw;
// }
</style>
