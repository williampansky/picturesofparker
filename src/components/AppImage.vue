<template>
    <figure>
        <!-- <figcaption>Image</figcaption> -->
        <picture>
            <source
            srcset="~/static/test-vertical.jpg"
            media="(min-width: 600px)"
            >
            <img
            src="~/static/test-vertical.jpg"
            alt="MDN"
            >
        </picture>
    </figure>
</template>


<script>
export default {
    name: 'AppImage',
    data() {
        return {
            max: false
        };
    }
};
</script>


<style lang="scss" scoped>
picture {
    display: block;
}

img {
    width: 100vw;
}
</style>
