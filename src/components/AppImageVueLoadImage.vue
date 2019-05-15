<template>
    <figure>
        <vue-load-image>
            <img
            slot="image"
            :src="src" />
            <div
            slot="preloader"
            class="loading" />
            <div slot="error">
                <span>Error loading image.</span>
            </div>
        </vue-load-image>
        <!-- <img
        v-if="status === 'loaded'"
        ref="image"
        :src="source"
        class="image" />

        <div
        v-else-if="status === 'failed'"
        ref="error"
        class="error">
            <span>Error loading image.</span>
        </div>

        <img
        v-else-if="status === 'loading'"
        ref="preloader"
        :src="preloader"
        class="preloader" />

        <div
        v-else-if="status === 'pending'"
        ref="pending"
        class="pending" /> -->
    </figure>
</template>


<script>
/**
 * @see [vue-load-image]{@link https://github.com/john015/vue-load-image}
 * @see [detecting-broken-images]{@link https://stackoverflow.com/a/1977898}
 */
import VueLoadImage from 'vue-load-image';
export default {
    name: 'AppImage',
    components: {
        'vue-load-image': VueLoadImage
    },
    props: {
        src: { type: String }
    }
};
</script>


<style lang="scss" scoped>
figure {
    margin: 0;
}

.loading {
    cursor: wait;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18), 0 2px 15px rgba(0, 0, 0, 0.08);
    height: 100%;
    min-height: 150px;
    position: relative;
    width: 100%;
    @include display-flex(column nowrap, center, space-between);
    @include animation-swipe;
}
</style>
