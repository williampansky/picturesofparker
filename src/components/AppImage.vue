<template>
    <!-- <figure> -->
    <!-- <figcaption>Image</figcaption> -->
    <!-- <picture>
            <source
            :srcset="src"
            media="(min-width: 600px)"
            > -->
    <img
    :src="src"
    >
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
        src: {
            type: String
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
