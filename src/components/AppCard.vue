<template>
    <article
    class="uk-card uk-card-default">
        <header class="uk-card-media-top">
            <AppImage :src="src" />
        </header>
        <!-- <header
        :style="'background-image: url(' + src + ');'"
        class="uk-background-cover uk-card-media-top" /> -->
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
    background: #fff;
    border-radius: 0.25rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.0675),
        0 1px 2px rgba(0, 0, 0, 0.24);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.12);
    }

    header {
        box-sizing: border-box;
        max-width: none;
        max-height: none;
        overflow: hidden;
    }

    // .uk-background-cover {
    //     height: 250px;
    //     max-width: none;
    //     width: auto;
    // }

    img {
        box-sizing: border-box;
        height: auto;
        max-width: 100%;
        width: 100%;
        vertical-align: middle;
    }

    footer {
        display: none;
        box-sizing: border-box;
        @include position-absolute(auto, auto, 10px, 5px);
    }
}
</style>
