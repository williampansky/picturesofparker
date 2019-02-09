<template>
    <article
    v-masonry-tile
    class="card">
        <AppImage :src="src" />
        <header>
            <h1>{{ title }}</h1>
        </header>
        <footer v-if="tags.length">
            <AppTag
            v-for="(tag, idx) in tags"
            :key="idx"
            :index="idx"
            :text="tag.text" />
        </footer>
    </article>
</template>


<script>
import AppImage from '@/components/AppImage.vue';
import AppTag from '@/components/AppTag.vue';
export default {
    name: 'AppCard',
    components: {
        AppImage,
        AppTag
    },
    data() {
        return {
            max: false
        };
    },
    props: {
        src: { type: String },
        tags: { type: Array, default: () => [] },
        title: { type: String }
    }
};
</script>


<style lang="scss" scoped>
article {
    img {
        max-width: 40vw;
    }
}
</style>
